import { Box, Flex, Typography } from '@strapi/design-system';

import { IconWell, KpiPanel, MiniTrend, PanelInner, TrendColumn } from '../../styles/dashboard';

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

export { KpiCard };
