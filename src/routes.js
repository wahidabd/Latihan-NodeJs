const { addNotHandler } = require('./handler');

const routes = [
  {
    method: 'POST',
    path: '/notes',
    handler: addNotHandler,
  },
];

module.exports = routes;
