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
const UPLOAD_FILE_UID = "plugin::upload.file";
const REQUIRED_FIELD_TYPES = /* @__PURE__ */ new Set([
  "biginteger",
  "boolean",
  "date",
  "datetime",
  "decimal",
  "email",
  "enumeration",
  "float",
  "integer",
  "json",
  "password",
  "richtext",
  "string",
  "text",
  "time",
  "uid"
]);
const TEXT_FIELD_TYPES = /* @__PURE__ */ new Set(["email", "password", "richtext", "string", "text", "uid"]);
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
function getRequiredFieldNames(contentType) {
  return Object.entries(contentType.attributes || {}).filter(([, attribute]) => attribute.required && REQUIRED_FIELD_TYPES.has(attribute.type)).map(([name, attribute]) => ({
    name,
    checksEmptyString: TEXT_FIELD_TYPES.has(attribute.type)
  }));
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
function getMimeGroup(mime = "") {
  const [group] = mime.split("/");
  return group || "other";
}
function normalizeFile(file) {
  return {
    id: file.documentId || file.id,
    name: file.name || "Untitled file",
    ext: file.ext || "",
    mime: file.mime || "unknown",
    size: Number(file.size || 0),
    url: file.url || null,
    createdAt: file.createdAt,
    updatedAt: file.updatedAt
  };
}
async function getMediaInsights(strapi) {
  if (!strapi.contentTypes?.[UPLOAD_FILE_UID]) {
    return {
      totalFiles: 0,
      totalSize: 0,
      imageFiles: 0,
      uploadedLast30Days: 0,
      largestFiles: [],
      recentUploads: [],
      mimeGroups: []
    };
  }
  const fileQuery = strapi.db.query(UPLOAD_FILE_UID);
  const select = ["id", "documentId", "name", "ext", "mime", "size", "url", "createdAt", "updatedAt"];
  const [totalFiles, uploadedLast30Days, largestFiles, recentUploads, sampledFiles] = await Promise.all([
    fileQuery.count(),
    fileQuery.count({ where: { createdAt: { $gte: daysAgo(30) } } }),
    fileQuery.findMany({ select, orderBy: { size: "desc" }, limit: 5 }),
    fileQuery.findMany({ select, orderBy: { createdAt: "desc" }, limit: 5 }),
    fileQuery.findMany({ select: ["id", "mime", "size"], limit: 5e3 })
  ]);
  const mediaTotals = sampledFiles.reduce(
    (totals, file) => {
      const size = Number(file.size || 0);
      const group = getMimeGroup(file.mime);
      totals.totalSize += size;
      if (group === "image") {
        totals.imageFiles += 1;
      }
      totals.mimeGroups[group] = totals.mimeGroups[group] || {
        label: group,
        count: 0,
        size: 0
      };
      totals.mimeGroups[group].count += 1;
      totals.mimeGroups[group].size += size;
      return totals;
    },
    {
      totalSize: 0,
      imageFiles: 0,
      mimeGroups: {}
    }
  );
  return {
    totalFiles,
    totalSize: mediaTotals.totalSize,
    imageFiles: mediaTotals.imageFiles,
    uploadedLast30Days,
    largestFiles: largestFiles.map(normalizeFile),
    recentUploads: recentUploads.map(normalizeFile),
    mimeGroups: Object.values(mediaTotals.mimeGroups).sort((first, second) => second.count - first.count)
  };
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
async function getCollectionHealth(strapi, collection) {
  const contentType = strapi.contentTypes[collection.uid];
  const supportsPublishedState = hasDraftAndPublish(contentType);
  const hasUpdatedAt = hasAttribute(contentType, "updatedAt");
  const requiredFields = getRequiredFieldNames(contentType);
  const missingRequiredWhere = requiredFields.length ? {
    $or: requiredFields.flatMap((field) => [
      { [field.name]: { $null: true } },
      ...field.checksEmptyString ? [{ [field.name]: { $eq: "" } }] : []
    ])
  } : null;
  const [staleDrafts, staleContent, missingRequiredFields] = await Promise.all([
    supportsPublishedState && hasUpdatedAt ? countByQuery(strapi, collection.uid, {
      publishedAt: { $null: true },
      updatedAt: { $lte: daysAgo(30) }
    }) : Promise.resolve(0),
    hasUpdatedAt ? countByQuery(strapi, collection.uid, { updatedAt: { $lte: daysAgo(90) } }) : Promise.resolve(0),
    missingRequiredWhere ? countByQuery(strapi, collection.uid, missingRequiredWhere) : Promise.resolve(0)
  ]);
  const issueCount = (collection.total === 0 ? 1 : 0) + staleDrafts + staleContent + missingRequiredFields;
  return {
    uid: collection.uid,
    displayName: collection.displayName,
    total: collection.total,
    empty: collection.total === 0,
    staleDrafts,
    staleContent,
    missingRequiredFields,
    requiredFieldCount: requiredFields.length,
    issueCount
  };
}
async function getContentHealth(strapi, collections) {
  const settledHealth = await Promise.allSettled(
    collections.map((collection) => getCollectionHealth(strapi, collection))
  );
  const collectionHealth = settledHealth.filter((result) => result.status === "fulfilled").map((result) => result.value);
  const summary = collectionHealth.reduce(
    (totals, collection) => {
      totals.emptyCollections += collection.empty ? 1 : 0;
      totals.staleDrafts += collection.staleDrafts;
      totals.staleContent += collection.staleContent;
      totals.missingRequiredFields += collection.missingRequiredFields;
      totals.issueCount += collection.issueCount;
      return totals;
    },
    {
      emptyCollections: 0,
      staleDrafts: 0,
      staleContent: 0,
      missingRequiredFields: 0,
      issueCount: 0
    }
  );
  return {
    summary,
    collections: collectionHealth.filter((collection) => collection.issueCount > 0).sort((first, second) => second.issueCount - first.issueCount).slice(0, DEFAULT_LIMIT)
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
        contentHealth: await getContentHealth(strapi, collections),
        media: await getMediaInsights(strapi),
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
