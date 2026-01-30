import {Firestore} from '@google-cloud/firestore';
import {presentDataAndFormatDate} from '@avada/firestore-utils';
import {prepareShopData} from '@avada/core';
import shopifyConfig from '@functions/config/shopify';

const firestore = new Firestore();
const shopInfosRef = firestore.collection('shopInfos');

/**
 * @param {string} id - Shopify Shop ID
 * @param {Object} shopData
 */
export async function getShopInfoByShopId(id, shopData) {
  const docRef = shopInfosRef.doc(id);
  const snapshot = await docRef.get();
  if (snapshot.exists) {
    return presentDataAndFormatDate(snapshot);
  }
  const {accessToken} = prepareShopData(shopData.id, shopData, shopifyConfig.accessTokenKey);
  const newShopDoc = {
    ...shopData,
    accessToken,
    createdAt: new Date()
  };
  await docRef.set(newShopDoc);
  return presentDataAndFormatDate({
    id: id,
    exists: true,
    data: () => newShopDoc
  });
}
