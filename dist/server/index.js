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
const DEFAULT_RANGE = "30d";
const RANGE_OPTIONS = [
  { value: "7d", label: "7 days", days: 7 },
  { value: "30d", label: "30 days", days: 30 },
  { value: "90d", label: "90 days", days: 90 },
  { value: "all", label: "All time", days: null }
];
function getRangeOption(value = DEFAULT_RANGE) {
  return RANGE_OPTIONS.find((option) => option.value === value) || RANGE_OPTIONS[1];
}
const controller = ({ strapi }) => ({
  index(ctx) {
    ctx.body = {
      message: "Welcome to Strapi Insights"
    };
  },
  async summary(ctx) {
    ctx.body = await strapi.plugin(PLUGIN_ID).service("service").getSummary(ctx.query?.range);
  },
  async export(ctx) {
    const { csv, filename } = await strapi.plugin(PLUGIN_ID).service("service").exportSummaryCsv(ctx.query?.range);
    ctx.set("Content-Type", "text/csv; charset=utf-8");
    ctx.set("Content-Disposition", `attachment; filename="${filename}"`);
    ctx.body = csv;
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
  },
  {
    method: "GET",
    path: "/export",
    handler: "controller.export",
    config: {
      policies: []
    }
  }
];
const DEFAULT_LIMIT = 8;
const DAY_IN_MS = 24 * 60 * 60 * 1e3;
const DOCUMENT_BATCH_SIZE = 1e3;
const MEDIA_BATCH_SIZE = 1e3;
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
const IMPLICIT_ATTRIBUTES = /* @__PURE__ */ new Set(["createdAt", "updatedAt", "publishedAt", "documentId", "locale"]);
function isVisibleCollectionType(uid, contentType) {
  if (!contentType || contentType.kind !== "collectionType") {
    return false;
  }
  if (uid.startsWith("admin::") || uid === UPLOAD_FILE_UID) {
    return false;
  }
  return true;
}
function getDisplayName(contentType, uid = "") {
  return contentType.info?.displayName || contentType.info?.singularName || contentType.info?.pluralName || uid;
}
function hasAttribute(contentType, attributeName) {
  return Boolean(contentType.attributes?.[attributeName] || IMPLICIT_ATTRIBUTES.has(attributeName));
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
function startOfDay(dateInput) {
  const date = new Date(dateInput);
  date.setHours(0, 0, 0, 0);
  return date;
}
function startOfWeek(dateInput) {
  const date = startOfDay(dateInput);
  const day = date.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  date.setDate(date.getDate() + diff);
  return date;
}
function startOfMonth(dateInput) {
  const date = new Date(dateInput);
  date.setDate(1);
  date.setHours(0, 0, 0, 0);
  return date;
}
function daysAgo(days) {
  return new Date(Date.now() - days * DAY_IN_MS);
}
function monthsAgo(months) {
  const date = /* @__PURE__ */ new Date();
  date.setMonth(date.getMonth() - months);
  return date;
}
function addDays(dateInput, days) {
  const date = new Date(dateInput);
  date.setDate(date.getDate() + days);
  return date;
}
function addWeeks(dateInput, weeks) {
  return addDays(dateInput, weeks * 7);
}
function addMonths(dateInput, months) {
  const date = new Date(dateInput);
  date.setMonth(date.getMonth() + months);
  return date;
}
function formatBucketLabel(dateInput, bucketType) {
  const date = new Date(dateInput);
  if (bucketType === "month") {
    return new Intl.DateTimeFormat(void 0, { month: "short" }).format(date);
  }
  if (bucketType === "week") {
    return new Intl.DateTimeFormat(void 0, { month: "short", day: "numeric" }).format(date);
  }
  return new Intl.DateTimeFormat(void 0, { month: "short", day: "numeric" }).format(date);
}
function getGrowthConfig(range) {
  if (range.days === 7) {
    return {
      bucketType: "day",
      bucketCount: 7,
      start: startOfDay(range.start),
      increment: addDays
    };
  }
  if (range.days === 30) {
    return {
      bucketType: "day",
      bucketCount: 30,
      start: startOfDay(range.start),
      increment: addDays
    };
  }
  if (range.days === 90) {
    return {
      bucketType: "week",
      bucketCount: 13,
      start: startOfWeek(range.start),
      increment: addWeeks
    };
  }
  return {
    bucketType: "month",
    bucketCount: 12,
    start: startOfMonth(monthsAgo(11)),
    increment: addMonths
  };
}
function getRangeMeta(rangeKey = DEFAULT_RANGE) {
  const range = getRangeOption(rangeKey);
  return {
    key: range.value,
    label: range.label,
    days: range.days,
    start: range.days ? daysAgo(range.days) : null
  };
}
function getDateWhere(attributeName, start) {
  if (!start) {
    return {};
  }
  return {
    [attributeName]: {
      $gte: start
    }
  };
}
async function countByQuery(strapi, uid, where = {}) {
  return strapi.db.query(uid).count({ where });
}
async function findManyByQuery(strapi, uid, options = {}) {
  return strapi.db.query(uid).findMany(options);
}
async function countDistinctDocumentsByQuery(strapi, uid, where = {}) {
  const totalRows = await countByQuery(strapi, uid, where);
  if (!totalRows) {
    return 0;
  }
  const documentIds = /* @__PURE__ */ new Set();
  for (let offset = 0; offset < totalRows; offset += DOCUMENT_BATCH_SIZE) {
    const rows = await findManyByQuery(strapi, uid, {
      select: ["id", "documentId"],
      where,
      offset,
      limit: DOCUMENT_BATCH_SIZE
    });
    rows.forEach((row) => {
      documentIds.add(row.documentId || row.id);
    });
  }
  return documentIds.size;
}
async function getGrowthSeries(strapi, collectionTypes, range) {
  const config2 = getGrowthConfig(range);
  const buckets = Array.from({ length: config2.bucketCount }, (_, index2) => {
    const start = config2.increment(config2.start, index2);
    const end = config2.increment(start, 1);
    return {
      start,
      end,
      label: formatBucketLabel(start, config2.bucketType),
      count: 0,
      documents: /* @__PURE__ */ new Set()
    };
  });
  const activeCollections = collectionTypes.filter(([, contentType]) => hasAttribute(contentType, "createdAt"));
  await Promise.all(
    activeCollections.map(async ([uid]) => {
      const totalRows = await countByQuery(strapi, uid, {
        createdAt: { $gte: config2.start }
      });
      for (let offset = 0; offset < totalRows; offset += DOCUMENT_BATCH_SIZE) {
        const rows = await findManyByQuery(strapi, uid, {
          select: ["id", "documentId", "createdAt"],
          where: {
            createdAt: { $gte: config2.start }
          },
          offset,
          limit: DOCUMENT_BATCH_SIZE,
          orderBy: { createdAt: "asc" }
        });
        rows.forEach((row) => {
          if (!row.createdAt) {
            return;
          }
          const createdAt = new Date(row.createdAt);
          const bucketIndex = buckets.findIndex((bucket2) => createdAt >= bucket2.start && createdAt < bucket2.end);
          if (bucketIndex === -1) {
            return;
          }
          const documentKey = `${uid}:${row.documentId || row.id}`;
          const bucket = buckets[bucketIndex];
          if (!bucket.documents.has(documentKey)) {
            bucket.documents.add(documentKey);
            bucket.count += 1;
          }
        });
      }
    })
  );
  return buckets.map((bucket) => ({
    label: bucket.label,
    count: bucket.count,
    start: bucket.start.toISOString()
  }));
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
async function collectMediaTotals(fileQuery, totalFiles) {
  const totals = {
    totalSize: 0,
    imageFiles: 0,
    mimeGroups: {}
  };
  for (let offset = 0; offset < totalFiles; offset += MEDIA_BATCH_SIZE) {
    const files = await fileQuery.findMany({
      select: ["id", "mime", "size"],
      offset,
      limit: MEDIA_BATCH_SIZE
    });
    files.forEach((file) => {
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
    });
  }
  return totals;
}
async function getMediaInsights(strapi, range) {
  if (!strapi.contentTypes?.[UPLOAD_FILE_UID]) {
    return {
      totalFiles: 0,
      totalSize: 0,
      imageFiles: 0,
      uploadedInRange: 0,
      largestFiles: [],
      recentUploads: [],
      mimeGroups: []
    };
  }
  const fileQuery = strapi.db.query(UPLOAD_FILE_UID);
  const select = ["id", "documentId", "name", "ext", "mime", "size", "url", "createdAt", "updatedAt"];
  const rangeWhere = getDateWhere("createdAt", range.start);
  const [totalFiles, uploadedInRange, largestFiles, recentUploads] = await Promise.all([
    fileQuery.count(),
    fileQuery.count({ where: rangeWhere }),
    fileQuery.findMany({ select, orderBy: { size: "desc" }, limit: 5 }),
    fileQuery.findMany({
      select,
      where: rangeWhere,
      orderBy: { createdAt: "desc" },
      limit: 5
    })
  ]);
  const mediaTotals = await collectMediaTotals(fileQuery, totalFiles);
  return {
    totalFiles,
    totalSize: mediaTotals.totalSize,
    imageFiles: mediaTotals.imageFiles,
    uploadedInRange,
    largestFiles: largestFiles.map(normalizeFile),
    recentUploads: recentUploads.map(normalizeFile),
    mimeGroups: Object.values(mediaTotals.mimeGroups).sort((first, second) => second.count - first.count)
  };
}
async function getCollectionMetrics(strapi, uid, contentType, range) {
  const supportsPublishedState = hasDraftAndPublish(contentType);
  const createdInRangeWhere = hasAttribute(contentType, "createdAt") ? getDateWhere("createdAt", range.start) : {};
  const updatedTodayWhere = hasAttribute(contentType, "updatedAt") ? { updatedAt: { $gte: startOfToday() } } : {};
  const updatedInRangeWhere = hasAttribute(contentType, "updatedAt") ? getDateWhere("updatedAt", range.start) : {};
  const [total, createdInRange, updatedToday, updatedInRange, published, draft] = await Promise.all([
    countDistinctDocumentsByQuery(strapi, uid),
    countDistinctDocumentsByQuery(strapi, uid, createdInRangeWhere),
    countDistinctDocumentsByQuery(strapi, uid, updatedTodayWhere),
    countDistinctDocumentsByQuery(strapi, uid, updatedInRangeWhere),
    supportsPublishedState ? countByQuery(strapi, uid, { publishedAt: { $notNull: true } }) : Promise.resolve(null),
    supportsPublishedState ? countByQuery(strapi, uid, { publishedAt: { $null: true } }) : Promise.resolve(null)
  ]);
  return {
    uid,
    displayName: getDisplayName(contentType, uid),
    total,
    createdInRange,
    updatedToday,
    updatedInRange,
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
async function getRecentActivity(strapi, collectionMetrics, range, limit = DEFAULT_LIMIT) {
  const recentGroups = await Promise.allSettled(
    collectionMetrics.map(async (collection) => {
      const contentType = strapi.contentTypes[collection.uid];
      if (!hasAttribute(contentType, "updatedAt")) {
        return [];
      }
      const entries = await findManyByQuery(strapi, collection.uid, {
        select: ["id", "documentId", "createdAt", "updatedAt", "publishedAt"],
        where: getDateWhere("updatedAt", range.start),
        orderBy: { updatedAt: "desc" },
        limit: 12
      });
      const seenDocuments = /* @__PURE__ */ new Set();
      return entries.filter((entry) => {
        const documentKey = entry.documentId || entry.id;
        if (seenDocuments.has(documentKey)) {
          return false;
        }
        seenDocuments.add(documentKey);
        return true;
      }).slice(0, 3).map((entry) => ({
        id: entry.documentId || entry.id,
        collectionUid: collection.uid,
        collectionName: collection.displayName,
        createdAt: entry.createdAt,
        updatedAt: entry.updatedAt,
        publishedAt: entry.publishedAt
      }));
    })
  );
  return recentGroups.filter((result) => result.status === "fulfilled").flatMap((result) => result.value).filter((entry) => entry.updatedAt).sort((first, second) => new Date(second.updatedAt) - new Date(first.updatedAt)).slice(0, limit);
}
function buildOverview(collections) {
  return collections.reduce(
    (overview, collection) => {
      overview.totalEntries += collection.total;
      overview.createdInRange += collection.createdInRange;
      overview.updatedToday += collection.updatedToday;
      overview.updatedInRange += collection.updatedInRange;
      if (collection.supportsPublishedState) {
        overview.publishedEntries += collection.published || 0;
        overview.draftEntries += collection.draft || 0;
      }
      return overview;
    },
    {
      totalCollections: collections.length,
      totalEntries: 0,
      createdInRange: 0,
      updatedToday: 0,
      updatedInRange: 0,
      publishedEntries: 0,
      draftEntries: 0
    }
  );
}
function getCsvValue(value) {
  if (value === null || value === void 0) {
    return "";
  }
  const stringValue = String(value);
  if (stringValue.includes(",") || stringValue.includes('"') || stringValue.includes("\n")) {
    return `"${stringValue.replace(/"/g, '""')}"`;
  }
  return stringValue;
}
function buildCsv(rows) {
  const header = [
    "section",
    "range",
    "name",
    "uid",
    "metric",
    "value",
    "secondaryMetric",
    "secondaryValue",
    "timestamp",
    "notes"
  ];
  return [header, ...rows].map((row) => row.map(getCsvValue).join(",")).join("\n");
}
function buildExportRows(summary) {
  const rangeLabel = summary.meta.range.label;
  const rows = [];
  Object.entries(summary.overview || {}).forEach(([metric, value]) => {
    rows.push(["overview", rangeLabel, "Overview", "", metric, value, "", "", "", ""]);
  });
  (summary.collections || []).forEach((collection) => {
    rows.push([
      "collections",
      rangeLabel,
      collection.displayName,
      collection.uid,
      "total",
      collection.total,
      "createdInRange",
      collection.createdInRange,
      "",
      collection.supportsPublishedState ? "Draft/publish enabled" : "Draft/publish disabled"
    ]);
    rows.push([
      "collections",
      rangeLabel,
      collection.displayName,
      collection.uid,
      "updatedInRange",
      collection.updatedInRange,
      "updatedToday",
      collection.updatedToday,
      "",
      ""
    ]);
  });
  Object.entries(summary.contentHealth?.summary || {}).forEach(([metric, value]) => {
    rows.push(["content-health-summary", rangeLabel, "Content Health", "", metric, value, "", "", "", ""]);
  });
  (summary.contentHealth?.collections || []).forEach((collection) => {
    rows.push([
      "content-health-collections",
      rangeLabel,
      collection.displayName,
      collection.uid,
      "issueCount",
      collection.issueCount,
      "missingRequiredFields",
      collection.missingRequiredFields,
      "",
      ""
    ]);
  });
  rows.push(["media", rangeLabel, "Media", "", "totalFiles", summary.media?.totalFiles || 0, "uploadedInRange", summary.media?.uploadedInRange || 0, "", ""]);
  rows.push(["media", rangeLabel, "Media", "", "imageFiles", summary.media?.imageFiles || 0, "totalSize", summary.media?.totalSize || 0, "", "Size in KB"]);
  (summary.media?.mimeGroups || []).forEach((group) => {
    rows.push(["media-types", rangeLabel, group.label, "", "count", group.count, "size", group.size, "", "Size in KB"]);
  });
  (summary.recentActivity || []).forEach((activity) => {
    rows.push([
      "recent-activity",
      rangeLabel,
      activity.collectionName,
      activity.collectionUid,
      "entryId",
      activity.id,
      "published",
      Boolean(activity.publishedAt),
      activity.updatedAt,
      ""
    ]);
  });
  return rows;
}
const service = ({ strapi }) => ({
  async getSummary(rangeKey = DEFAULT_RANGE) {
    const range = getRangeMeta(rangeKey);
    const collectionTypes = Object.entries(strapi.contentTypes || {}).filter(([uid, contentType]) => isVisibleCollectionType(uid, contentType)).sort(([, first], [, second]) => getDisplayName(first).localeCompare(getDisplayName(second)));
    const settledMetrics = await Promise.allSettled(
      collectionTypes.map(([uid, contentType]) => getCollectionMetrics(strapi, uid, contentType, range))
    );
    const collections = settledMetrics.filter((result) => result.status === "fulfilled").map((result) => result.value).sort((first, second) => second.total - first.total);
    const overview = buildOverview(collections);
    const contentHealth = await getContentHealth(strapi, collections);
    const growthSeries = await getGrowthSeries(strapi, collectionTypes, range);
    const media = await getMediaInsights(strapi, range);
    const recentActivity = await getRecentActivity(strapi, collections, range);
    return {
      data: {
        meta: {
          range: {
            key: range.key,
            label: range.label,
            days: range.days
          }
        },
        overview,
        growthSeries,
        collections,
        contentHealth,
        media,
        recentActivity
      }
    };
  },
  async exportSummaryCsv(rangeKey = DEFAULT_RANGE) {
    const summaryResponse = await this.getSummary(rangeKey);
    const summary = summaryResponse.data;
    const filenameDate = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
    return {
      csv: buildCsv(buildExportRows(summary)),
      filename: `strapi-insights-${summary.meta.range.key}-${filenameDate}.csv`
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
