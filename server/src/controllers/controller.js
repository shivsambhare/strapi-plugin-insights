import { PLUGIN_ID } from '../../../constants';

const controller = ({ strapi }) => ({
  index(ctx) {
    ctx.body = {
      message: 'Welcome to Strapi Insights',
    };
  },

  async summary(ctx) {
    ctx.body = await strapi.plugin(PLUGIN_ID).service('service').getSummary(ctx);
  },
});

export default controller;
