import { ChartPie, Database, Graph, TrendUp } from '@strapi/icons';

import { KpiGrid } from '../../styles/dashboard';
import { formatNumber } from '../../utils/formatters';
import { KpiCard } from './KpiCard';

function OverviewKpis({ overview }) {
  return (
    <KpiGrid>
      <div>
        <KpiCard
          delay={0}
          icon={<Database fill="#7b61ff" />}
          label="Collections"
          value={formatNumber(overview.totalCollections)}
          helper="Visible collection types"
          tone="#f0eeff"
        />
      </div>
      <div>
        <KpiCard
          delay={60}
          icon={<Graph fill="#00a4bd" />}
          label="Entries"
          value={formatNumber(overview.totalEntries)}
          helper="Total records counted"
          tone="#e7f9fb"
          trend={[30, 42, 48, 64, 78, 92]}
        />
      </div>
      <div>
        <KpiCard
          delay={120}
          icon={<TrendUp fill="#2f6846" />}
          label="Created in 30 days"
          value={formatNumber(overview.createdLast30Days)}
          helper="Fresh content signal"
          tone="#edf8f0"
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
          tone="#fff4e5"
          trend={[62, 46, 58, 40, 54, 36]}
        />
      </div>
    </KpiGrid>
  );
}

export { OverviewKpis };
