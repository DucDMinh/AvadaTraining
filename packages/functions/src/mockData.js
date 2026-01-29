import {Firestore} from '@google-cloud/firestore';
import {faker} from '@faker-js/faker';

const PROJECT_ID = 'final-exam-56928';

const firestore = new Firestore({
  projectId: PROJECT_ID,
  keyFilename: '../serviceAccount.development.json'
});

const collectionRef = firestore.collection('notifications');

const NUM_SHOPS = 5;
const NOTI_PER_SHOP = 100;

async function mockData() {
  console.log(`🚀 Đang tạo dữ liệu dạng Array cho ${NUM_SHOPS} shop...`);
  const batch = firestore.batch(); // Dùng batch để ghi nhanh hơn

  for (let i = 0; i < NUM_SHOPS; i++) {
    const shopId = 'EWdaMpzwUDa3U08FNeEH';
    const shopDomain = 'final-exam-store-3.myshopify.com';

    const notificationsArray = [];

    for (let j = 0; j < NOTI_PER_SHOP; j++) {
      notificationsArray.push({
        id: faker.string.uuid(),
        firstName: faker.person.firstName(),
        city: faker.location.city(),
        productName: faker.commerce.productName(),
        country: faker.location.country(),
        productId: faker.number.int({min: 1000, max: 99999}),
        timestamp: faker.date.recent(),
        productImage: faker.image.urlLoremFlickr({category: 'business'})
      });
    }

    const docRef = collectionRef.doc(shopId);
    const docData = {
      shopId: shopId,
      shopDomain: shopDomain,
      items: notificationsArray
    };
    batch.set(docRef, docData);
  }
  try {
    await batch.commit();
    console.log(
      `✅ Thành công! Đã tạo ${NUM_SHOPS} documents (mỗi doc chứa mảng ${NOTI_PER_SHOP} items).`
    );
  } catch (error) {
    console.error('❌ Lỗi:', error);
  }
}

mockData();
