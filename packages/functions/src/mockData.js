import {Firestore} from '@google-cloud/firestore';
import {faker} from '@faker-js/faker';

// --- CẤU HÌNH ---
const PROJECT_ID = 'final-exam-56928'; // Thay ID project của bạn vào đây

const firestore = new Firestore({
  projectId: PROJECT_ID,
  keyFilename: '../serviceAccount.development.json'
});

const collectionRef = firestore.collection('notifications');

const NUM_SHOPS = 5; // Số lượng Shop
const NOTI_PER_SHOP = 3; // Số thông báo trong mảng của mỗi Shop

async function mockData() {
  console.log(`🚀 Đang tạo dữ liệu dạng Array cho ${NUM_SHOPS} shop...`);
  const batch = firestore.batch(); // Dùng batch để ghi nhanh hơn

  for (let i = 0; i < NUM_SHOPS; i++) {
    const shopId = faker.string.uuid();
    const shopDomain = faker.internet.domainName();

    // 1. Tạo mảng chứa các object notification
    const notificationsArray = [];

    for (let j = 0; j < NOTI_PER_SHOP; j++) {
      notificationsArray.push({
        id: faker.string.uuid(), // Thêm ID cho mỗi item để dễ quản lý
        firstName: faker.person.firstName(),
        city: faker.location.city(),
        productName: faker.commerce.productName(),
        country: faker.location.country(),
        productId: faker.number.int({min: 1000, max: 99999}),
        timestamp: faker.date.recent(),
        productImage: faker.image.urlLoremFlickr({category: 'business'})
        // Không cần shopId ở đây nữa vì đã nằm trong document cha
      });
    }

    // 2. Chuẩn bị data cho Document
    const docRef = collectionRef.doc(shopId);
    const docData = {
      shopId: shopId,
      shopDomain: shopDomain,
      // Field này sẽ chứa mảng [{...}, {...}]
      items: notificationsArray
    };

    // 3. Thêm vào batch
    batch.set(docRef, docData);
  }

  // Commit batch
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
