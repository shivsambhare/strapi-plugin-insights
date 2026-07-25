import { Badge, Flex, Typography } from '@strapi/design-system';

import { ChartGrid, Panel, PanelInner } from '../../styles/dashboard';
import { formatNumber, formatRangeLabel } from '../../utils/formatters';
import { CollectionBars, DonutChart, GrowthChart } from './Charts';

function ContentSummaryBoards({ collections, growthSeries, maxCollectionCount, overview, range, topCollections }) {
  return (
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
                <Badge>{formatRangeLabel(range)}</Badge>
              </Flex>
              <GrowthChart series={growthSeries} />
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
                <CollectionBars collections={topCollections} max={maxCollectionCount} range={range} />
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
  );
}

export { ContentSummaryBoards };
