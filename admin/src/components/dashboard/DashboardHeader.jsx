import { Badge, Button, Flex, Typography } from '@strapi/design-system';
import { ArrowClockwise } from '@strapi/icons';

import { PLUGIN_VERSION } from '../../../../constants';
import { PluginIcon } from '../PluginIcon';
import { Hero, IconWell } from '../../styles/dashboard';

function DashboardHeader({ isLoading, onRefresh }) {
  return (
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

        <Button startIcon={<ArrowClockwise />} variant="secondary" onClick={onRefresh} disabled={isLoading}>
          Refresh
        </Button>
      </Flex>
    </Hero>
  );
}

export { DashboardHeader };
