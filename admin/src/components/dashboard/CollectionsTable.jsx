import { Box, Flex, Typography } from '@strapi/design-system';

import { BarFill, BarTrack, StyledTable } from '../../styles/dashboard';
import { CHART_COLORS, getPercent } from '../../utils/chartHelpers';
import { formatNumber } from '../../utils/formatters';

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

export { CollectionsTable };
