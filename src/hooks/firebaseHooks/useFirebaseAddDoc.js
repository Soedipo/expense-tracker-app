import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../config/firebase-config";

/**
 * Custom hook to add a document to a Firestore collection.
 *
 * @returns {Object} An object containing the `firebaseAddDoc` function.
 */
export const useFirebaseAddDoc = () => {
  /**
   * Adds a document to the specified Firestore collection.
   *
   * @async
   * @param {Object} data - The data to add to the Firestore collection.
   * @param {string} path - The path of the Firestore collection to add the document to.
   *
   * @example
   * const { firebaseAddDoc } = useFirebaseAddDoc();
   * await firebaseAddDoc({ name: "John Doe", age: 30 }, "users");
   */
  const firebaseAddDoc = async (data, path) => {
    const collectionRef = collection(db, path);
    await addDoc(collectionRef, {
      ...data,
      createdAt: serverTimestamp(),
    });
  };

  return { firebaseAddDoc };
};

// {
//   description,
//   account,
//   transactionAmount,
//   category,
//   transactionType,
//   transactionDate,
// }
