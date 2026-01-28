import {getNotifications} from '@functions/repositories/notificationRepository';
import {getCurrentShop} from '@functions/helpers/auth';

export async function getShopNotification(ctx) {
  try {
    const shopId = getCurrentShop();
    const notification = await getNotifications(shopId);
    ctx.body = {
      success: true,
      data: notification
    };
  } catch (e) {
    console.error(e);
  }
}
