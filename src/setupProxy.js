const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function (app) {
  app.use(
    ['/api', '/pay'],
    createProxyMiddleware({
      target: 'http://localhost:5000',
    })
  );
};

//Any path you put here tells react it should fetch resources from your sever and if there is no path specify here it means any request will serve static files / component
