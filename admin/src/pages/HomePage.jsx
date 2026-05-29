import { useMemo } from 'react';
import { Box, Flex, Loader, Main, Typography } from '@strapi/design-system';

import { ContentHealthBoard } from '../components/dashboard/ContentHealthBoard';
import { ContentSummaryBoards } from '../components/dashboard/ContentSummaryBoards';
import { DashboardHeader } from '../components/dashboard/DashboardHeader';
import { DetailBoards } from '../components/dashboard/DetailBoards';
import { MediaInsightsBoard } from '../components/dashboard/MediaInsightsBoard';
import { OverviewKpis } from '../components/dashboard/OverviewKpis';
import { useInsightsSummary } from '../hooks/useInsightsSummary';
import { PageShell, Panel, PanelInner } from '../styles/dashboard';

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

  return (
    <Main padding={6} background="neutral100">
      <PageShell>
        <DashboardHeader isLoading={isLoading} onRefresh={fetchSummary} />

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
            <OverviewKpis overview={overview} />
            <ContentSummaryBoards
              collections={collections}
              maxCollectionCount={maxCollectionCount}
              overview={overview}
              topCollections={topCollections}
            />
            <ContentHealthBoard contentHealth={contentHealth} />
            <MediaInsightsBoard media={media} />
            <DetailBoards
              collections={collections}
              maxCollectionCount={maxCollectionCount}
              recentActivity={recentActivity}
            />
          </>
        )}
      </PageShell>
    </Main>
  );
};

export { HomePage };
