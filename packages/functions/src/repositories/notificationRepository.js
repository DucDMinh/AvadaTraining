import {Firebase} from '@google-cloud/firestore';

const firestore = new Firebase();
const notifications = await firestore.collection('notifications');

export async function getNotifications(shopId) {
  const shopNotification = await notifications.where('shopId', '==', shopId).get();
  return shopNotification.docs[0].data();
}
