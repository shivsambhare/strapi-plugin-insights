import { Badge, Flex, Typography } from '@strapi/design-system';
import { File, Images, Server, Upload } from '@strapi/icons';

import {
  BarFill,
  BarTrack,
  IconWell,
  MediaBoardGrid,
  MediaStat,
  MediaStatGrid,
  Panel,
  PanelInner,
} from '../../styles/dashboard';
import { CHART_COLORS, getPercent } from '../../utils/chartHelpers';
import { formatDate, formatMimeLabel, formatNumber, formatStorage } from '../../utils/formatters';

function MediaFileList({ files, meta }) {
  if (!files.length) {
    return (
      <Typography variant="omega" textColor="neutral600">
        No media files found.
      </Typography>
    );
  }

  return (
    <Flex direction="column" gap={3} alignItems="stretch">
      {files.map((file) => (
        <Flex key={file.id} justifyContent="space-between" gap={4} alignItems="center">
          <Flex gap={3} alignItems="center" style={{ minWidth: 0 }}>
            <IconWell $tone="#edf8f0">
              <File fill="#2f6846" />
            </IconWell>
            <Flex direction="column" gap={1} alignItems="flex-start" style={{ minWidth: 0 }}>
              <Typography variant="omega" textColor="neutral900" fontWeight="bold" ellipsis>
                {file.name}
              </Typography>
              <Typography variant="pi" textColor="neutral600">
                {file.mime}
              </Typography>
            </Flex>
          </Flex>
          <Flex direction="column" gap={1} alignItems="flex-end">
            <Typography variant="omega" textColor="neutral800" fontWeight="bold">
              {formatStorage(file.size)}
            </Typography>
            <Typography variant="pi" textColor="neutral600">
              {meta(file)}
            </Typography>
          </Flex>
        </Flex>
      ))}
    </Flex>
  );
}

function MediaInsightsBoard({ media }) {
  const mimeGroups = media.mimeGroups || [];
  const maxMimeCount = mimeGroups.reduce((max, group) => Math.max(max, group.count), 0);

  return (
    <Panel>
      <PanelInner>
        <Flex direction="column" gap={5} alignItems="stretch">
          <Flex justifyContent="space-between" gap={3} alignItems="center" wrap="wrap">
            <Flex gap={3} alignItems="center">
              <IconWell $tone="#e7f9fb">
                <Images fill="#00a4bd" />
              </IconWell>
              <Typography variant="delta" textColor="neutral900">
                Media Insights
              </Typography>
            </Flex>
            <Badge>{formatNumber(media.totalFiles)} files</Badge>
          </Flex>

          <MediaBoardGrid>
            <Flex direction="column" gap={4} alignItems="stretch">
              <MediaStatGrid>
                <MediaStat>
                  <Flex direction="column" gap={2} alignItems="flex-start">
                    <Server fill="#7b61ff" />
                    <Typography variant="pi" textColor="neutral600" fontWeight="bold">
                      Storage
                    </Typography>
                    <Typography variant="beta" textColor="neutral900">
                      {formatStorage(media.totalSize)}
                    </Typography>
                  </Flex>
                </MediaStat>
                <MediaStat>
                  <Flex direction="column" gap={2} alignItems="flex-start">
                    <Images fill="#00a4bd" />
                    <Typography variant="pi" textColor="neutral600" fontWeight="bold">
                      Images
                    </Typography>
                    <Typography variant="beta" textColor="neutral900">
                      {formatNumber(media.imageFiles)}
                    </Typography>
                  </Flex>
                </MediaStat>
                <MediaStat>
                  <Flex direction="column" gap={2} alignItems="flex-start">
                    <Upload fill="#2f6846" />
                    <Typography variant="pi" textColor="neutral600" fontWeight="bold">
                      New uploads
                    </Typography>
                    <Typography variant="beta" textColor="neutral900">
                      {formatNumber(media.uploadedLast30Days)}
                    </Typography>
                  </Flex>
                </MediaStat>
                <MediaStat>
                  <Flex direction="column" gap={2} alignItems="flex-start">
                    <File fill="#f29d41" />
                    <Typography variant="pi" textColor="neutral600" fontWeight="bold">
                      Other files
                    </Typography>
                    <Typography variant="beta" textColor="neutral900">
                      {formatNumber(Math.max((media.totalFiles || 0) - (media.imageFiles || 0), 0))}
                    </Typography>
                  </Flex>
                </MediaStat>
              </MediaStatGrid>

              <Flex direction="column" gap={3} alignItems="stretch">
                <Flex justifyContent="space-between" gap={3}>
                  <Typography variant="omega" textColor="neutral900" fontWeight="bold">
                    File Types
                  </Typography>
                  <Badge>{mimeGroups.length}</Badge>
                </Flex>
                {mimeGroups.length ? (
                  mimeGroups.slice(0, 5).map((group, index) => (
                    <Flex key={group.label} direction="column" gap={2} alignItems="stretch">
                      <Flex justifyContent="space-between" gap={3}>
                        <Typography variant="omega" textColor="neutral800">
                          {formatMimeLabel(group.label)}
                        </Typography>
                        <Typography variant="omega" textColor="neutral900" fontWeight="bold">
                          {formatNumber(group.count)}
                        </Typography>
                      </Flex>
                      <BarTrack>
                        <BarFill $width={getPercent(group.count, maxMimeCount)} $color={CHART_COLORS[index % CHART_COLORS.length]} />
                      </BarTrack>
                    </Flex>
                  ))
                ) : (
                  <Typography variant="omega" textColor="neutral600">
                    No file type data found.
                  </Typography>
                )}
              </Flex>
            </Flex>

            <Flex direction="column" gap={4} alignItems="stretch">
              <Flex justifyContent="space-between" gap={3} alignItems="center">
                <Typography variant="omega" textColor="neutral900" fontWeight="bold">
                  Largest Files
                </Typography>
                <Badge>{media.largestFiles?.length || 0}</Badge>
              </Flex>
              <MediaFileList files={media.largestFiles || []} meta={(file) => formatDate(file.updatedAt)} />
            </Flex>

            <Flex direction="column" gap={4} alignItems="stretch">
              <Flex justifyContent="space-between" gap={3} alignItems="center">
                <Typography variant="omega" textColor="neutral900" fontWeight="bold">
                  Recent Uploads
                </Typography>
                <Badge>{media.recentUploads?.length || 0}</Badge>
              </Flex>
              <MediaFileList files={media.recentUploads || []} meta={(file) => formatDate(file.createdAt)} />
            </Flex>
          </MediaBoardGrid>
        </Flex>
      </PanelInner>
    </Panel>
  );
}

export { MediaInsightsBoard };
