import { PLUGIN_ID } from '../../../constants';

const controller = ({ strapi }) => ({
  index(ctx) {
    ctx.body = {
      message: 'Welcome to Strapi Insights',
    };
  },

  async summary(ctx) {
    ctx.body = await strapi.plugin(PLUGIN_ID).service('service').getSummary(ctx.query?.range);
  },

  async export(ctx) {
    const { csv, filename } = await strapi.plugin(PLUGIN_ID).service('service').exportSummaryCsv(ctx.query?.range);

    ctx.set('Content-Type', 'text/csv; charset=utf-8');
    ctx.set('Content-Disposition', `attachment; filename="${filename}"`);
    ctx.body = csv;
  },
});

export default controller;
