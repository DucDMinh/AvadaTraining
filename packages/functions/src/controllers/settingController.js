import {getCurrentShop} from '@functions/helpers/auth';
import {getShopSettingByShopId, setShopSetting} from '@functions/repositories/settingRepository';

export async function getShopSetting(ctx) {
  try {
    const shopId = getCurrentShop(ctx);
    console.log('Backend đang tìm Shop ID:', shopId);
    const shopSetting = await getShopSettingByShopId(shopId);
    console.log('Kết quả tìm được:', shopSetting);
    ctx.body = {
      success: true,
      data: shopSetting
    };
  } catch (error) {
    ctx.status = 500;
    ctx.body = {success: false, message: error.message};
  }
}

export async function saveShopSetting(ctx) {
  try {
    const shopId = getCurrentShop(ctx);
    const shopDomain = ctx.state.shopify.shop;
    const data = ctx.request.body;
    console.log('Shop ID:', shopId);
    console.log('Data received from Frontend:', JSON.stringify(data));
    await setShopSetting(shopId, data, shopDomain);

    ctx.body = {
      success: true,
      message: 'Settings saved successfully'
    };
  } catch (error) {
    ctx.status = 500;
    ctx.body = {success: false, message: error.message};
  }
}
