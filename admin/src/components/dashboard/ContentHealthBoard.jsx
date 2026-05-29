import { Badge, Flex, Typography } from '@strapi/design-system';
import { Clock, Database, TrendUp, WarningCircle } from '@strapi/icons';

import {
  BarFill,
  BarTrack,
  HealthBoardGrid,
  HealthIssue,
  IconWell,
  MediaStat,
  MediaStatGrid,
  Panel,
  PanelInner,
} from '../../styles/dashboard';
import { CHART_COLORS, getPercent } from '../../utils/chartHelpers';
import { formatNumber } from '../../utils/formatters';

function ContentHealthBoard({ contentHealth }) {
  const summary = contentHealth.summary || {};
  const collections = contentHealth.collections || [];
  const maxIssueCount = collections.reduce((max, collection) => Math.max(max, collection.issueCount), 0);

  return (
    <Panel>
      <PanelInner>
        <Flex direction="column" gap={5} alignItems="stretch">
          <Flex justifyContent="space-between" gap={3} alignItems="center" wrap="wrap">
            <Flex gap={3} alignItems="center">
              <IconWell $tone="#fff4e5">
                <WarningCircle fill="#f29d41" />
              </IconWell>
              <Typography variant="delta" textColor="neutral900">
                Content Health
              </Typography>
            </Flex>
            <Badge>{formatNumber(summary.issueCount)} signals</Badge>
          </Flex>

          <HealthBoardGrid>
            <MediaStatGrid>
              <MediaStat>
                <Flex direction="column" gap={2} alignItems="flex-start">
                  <Database fill="#7b61ff" />
                  <Typography variant="pi" textColor="neutral600" fontWeight="bold">
                    Empty collections
                  </Typography>
                  <Typography variant="beta" textColor="neutral900">
                    {formatNumber(summary.emptyCollections)}
                  </Typography>
                </Flex>
              </MediaStat>
              <MediaStat>
                <Flex direction="column" gap={2} alignItems="flex-start">
                  <Clock fill="#f29d41" />
                  <Typography variant="pi" textColor="neutral600" fontWeight="bold">
                    Stale drafts
                  </Typography>
                  <Typography variant="beta" textColor="neutral900">
                    {formatNumber(summary.staleDrafts)}
                  </Typography>
                </Flex>
              </MediaStat>
              <MediaStat>
                <Flex direction="column" gap={2} alignItems="flex-start">
                  <TrendUp fill="#00a4bd" />
                  <Typography variant="pi" textColor="neutral600" fontWeight="bold">
                    Old content
                  </Typography>
                  <Typography variant="beta" textColor="neutral900">
                    {formatNumber(summary.staleContent)}
                  </Typography>
                </Flex>
              </MediaStat>
              <MediaStat>
                <Flex direction="column" gap={2} alignItems="flex-start">
                  <WarningCircle fill="#d02b20" />
                  <Typography variant="pi" textColor="neutral600" fontWeight="bold">
                    Required fields
                  </Typography>
                  <Typography variant="beta" textColor="neutral900">
                    {formatNumber(summary.missingRequiredFields)}
                  </Typography>
                </Flex>
              </MediaStat>
            </MediaStatGrid>

            <Flex direction="column" gap={3} alignItems="stretch">
              <Flex justifyContent="space-between" gap={3} alignItems="center">
                <Typography variant="omega" textColor="neutral900" fontWeight="bold">
                  Collections to Review
                </Typography>
                <Badge>{collections.length}</Badge>
              </Flex>

              {collections.length ? (
                collections.map((collection, index) => (
                  <HealthIssue key={collection.uid}>
                    <Flex direction="column" gap={3} alignItems="stretch">
                      <Flex justifyContent="space-between" gap={3} alignItems="flex-start">
                        <Flex direction="column" gap={1} alignItems="flex-start">
                          <Typography variant="omega" textColor="neutral900" fontWeight="bold">
                            {collection.displayName}
                          </Typography>
                          <Typography variant="pi" textColor="neutral600">
                            {collection.uid}
                          </Typography>
                        </Flex>
                        <Badge>{formatNumber(collection.issueCount)}</Badge>
                      </Flex>
                      <BarTrack>
                        <BarFill $width={getPercent(collection.issueCount, maxIssueCount)} $color={CHART_COLORS[index % CHART_COLORS.length]} />
                      </BarTrack>
                      <Flex gap={2} wrap="wrap">
                        {collection.empty && <Badge>Empty</Badge>}
                        {collection.staleDrafts > 0 && <Badge>{formatNumber(collection.staleDrafts)} stale drafts</Badge>}
                        {collection.staleContent > 0 && <Badge>{formatNumber(collection.staleContent)} old entries</Badge>}
                        {collection.missingRequiredFields > 0 && (
                          <Badge>{formatNumber(collection.missingRequiredFields)} missing required</Badge>
                        )}
                      </Flex>
                    </Flex>
                  </HealthIssue>
                ))
              ) : (
                <Typography variant="omega" textColor="neutral600">
                  No content health issues found.
                </Typography>
              )}
            </Flex>
          </HealthBoardGrid>
        </Flex>
      </PanelInner>
    </Panel>
  );
}

export { ContentHealthBoard };
