import { ChartPie, Database, Graph, TrendUp } from '@strapi/icons';

import { KpiGrid } from '../../styles/dashboard';
import { formatNumber, formatRangeHeadline } from '../../utils/formatters';
import { KpiCard } from './KpiCard';

function OverviewKpis({ overview, range }) {
  return (
    <KpiGrid>
      <div>
        <KpiCard
          delay={0}
          icon={<Database fill="#7b61ff" />}
          label="Collections"
          value={formatNumber(overview.totalCollections)}
          helper="Visible collection types"
          tone="var(--strapi-colors-primary100)"
        />
      </div>
      <div>
        <KpiCard
          delay={60}
          icon={<Graph fill="#00a4bd" />}
          label="Entries"
          value={formatNumber(overview.totalEntries)}
          helper="Total records counted"
          tone="var(--strapi-colors-neutral100)"
          trend={[30, 42, 48, 64, 78, 92]}
        />
      </div>
      <div>
        <KpiCard
          delay={120}
          icon={<TrendUp fill="#2f6846" />}
          label={formatRangeHeadline(range, 'Created')}
          value={formatNumber(overview.createdInRange)}
          helper="Fresh content signal"
          tone="var(--strapi-colors-success100)"
          trend={[28, 50, 38, 76, 56, 82]}
        />
      </div>
      <div>
        <KpiCard
          delay={180}
          icon={<ChartPie fill="#f29d41" />}
          label="Drafts"
          value={formatNumber(overview.draftEntries)}
          helper={`${formatNumber(overview.publishedEntries)} published`}
          tone="var(--strapi-colors-warning100)"
          trend={[62, 46, 58, 40, 54, 36]}
        />
      </div>
    </KpiGrid>
  );
}

export { OverviewKpis };
