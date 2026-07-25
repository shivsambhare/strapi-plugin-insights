import styled, { keyframes } from 'styled-components';

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

const Panel = styled.div`
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
  background: var(--strapi-colors-neutral100);
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

const HealthSummaryGrid = styled.div`
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

const HealthIssue = styled.div`
  border: 1px solid var(--strapi-colors-neutral150);
  border-radius: 8px;
  background: var(--strapi-colors-neutral100);
  padding: 14px;
`;

const ScrollArea = styled.div`
  max-height: ${({ $maxHeight = '34rem' }) => $maxHeight};
  min-height: 0;
  overflow: auto;
  padding-right: 4px;
`;

const BarTrack = styled.div`
  height: 10px;
  overflow: hidden;
  border-radius: 999px;
  background: var(--strapi-colors-neutral150);
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

export {
  ActivityItem,
  BarFill,
  BarTrack,
  ChartGrid,
  ChartWrap,
  DetailGrid,
  HealthBoardGrid,
  HealthIssue,
  HealthSummaryGrid,
  Hero,
  IconWell,
  KpiGrid,
  KpiPanel,
  MediaBoardGrid,
  MediaStat,
  MediaStatGrid,
  MiniTrend,
  PageShell,
  Panel,
  PanelInner,
  ScrollArea,
  StyledTable,
  TrendColumn,
};
