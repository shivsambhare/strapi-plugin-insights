import { useEffect, useMemo, useState } from 'react';
import { Badge, Box, Button, Flex, Loader, Main, Typography } from '@strapi/design-system';
import { useFetchClient } from '@strapi/strapi/admin';
import { ArrowClockwise, ChartPie, Database, Graph, TrendUp } from '@strapi/icons';
import styled, { keyframes } from 'styled-components';

import { PluginIcon } from '../components/PluginIcon';
import { PLUGIN_ID } from '../pluginId';
import { PLUGIN_VERSION } from '../../../constants';

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

const CHART_COLORS = ['#7b61ff', '#00a4bd', '#f29d41', '#2f6846', '#d02b20', '#6c7781'];

function formatNumber(value) {
  return new Intl.NumberFormat().format(value || 0);
}

function formatDate(value) {
  if (!value) {
    return '-';
  }

  return new Intl.DateTimeFormat(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value));
}

function getPercent(value, max) {
  if (!max) {
    return 0;
  }

  return Math.max(5, Math.round((value / max) * 100));
}

function polarToCartesian(center, radius, angle) {
  const radians = ((angle - 90) * Math.PI) / 180;
  return {
    x: center + radius * Math.cos(radians),
    y: center + radius * Math.sin(radians),
  };
}

