"use strict";
const bootstrap = () => {
};
const destroy = () => {
};
const register = () => {
};
const config = {
  default: {},
  validator() {
  }
};
const contentTypes = {};
const PLUGIN_ID = "strapi-plugin-insights";
const controller = ({ strapi }) => ({
  index(ctx) {
    ctx.body = {
      message: "Welcome to Strapi Insights"
    };
  },
  async summary(ctx) {
    ctx.body = await strapi.plugin(PLUGIN_ID).service("service").getSummary(ctx);
  }
});
const controllers = {
  controller
};
const middlewares = {};
const policies = {};
const routes = [
  {
    method: "GET",
    path: "/",
    handler: "controller.index",
    config: {
      policies: []
    }
  },
  {
    method: "GET",
    path: "/summary",
    handler: "controller.summary",
    config: {
      policies: []
    }
  }
];
const DEFAULT_LIMIT = 8;
const DAY_IN_MS = 24 * 60 * 60 * 1e3;
function isVisibleCollectionType(uid, contentType) {
  if (!contentType || contentType.kind !== "collectionType") {
    return false;
  }
  if (uid.startsWith("admin::")) {
    return false;
  }
  return true;
}
function getDisplayName(contentType, uid = "") {
  return contentType.info?.displayName || contentType.info?.singularName || contentType.info?.pluralName || uid;
}
function hasAttribute(contentType, attributeName) {
  return Boolean(contentType.attributes?.[attributeName]);
}
function hasDraftAndPublish(contentType) {
  return Boolean(contentType.options?.draftAndPublish && hasAttribute(contentType, "publishedAt"));
}
function startOfToday() {
  const date = /* @__PURE__ */ new Date();
  date.setHours(0, 0, 0, 0);
  return date;
}
function daysAgo(days) {
  return new Date(Date.now() - days * DAY_IN_MS);
}
async function countByQuery(strapi, uid, where = {}) {
  return strapi.db.query(uid).count({ where });
}
async function findManyByQuery(strapi, uid, options = {}) {
  return strapi.db.query(uid).findMany(options);
}
async function getCollectionMetrics(strapi, uid, contentType) {
  const supportsPublishedState = hasDraftAndPublish(contentType);
  const createdRecentlyWhere = hasAttribute(contentType, "createdAt") ? { createdAt: { $gte: daysAgo(30) } } : {};
  const updatedTodayWhere = hasAttribute(contentType, "updatedAt") ? { updatedAt: { $gte: startOfToday() } } : {};
  const [total, createdLast30Days, updatedToday, published, draft] = await Promise.all([
    countByQuery(strapi, uid),
    countByQuery(strapi, uid, createdRecentlyWhere),
    countByQuery(strapi, uid, updatedTodayWhere),
    supportsPublishedState ? countByQuery(strapi, uid, { publishedAt: { $notNull: true } }) : Promise.resolve(null),
    supportsPublishedState ? countByQuery(strapi, uid, { publishedAt: { $null: true } }) : Promise.resolve(null)
  ]);
  return {
    uid,
    displayName: getDisplayName(contentType, uid),
    total,
    createdLast30Days,
    updatedToday,
    published,
    draft,
    supportsPublishedState
  };
}
async function getRecentActivity(strapi, collectionMetrics, limit = DEFAULT_LIMIT) {
  const recentGroups = await Promise.all(
    collectionMetrics.map(async (collection) => {
      const contentType = strapi.contentTypes[collection.uid];
      if (!hasAttribute(contentType, "updatedAt")) {
        return [];
      }
      const entries = await findManyByQuery(strapi, collection.uid, {
        select: ["id", "documentId", "createdAt", "updatedAt", "publishedAt"],
        orderBy: { updatedAt: "desc" },
        limit: 3
      });
      return entries.map((entry) => ({
        id: entry.documentId || entry.id,
        collectionUid: collection.uid,
        collectionName: collection.displayName,
        createdAt: entry.createdAt,
        updatedAt: entry.updatedAt,
        publishedAt: entry.publishedAt
      }));
    })
  );
  return recentGroups.flat().filter((entry) => entry.updatedAt).sort((first, second) => new Date(second.updatedAt) - new Date(first.updatedAt)).slice(0, limit);
}
function buildOverview(collections) {
  return collections.reduce(
    (overview, collection) => {
      overview.totalEntries += collection.total;
      overview.createdLast30Days += collection.createdLast30Days;
      overview.updatedToday += collection.updatedToday;
      if (collection.supportsPublishedState) {
        overview.publishedEntries += collection.published || 0;
        overview.draftEntries += collection.draft || 0;
      }
      return overview;
    },
    {
      totalCollections: collections.length,
      totalEntries: 0,
      createdLast30Days: 0,
      updatedToday: 0,
      publishedEntries: 0,
      draftEntries: 0
    }
  );
}
const service = ({ strapi }) => ({
  async getSummary() {
    const collectionTypes = Object.entries(strapi.contentTypes || {}).filter(([uid, contentType]) => isVisibleCollectionType(uid, contentType)).sort(([, first], [, second]) => getDisplayName(first).localeCompare(getDisplayName(second)));
    const settledMetrics = await Promise.allSettled(
      collectionTypes.map(([uid, contentType]) => getCollectionMetrics(strapi, uid, contentType))
    );
    const collections = settledMetrics.filter((result) => result.status === "fulfilled").map((result) => result.value).sort((first, second) => second.total - first.total);
    return {
      data: {
        overview: buildOverview(collections),
        collections,
        recentActivity: await getRecentActivity(strapi, collections)
      }
    };
  }
});
const services = {
  service
};
const index = {
  bootstrap,
  destroy,
  register,
  config,
  controllers,
  contentTypes,
  middlewares,
  policies,
  routes,
  services
};
module.exports = index;
