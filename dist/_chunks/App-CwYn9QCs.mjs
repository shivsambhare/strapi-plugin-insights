import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { useFetchClient, Page } from "@strapi/strapi/admin";
import { Routes, Route } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import { Flex, Typography, Badge, Box, Button, Main, Loader } from "@strapi/design-system";
import { WarningCircle, Database, Clock, TrendUp, ArrowClockwise, Images, Server, Upload, File, Graph, ChartPie } from "@strapi/icons";
import styled, { keyframes } from "styled-components";
import { b as PluginIcon, a as PLUGIN_VERSION, P as PLUGIN_ID } from "./index-VrO8q4me.mjs";
const enter = keyframes`
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;
const grow = keyframes`
  from {
    transform: scaleX(0);
  }
  to {
    transform: scaleX(1);
  }
`;
const PageShell = styled.div`
  display: flex;
  width: 100%;
  max-width: 1480px;
  flex-direction: column;
  gap: 24px;
  margin: 0 auto;
  animation: ${enter} 420ms ease both;
`;
const Hero = styled.div`
  position: relative;
  overflow: hidden;
  border: 1px solid #dcdce4;
  border-radius: 8px;
  background:
    radial-gradient(circle at 12% 15%, rgba(123, 97, 255, 0.18), transparent 34%),
    radial-gradient(circle at 82% 8%, rgba(0, 164, 189, 0.16), transparent 28%),
    linear-gradient(135deg, #ffffff 0%, #f7f8ff 48%, #eef7f4 100%);
  box-shadow: 0 18px 42px rgba(33, 33, 52, 0.08);
  padding: 28px;
`;
const Panel = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  min-width: 0;
  flex-direction: column;
  border: 1px solid #dcdce4;
  border-radius: 8px;
  background: #ffffff;
  box-shadow: 0 14px 34px rgba(33, 33, 52, 0.07);
  transition:
    border-color 180ms ease,
    box-shadow 180ms ease,
    transform 180ms ease;

  &:hover {
    border-color: #b8b8d1;
    box-shadow: 0 18px 44px rgba(33, 33, 52, 0.11);
    transform: translateY(-2px);
  }
`;
const PanelInner = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  padding: 22px;
`;
const KpiPanel = styled(Panel)`
  animation: ${enter} 420ms ease both;
  animation-delay: ${({ $delay }) => `${$delay}ms`};
`;
const IconWell = styled.div`
  display: inline-flex;
  width: 38px;
  height: 38px;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background: ${({ $tone }) => $tone};
`;
const MiniTrend = styled.div`
  display: flex;
  align-items: end;
  gap: 4px;
  height: 34px;
  width: 92px;
`;
const TrendColumn = styled.div`
  flex: 1;
  min-width: 6px;
  border-radius: 4px 4px 2px 2px;
  background: ${({ $color }) => $color};
  height: ${({ $height }) => `${$height}%`};
  transform-origin: bottom;
  animation: ${enter} 420ms ease both;
`;
const ChartWrap = styled.div`
  width: 100%;
  min-height: 220px;
`;
const KpiGrid = styled.div`
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
const ChartGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(340px, 1fr) minmax(340px, 1fr) minmax(300px, 0.85fr);
  gap: 20px;
  align-items: stretch;

  @media (max-width: 1180px) {
    grid-template-columns: 1fr;
  }
`;
const DetailGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 2fr) minmax(320px, 0.9fr);
  gap: 20px;
  align-items: stretch;

  @media (max-width: 1180px) {
    grid-template-columns: 1fr;
  }
`;
const MediaBoardGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(260px, 0.75fr) minmax(340px, 1fr) minmax(340px, 1fr);
  gap: 20px;
  align-items: stretch;

  @media (max-width: 1180px) {
    grid-template-columns: 1fr;
  }
`;
const MediaStatGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`;
const MediaStat = styled.div`
  min-width: 0;
  border-radius: 8px;
  background: #f6f6f9;
  padding: 14px;
`;
const HealthBoardGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(280px, 0.75fr) minmax(420px, 1fr);
  gap: 20px;
  align-items: stretch;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;
const HealthIssue = styled.div`
  border: 1px solid #eaeaef;
  border-radius: 8px;
  background: #fbfbff;
  padding: 14px;
`;
const BarTrack = styled.div`
  height: 10px;
  overflow: hidden;
  border-radius: 999px;
  background: #f0f0ff;
`;
const BarFill = styled.div`
  height: 100%;
  width: ${({ $width }) => `${$width}%`};
  border-radius: inherit;
  background: ${({ $color }) => $color};
  transform-origin: left;
  animation: ${grow} 720ms cubic-bezier(0.2, 0.8, 0.2, 1) both;
`;
const ActivityItem = styled.div`
  position: relative;
  padding: 14px 14px 14px 34px;
  border: 1px solid #eaeaef;
  border-radius: 8px;
  background: #fbfbff;
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
    border-color: #c6f0f5;
    background: #f5fcfd;
    transform: translateX(2px);
  }
`;
const StyledTable = styled.table`
  width: 100%;
  min-width: 760px;
  border-collapse: separate;
  border-spacing: 0;

  th {
    position: sticky;
    top: 0;
    z-index: 1;
    padding: 12px 14px;
    border-bottom: 1px solid #dcdce4;
    background: #f6f6f9;
    text-align: left;
  }

  td {
    padding: 14px;
    border-bottom: 1px solid #f0f0ff;
    background: #ffffff;
  }

  tbody tr {
    transition: transform 160ms ease;
  }

  tbody tr:hover td {
    background: #fbfbff;
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
function ContentHealthBoard({ contentHealth }) {
  const summary = contentHealth.summary || {};
  const collections = contentHealth.collections || [];
  const maxIssueCount = collections.reduce((max, collection) => Math.max(max, collection.issueCount), 0);
  return /* @__PURE__ */ jsx(Panel, { children: /* @__PURE__ */ jsx(PanelInner, { children: /* @__PURE__ */ jsxs(Flex, { direction: "column", gap: 5, alignItems: "stretch", children: [
    /* @__PURE__ */ jsxs(Flex, { justifyContent: "space-between", gap: 3, alignItems: "center", wrap: "wrap", children: [
      /* @__PURE__ */ jsxs(Flex, { gap: 3, alignItems: "center", children: [
        /* @__PURE__ */ jsx(IconWell, { $tone: "#fff4e5", children: /* @__PURE__ */ jsx(WarningCircle, { fill: "#f29d41" }) }),
        /* @__PURE__ */ jsx(Typography, { variant: "delta", textColor: "neutral900", children: "Content Health" })
      ] }),
      /* @__PURE__ */ jsxs(Badge, { children: [
        formatNumber(summary.issueCount),
        " signals"
      ] })
    ] }),
    /* @__PURE__ */ jsxs(HealthBoardGrid, { children: [
      /* @__PURE__ */ jsxs(MediaStatGrid, { children: [
        /* @__PURE__ */ jsx(MediaStat, { children: /* @__PURE__ */ jsxs(Flex, { direction: "column", gap: 2, alignItems: "flex-start", children: [
          /* @__PURE__ */ jsx(Database, { fill: "#7b61ff" }),
          /* @__PURE__ */ jsx(Typography, { variant: "pi", textColor: "neutral600", fontWeight: "bold", children: "Empty collections" }),
          /* @__PURE__ */ jsx(Typography, { variant: "beta", textColor: "neutral900", children: formatNumber(summary.emptyCollections) })
        ] }) }),
        /* @__PURE__ */ jsx(MediaStat, { children: /* @__PURE__ */ jsxs(Flex, { direction: "column", gap: 2, alignItems: "flex-start", children: [
          /* @__PURE__ */ jsx(Clock, { fill: "#f29d41" }),
          /* @__PURE__ */ jsx(Typography, { variant: "pi", textColor: "neutral600", fontWeight: "bold", children: "Stale drafts" }),
          /* @__PURE__ */ jsx(Typography, { variant: "beta", textColor: "neutral900", children: formatNumber(summary.staleDrafts) })
        ] }) }),
        /* @__PURE__ */ jsx(MediaStat, { children: /* @__PURE__ */ jsxs(Flex, { direction: "column", gap: 2, alignItems: "flex-start", children: [
          /* @__PURE__ */ jsx(TrendUp, { fill: "#00a4bd" }),
          /* @__PURE__ */ jsx(Typography, { variant: "pi", textColor: "neutral600", fontWeight: "bold", children: "Old content" }),
          /* @__PURE__ */ jsx(Typography, { variant: "beta", textColor: "neutral900", children: formatNumber(summary.staleContent) })
        ] }) }),
        /* @__PURE__ */ jsx(MediaStat, { children: /* @__PURE__ */ jsxs(Flex, { direction: "column", gap: 2, alignItems: "flex-start", children: [
          /* @__PURE__ */ jsx(WarningCircle, { fill: "#d02b20" }),
          /* @__PURE__ */ jsx(Typography, { variant: "pi", textColor: "neutral600", fontWeight: "bold", children: "Required fields" }),
          /* @__PURE__ */ jsx(Typography, { variant: "beta", textColor: "neutral900", children: formatNumber(summary.missingRequiredFields) })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxs(Flex, { direction: "column", gap: 3, alignItems: "stretch", children: [
        /* @__PURE__ */ jsxs(Flex, { justifyContent: "space-between", gap: 3, alignItems: "center", children: [
          /* @__PURE__ */ jsx(Typography, { variant: "omega", textColor: "neutral900", fontWeight: "bold", children: "Collections to Review" }),
          /* @__PURE__ */ jsx(Badge, { children: collections.length })
        ] }),
        collections.length ? collections.map((collection, index) => /* @__PURE__ */ jsx(HealthIssue, { children: /* @__PURE__ */ jsxs(Flex, { direction: "column", gap: 3, alignItems: "stretch", children: [
          /* @__PURE__ */ jsxs(Flex, { justifyContent: "space-between", gap: 3, alignItems: "flex-start", children: [
            /* @__PURE__ */ jsxs(Flex, { direction: "column", gap: 1, alignItems: "flex-start", children: [
              /* @__PURE__ */ jsx(Typography, { variant: "omega", textColor: "neutral900", fontWeight: "bold", children: collection.displayName }),
              /* @__PURE__ */ jsx(Typography, { variant: "pi", textColor: "neutral600", children: collection.uid })
            ] }),
            /* @__PURE__ */ jsx(Badge, { children: formatNumber(collection.issueCount) })
          ] }),
          /* @__PURE__ */ jsx(BarTrack, { children: /* @__PURE__ */ jsx(BarFill, { $width: getPercent(collection.issueCount, maxIssueCount), $color: CHART_COLORS[index % CHART_COLORS.length] }) }),
          /* @__PURE__ */ jsxs(Flex, { gap: 2, wrap: "wrap", children: [
            collection.empty && /* @__PURE__ */ jsx(Badge, { children: "Empty" }),
            collection.staleDrafts > 0 && /* @__PURE__ */ jsxs(Badge, { children: [
              formatNumber(collection.staleDrafts),
              " stale drafts"
            ] }),
            collection.staleContent > 0 && /* @__PURE__ */ jsxs(Badge, { children: [
              formatNumber(collection.staleContent),
              " old entries"
            ] }),
            collection.missingRequiredFields > 0 && /* @__PURE__ */ jsxs(Badge, { children: [
              formatNumber(collection.missingRequiredFields),
              " missing required"
            ] })
          ] })
        ] }) }, collection.uid)) : /* @__PURE__ */ jsx(Typography, { variant: "omega", textColor: "neutral600", children: "No content health issues found." })
      ] })
    ] })
  ] }) }) });
}
function DonutChart({ draftCount, publishedCount }) {
  const total = draftCount + publishedCount;
  const draftAngle = total ? draftCount / total * 360 : 0;
  const publishedAngle = 360 - draftAngle;
  const draftPath = draftAngle ? describeArc(96, 70, 0, draftAngle) : "";
  const publishedPath = publishedAngle ? describeArc(96, 70, draftAngle, 360) : "";
  return /* @__PURE__ */ jsxs(Flex, { justifyContent: "space-between", alignItems: "center", gap: 4, wrap: "wrap", children: [
    /* @__PURE__ */ jsxs("svg", { width: "176", height: "176", viewBox: "0 0 192 192", role: "img", "aria-label": "Published and draft entries donut chart", children: [
      /* @__PURE__ */ jsx("circle", { cx: "96", cy: "96", r: "70", fill: "none", stroke: "#f0f0ff", strokeWidth: "22" }),
      publishedPath && /* @__PURE__ */ jsx("path", { d: publishedPath, fill: "none", stroke: "#2f6846", strokeWidth: "22", strokeLinecap: "round" }),
      draftPath && /* @__PURE__ */ jsx("path", { d: draftPath, fill: "none", stroke: "#f29d41", strokeWidth: "22", strokeLinecap: "round" }),
      /* @__PURE__ */ jsx("text", { x: "96", y: "91", textAnchor: "middle", fill: "#212134", fontSize: "24", fontWeight: "700", children: formatNumber(total) }),
      /* @__PURE__ */ jsx("text", { x: "96", y: "113", textAnchor: "middle", fill: "#666687", fontSize: "12", children: "entries" })
    ] }),
    /* @__PURE__ */ jsxs(Flex, { direction: "column", gap: 3, alignItems: "stretch", style: { minWidth: 180, flex: 1 }, children: [
      /* @__PURE__ */ jsxs(Flex, { justifyContent: "space-between", gap: 3, children: [
        /* @__PURE__ */ jsxs(Flex, { gap: 2, alignItems: "center", children: [
          /* @__PURE__ */ jsx(Box, { background: "success600", height: "0.8rem", width: "0.8rem", hasRadius: true }),
          /* @__PURE__ */ jsx(Typography, { variant: "omega", textColor: "neutral800", children: "Published" })
        ] }),
        /* @__PURE__ */ jsx(Typography, { variant: "omega", textColor: "neutral900", fontWeight: "bold", children: formatNumber(publishedCount) })
      ] }),
      /* @__PURE__ */ jsxs(Flex, { justifyContent: "space-between", gap: 3, children: [
        /* @__PURE__ */ jsxs(Flex, { gap: 2, alignItems: "center", children: [
          /* @__PURE__ */ jsx(Box, { background: "warning600", height: "0.8rem", width: "0.8rem", hasRadius: true }),
          /* @__PURE__ */ jsx(Typography, { variant: "omega", textColor: "neutral800", children: "Draft" })
        ] }),
        /* @__PURE__ */ jsx(Typography, { variant: "omega", textColor: "neutral900", fontWeight: "bold", children: formatNumber(draftCount) })
      ] })
    ] })
  ] });
}
function CollectionBars({ collections, max }) {
  return /* @__PURE__ */ jsx(Flex, { direction: "column", gap: 4, alignItems: "stretch", children: collections.map((collection, index) => {
    const width = getPercent(collection.total, max);
    return /* @__PURE__ */ jsxs(Flex, { direction: "column", gap: 2, alignItems: "stretch", children: [
      /* @__PURE__ */ jsxs(Flex, { justifyContent: "space-between", gap: 3, children: [
        /* @__PURE__ */ jsxs(Flex, { direction: "column", gap: 1, alignItems: "flex-start", children: [
          /* @__PURE__ */ jsx(Typography, { variant: "omega", textColor: "neutral800", fontWeight: "bold", children: collection.displayName }),
          /* @__PURE__ */ jsxs(Typography, { variant: "pi", textColor: "neutral600", children: [
            collection.createdLast30Days,
            " new in 30 days"
          ] })
        ] }),
        /* @__PURE__ */ jsx(Badge, { children: formatNumber(collection.total) })
      ] }),
      /* @__PURE__ */ jsx(BarTrack, { children: /* @__PURE__ */ jsx(BarFill, { $width: width, $color: CHART_COLORS[index % CHART_COLORS.length] }) })
    ] }, collection.uid);
  }) });
}
function GrowthChart({ collections }) {
  const values = collections.slice(0, 8).map((collection) => collection.createdLast30Days);
  const max = Math.max(...values, 1);
  const points = values.map((value, index) => {
    const x = 24 + index * (280 / Math.max(values.length - 1, 1));
    const y = 150 - value / max * 112;
    return `${x},${y}`;
  }).join(" ");
  return /* @__PURE__ */ jsxs(ChartWrap, { children: [
    /* @__PURE__ */ jsxs("svg", { width: "100%", height: "190", viewBox: "0 0 340 190", role: "img", "aria-label": "Content growth chart", children: [
      /* @__PURE__ */ jsx("defs", { children: /* @__PURE__ */ jsxs("linearGradient", { id: "growthFill", x1: "0", x2: "0", y1: "0", y2: "1", children: [
        /* @__PURE__ */ jsx("stop", { offset: "0%", stopColor: "#7b61ff", stopOpacity: "0.28" }),
        /* @__PURE__ */ jsx("stop", { offset: "100%", stopColor: "#7b61ff", stopOpacity: "0.02" })
      ] }) }),
      [38, 66, 94, 122, 150].map((y) => /* @__PURE__ */ jsx("line", { x1: "24", x2: "316", y1: y, y2: y, stroke: "#eaeaef" }, y)),
      points && /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx("polygon", { points: `24,150 ${points} 316,150`, fill: "url(#growthFill)" }),
        /* @__PURE__ */ jsx("polyline", { points, fill: "none", stroke: "#7b61ff", strokeWidth: "4", strokeLinecap: "round", strokeLinejoin: "round" }),
        points.split(" ").map((point, index) => {
          const [x, y] = point.split(",");
          return /* @__PURE__ */ jsx("circle", { cx: x, cy: y, r: index === values.length - 1 ? 5 : 4, fill: "#ffffff", stroke: "#7b61ff", strokeWidth: "3" }, point);
        })
      ] })
    ] }),
    /* @__PURE__ */ jsx(Flex, { justifyContent: "space-between", gap: 2, children: collections.slice(0, 4).map((collection) => /* @__PURE__ */ jsx(Badge, { children: collection.displayName }, collection.uid)) })
  ] });
}
function ContentSummaryBoards({ collections, maxCollectionCount, overview, topCollections }) {
  return /* @__PURE__ */ jsxs(ChartGrid, { children: [
    /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(Panel, { children: /* @__PURE__ */ jsx(PanelInner, { children: /* @__PURE__ */ jsxs(Flex, { direction: "column", gap: 4, alignItems: "stretch", children: [
      /* @__PURE__ */ jsxs(Flex, { justifyContent: "space-between", gap: 3, alignItems: "center", children: [
        /* @__PURE__ */ jsx(Typography, { variant: "delta", textColor: "neutral900", children: "Publishing Mix" }),
        /* @__PURE__ */ jsx(Badge, { children: formatNumber(overview.publishedEntries + overview.draftEntries) })
      ] }),
      /* @__PURE__ */ jsx(DonutChart, { draftCount: overview.draftEntries || 0, publishedCount: overview.publishedEntries || 0 })
    ] }) }) }) }),
    /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(Panel, { children: /* @__PURE__ */ jsx(PanelInner, { children: /* @__PURE__ */ jsxs(Flex, { direction: "column", gap: 4, alignItems: "stretch", children: [
      /* @__PURE__ */ jsxs(Flex, { justifyContent: "space-between", gap: 3, alignItems: "center", children: [
        /* @__PURE__ */ jsx(Typography, { variant: "delta", textColor: "neutral900", children: "Content Growth" }),
        /* @__PURE__ */ jsx(Badge, { children: "30 days" })
      ] }),
      /* @__PURE__ */ jsx(GrowthChart, { collections })
    ] }) }) }) }),
    /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(Panel, { children: /* @__PURE__ */ jsx(PanelInner, { children: /* @__PURE__ */ jsxs(Flex, { direction: "column", gap: 4, alignItems: "stretch", children: [
      /* @__PURE__ */ jsxs(Flex, { justifyContent: "space-between", gap: 3, alignItems: "center", children: [
        /* @__PURE__ */ jsx(Typography, { variant: "delta", textColor: "neutral900", children: "Top Collections" }),
        /* @__PURE__ */ jsx(Badge, { children: topCollections.length })
      ] }),
      topCollections.length ? /* @__PURE__ */ jsx(CollectionBars, { collections: topCollections, max: maxCollectionCount }) : /* @__PURE__ */ jsx(Typography, { variant: "omega", textColor: "neutral600", children: "No collections found." })
    ] }) }) }) })
  ] });
}
function DashboardHeader({ isLoading, onRefresh }) {
  return /* @__PURE__ */ jsx(Hero, { children: /* @__PURE__ */ jsxs(Flex, { justifyContent: "space-between", alignItems: "center", gap: 4, wrap: "wrap", children: [
    /* @__PURE__ */ jsxs(Flex, { gap: 4, alignItems: "center", children: [
      /* @__PURE__ */ jsx(IconWell, { $tone: "#ffffff", children: /* @__PURE__ */ jsx(PluginIcon, {}) }),
      /* @__PURE__ */ jsxs(Flex, { direction: "column", gap: 1, alignItems: "flex-start", children: [
        /* @__PURE__ */ jsx(Typography, { variant: "alpha", textColor: "neutral900", children: "Insights" }),
        /* @__PURE__ */ jsx(Typography, { variant: "omega", textColor: "neutral700", children: "Analytics, KPIs, and activity across your Strapi content." })
      ] }),
      /* @__PURE__ */ jsxs(Badge, { children: [
        "v",
        PLUGIN_VERSION
      ] })
    ] }),
    /* @__PURE__ */ jsx(Button, { startIcon: /* @__PURE__ */ jsx(ArrowClockwise, {}), variant: "secondary", onClick: onRefresh, disabled: isLoading, children: "Refresh" })
  ] }) });
}
function CollectionsTable({ collections, max }) {
  return /* @__PURE__ */ jsx(Box, { overflow: "auto", maxHeight: "34rem", children: /* @__PURE__ */ jsxs(StyledTable, { children: [
    /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsx("tr", { children: ["Collection", "Entries", "30 days", "Today", "Published", "Draft", "Share"].map((heading) => /* @__PURE__ */ jsx("th", { children: /* @__PURE__ */ jsx(Typography, { variant: "pi", textColor: "neutral600", fontWeight: "bold", children: heading }) }, heading)) }) }),
    /* @__PURE__ */ jsx("tbody", { children: collections.map((collection, index) => /* @__PURE__ */ jsxs("tr", { children: [
      /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsxs(Flex, { direction: "column", gap: 1, alignItems: "flex-start", children: [
        /* @__PURE__ */ jsx(Typography, { variant: "omega", textColor: "neutral800", fontWeight: "bold", children: collection.displayName }),
        /* @__PURE__ */ jsx(Typography, { variant: "pi", textColor: "neutral600", children: collection.uid })
      ] }) }),
      /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx(Typography, { children: formatNumber(collection.total) }) }),
      /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx(Typography, { children: formatNumber(collection.createdLast30Days) }) }),
      /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx(Typography, { children: formatNumber(collection.updatedToday) }) }),
      /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx(Typography, { children: collection.published === null ? "-" : formatNumber(collection.published) }) }),
      /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx(Typography, { children: collection.draft === null ? "-" : formatNumber(collection.draft) }) }),
      /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx(Box, { width: "8rem", children: /* @__PURE__ */ jsx(BarTrack, { children: /* @__PURE__ */ jsx(BarFill, { $width: getPercent(collection.total, max), $color: CHART_COLORS[index % CHART_COLORS.length] }) }) }) })
    ] }, collection.uid)) })
  ] }) });
}
function DetailBoards({ collections, maxCollectionCount, recentActivity }) {
  return /* @__PURE__ */ jsxs(DetailGrid, { children: [
    /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(Panel, { children: /* @__PURE__ */ jsx(PanelInner, { children: /* @__PURE__ */ jsxs(Flex, { direction: "column", gap: 4, alignItems: "stretch", children: [
      /* @__PURE__ */ jsxs(Flex, { justifyContent: "space-between", gap: 3, alignItems: "center", wrap: "wrap", children: [
        /* @__PURE__ */ jsx(Typography, { variant: "delta", textColor: "neutral900", children: "Collection KPIs" }),
        /* @__PURE__ */ jsxs(Badge, { children: [
          collections.length,
          " collections"
        ] })
      ] }),
      /* @__PURE__ */ jsx(CollectionsTable, { collections, max: maxCollectionCount })
    ] }) }) }) }),
    /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(Panel, { children: /* @__PURE__ */ jsx(PanelInner, { children: /* @__PURE__ */ jsxs(Flex, { direction: "column", gap: 4, alignItems: "stretch", children: [
      /* @__PURE__ */ jsxs(Flex, { justifyContent: "space-between", gap: 3, alignItems: "center", children: [
        /* @__PURE__ */ jsx(Typography, { variant: "delta", textColor: "neutral900", children: "Recent Activity" }),
        /* @__PURE__ */ jsx(Badge, { children: recentActivity.length })
      ] }),
      recentActivity.length ? /* @__PURE__ */ jsx(Flex, { direction: "column", gap: 3, alignItems: "stretch", children: recentActivity.map((activity) => /* @__PURE__ */ jsx(ActivityItem, { children: /* @__PURE__ */ jsxs(Flex, { direction: "column", gap: 1, alignItems: "flex-start", children: [
        /* @__PURE__ */ jsx(Typography, { variant: "omega", textColor: "neutral900", fontWeight: "bold", children: activity.collectionName }),
        /* @__PURE__ */ jsx(Typography, { variant: "pi", textColor: "neutral600", children: formatDate(activity.updatedAt) }),
        /* @__PURE__ */ jsx(Typography, { variant: "pi", textColor: "neutral500", children: activity.collectionUid })
      ] }) }, `${activity.collectionUid}-${activity.id}`)) }) : /* @__PURE__ */ jsx(Typography, { variant: "omega", textColor: "neutral600", children: "No recent activity found." })
    ] }) }) }) })
  ] });
}
function MediaFileList({ files, meta }) {
  if (!files.length) {
    return /* @__PURE__ */ jsx(Typography, { variant: "omega", textColor: "neutral600", children: "No media files found." });
  }
  return /* @__PURE__ */ jsx(Flex, { direction: "column", gap: 3, alignItems: "stretch", children: files.map((file) => /* @__PURE__ */ jsxs(Flex, { justifyContent: "space-between", gap: 4, alignItems: "center", children: [
    /* @__PURE__ */ jsxs(Flex, { gap: 3, alignItems: "center", style: { minWidth: 0 }, children: [
      /* @__PURE__ */ jsx(IconWell, { $tone: "#edf8f0", children: /* @__PURE__ */ jsx(File, { fill: "#2f6846" }) }),
      /* @__PURE__ */ jsxs(Flex, { direction: "column", gap: 1, alignItems: "flex-start", style: { minWidth: 0 }, children: [
        /* @__PURE__ */ jsx(Typography, { variant: "omega", textColor: "neutral900", fontWeight: "bold", ellipsis: true, children: file.name }),
        /* @__PURE__ */ jsx(Typography, { variant: "pi", textColor: "neutral600", children: file.mime })
      ] })
    ] }),
    /* @__PURE__ */ jsxs(Flex, { direction: "column", gap: 1, alignItems: "flex-end", children: [
      /* @__PURE__ */ jsx(Typography, { variant: "omega", textColor: "neutral800", fontWeight: "bold", children: formatStorage(file.size) }),
      /* @__PURE__ */ jsx(Typography, { variant: "pi", textColor: "neutral600", children: meta(file) })
    ] })
  ] }, file.id)) });
}
function MediaInsightsBoard({ media }) {
  const mimeGroups = media.mimeGroups || [];
  const maxMimeCount = mimeGroups.reduce((max, group) => Math.max(max, group.count), 0);
  return /* @__PURE__ */ jsx(Panel, { children: /* @__PURE__ */ jsx(PanelInner, { children: /* @__PURE__ */ jsxs(Flex, { direction: "column", gap: 5, alignItems: "stretch", children: [
    /* @__PURE__ */ jsxs(Flex, { justifyContent: "space-between", gap: 3, alignItems: "center", wrap: "wrap", children: [
      /* @__PURE__ */ jsxs(Flex, { gap: 3, alignItems: "center", children: [
        /* @__PURE__ */ jsx(IconWell, { $tone: "#e7f9fb", children: /* @__PURE__ */ jsx(Images, { fill: "#00a4bd" }) }),
        /* @__PURE__ */ jsx(Typography, { variant: "delta", textColor: "neutral900", children: "Media Insights" })
      ] }),
      /* @__PURE__ */ jsxs(Badge, { children: [
        formatNumber(media.totalFiles),
        " files"
      ] })
    ] }),
    /* @__PURE__ */ jsxs(MediaBoardGrid, { children: [
      /* @__PURE__ */ jsxs(Flex, { direction: "column", gap: 4, alignItems: "stretch", children: [
        /* @__PURE__ */ jsxs(MediaStatGrid, { children: [
          /* @__PURE__ */ jsx(MediaStat, { children: /* @__PURE__ */ jsxs(Flex, { direction: "column", gap: 2, alignItems: "flex-start", children: [
            /* @__PURE__ */ jsx(Server, { fill: "#7b61ff" }),
            /* @__PURE__ */ jsx(Typography, { variant: "pi", textColor: "neutral600", fontWeight: "bold", children: "Storage" }),
            /* @__PURE__ */ jsx(Typography, { variant: "beta", textColor: "neutral900", children: formatStorage(media.totalSize) })
          ] }) }),
          /* @__PURE__ */ jsx(MediaStat, { children: /* @__PURE__ */ jsxs(Flex, { direction: "column", gap: 2, alignItems: "flex-start", children: [
            /* @__PURE__ */ jsx(Images, { fill: "#00a4bd" }),
            /* @__PURE__ */ jsx(Typography, { variant: "pi", textColor: "neutral600", fontWeight: "bold", children: "Images" }),
            /* @__PURE__ */ jsx(Typography, { variant: "beta", textColor: "neutral900", children: formatNumber(media.imageFiles) })
          ] }) }),
          /* @__PURE__ */ jsx(MediaStat, { children: /* @__PURE__ */ jsxs(Flex, { direction: "column", gap: 2, alignItems: "flex-start", children: [
            /* @__PURE__ */ jsx(Upload, { fill: "#2f6846" }),
            /* @__PURE__ */ jsx(Typography, { variant: "pi", textColor: "neutral600", fontWeight: "bold", children: "New uploads" }),
            /* @__PURE__ */ jsx(Typography, { variant: "beta", textColor: "neutral900", children: formatNumber(media.uploadedLast30Days) })
          ] }) }),
          /* @__PURE__ */ jsx(MediaStat, { children: /* @__PURE__ */ jsxs(Flex, { direction: "column", gap: 2, alignItems: "flex-start", children: [
            /* @__PURE__ */ jsx(File, { fill: "#f29d41" }),
            /* @__PURE__ */ jsx(Typography, { variant: "pi", textColor: "neutral600", fontWeight: "bold", children: "Other files" }),
            /* @__PURE__ */ jsx(Typography, { variant: "beta", textColor: "neutral900", children: formatNumber(Math.max((media.totalFiles || 0) - (media.imageFiles || 0), 0)) })
          ] }) })
        ] }),
        /* @__PURE__ */ jsxs(Flex, { direction: "column", gap: 3, alignItems: "stretch", children: [
          /* @__PURE__ */ jsxs(Flex, { justifyContent: "space-between", gap: 3, children: [
            /* @__PURE__ */ jsx(Typography, { variant: "omega", textColor: "neutral900", fontWeight: "bold", children: "File Types" }),
            /* @__PURE__ */ jsx(Badge, { children: mimeGroups.length })
          ] }),
          mimeGroups.length ? mimeGroups.slice(0, 5).map((group, index) => /* @__PURE__ */ jsxs(Flex, { direction: "column", gap: 2, alignItems: "stretch", children: [
            /* @__PURE__ */ jsxs(Flex, { justifyContent: "space-between", gap: 3, children: [
              /* @__PURE__ */ jsx(Typography, { variant: "omega", textColor: "neutral800", children: formatMimeLabel(group.label) }),
              /* @__PURE__ */ jsx(Typography, { variant: "omega", textColor: "neutral900", fontWeight: "bold", children: formatNumber(group.count) })
            ] }),
            /* @__PURE__ */ jsx(BarTrack, { children: /* @__PURE__ */ jsx(BarFill, { $width: getPercent(group.count, maxMimeCount), $color: CHART_COLORS[index % CHART_COLORS.length] }) })
          ] }, group.label)) : /* @__PURE__ */ jsx(Typography, { variant: "omega", textColor: "neutral600", children: "No file type data found." })
        ] })
      ] }),
      /* @__PURE__ */ jsxs(Flex, { direction: "column", gap: 4, alignItems: "stretch", children: [
        /* @__PURE__ */ jsxs(Flex, { justifyContent: "space-between", gap: 3, alignItems: "center", children: [
          /* @__PURE__ */ jsx(Typography, { variant: "omega", textColor: "neutral900", fontWeight: "bold", children: "Largest Files" }),
          /* @__PURE__ */ jsx(Badge, { children: media.largestFiles?.length || 0 })
        ] }),
        /* @__PURE__ */ jsx(MediaFileList, { files: media.largestFiles || [], meta: (file) => formatDate(file.updatedAt) })
      ] }),
      /* @__PURE__ */ jsxs(Flex, { direction: "column", gap: 4, alignItems: "stretch", children: [
        /* @__PURE__ */ jsxs(Flex, { justifyContent: "space-between", gap: 3, alignItems: "center", children: [
          /* @__PURE__ */ jsx(Typography, { variant: "omega", textColor: "neutral900", fontWeight: "bold", children: "Recent Uploads" }),
          /* @__PURE__ */ jsx(Badge, { children: media.recentUploads?.length || 0 })
        ] }),
        /* @__PURE__ */ jsx(MediaFileList, { files: media.recentUploads || [], meta: (file) => formatDate(file.createdAt) })
      ] })
    ] })
  ] }) }) });
}
function KpiCard({ delay, helper, icon, label, tone, trend, value }) {
  const trendValues = trend?.length ? trend : [36, 58, 44, 70, 62, 86];
  return /* @__PURE__ */ jsx(KpiPanel, { $delay: delay, children: /* @__PURE__ */ jsxs(PanelInner, { children: [
    /* @__PURE__ */ jsxs(Flex, { justifyContent: "space-between", alignItems: "flex-start", gap: 3, children: [
      /* @__PURE__ */ jsx(IconWell, { $tone: tone, children: icon }),
      /* @__PURE__ */ jsx(MiniTrend, { "aria-hidden": true, children: trendValues.map((height, index) => /* @__PURE__ */ jsx(
        TrendColumn,
        {
          $color: index === trendValues.length - 1 ? "#7b61ff" : "#d9d8ff",
          $height: height
        },
        `${label}-${index}`
      )) })
    ] }),
    /* @__PURE__ */ jsxs(Box, { paddingTop: 4, children: [
      /* @__PURE__ */ jsx(Typography, { variant: "pi", textColor: "neutral600", fontWeight: "bold", children: label }),
      /* @__PURE__ */ jsx(Box, { paddingTop: 1, children: /* @__PURE__ */ jsx(Typography, { variant: "beta", textColor: "neutral900", children: value }) }),
      helper && /* @__PURE__ */ jsx(Box, { paddingTop: 1, children: /* @__PURE__ */ jsx(Typography, { variant: "pi", textColor: "neutral600", children: helper }) })
    ] })
  ] }) });
}
function OverviewKpis({ overview }) {
  return /* @__PURE__ */ jsxs(KpiGrid, { children: [
    /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
      KpiCard,
      {
        delay: 0,
        icon: /* @__PURE__ */ jsx(Database, { fill: "#7b61ff" }),
        label: "Collections",
        value: formatNumber(overview.totalCollections),
        helper: "Visible collection types",
        tone: "#f0eeff"
      }
    ) }),
    /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
      KpiCard,
      {
        delay: 60,
        icon: /* @__PURE__ */ jsx(Graph, { fill: "#00a4bd" }),
        label: "Entries",
        value: formatNumber(overview.totalEntries),
        helper: "Total records counted",
        tone: "#e7f9fb",
        trend: [30, 42, 48, 64, 78, 92]
      }
    ) }),
    /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
      KpiCard,
      {
        delay: 120,
        icon: /* @__PURE__ */ jsx(TrendUp, { fill: "#2f6846" }),
        label: "Created in 30 days",
        value: formatNumber(overview.createdLast30Days),
        helper: "Fresh content signal",
        tone: "#edf8f0",
        trend: [28, 50, 38, 76, 56, 82]
      }
    ) }),
    /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
      KpiCard,
      {
        delay: 180,
        icon: /* @__PURE__ */ jsx(ChartPie, { fill: "#f29d41" }),
        label: "Drafts",
        value: formatNumber(overview.draftEntries),
        helper: `${formatNumber(overview.publishedEntries)} published`,
        tone: "#fff4e5",
        trend: [62, 46, 58, 40, 54, 36]
      }
    ) })
  ] });
}
function useInsightsSummary() {
  const { get } = useFetchClient();
  const [summary, setSummary] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  async function fetchSummary() {
    try {
      setIsLoading(true);
      setError(null);
      const { data } = await get(`${PLUGIN_ID}/summary`);
      setSummary(data?.data || null);
    } catch (fetchError) {
      console.error(fetchError);
      setError(fetchError?.response?.data?.error?.message || "Failed to load insights.");
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    fetchSummary();
  }, []);
  return {
    error,
    fetchSummary,
    isLoading,
    summary
  };
}
const HomePage = () => {
  const { error, fetchSummary, isLoading, summary } = useInsightsSummary();
  const overview = summary?.overview || {};
  const collections = summary?.collections || [];
  const contentHealth = summary?.contentHealth || {};
  const media = summary?.media || {};
  const recentActivity = summary?.recentActivity || [];
  const maxCollectionCount = useMemo(
    () => collections.reduce((max, collection) => Math.max(max, collection.total), 0),
    [collections]
  );
  const topCollections = collections.slice(0, 6);
  return /* @__PURE__ */ jsx(Main, { padding: 6, background: "neutral100", children: /* @__PURE__ */ jsxs(PageShell, { children: [
    /* @__PURE__ */ jsx(DashboardHeader, { isLoading, onRefresh: fetchSummary }),
    error && /* @__PURE__ */ jsx(Box, { background: "danger100", borderColor: "danger200", hasRadius: true, padding: 4, children: /* @__PURE__ */ jsx(Typography, { variant: "omega", textColor: "danger700", children: error }) }),
    isLoading ? /* @__PURE__ */ jsx(Panel, { children: /* @__PURE__ */ jsx(PanelInner, { children: /* @__PURE__ */ jsx(Flex, { justifyContent: "center", padding: 8, children: /* @__PURE__ */ jsx(Loader, { children: "Loading insights" }) }) }) }) : /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(OverviewKpis, { overview }),
      /* @__PURE__ */ jsx(
        ContentSummaryBoards,
        {
          collections,
          maxCollectionCount,
          overview,
          topCollections
        }
      ),
      /* @__PURE__ */ jsx(ContentHealthBoard, { contentHealth }),
      /* @__PURE__ */ jsx(MediaInsightsBoard, { media }),
      /* @__PURE__ */ jsx(
        DetailBoards,
        {
          collections,
          maxCollectionCount,
          recentActivity
        }
      )
    ] })
  ] }) });
};
const App = () => /* @__PURE__ */ jsxs(Routes, { children: [
  /* @__PURE__ */ jsx(Route, { index: true, element: /* @__PURE__ */ jsx(HomePage, {}) }),
  /* @__PURE__ */ jsx(Route, { path: "*", element: /* @__PURE__ */ jsx(Page.Error, {}) })
] });
export {
  App
};
