import {deleteNotificationById, getNotifications, updateNotifications} from '../repositories/notificationRepository';
import {getOrdersForNotification} from '../services/shopifyService';
import {getShopByShopifyDomain, prepareShopData} from '@avada/core';
import shopifyConfig from '../config/shopify';

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

export async function syncOrders(ctx) {
  try {
    const shopDomain = ctx.state.shopify?.shop || ctx.query.shop;
    const shopData = await getShopByShopifyDomain(shopDomain);

    const {accessToken} = prepareShopData(shopData.id, shopData, shopifyConfig.accessTokenKey);
    if (!shopData) {
      ctx.status = 404;
      return (ctx.body = {success: false, error: 'Shop not found'});
    }
    const notifications = await getOrdersForNotification(shopDomain, accessToken);
    console.log(notifications);
    await updateNotifications(shopData.id, shopDomain, notifications);

    ctx.body = {
      success: true,
      message: `Synced ${notifications.length} orders successfully`,
      data: notifications
    };
  } catch (err) {
    throw err;
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
