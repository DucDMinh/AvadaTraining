import {prepareShopData} from '@avada/core';
import shopifyConfig from '../config/shopify';
import '@shopify/shopify-api/adapters/node';
import {Session, shopifyApi} from '@shopify/shopify-api';
import Shopify from 'shopify-api-node';

export async function getOrdersForNotification(shopDomain, accessToken) {
  try {
    console.log('SHOPIFY CONFIG DEBUG', {
      apiKey: shopifyConfig.apiKey,
      secret: shopifyConfig.secret,
      hostName: shopifyConfig.hostName
    });
    const shopify = shopifyApi({
      apiKey: shopifyConfig.apiKey,
      apiSecretKey: shopifyConfig.secret,
      scopes: ['read_orders'],
      hostName: 'final-exam-store-3.myshopify.com',
      apiVersion: '2025-04',
      isEmbeddedApp: true
    });
    const session = new Session({
      id: `offline_${shopDomain}`,
      shop: shopDomain,
      state: 'na',
      isOnline: false,
      scope: shopifyConfig.scopes,
      accessToken: accessToken
    });
    const client = new shopify.clients.Graphql({session});
    const query = `
      query getOrder {
  orders(first: 30) {
    edges{
      node{
        id
        createdAt
        customer{
          defaultAddress{
            city
            country
          }
          firstName
        }
        lineItems(first:1){
          nodes {
              title
              product {
                id
              }
              image {
                url
              }
          }
        }
      }
    }
  }
}
    `;
    console.log('SESSION DEBUG', {
      shop: session.shop,
      scope: session.scope,
      isOnline: session.isOnline,
      hasToken: !!session.accessToken
    });
    const response = await client.request(query);
    const orders = response.data?.orders?.edges || [];
    return orders.map(({node}) => {
      const firstItem = node.lineItems.nodes[0] || {};
      const productImage = firstItem.image.url || '';
      const cleanId = firstItem.product?.id;
      return {
        id: cleanId,
        firstName: node.customer ? node.customer.firstName : 'Someone',
        city: node.customer?.defaultAddress?.city || '',
        country: node.customer?.defaultAddress?.country || '',
        productName: firstItem.title || 'Product',
        productId: firstItem.product?.id?.split('/').pop() || '',
        productImage: productImage,
        timestamp: node.createdAt || ''
      };
    });
  } catch (error) {
    console.log('>>>>>>>>>>>> co loix ay ra:', error.message);
  }
}

/**
 * Create Shopify instance with the latest API version and auto limit enabled
 *
 * @param {Shop} shopData
 * @param {string} apiVersion
 * @return {Shopify}
 */
export function initShopify(shopData) {
  const shopParsedData = prepareShopData(shopData.id, shopData, shopifyConfig.accessTokenKey);
  const {shopifyDomain, accessToken} = shopParsedData;

  return new Shopify({
    shopName: shopifyDomain,
    accessToken: accessToken,
    autoLimit: true
  });
}
