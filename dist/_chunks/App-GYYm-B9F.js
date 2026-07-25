"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const jsxRuntime = require("react/jsx-runtime");
const admin = require("@strapi/strapi/admin");
const reactRouterDom = require("react-router-dom");
const react = require("react");
const designSystem = require("@strapi/design-system");
const index = require("./index-BWZp0zN_.js");
const icons = require("@strapi/icons");
const styled = require("styled-components");
const _interopDefault = (e) => e && e.__esModule ? e : { default: e };
const styled__default = /* @__PURE__ */ _interopDefault(styled);
const enter = styled.keyframes`
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;
const grow = styled.keyframes`
  from {
    transform: scaleX(0);
  }
  to {
    transform: scaleX(1);
  }
`;
const PageShell = styled__default.default.div`
  display: flex;
  width: 100%;
  max-width: 1480px;
  flex-direction: column;
  gap: 24px;
  margin: 0 auto;
  animation: ${enter} 420ms ease both;
`;
const Hero = styled__default.default.div`
  position: relative;
  overflow: hidden;
  border: 1px solid var(--strapi-colors-neutral200);
  border-radius: 8px;
  background:
    radial-gradient(circle at 12% 15%, rgba(123, 97, 255, 0.2), transparent 34%),
    radial-gradient(circle at 82% 8%, rgba(0, 164, 189, 0.18), transparent 28%),
    linear-gradient(
      135deg,
      var(--strapi-colors-neutral0) 0%,
      var(--strapi-colors-neutral100) 48%,
      var(--strapi-colors-neutral150) 100%
    );
  box-shadow: 0 10px 24px rgba(33, 33, 52, 0.08);
  padding: 28px;
`;
const Panel = styled__default.default.div`
  display: flex;
  width: 100%;
  height: 100%;
  min-width: 0;
  flex-direction: column;
  border: 1px solid var(--strapi-colors-neutral200);
  border-radius: 8px;
  background: var(--strapi-colors-neutral0);
  box-shadow: 0 14px 34px rgba(33, 33, 52, 0.14);
  transition:
    border-color 180ms ease,
    box-shadow 180ms ease,
    transform 180ms ease;

  &:hover {
    border-color: var(--strapi-colors-primary200);
    box-shadow: 0 18px 44px rgba(33, 33, 52, 0.18);
    transform: translateY(-2px);
  }
`;
const PanelInner = styled__default.default.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  padding: 22px;
`;
const KpiPanel = styled__default.default(Panel)`
  animation: ${enter} 420ms ease both;
  animation-delay: ${({ $delay }) => `${$delay}ms`};
`;
const IconWell = styled__default.default.div`
  display: inline-flex;
  width: 38px;
  height: 38px;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background: ${({ $tone }) => $tone};
`;
const MiniTrend = styled__default.default.div`
  display: flex;
  align-items: end;
  gap: 4px;
  height: 34px;
  width: 92px;
`;
const TrendColumn = styled__default.default.div`
  flex: 1;
  min-width: 6px;
  border-radius: 4px 4px 2px 2px;
  background: ${({ $color }) => $color};
  height: ${({ $height }) => `${$height}%`};
  transform-origin: bottom;
  animation: ${enter} 420ms ease both;
`;
const ChartWrap = styled__default.default.div`
  width: 100%;
  min-height: 220px;
`;
const KpiGrid = styled__default.default.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 20px;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }
`;
const ChartGrid = styled__default.default.div`
  display: grid;
  grid-template-columns: minmax(340px, 1fr) minmax(340px, 1fr) minmax(300px, 0.85fr);
  gap: 20px;
  align-items: stretch;

  @media (max-width: 1180px) {
    grid-template-columns: 1fr;
  }
`;
const DetailGrid = styled__default.default.div`
  display: grid;
  grid-template-columns: minmax(0, 2fr) minmax(320px, 0.9fr);
  gap: 20px;
  align-items: stretch;

  @media (max-width: 1180px) {
    grid-template-columns: 1fr;
  }
`;
const MediaBoardGrid = styled__default.default.div`
  display: grid;
  grid-template-columns: minmax(260px, 0.75fr) minmax(340px, 1fr) minmax(340px, 1fr);
  gap: 20px;
  align-items: stretch;

  @media (max-width: 1180px) {
    grid-template-columns: 1fr;
  }
`;
const MediaStatGrid = styled__default.default.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`;
const MediaStat = styled__default.default.div`
  min-width: 0;
  border-radius: 8px;
  background: var(--strapi-colors-neutral100);
  padding: 14px;
`;
styled__default.default.div`
  display: grid;
  grid-template-columns: minmax(280px, 0.75fr) minmax(420px, 1fr);
  gap: 20px;
  align-items: stretch;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;
const HealthSummaryGrid = styled__default.default.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 12px;

  @media (max-width: 980px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`;
