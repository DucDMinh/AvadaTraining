import Router from 'koa-router';
import * as sampleController from '@functions/controllers/sampleController';
import * as shopController from '@functions/controllers/shopController';
import * as subscriptionController from '@functions/controllers/subscriptionController';
import * as appNewsController from '@functions/controllers/appNewsController';
import {getApiPrefix} from '@functions/const/app';
import * as settingController from '@functions/controllers/settingController';
import * as notificationController from '@functions/controllers/notificationController';

export default function apiRouter(isEmbed = true) {
  const router = new Router({prefix: getApiPrefix(isEmbed)});

  router.get('/samples', sampleController.exampleAction);
  router.get('/shops', shopController.getUserShops);
  router.get('/subscription', subscriptionController.getSubscription);
  router.get('/appNews', appNewsController.getList);

  router.get('/notifications', notificationController.getShopNotification);
  router.delete('/notifications', notificationController.deleteNotification);

  router.get('/subscriptions', subscriptionController.getList);
  router.post('/subscriptions', subscriptionController.createOne);
  router.put('/subscriptions', subscriptionController.updateOne);
  router.delete('/subscriptions/:id', subscriptionController.deleteOne);

  router.get('/settings', settingController.getShopSetting);
  router.post('/settings', settingController.saveShopSetting);

  return router;
}
