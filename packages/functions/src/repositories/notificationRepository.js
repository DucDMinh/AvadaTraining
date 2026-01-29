import {Firestore} from '@google-cloud/firestore';

const firestore = new Firestore();
const collectionRef = firestore.collection('notifications');

export async function updateNotifications(shopId, shopDomain, notifications) {
  try {
    const docRef = collectionRef.doc(shopId);

    await docRef.set(
      {
        shopId: shopId,
        shopDomain: shopDomain,
        items: notifications,
        lastSync: new Date().toISOString()
      },
      {merge: true}
    );

    return true;
  } catch (error) {
    console.error('Error saving notifications to Firestore:', error);
    return false;
  }
}

export async function getNotifications(shopDomain) {
  try {
    const snapshot = await collectionRef
      .where('shopDomain', '==', shopDomain)
      .limit(1)
      .get();
    if (snapshot.empty) {
      return [];
    }
    const docData = snapshot.docs[0].data();
    const items = docData.items || [];
    return items.sort((a, b) => {
      const dateA = new Date(a.timestamp);
      const dateB = new Date(b.timestamp);
      return dateB - dateA;
    });
  } catch (error) {
    console.error('Error fetching notifications:', error);
    return [];
  }
}

export async function deleteNotificationById(shopDomain, id) {
  try {
    console.log('>>>>>>>>>>>>>>>>>>', shopDomain, id);
    const snapshot = await collectionRef
      .where('shopDomain', '==', shopDomain)
      .limit(1)
      .get();

    if (snapshot.empty) return;

    const docRef = snapshot.docs[0].ref;
    const docData = snapshot.docs[0].data();
    const updatedItems = docData.items.filter(item => item.id !== id);
    await docRef.update({
      items: updatedItems
    });
  } catch (error) {
    console.error('Error deleting notification:', error);
  }
}