const HealthIssue = styled__default.default.div`
  border: 1px solid var(--strapi-colors-neutral150);
  border-radius: 8px;
  background: var(--strapi-colors-neutral100);
  padding: 14px;
`;
const ScrollArea = styled__default.default.div`
  max-height: ${({ $maxHeight = "34rem" }) => $maxHeight};
  min-height: 0;
  overflow: auto;
  padding-right: 4px;
`;
const BarTrack = styled__default.default.div`
  height: 10px;
  overflow: hidden;
  border-radius: 999px;
  background: var(--strapi-colors-neutral150);
`;
const BarFill = styled__default.default.div`
  height: 100%;
  width: ${({ $width }) => `${$width}%`};
  border-radius: inherit;
  background: ${({ $color }) => $color};
  transform-origin: left;
  animation: ${grow} 720ms cubic-bezier(0.2, 0.8, 0.2, 1) both;
`;
const ActivityItem = styled__default.default.div`
  position: relative;
  padding: 14px 14px 14px 34px;
  border: 1px solid var(--strapi-colors-neutral150);
  border-radius: 8px;
  background: var(--strapi-colors-neutral100);
  transition:
    background 180ms ease,
    border-color 180ms ease,
    transform 180ms ease;

  &::before {
    position: absolute;
    top: 18px;
    left: 14px;
    width: 9px;
    height: 9px;
    content: '';
    border-radius: 50%;
    background: #00a4bd;
    box-shadow: 0 0 0 4px rgba(0, 164, 189, 0.14);
  }

  &:hover {
    border-color: var(--strapi-colors-primary200);
    background: var(--strapi-colors-primary100);
    transform: translateX(2px);
  }
`;
const StyledTable = styled__default.default.table`
  width: 100%;
  min-width: 760px;
  border-collapse: separate;
  border-spacing: 0;

  th {
    position: sticky;
    top: 0;
    z-index: 1;
    padding: 12px 14px;
    border-bottom: 1px solid var(--strapi-colors-neutral200);
    background: var(--strapi-colors-neutral100);
    text-align: left;
  }

  td {
    padding: 14px;
    border-bottom: 1px solid var(--strapi-colors-neutral150);
    background: var(--strapi-colors-neutral0);
  }

  tbody tr {
    transition: transform 160ms ease;
  }

  tbody tr:hover td {
    background: var(--strapi-colors-primary100);
  }
`;
const CHART_COLORS = ["#7b61ff", "#00a4bd", "#f29d41", "#2f6846", "#d02b20", "#6c7781"];
function getPercent(value, max) {
  if (!max) {
    return 0;
  }
  return Math.max(5, Math.round(value / max * 100));
}
function polarToCartesian(center, radius, angle) {
  const radians = (angle - 90) * Math.PI / 180;
  return {
    x: center + radius * Math.cos(radians),
    y: center + radius * Math.sin(radians)
  };
}
function describeArc(center, radius, startAngle, endAngle) {
  const start = polarToCartesian(center, radius, endAngle);
  const end = polarToCartesian(center, radius, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
  return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`;
}
function formatNumber(value) {
  return new Intl.NumberFormat().format(value || 0);
}
function formatStorage(sizeInKb) {
  const bytes = Number(sizeInKb || 0) * 1e3;
  if (bytes < 1e3) {
    return `${Math.round(bytes)} B`;
  }
  const units = ["KB", "MB", "GB", "TB"];
  let value = bytes / 1e3;
  let unitIndex = 0;
  while (value >= 1e3 && unitIndex < units.length - 1) {
    value /= 1e3;
    unitIndex += 1;
  }
  return `${value >= 10 ? value.toFixed(0) : value.toFixed(1)} ${units[unitIndex]}`;
}
function formatMimeLabel(value = "other") {
  return value.charAt(0).toUpperCase() + value.slice(1);
}
function formatDate(value) {
  if (!value) {
    return "-";
  }
  return new Intl.DateTimeFormat(void 0, {
    dateStyle: "medium",
    timeStyle: "short"
  }).format(new Date(value));
}
function formatRangeLabel(range) {
  if (!range) {
    return "30 days";
  }
  return range.label || "30 days";
}
function formatRangeHeadline(range, prefix) {
  if (!range) {
    return `${prefix} in 30 days`;
  }
  if (range.days === null) {
    return `${prefix} overall`;
  }
  return `${prefix} in ${range.label.toLowerCase()}`;
}
function formatRangeSubline(range, noun = "new") {
  if (!range) {
    return `${noun} in 30 days`;
  }
  if (range.days === null) {
    return `${noun} overall`;
  }
  return `${noun} in ${range.label.toLowerCase()}`;
}
function ContentHealthBoard({ contentHealth }) {
  const summary = contentHealth.summary || {};
  const collections = contentHealth.collections || [];
  const maxIssueCount = collections.reduce((max, collection) => Math.max(max, collection.issueCount), 0);
  return /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(Panel, { children: /* @__PURE__ */ jsxRuntime.jsx(PanelInner, { children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { direction: "column", gap: 5, alignItems: "stretch", children: [
      /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { justifyContent: "space-between", gap: 3, alignItems: "center", wrap: "wrap", children: [
        /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { gap: 3, alignItems: "center", children: [
          /* @__PURE__ */ jsxRuntime.jsx(IconWell, { $tone: "var(--strapi-colors-warning100)", children: /* @__PURE__ */ jsxRuntime.jsx(icons.WarningCircle, { fill: "#f29d41" }) }),
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "delta", textColor: "neutral900", children: "Content Health" })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Badge, { children: [
          formatNumber(summary.issueCount),
          " signals"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs(HealthSummaryGrid, { children: [
        /* @__PURE__ */ jsxRuntime.jsx(MediaStat, { children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { direction: "column", gap: 2, alignItems: "flex-start", children: [
          /* @__PURE__ */ jsxRuntime.jsx(icons.Database, { fill: "#7b61ff" }),
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "pi", textColor: "neutral600", fontWeight: "bold", children: "Empty collections" }),
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "beta", textColor: "neutral900", children: formatNumber(summary.emptyCollections) })
        ] }) }),
        /* @__PURE__ */ jsxRuntime.jsx(MediaStat, { children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { direction: "column", gap: 2, alignItems: "flex-start", children: [
          /* @__PURE__ */ jsxRuntime.jsx(icons.Clock, { fill: "#f29d41" }),
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "pi", textColor: "neutral600", fontWeight: "bold", children: "Stale drafts" }),
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "beta", textColor: "neutral900", children: formatNumber(summary.staleDrafts) })
        ] }) }),
        /* @__PURE__ */ jsxRuntime.jsx(MediaStat, { children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { direction: "column", gap: 2, alignItems: "flex-start", children: [
          /* @__PURE__ */ jsxRuntime.jsx(icons.TrendUp, { fill: "#00a4bd" }),
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "pi", textColor: "neutral600", fontWeight: "bold", children: "Old content" }),
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "beta", textColor: "neutral900", children: formatNumber(summary.staleContent) })
        ] }) }),
        /* @__PURE__ */ jsxRuntime.jsx(MediaStat, { children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { direction: "column", gap: 2, alignItems: "flex-start", children: [
          /* @__PURE__ */ jsxRuntime.jsx(icons.WarningCircle, { fill: "#d02b20" }),
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "pi", textColor: "neutral600", fontWeight: "bold", children: "Required fields" }),
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "beta", textColor: "neutral900", children: formatNumber(summary.missingRequiredFields) })
        ] }) })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntime.jsx(Panel, { children: /* @__PURE__ */ jsxRuntime.jsx(PanelInner, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Flex, { direction: "column", gap: 4, alignItems: "stretch", children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { direction: "column", gap: 3, alignItems: "stretch", children: [
      /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { justifyContent: "space-between", gap: 3, alignItems: "center", children: [
        /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { gap: 3, alignItems: "center", children: [
          /* @__PURE__ */ jsxRuntime.jsx(IconWell, { $tone: "var(--strapi-colors-primary100)", children: /* @__PURE__ */ jsxRuntime.jsx(icons.Database, { fill: "#7b61ff" }) }),
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "delta", textColor: "neutral900", children: "Collections to Review" })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Badge, { children: collections.length })
      ] }),
      collections.length ? /* @__PURE__ */ jsxRuntime.jsx(ScrollArea, { $maxHeight: "36rem", children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Flex, { direction: "column", gap: 3, alignItems: "stretch", children: collections.map((collection, index2) => /* @__PURE__ */ jsxRuntime.jsx(HealthIssue, { children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { direction: "column", gap: 3, alignItems: "stretch", children: [
        /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { justifyContent: "space-between", gap: 3, alignItems: "flex-start", children: [
          /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { direction: "column", gap: 1, alignItems: "flex-start", children: [
            /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "omega", textColor: "neutral900", fontWeight: "bold", children: collection.displayName }),
            /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "pi", textColor: "neutral600", children: collection.uid })
          ] }),
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Badge, { children: formatNumber(collection.issueCount) })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsx(BarTrack, { children: /* @__PURE__ */ jsxRuntime.jsx(BarFill, { $width: getPercent(collection.issueCount, maxIssueCount), $color: CHART_COLORS[index2 % CHART_COLORS.length] }) }),
        /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { gap: 2, wrap: "wrap", children: [
          collection.empty && /* @__PURE__ */ jsxRuntime.jsx(designSystem.Badge, { children: "Empty" }),
          collection.staleDrafts > 0 && /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Badge, { children: [
            formatNumber(collection.staleDrafts),
            " stale drafts"
          ] }),
          collection.staleContent > 0 && /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Badge, { children: [
            formatNumber(collection.staleContent),
            " old entries"
          ] }),
          collection.missingRequiredFields > 0 && /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Badge, { children: [
            formatNumber(collection.missingRequiredFields),
            " missing required"
          ] })
        ] })
      ] }) }, collection.uid)) }) }) : /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "omega", textColor: "neutral600", children: "No content health issues found." })
    ] }) }) }) })
  ] });
}
function DonutChart({ draftCount, publishedCount }) {
  const total = draftCount + publishedCount;
  const draftAngle = total ? draftCount / total * 360 : 0;
  const publishedAngle = 360 - draftAngle;
  const draftPath = draftAngle ? describeArc(96, 70, 0, draftAngle) : "";
  const publishedPath = publishedAngle ? describeArc(96, 70, draftAngle, 360) : "";
  return /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { justifyContent: "space-between", alignItems: "center", gap: 4, wrap: "wrap", children: [
    /* @__PURE__ */ jsxRuntime.jsxs("svg", { width: "176", height: "176", viewBox: "0 0 192 192", role: "img", "aria-label": "Published and draft entries donut chart", children: [
      /* @__PURE__ */ jsxRuntime.jsx("circle", { cx: "96", cy: "96", r: "70", fill: "none", stroke: "#f0f0ff", strokeWidth: "22" }),
      publishedPath && /* @__PURE__ */ jsxRuntime.jsx("path", { d: publishedPath, fill: "none", stroke: "#2f6846", strokeWidth: "22", strokeLinecap: "round" }),
      draftPath && /* @__PURE__ */ jsxRuntime.jsx("path", { d: draftPath, fill: "none", stroke: "#f29d41", strokeWidth: "22", strokeLinecap: "round" }),
      /* @__PURE__ */ jsxRuntime.jsx("text", { x: "96", y: "91", textAnchor: "middle", fill: "#212134", fontSize: "24", fontWeight: "700", children: formatNumber(total) }),
      /* @__PURE__ */ jsxRuntime.jsx("text", { x: "96", y: "113", textAnchor: "middle", fill: "#666687", fontSize: "12", children: "entries" })
    ] }),
    /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { direction: "column", gap: 3, alignItems: "stretch", style: { minWidth: 180, flex: 1 }, children: [
      /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { justifyContent: "space-between", gap: 3, children: [
        /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { gap: 2, alignItems: "center", children: [
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { background: "success600", height: "0.8rem", width: "0.8rem", hasRadius: true }),
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "omega", textColor: "neutral800", children: "Published" })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "omega", textColor: "neutral900", fontWeight: "bold", children: formatNumber(publishedCount) })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { justifyContent: "space-between", gap: 3, children: [
        /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { gap: 2, alignItems: "center", children: [
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { background: "warning600", height: "0.8rem", width: "0.8rem", hasRadius: true }),
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "omega", textColor: "neutral800", children: "Draft" })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "omega", textColor: "neutral900", fontWeight: "bold", children: formatNumber(draftCount) })
      ] })
    ] })
  ] });
}
function CollectionBars({ collections, max, range }) {
  return /* @__PURE__ */ jsxRuntime.jsx(designSystem.Flex, { direction: "column", gap: 4, alignItems: "stretch", children: collections.map((collection, index2) => {
    const width = getPercent(collection.total, max);
    return /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { direction: "column", gap: 2, alignItems: "stretch", children: [
      /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { justifyContent: "space-between", gap: 3, children: [
        /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { direction: "column", gap: 1, alignItems: "flex-start", children: [
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "omega", textColor: "neutral800", fontWeight: "bold", children: collection.displayName }),
          /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Typography, { variant: "pi", textColor: "neutral600", children: [
            collection.createdInRange,
            " ",
            formatRangeSubline(range, "new")
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Badge, { children: formatNumber(collection.total) })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsx(BarTrack, { children: /* @__PURE__ */ jsxRuntime.jsx(BarFill, { $width: width, $color: CHART_COLORS[index2 % CHART_COLORS.length] }) })
    ] }, collection.uid);
  }) });
}
function GrowthChart({ series = [] }) {
  const values = series.map((point) => point.count);
  const max = Math.max(...values, 1);
  const points = values.map((value, index2) => {
    const x = 24 + index2 * (280 / Math.max(values.length - 1, 1));
    const y = 150 - value / max * 112;
    return `${x},${y}`;
  }).join(" ");
  return /* @__PURE__ */ jsxRuntime.jsxs(ChartWrap, { children: [
    /* @__PURE__ */ jsxRuntime.jsxs("svg", { width: "100%", height: "190", viewBox: "0 0 340 190", role: "img", "aria-label": "Content growth chart", children: [
      /* @__PURE__ */ jsxRuntime.jsx("defs", { children: /* @__PURE__ */ jsxRuntime.jsxs("linearGradient", { id: "growthFill", x1: "0", x2: "0", y1: "0", y2: "1", children: [
        /* @__PURE__ */ jsxRuntime.jsx("stop", { offset: "0%", stopColor: "#7b61ff", stopOpacity: "0.28" }),
        /* @__PURE__ */ jsxRuntime.jsx("stop", { offset: "100%", stopColor: "#7b61ff", stopOpacity: "0.02" })
      ] }) }),
      [38, 66, 94, 122, 150].map((y) => /* @__PURE__ */ jsxRuntime.jsx("line", { x1: "24", x2: "316", y1: y, y2: y, stroke: "#eaeaef" }, y)),
      points && /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
        /* @__PURE__ */ jsxRuntime.jsx("polygon", { points: `24,150 ${points} 316,150`, fill: "url(#growthFill)" }),
        /* @__PURE__ */ jsxRuntime.jsx("polyline", { points, fill: "none", stroke: "#7b61ff", strokeWidth: "4", strokeLinecap: "round", strokeLinejoin: "round" }),
        points.split(" ").map((point, index2) => {
          const [x, y] = point.split(",");
          return /* @__PURE__ */ jsxRuntime.jsx("circle", { cx: x, cy: y, r: index2 === values.length - 1 ? 5 : 4, fill: "#ffffff", stroke: "#7b61ff", strokeWidth: "3" }, point);
        })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Flex, { justifyContent: "space-between", gap: 2, children: series.filter((_, index2) => index2 % Math.max(Math.ceil(series.length / 4), 1) === 0).slice(0, 4).map((point) => /* @__PURE__ */ jsxRuntime.jsx(designSystem.Badge, { children: point.label }, point.start)) })
  ] });
}
function ContentSummaryBoards({ collections, growthSeries, maxCollectionCount, overview, range, topCollections }) {
  return /* @__PURE__ */ jsxRuntime.jsxs(ChartGrid, { children: [
    /* @__PURE__ */ jsxRuntime.jsx("div", { children: /* @__PURE__ */ jsxRuntime.jsx(Panel, { children: /* @__PURE__ */ jsxRuntime.jsx(PanelInner, { children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { direction: "column", gap: 4, alignItems: "stretch", children: [
      /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { justifyContent: "space-between", gap: 3, alignItems: "center", children: [
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "delta", textColor: "neutral900", children: "Publishing Mix" }),
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Badge, { children: formatNumber(overview.publishedEntries + overview.draftEntries) })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsx(DonutChart, { draftCount: overview.draftEntries || 0, publishedCount: overview.publishedEntries || 0 })
    ] }) }) }) }),
    /* @__PURE__ */ jsxRuntime.jsx("div", { children: /* @__PURE__ */ jsxRuntime.jsx(Panel, { children: /* @__PURE__ */ jsxRuntime.jsx(PanelInner, { children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { direction: "column", gap: 4, alignItems: "stretch", children: [
      /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { justifyContent: "space-between", gap: 3, alignItems: "center", children: [
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "delta", textColor: "neutral900", children: "Content Growth" }),
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Badge, { children: formatRangeLabel(range) })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsx(GrowthChart, { series: growthSeries })
    ] }) }) }) }),
    /* @__PURE__ */ jsxRuntime.jsx("div", { children: /* @__PURE__ */ jsxRuntime.jsx(Panel, { children: /* @__PURE__ */ jsxRuntime.jsx(PanelInner, { children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { direction: "column", gap: 4, alignItems: "stretch", children: [
      /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { justifyContent: "space-between", gap: 3, alignItems: "center", children: [
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "delta", textColor: "neutral900", children: "Top Collections" }),
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Badge, { children: topCollections.length })
      ] }),
      topCollections.length ? /* @__PURE__ */ jsxRuntime.jsx(CollectionBars, { collections: topCollections, max: maxCollectionCount, range }) : /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "omega", textColor: "neutral600", children: "No collections found." })
    ] }) }) }) })
  ] });
}
function DashboardHeader({ isExporting, isLoading, onExport, onRangeChange, onRefresh, rangeKey, rangeLabel }) {
  return /* @__PURE__ */ jsxRuntime.jsx(Hero, { children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { justifyContent: "space-between", alignItems: "center", gap: 4, wrap: "wrap", children: [
    /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { gap: 4, alignItems: "center", children: [
      /* @__PURE__ */ jsxRuntime.jsx(IconWell, { $tone: "var(--strapi-colors-neutral100)", children: /* @__PURE__ */ jsxRuntime.jsx(index.PluginIcon, {}) }),
      /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { direction: "column", gap: 1, alignItems: "flex-start", children: [
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "alpha", textColor: "neutral800", children: "Insights" }),
        /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Typography, { variant: "omega", textColor: "neutral700", children: [
          "Analytics, KPIs, and activity across your Strapi content for ",
          rangeLabel.toLowerCase(),
          "."
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Badge, { children: [
        "v",
        index.PLUGIN_VERSION
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { gap: 3, alignItems: "center", wrap: "wrap", children: [
      /* @__PURE__ */ jsxRuntime.jsx(
        designSystem.SingleSelect,
        {
          "aria-label": "Select date range",
          customizeContent: (value) => index.RANGE_OPTIONS.find((option) => option.value === value)?.label || String(value),
          onChange: onRangeChange,
          size: "S",
          value: rangeKey,
          children: index.RANGE_OPTIONS.map((option) => /* @__PURE__ */ jsxRuntime.jsx(designSystem.SingleSelectOption, { value: option.value, children: option.label }, option.value))
        }
      ),
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Button, { startIcon: /* @__PURE__ */ jsxRuntime.jsx(icons.Download, {}), variant: "tertiary", onClick: onExport, disabled: isLoading || isExporting, children: isExporting ? "Exporting" : "Export CSV" }),
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Button, { startIcon: /* @__PURE__ */ jsxRuntime.jsx(icons.ArrowClockwise, {}), variant: "secondary", onClick: onRefresh, disabled: isLoading, children: "Refresh" })
    ] })
  ] }) });
}
function CollectionsTable({ collections, max, range }) {
  return /* @__PURE__ */ jsxRuntime.jsx(ScrollArea, { $maxHeight: "34rem", children: /* @__PURE__ */ jsxRuntime.jsxs(StyledTable, { children: [
    /* @__PURE__ */ jsxRuntime.jsx("thead", { children: /* @__PURE__ */ jsxRuntime.jsx("tr", { children: ["Collection", "Entries", formatRangeLabel(range), "Today", "Published", "Draft", "Share"].map((heading) => /* @__PURE__ */ jsxRuntime.jsx("th", { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "pi", textColor: "neutral600", fontWeight: "bold", children: heading }) }, heading)) }) }),
    /* @__PURE__ */ jsxRuntime.jsx("tbody", { children: collections.map((collection, index2) => /* @__PURE__ */ jsxRuntime.jsxs("tr", { children: [
      /* @__PURE__ */ jsxRuntime.jsx("td", { children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { direction: "column", gap: 1, alignItems: "flex-start", children: [
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "omega", textColor: "neutral800", fontWeight: "bold", children: collection.displayName }),
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "pi", textColor: "neutral600", children: collection.uid })
      ] }) }),
      /* @__PURE__ */ jsxRuntime.jsx("td", { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { children: formatNumber(collection.total) }) }),
      /* @__PURE__ */ jsxRuntime.jsx("td", { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { children: formatNumber(collection.createdInRange) }) }),
      /* @__PURE__ */ jsxRuntime.jsx("td", { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { children: formatNumber(collection.updatedToday) }) }),
      /* @__PURE__ */ jsxRuntime.jsx("td", { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { children: collection.published === null ? "-" : formatNumber(collection.published) }) }),
      /* @__PURE__ */ jsxRuntime.jsx("td", { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { children: collection.draft === null ? "-" : formatNumber(collection.draft) }) }),
      /* @__PURE__ */ jsxRuntime.jsx("td", { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { width: "8rem", children: /* @__PURE__ */ jsxRuntime.jsx(BarTrack, { children: /* @__PURE__ */ jsxRuntime.jsx(BarFill, { $width: getPercent(collection.total, max), $color: CHART_COLORS[index2 % CHART_COLORS.length] }) }) }) })
    ] }, collection.uid)) })
  ] }) });
}
function DetailBoards({ collections, maxCollectionCount, range, recentActivity }) {
  return /* @__PURE__ */ jsxRuntime.jsxs(DetailGrid, { children: [
    /* @__PURE__ */ jsxRuntime.jsx("div", { children: /* @__PURE__ */ jsxRuntime.jsx(Panel, { children: /* @__PURE__ */ jsxRuntime.jsx(PanelInner, { children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { direction: "column", gap: 4, alignItems: "stretch", children: [
      /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { justifyContent: "space-between", gap: 3, alignItems: "center", wrap: "wrap", children: [
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "delta", textColor: "neutral900", children: "Collection KPIs" }),
        /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Badge, { children: [
          collections.length,
          " collections"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsx(CollectionsTable, { collections, max: maxCollectionCount, range })
    ] }) }) }) }),
    /* @__PURE__ */ jsxRuntime.jsx("div", { children: /* @__PURE__ */ jsxRuntime.jsx(Panel, { children: /* @__PURE__ */ jsxRuntime.jsx(PanelInner, { children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { direction: "column", gap: 4, alignItems: "stretch", children: [
      /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { justifyContent: "space-between", gap: 3, alignItems: "center", children: [
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "delta", textColor: "neutral900", children: "Recent Activity" }),
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Badge, { children: recentActivity.length })
      ] }),
      recentActivity.length ? /* @__PURE__ */ jsxRuntime.jsx(ScrollArea, { $maxHeight: "34rem", children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Flex, { direction: "column", gap: 3, alignItems: "stretch", children: recentActivity.map((activity) => /* @__PURE__ */ jsxRuntime.jsx(ActivityItem, { children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { direction: "column", gap: 1, alignItems: "flex-start", children: [
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "omega", textColor: "neutral900", fontWeight: "bold", children: activity.collectionName }),
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "pi", textColor: "neutral600", children: formatDate(activity.updatedAt) }),
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "pi", textColor: "neutral500", children: activity.collectionUid })
      ] }) }, `${activity.collectionUid}-${activity.id}`)) }) }) : /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "omega", textColor: "neutral600", children: "No recent activity found." })
    ] }) }) }) })
  ] });
}
function MediaFileList({ files, meta }) {
  if (!files.length) {
    return /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "omega", textColor: "neutral600", children: "No media files found." });
  }
  return /* @__PURE__ */ jsxRuntime.jsx(designSystem.Flex, { direction: "column", gap: 3, alignItems: "stretch", children: files.map((file) => /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { justifyContent: "space-between", gap: 4, alignItems: "center", children: [
    /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { gap: 3, alignItems: "center", style: { minWidth: 0 }, children: [
      /* @__PURE__ */ jsxRuntime.jsx(IconWell, { $tone: "var(--strapi-colors-success100)", children: /* @__PURE__ */ jsxRuntime.jsx(icons.File, { fill: "#2f6846" }) }),
      /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { direction: "column", gap: 1, alignItems: "flex-start", style: { minWidth: 0 }, children: [
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "omega", textColor: "neutral900", fontWeight: "bold", ellipsis: true, children: file.name }),
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "pi", textColor: "neutral600", children: file.mime })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { direction: "column", gap: 1, alignItems: "flex-end", children: [
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "omega", textColor: "neutral800", fontWeight: "bold", children: formatStorage(file.size) }),
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "pi", textColor: "neutral600", children: meta(file) })
    ] })
  ] }, file.id)) });
}
function MediaInsightsBoard({ media, range }) {
  const mimeGroups = media.mimeGroups || [];
  const maxMimeCount = mimeGroups.reduce((max, group) => Math.max(max, group.count), 0);
  return /* @__PURE__ */ jsxRuntime.jsx(Panel, { children: /* @__PURE__ */ jsxRuntime.jsx(PanelInner, { children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { direction: "column", gap: 5, alignItems: "stretch", children: [
    /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { justifyContent: "space-between", gap: 3, alignItems: "center", wrap: "wrap", children: [
      /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { gap: 3, alignItems: "center", children: [
        /* @__PURE__ */ jsxRuntime.jsx(IconWell, { $tone: "var(--strapi-colors-neutral100)", children: /* @__PURE__ */ jsxRuntime.jsx(icons.Images, { fill: "#00a4bd" }) }),
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "delta", textColor: "neutral900", children: "Media Insights" })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Badge, { children: [
        formatNumber(media.totalFiles),
        " files"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntime.jsxs(MediaBoardGrid, { children: [
      /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { direction: "column", gap: 4, alignItems: "stretch", children: [
        /* @__PURE__ */ jsxRuntime.jsxs(MediaStatGrid, { children: [
          /* @__PURE__ */ jsxRuntime.jsx(MediaStat, { children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { direction: "column", gap: 2, alignItems: "flex-start", children: [
            /* @__PURE__ */ jsxRuntime.jsx(icons.Server, { fill: "#7b61ff" }),
            /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "pi", textColor: "neutral600", fontWeight: "bold", children: "Storage" }),
            /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "beta", textColor: "neutral900", children: formatStorage(media.totalSize) })
          ] }) }),
          /* @__PURE__ */ jsxRuntime.jsx(MediaStat, { children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { direction: "column", gap: 2, alignItems: "flex-start", children: [
            /* @__PURE__ */ jsxRuntime.jsx(icons.Images, { fill: "#00a4bd" }),
            /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "pi", textColor: "neutral600", fontWeight: "bold", children: "Images" }),
            /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "beta", textColor: "neutral900", children: formatNumber(media.imageFiles) })
          ] }) }),
          /* @__PURE__ */ jsxRuntime.jsx(MediaStat, { children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { direction: "column", gap: 2, alignItems: "flex-start", children: [
            /* @__PURE__ */ jsxRuntime.jsx(icons.Upload, { fill: "#2f6846" }),
            /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "pi", textColor: "neutral600", fontWeight: "bold", children: "New uploads" }),
            /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "beta", textColor: "neutral900", children: formatNumber(media.uploadedInRange) }),
            /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "pi", textColor: "neutral600", children: formatRangeLabel(range) })
          ] }) }),
          /* @__PURE__ */ jsxRuntime.jsx(MediaStat, { children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { direction: "column", gap: 2, alignItems: "flex-start", children: [
            /* @__PURE__ */ jsxRuntime.jsx(icons.File, { fill: "#f29d41" }),
            /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "pi", textColor: "neutral600", fontWeight: "bold", children: "Other files" }),
            /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "beta", textColor: "neutral900", children: formatNumber(Math.max((media.totalFiles || 0) - (media.imageFiles || 0), 0)) })
          ] }) })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { direction: "column", gap: 3, alignItems: "stretch", children: [
          /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { justifyContent: "space-between", gap: 3, children: [
            /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "omega", textColor: "neutral900", fontWeight: "bold", children: "File Types" }),
            /* @__PURE__ */ jsxRuntime.jsx(designSystem.Badge, { children: mimeGroups.length })
          ] }),
          mimeGroups.length ? mimeGroups.slice(0, 5).map((group, index2) => /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { direction: "column", gap: 2, alignItems: "stretch", children: [
            /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { justifyContent: "space-between", gap: 3, children: [
              /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "omega", textColor: "neutral800", children: formatMimeLabel(group.label) }),
              /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "omega", textColor: "neutral900", fontWeight: "bold", children: formatNumber(group.count) })
            ] }),
            /* @__PURE__ */ jsxRuntime.jsx(BarTrack, { children: /* @__PURE__ */ jsxRuntime.jsx(BarFill, { $width: getPercent(group.count, maxMimeCount), $color: CHART_COLORS[index2 % CHART_COLORS.length] }) })
          ] }, group.label)) : /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "omega", textColor: "neutral600", children: "No file type data found." })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { direction: "column", gap: 4, alignItems: "stretch", children: [
        /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { justifyContent: "space-between", gap: 3, alignItems: "center", children: [
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "omega", textColor: "neutral900", fontWeight: "bold", children: "Largest Files" }),
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Badge, { children: media.largestFiles?.length || 0 })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsx(MediaFileList, { files: media.largestFiles || [], meta: (file) => formatDate(file.updatedAt) })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { direction: "column", gap: 4, alignItems: "stretch", children: [
        /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { justifyContent: "space-between", gap: 3, alignItems: "center", children: [
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "omega", textColor: "neutral900", fontWeight: "bold", children: "Recent Uploads" }),
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Badge, { children: media.recentUploads?.length || 0 })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsx(MediaFileList, { files: media.recentUploads || [], meta: (file) => formatDate(file.createdAt) })
      ] })
    ] })
  ] }) }) });
}
function KpiCard({ delay, helper, icon, label, tone, trend, value }) {
  const trendValues = trend?.length ? trend : [36, 58, 44, 70, 62, 86];
  return /* @__PURE__ */ jsxRuntime.jsx(KpiPanel, { $delay: delay, children: /* @__PURE__ */ jsxRuntime.jsxs(PanelInner, { children: [
    /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { justifyContent: "space-between", alignItems: "flex-start", gap: 3, children: [
      /* @__PURE__ */ jsxRuntime.jsx(IconWell, { $tone: tone, children: icon }),
      /* @__PURE__ */ jsxRuntime.jsx(MiniTrend, { "aria-hidden": true, children: trendValues.map((height, index2) => /* @__PURE__ */ jsxRuntime.jsx(
        TrendColumn,
        {
          $color: index2 === trendValues.length - 1 ? "#7b61ff" : "#d9d8ff",
          $height: height
        },
        `${label}-${index2}`
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Box, { paddingTop: 4, children: [
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "pi", textColor: "neutral600", fontWeight: "bold", children: label }),
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { paddingTop: 1, children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "beta", textColor: "neutral900", children: value }) }),
      helper && /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { paddingTop: 1, children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "pi", textColor: "neutral600", children: helper }) })
    ] })
  ] }) });
}
function OverviewKpis({ overview, range }) {
  return /* @__PURE__ */ jsxRuntime.jsxs(KpiGrid, { children: [
    /* @__PURE__ */ jsxRuntime.jsx("div", { children: /* @__PURE__ */ jsxRuntime.jsx(
      KpiCard,
      {
        delay: 0,
        icon: /* @__PURE__ */ jsxRuntime.jsx(icons.Database, { fill: "#7b61ff" }),
        label: "Collections",
        value: formatNumber(overview.totalCollections),
        helper: "Visible collection types",
        tone: "var(--strapi-colors-primary100)"
      }
    ) }),
    /* @__PURE__ */ jsxRuntime.jsx("div", { children: /* @__PURE__ */ jsxRuntime.jsx(
      KpiCard,
      {
        delay: 60,
        icon: /* @__PURE__ */ jsxRuntime.jsx(icons.Graph, { fill: "#00a4bd" }),
        label: "Entries",
        value: formatNumber(overview.totalEntries),
        helper: "Total records counted",
        tone: "var(--strapi-colors-neutral100)",
        trend: [30, 42, 48, 64, 78, 92]
      }
    ) }),
    /* @__PURE__ */ jsxRuntime.jsx("div", { children: /* @__PURE__ */ jsxRuntime.jsx(
      KpiCard,
      {
        delay: 120,
        icon: /* @__PURE__ */ jsxRuntime.jsx(icons.TrendUp, { fill: "#2f6846" }),
        label: formatRangeHeadline(range, "Created"),
        value: formatNumber(overview.createdInRange),
        helper: "Fresh content signal",
        tone: "var(--strapi-colors-success100)",
        trend: [28, 50, 38, 76, 56, 82]
      }
    ) }),
    /* @__PURE__ */ jsxRuntime.jsx("div", { children: /* @__PURE__ */ jsxRuntime.jsx(
      KpiCard,
      {
        delay: 180,
        icon: /* @__PURE__ */ jsxRuntime.jsx(icons.ChartPie, { fill: "#f29d41" }),
        label: "Drafts",
        value: formatNumber(overview.draftEntries),
        helper: `${formatNumber(overview.publishedEntries)} published`,
        tone: "var(--strapi-colors-warning100)",
        trend: [62, 46, 58, 40, 54, 36]
      }
    ) })
  ] });
}
function getFilenameFromDisposition(disposition) {
  const match = disposition?.match(/filename="([^"]+)"/);
  return match?.[1] || null;
}
function useInsightsSummary(rangeKey) {
  const { get } = admin.useFetchClient();
  const [summary, setSummary] = react.useState(null);
  const [isLoading, setIsLoading] = react.useState(true);
  const [isExporting, setIsExporting] = react.useState(false);
  const [error, setError] = react.useState(null);
  async function fetchSummary(nextRange = rangeKey) {
    try {
      setIsLoading(true);
      setError(null);
      const { data } = await get(`${index.PLUGIN_ID}/summary`, {
        params: {
          range: nextRange
        }
      });
      setSummary(data?.data || null);
    } catch (fetchError) {
      console.error(fetchError);
      setError(fetchError?.response?.data?.error?.message || "Failed to load insights.");
    } finally {
      setIsLoading(false);
    }
  }
  async function exportSummary(nextRange = rangeKey) {
    try {
      setIsExporting(true);
      setError(null);
      const response = await get(`${index.PLUGIN_ID}/export`, {
        params: {
          range: nextRange
        },
        responseType: "blob"
      });
      const blob = response.data instanceof Blob ? response.data : new Blob([response.data], { type: "text/csv;charset=utf-8" });
      const link = document.createElement("a");
      const downloadUrl = window.URL.createObjectURL(blob);
      link.href = downloadUrl;
      link.download = getFilenameFromDisposition(response.headers?.["content-disposition"]) || `strapi-insights-${nextRange}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
    } catch (fetchError) {
      console.error(fetchError);
      setError(fetchError?.response?.data?.error?.message || "Failed to export insights.");
    } finally {
      setIsExporting(false);
    }
  }
  react.useEffect(() => {
    fetchSummary(rangeKey);
  }, [rangeKey]);
  return {
    error,
    exportSummary,
    fetchSummary,
    isExporting,
    isLoading,
    summary
  };
}
const HomePage = () => {
  const [rangeKey, setRangeKey] = react.useState(index.DEFAULT_RANGE);
  const { error, exportSummary, fetchSummary, isExporting, isLoading, summary } = useInsightsSummary(rangeKey);
  const range = summary?.meta?.range || index.getRangeOption(rangeKey);
  const overview = summary?.overview || {};
  const growthSeries = summary?.growthSeries || [];
  const collections = summary?.collections || [];
  const contentHealth = summary?.contentHealth || {};
  const media = summary?.media || {};
  const recentActivity = summary?.recentActivity || [];
  const maxCollectionCount = react.useMemo(
    () => collections.reduce((max, collection) => Math.max(max, collection.total), 0),
    [collections]
  );
  const topCollections = collections.slice(0, 6);
  return /* @__PURE__ */ jsxRuntime.jsx(designSystem.Main, { padding: 6, background: "neutral100", children: /* @__PURE__ */ jsxRuntime.jsxs(PageShell, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(
      DashboardHeader,
      {
        isExporting,
        isLoading,
        onExport: () => exportSummary(rangeKey),
        onRangeChange: setRangeKey,
        onRefresh: () => fetchSummary(rangeKey),
        rangeKey,
        rangeLabel: range.label
      }
    ),
    error && /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { background: "danger100", borderColor: "danger200", hasRadius: true, padding: 4, children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "omega", textColor: "danger700", children: error }) }),
    isLoading ? /* @__PURE__ */ jsxRuntime.jsx(Panel, { children: /* @__PURE__ */ jsxRuntime.jsx(PanelInner, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Flex, { justifyContent: "center", padding: 8, children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Loader, { children: "Loading insights" }) }) }) }) : /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
      /* @__PURE__ */ jsxRuntime.jsx(OverviewKpis, { overview, range }),
      /* @__PURE__ */ jsxRuntime.jsx(
        ContentSummaryBoards,
        {
          collections,
          growthSeries,
          maxCollectionCount,
          overview,
          range,
          topCollections
        }
      ),
      /* @__PURE__ */ jsxRuntime.jsx(ContentHealthBoard, { contentHealth }),
      /* @__PURE__ */ jsxRuntime.jsx(MediaInsightsBoard, { media, range }),
      /* @__PURE__ */ jsxRuntime.jsx(
        DetailBoards,
        {
          collections,
          maxCollectionCount,
          range,
          recentActivity
        }
      )
    ] })
  ] }) });
};
const App = () => /* @__PURE__ */ jsxRuntime.jsxs(reactRouterDom.Routes, { children: [
  /* @__PURE__ */ jsxRuntime.jsx(reactRouterDom.Route, { index: true, element: /* @__PURE__ */ jsxRuntime.jsx(HomePage, {}) }),
  /* @__PURE__ */ jsxRuntime.jsx(reactRouterDom.Route, { path: "*", element: /* @__PURE__ */ jsxRuntime.jsx(admin.Page.Error, {}) })
] });
exports.App = App;
