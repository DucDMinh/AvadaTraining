import 'dotenv/config';

export default {
  secret: process.env.SHOPIFY_SECRET || '',
  apiKey: process.env.SHOPIFY_API_KEY || '',
  firebaseApiKey: process.env.SHOPIFY_FIREBASE_API_KEY || '',
  scopes: [
    'read_themes',
    'write_themes',
    'read_orders',
    'read_products',
    'read_script_tags',
    'write_script_tags',
    'write_products'
  ],
  accessTokenKey: process.env.SHOPIFY_ACCESS_TOKEN_KEY || 'avada-apps-access-token',
  apiVersion: process.env.SHOPIFY_API_VERSION || '',
  accessToken: process.env.SHOPIFY_ACCESS_TOKEN || '',
  hostName: process.env.APP_BASE_URL || ''
};
