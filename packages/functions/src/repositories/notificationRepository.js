import {Firestore} from '@google-cloud/firestore';

const firestore = new Firestore();
const notifications = firestore.collection('notifications');

export async function getNotifications(shopId) {
  const shopNotification = await notifications.where('shopId', '==', shopId).get();
  return shopNotification.docs[0].data();
}
