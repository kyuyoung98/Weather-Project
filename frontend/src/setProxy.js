const { createProxyMiddleware } = require('http-proxy-middleware');
import { API_URL } from './pages/config';
module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: `http://${API_URL}8080`,	
      changeOrigin: true,
    })
  );
};