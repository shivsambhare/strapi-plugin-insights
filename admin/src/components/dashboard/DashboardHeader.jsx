import { Badge, Button, Flex, SingleSelect, SingleSelectOption, Typography } from '@strapi/design-system';
import { ArrowClockwise, Download } from '@strapi/icons';

import { PLUGIN_VERSION, RANGE_OPTIONS } from '../../../../constants';
import { PluginIcon } from '../PluginIcon';
import { Hero, IconWell } from '../../styles/dashboard';

function DashboardHeader({ isExporting, isLoading, onExport, onRangeChange, onRefresh, rangeKey, rangeLabel }) {
  return (
    <Hero>
      <Flex justifyContent="space-between" alignItems="center" gap={4} wrap="wrap">
        <Flex gap={4} alignItems="center">
          <IconWell $tone="var(--strapi-colors-neutral100)">
            <PluginIcon />
          </IconWell>
          <Flex direction="column" gap={1} alignItems="flex-start">
            <Typography variant="alpha" textColor="neutral800">
              Insights
            </Typography>
            <Typography variant="omega" textColor="neutral700">
              Analytics, KPIs, and activity across your Strapi content for {rangeLabel.toLowerCase()}.
            </Typography>
          </Flex>
          <Badge>v{PLUGIN_VERSION}</Badge>
        </Flex>

        <Flex gap={3} alignItems="center" wrap="wrap">
          <SingleSelect
            aria-label="Select date range"
            customizeContent={(value) => RANGE_OPTIONS.find((option) => option.value === value)?.label || String(value)}
            onChange={onRangeChange}
            size="S"
            value={rangeKey}
          >
            {RANGE_OPTIONS.map((option) => (
              <SingleSelectOption key={option.value} value={option.value}>
                {option.label}
              </SingleSelectOption>
            ))}
          </SingleSelect>
          <Button startIcon={<Download />} variant="tertiary" onClick={onExport} disabled={isLoading || isExporting}>
            {isExporting ? 'Exporting' : 'Export CSV'}
          </Button>
          <Button startIcon={<ArrowClockwise />} variant="secondary" onClick={onRefresh} disabled={isLoading}>
            Refresh
          </Button>
        </Flex>
      </Flex>
    </Hero>
  );
}

export { DashboardHeader };
