import { db } from "../plugins/firebase";

// 只在客户端检查db
if (process.client && !db) {
  throw new Error(
    "Firestore is not available - check if running on client side"
  );
}
import {
  collection,
  doc,
  runTransaction,
  getDoc,
  updateDoc,
  setDoc,
} from "firebase/firestore";
export const updateUserPoints = async (userId, delta) => {
  if (!userId) {
    throw new Error("User ID cannot be empty");
  }
  // *** 添加对 delta 的验证 ***
  if (typeof delta !== "number" || !Number.isFinite(delta)) {
    console.error("Invalid delta value:", delta); // 添加日志方便调试
    throw new Error("Delta must be a valid number");
  }
  // *****************************
  const userRef = doc(collection(db, "users"), userId);

  // 使用事务保证原子性
  await runTransaction(db, async (transaction) => {
    const userDoc = await getDoc(userRef);
    if (!userDoc.exists) throw new Error("User not found");

    const currentPoints = userDoc.data().points || 0;
    // 确保 currentPoints 是数字，以防数据库中数据异常
    if (typeof currentPoints !== "number") {
      console.warn(
        `User ${userId} has non-numeric points: ${currentPoints}. Treating as 0.`
      );
      currentPoints = 0;
    }

    const newPoints = currentPoints + delta;
    if (newPoints < 0) throw new Error("Insufficient points");

    await transaction.update(userRef, {
      points: newPoints,
      lastUpdated: new Date(),
    });
  });
};

// 初始化用户积分
export const initUserPoints = async (dataId, userId) => {
  if (!userId) {
    throw new Error("User ID cannot be empty");
  }

  const userRef = doc(collection(db, "users"), dataId);
  await setDoc(
    userRef,
    {
      points: 10,
      isVip: 1001, // 1001表示普通用户
      createdAt: new Date(),
      userId: userId,
    },
    { merge: true }
  );
};
// export const updateUserPoints = async (userId, delta) => {
//   const userRef = db.collection("users").doc(userId);
//   await db.runTransaction(async (transaction) => {
//     const userDoc = await transaction.get(userRef);
//     if (!userDoc.exists) throw new Error("User not found");

//     const newPoints = (userDoc.data().points || 0) + delta;
//     if (newPoints < 0) throw new Error("Insufficient points");

//     transaction.update(userRef, {
//       points: newPoints,
//       lastUpdated: new Date(),
//     });
//   });
// };

// 初始化用户积分
// export const initUserPoints = async (userId) => {
//   const userRef = db.collection("users").doc(userId);
//   await userRef.set(
//     {
//       points: 10,
//       isVip: 2, // 2表示普通用户
//       createdAt: new Date(),
//     },
//     { merge: true }
//   );
// };
