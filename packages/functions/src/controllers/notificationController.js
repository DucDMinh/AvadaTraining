import {deleteNotificationById, getNotifications} from '../repositories/notificationRepository';

export async function getShopNotification(ctx) {
  try {
    const shopDomain = ctx.state.shopify?.shop || ctx.query.shop;

    if (!shopDomain) {
      return (ctx.body = {success: false, error: 'Missing shop domain'});
    }

    const data = await getNotifications(shopDomain);

    ctx.body = {
      success: true,
      data: data
    };
  } catch (e) {
    console.error('Controller Error:', e);
    ctx.status = 500;
    ctx.body = {
      success: false,
      error: e.message
    };
  }
}

export async function deleteNotification(ctx) {
  try {
    const shopDomain = ctx.state.shopify.shop || ctx.query.shop;
    const {id} = ctx.request.body;

    if (!id) {
      ctx.status = 400;
      ctx.body = {success: false, error: 'Missing notification ID'};
      return;
    }
    await deleteNotificationById(shopDomain, id);
    ctx.body = {success: true};
  } catch (e) {
    console.error(e);
    ctx.status = 500;
    ctx.body = {success: false, error: e.message};
  }
}
