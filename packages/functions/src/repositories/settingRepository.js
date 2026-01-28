import {Firestore} from '@google-cloud/firestore';

const firestore = new Firestore();
const settings = firestore.collection('settings');

export async function getShopSettingByShopId(shopId) {
  const docs = await settings
    .where('shopId', '==', shopId)
    .limit(1)
    .get();
  if (docs.empty) {
    return null;
  }
  return docs.docs[0].data();
}

export async function getShopSettingByShopDomain(shopDomain) {
  const docs = await settings
    .where('shopDomain', '==', shopDomain)
    .limit(1)
    .get();
  if (docs.empty) {
    return null;
  }
  return docs.docs[0].data();
}

export async function setShopSetting(shopId, data, shopDomain) {
  await settings.doc(shopId).set(
    {
      shopDomain: shopDomain,
      shopId: shopId,
      ...data
    },
    {merge: true}
  );
  return {shopId, ...data};
}
