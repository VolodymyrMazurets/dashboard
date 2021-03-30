const CracoLessPlugin = require('craco-less');
const lessVars = require('./less-vars');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: lessVars,
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