function describeArc(center, radius, startAngle, endAngle) {
  const start = polarToCartesian(center, radius, endAngle);
  const end = polarToCartesian(center, radius, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';

  return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`;
}

function KpiCard({ delay, helper, icon, label, tone, trend, value }) {
  const trendValues = trend?.length ? trend : [36, 58, 44, 70, 62, 86];

  return (
    <KpiPanel $delay={delay}>
      <PanelInner>
        <Flex justifyContent="space-between" alignItems="flex-start" gap={3}>
          <IconWell $tone={tone}>{icon}</IconWell>
          <MiniTrend aria-hidden>
            {trendValues.map((height, index) => (
              <TrendColumn
                key={`${label}-${index}`}
                $color={index === trendValues.length - 1 ? '#7b61ff' : '#d9d8ff'}
                $height={height}
              />
            ))}
          </MiniTrend>
        </Flex>
        <Box paddingTop={4}>
          <Typography variant="pi" textColor="neutral600" fontWeight="bold">
            {label}
          </Typography>
          <Box paddingTop={1}>
            <Typography variant="beta" textColor="neutral900">
              {value}
            </Typography>
          </Box>
          {helper && (
            <Box paddingTop={1}>
              <Typography variant="pi" textColor="neutral600">
                {helper}
              </Typography>
            </Box>
          )}
        </Box>
      </PanelInner>
    </KpiPanel>
  );
}

function DonutChart({ draftCount, publishedCount }) {
  const total = draftCount + publishedCount;
  const draftAngle = total ? (draftCount / total) * 360 : 0;
  const publishedAngle = 360 - draftAngle;
  const draftPath = draftAngle ? describeArc(96, 70, 0, draftAngle) : '';
  const publishedPath = publishedAngle ? describeArc(96, 70, draftAngle, 360) : '';

  return (
    <Flex justifyContent="space-between" alignItems="center" gap={4} wrap="wrap">
      <svg width="176" height="176" viewBox="0 0 192 192" role="img" aria-label="Published and draft entries donut chart">
        <circle cx="96" cy="96" r="70" fill="none" stroke="#f0f0ff" strokeWidth="22" />
        {publishedPath && <path d={publishedPath} fill="none" stroke="#2f6846" strokeWidth="22" strokeLinecap="round" />}
        {draftPath && <path d={draftPath} fill="none" stroke="#f29d41" strokeWidth="22" strokeLinecap="round" />}
        <text x="96" y="91" textAnchor="middle" fill="#212134" fontSize="24" fontWeight="700">
          {formatNumber(total)}
        </text>
        <text x="96" y="113" textAnchor="middle" fill="#666687" fontSize="12">
          entries
        </text>
      </svg>

      <Flex direction="column" gap={3} alignItems="stretch" style={{ minWidth: 180, flex: 1 }}>
        <Flex justifyContent="space-between" gap={3}>
          <Flex gap={2} alignItems="center">
            <Box background="success600" height="0.8rem" width="0.8rem" hasRadius />
            <Typography variant="omega" textColor="neutral800">
              Published
            </Typography>
          </Flex>
          <Typography variant="omega" textColor="neutral900" fontWeight="bold">
            {formatNumber(publishedCount)}
          </Typography>
        </Flex>
        <Flex justifyContent="space-between" gap={3}>
          <Flex gap={2} alignItems="center">
            <Box background="warning600" height="0.8rem" width="0.8rem" hasRadius />
            <Typography variant="omega" textColor="neutral800">
              Draft
            </Typography>
          </Flex>
          <Typography variant="omega" textColor="neutral900" fontWeight="bold">
            {formatNumber(draftCount)}
          </Typography>
        </Flex>
      </Flex>
    </Flex>
  );
}

function CollectionBars({ collections, max }) {
  return (
    <Flex direction="column" gap={4} alignItems="stretch">
      {collections.map((collection, index) => {
        const width = getPercent(collection.total, max);

        return (
          <Flex key={collection.uid} direction="column" gap={2} alignItems="stretch">
            <Flex justifyContent="space-between" gap={3}>
              <Flex direction="column" gap={1} alignItems="flex-start">
                <Typography variant="omega" textColor="neutral800" fontWeight="bold">
                  {collection.displayName}
                </Typography>
                <Typography variant="pi" textColor="neutral600">
                  {collection.createdLast30Days} new in 30 days
                </Typography>
              </Flex>
              <Badge>{formatNumber(collection.total)}</Badge>
            </Flex>
            <BarTrack>
              <BarFill $width={width} $color={CHART_COLORS[index % CHART_COLORS.length]} />
            </BarTrack>
          </Flex>
        );
      })}
    </Flex>
  );
}

function GrowthChart({ collections }) {
  const values = collections.slice(0, 8).map((collection) => collection.createdLast30Days);
  const max = Math.max(...values, 1);
  const points = values
    .map((value, index) => {
      const x = 24 + index * (280 / Math.max(values.length - 1, 1));
      const y = 150 - (value / max) * 112;
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <ChartWrap>
      <svg width="100%" height="190" viewBox="0 0 340 190" role="img" aria-label="Content growth chart">
        <defs>
          <linearGradient id="growthFill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#7b61ff" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#7b61ff" stopOpacity="0.02" />
          </linearGradient>
        </defs>
        {[38, 66, 94, 122, 150].map((y) => (
          <line key={y} x1="24" x2="316" y1={y} y2={y} stroke="#eaeaef" />
        ))}
        {points && (
          <>
            <polygon points={`24,150 ${points} 316,150`} fill="url(#growthFill)" />
            <polyline points={points} fill="none" stroke="#7b61ff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            {points.split(' ').map((point, index) => {
              const [x, y] = point.split(',');
              return <circle key={point} cx={x} cy={y} r={index === values.length - 1 ? 5 : 4} fill="#ffffff" stroke="#7b61ff" strokeWidth="3" />;
            })}
          </>
        )}
      </svg>
      <Flex justifyContent="space-between" gap={2}>
        {collections.slice(0, 4).map((collection) => (
          <Badge key={collection.uid}>{collection.displayName}</Badge>
        ))}
      </Flex>
    </ChartWrap>
  );
}

function CollectionsTable({ collections, max }) {
  return (
    <Box overflow="auto" maxHeight="34rem">
      <StyledTable>
        <thead>
          <tr>
            {['Collection', 'Entries', '30 days', 'Today', 'Published', 'Draft', 'Share'].map((heading) => (
              <th key={heading}>
                <Typography variant="pi" textColor="neutral600" fontWeight="bold">
                  {heading}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {collections.map((collection, index) => (
            <tr key={collection.uid}>
              <td>
                <Flex direction="column" gap={1} alignItems="flex-start">
                  <Typography variant="omega" textColor="neutral800" fontWeight="bold">
                    {collection.displayName}
                  </Typography>
                  <Typography variant="pi" textColor="neutral600">
                    {collection.uid}
                  </Typography>
                </Flex>
              </td>
              <td>
                <Typography>{formatNumber(collection.total)}</Typography>
              </td>
              <td>
                <Typography>{formatNumber(collection.createdLast30Days)}</Typography>
              </td>
              <td>
                <Typography>{formatNumber(collection.updatedToday)}</Typography>
              </td>
              <td>
                <Typography>{collection.published === null ? '-' : formatNumber(collection.published)}</Typography>
              </td>
              <td>
                <Typography>{collection.draft === null ? '-' : formatNumber(collection.draft)}</Typography>
              </td>
              <td>
                <Box width="8rem">
                  <BarTrack>
                    <BarFill $width={getPercent(collection.total, max)} $color={CHART_COLORS[index % CHART_COLORS.length]} />
                  </BarTrack>
                </Box>
              </td>
            </tr>
          ))}
        </tbody>
      </StyledTable>
    </Box>
  );
}

const HomePage = () => {
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
      setError(fetchError?.response?.data?.error?.message || 'Failed to load insights.');
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchSummary();
  }, []);

  const overview = summary?.overview || {};
  const collections = summary?.collections || [];
  const recentActivity = summary?.recentActivity || [];
  const maxCollectionCount = useMemo(
    () => collections.reduce((max, collection) => Math.max(max, collection.total), 0),
    [collections]
  );
  const topCollections = collections.slice(0, 6);

  return (
    <Main padding={6} background="neutral100">
      <PageShell>
        <Hero>
          <Flex justifyContent="space-between" alignItems="center" gap={4} wrap="wrap">
            <Flex gap={4} alignItems="center">
              <IconWell $tone="#ffffff">
                <PluginIcon />
              </IconWell>
              <Flex direction="column" gap={1} alignItems="flex-start">
                <Typography variant="alpha" textColor="neutral900">
                  Insights
                </Typography>
                <Typography variant="omega" textColor="neutral700">
                  Analytics, KPIs, and activity across your Strapi content.
                </Typography>
              </Flex>
              <Badge>v{PLUGIN_VERSION}</Badge>
            </Flex>

            <Button startIcon={<ArrowClockwise />} variant="secondary" onClick={fetchSummary} disabled={isLoading}>
              Refresh
            </Button>
          </Flex>
        </Hero>

        {error && (
          <Box background="danger100" borderColor="danger200" hasRadius padding={4}>
            <Typography variant="omega" textColor="danger700">
              {error}
            </Typography>
          </Box>
        )}

        {isLoading ? (
          <Panel>
            <PanelInner>
              <Flex justifyContent="center" padding={8}>
                <Loader>Loading insights</Loader>
              </Flex>
            </PanelInner>
          </Panel>
        ) : (
          <>
            <KpiGrid>
              <div>
                <KpiCard
                  delay={0}
                  icon={<Database fill="#7b61ff" />}
                  label="Collections"
                  value={formatNumber(overview.totalCollections)}
                  helper="Visible collection types"
                  tone="#f0eeff"
                />
              </div>
              <div>
                <KpiCard
                  delay={60}
                  icon={<Graph fill="#00a4bd" />}
                  label="Entries"
                  value={formatNumber(overview.totalEntries)}
                  helper="Total records counted"
                  tone="#e7f9fb"
                  trend={[30, 42, 48, 64, 78, 92]}
                />
              </div>
              <div>
                <KpiCard
                  delay={120}
                  icon={<TrendUp fill="#2f6846" />}
                  label="Created in 30 days"
                  value={formatNumber(overview.createdLast30Days)}
                  helper="Fresh content signal"
                  tone="#edf8f0"
                  trend={[28, 50, 38, 76, 56, 82]}
                />
              </div>
              <div>
                <KpiCard
                  delay={180}
                  icon={<ChartPie fill="#f29d41" />}
                  label="Drafts"
                  value={formatNumber(overview.draftEntries)}
                  helper={`${formatNumber(overview.publishedEntries)} published`}
                  tone="#fff4e5"
                  trend={[62, 46, 58, 40, 54, 36]}
                />
              </div>
            </KpiGrid>

            <ChartGrid>
              <div>
                <Panel>
                  <PanelInner>
                    <Flex direction="column" gap={4} alignItems="stretch">
                      <Flex justifyContent="space-between" gap={3} alignItems="center">
                        <Typography variant="delta" textColor="neutral900">
                          Publishing Mix
                        </Typography>
                        <Badge>{formatNumber(overview.publishedEntries + overview.draftEntries)}</Badge>
                      </Flex>
                      <DonutChart draftCount={overview.draftEntries || 0} publishedCount={overview.publishedEntries || 0} />
                    </Flex>
                  </PanelInner>
                </Panel>
              </div>

              <div>
                <Panel>
                  <PanelInner>
                    <Flex direction="column" gap={4} alignItems="stretch">
                      <Flex justifyContent="space-between" gap={3} alignItems="center">
                        <Typography variant="delta" textColor="neutral900">
                          Content Growth
                        </Typography>
                        <Badge>30 days</Badge>
                      </Flex>
                      <GrowthChart collections={collections} />
                    </Flex>
                  </PanelInner>
                </Panel>
              </div>

              <div>
                <Panel>
                  <PanelInner>
                    <Flex direction="column" gap={4} alignItems="stretch">
                      <Flex justifyContent="space-between" gap={3} alignItems="center">
                        <Typography variant="delta" textColor="neutral900">
                          Top Collections
                        </Typography>
                        <Badge>{topCollections.length}</Badge>
                      </Flex>
                      {topCollections.length ? (
                        <CollectionBars collections={topCollections} max={maxCollectionCount} />
                      ) : (
                        <Typography variant="omega" textColor="neutral600">
                          No collections found.
                        </Typography>
                      )}
                    </Flex>
                  </PanelInner>
                </Panel>
              </div>
            </ChartGrid>

            <DetailGrid>
              <div>
                <Panel>
                  <PanelInner>
                    <Flex direction="column" gap={4} alignItems="stretch">
                      <Flex justifyContent="space-between" gap={3} alignItems="center" wrap="wrap">
                        <Typography variant="delta" textColor="neutral900">
                          Collection KPIs
                        </Typography>
                        <Badge>{collections.length} collections</Badge>
                      </Flex>
                      <CollectionsTable collections={collections} max={maxCollectionCount} />
                    </Flex>
                  </PanelInner>
                </Panel>
              </div>

              <div>
                <Panel>
                  <PanelInner>
                    <Flex direction="column" gap={4} alignItems="stretch">
                      <Flex justifyContent="space-between" gap={3} alignItems="center">
                        <Typography variant="delta" textColor="neutral900">
                          Recent Activity
                        </Typography>
                        <Badge>{recentActivity.length}</Badge>
                      </Flex>
                      {recentActivity.length ? (
                        <Flex direction="column" gap={3} alignItems="stretch">
                          {recentActivity.map((activity) => (
                            <ActivityItem key={`${activity.collectionUid}-${activity.id}`}>
                              <Flex direction="column" gap={1} alignItems="flex-start">
                                <Typography variant="omega" textColor="neutral900" fontWeight="bold">
                                  {activity.collectionName}
                                </Typography>
                                <Typography variant="pi" textColor="neutral600">
                                  {formatDate(activity.updatedAt)}
                                </Typography>
                                <Typography variant="pi" textColor="neutral500">
                                  {activity.collectionUid}
                                </Typography>
                              </Flex>
                            </ActivityItem>
                          ))}
                        </Flex>
                      ) : (
                        <Typography variant="omega" textColor="neutral600">
                          No recent activity found.
                        </Typography>
                      )}
                    </Flex>
                  </PanelInner>
                </Panel>
              </div>
            </DetailGrid>
          </>
        )}
      </PageShell>
    </Main>
  );
};

export { HomePage };
