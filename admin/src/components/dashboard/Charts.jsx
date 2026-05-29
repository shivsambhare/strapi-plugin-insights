import { Badge, Box, Flex, Typography } from '@strapi/design-system';

import { BarFill, BarTrack, ChartWrap } from '../../styles/dashboard';
import { CHART_COLORS, describeArc, getPercent } from '../../utils/chartHelpers';
import { formatNumber } from '../../utils/formatters';

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

export { CollectionBars, DonutChart, GrowthChart };
