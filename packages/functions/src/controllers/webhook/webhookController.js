import shopRepository from '../../../lib/repositories/shopRepository';

/**
 * Handle app/uninstalled webhook
 * @param ctx
 * @returns {Promise<{success: boolean}>}
 */
export async function appUninstalled(ctx) {
  try {
    const shopifyDomain = ctx.get('X-Shopify-Shop-Domain');
    console.log(`App uninstalled for shop: ${shopifyDomain}`);

    return (ctx.body = {
      success: true
    });
  } catch (e) {
    console.error(e);
    return (ctx.body = {
      success: false,
      error: e.message
    });
  }
}

export async function listenAppInstalled(ctx) {
  try {
    const shopifyDomain = ctx.get('X-Shopify-Shop-Domain');

    // 1. Lấy dữ liệu Store mà Shopify gửi về trong Body
    const shopifyPayload = ctx.request.body;
    console.log('=============================================');
    console.log('🚀 DEBUG WEBHOOK PAYLOAD TỪ SHOPIFY:');
    // Dùng JSON.stringify với tham số null, 2 để in JSON đẹp, dễ đọc
    console.log(JSON.stringify(shopifyPayload, null, 2));
    console.log('=============================================');
    // -----------------------

    console.log(`App installed webhook received for: ${shopifyDomain}`);

    // 2. Lấy shopId từ collection 'shops' (đã được tạo bởi shopifyAuth)
    const shopDoc = await shopRepository.getShopByShopifyDomain(shopifyDomain);

    if (!shopDoc) {
      console.error(`Shop not found for domain: ${shopifyDomain}`);
      return (ctx.body = {success: false});
    }

    console.log(`Initialized shopInfo successfully for ${shopifyDomain}`);
    return (ctx.body = {success: true});
  } catch (e) {
    console.error('Error in listenAppInstalled:', e);
    return (ctx.body = {success: false, error: e.message});
  }
}

// Add more webhook handlers here
// Example:
// export async function listenNewOrder(ctx) {
//   try {
//     const shopifyDomain = ctx.get('X-Shopify-Shop-Domain');
//     const orderData = ctx.req.body;
//     // Handle order logic here
//     return (ctx.body = { success: true });
//   } catch (e) {
//     console.error(e);
//     return (ctx.body = { success: false });
//   }
// }
