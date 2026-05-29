import { Badge, Flex, Typography } from '@strapi/design-system';

import { ActivityItem, DetailGrid, Panel, PanelInner } from '../../styles/dashboard';
import { formatDate } from '../../utils/formatters';
import { CollectionsTable } from './CollectionsTable';

function DetailBoards({ collections, maxCollectionCount, recentActivity }) {
  return (
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
  );
}

export { DetailBoards };
