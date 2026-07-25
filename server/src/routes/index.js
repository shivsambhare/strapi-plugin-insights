export default [
  {
    method: 'GET',
    path: '/',
    handler: 'controller.index',
    config: {
      policies: [],
    },
  },
  {
    method: 'GET',
    path: '/summary',
    handler: 'controller.summary',
    config: {
      policies: [],
    },
  },
  {
    method: 'GET',
    path: '/export',
    handler: 'controller.export',
    config: {
      policies: [],
    },
  },
];
