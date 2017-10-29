const config = {
  name: 'API_asorpereira',
  version: '0.0.1',
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
  base_url: process.env.BASE_URL || 'http://localhost:3000',
  db: {
    uri: 'mongodb://mongodb:27017/restify-api'
  }
};

export default config;
