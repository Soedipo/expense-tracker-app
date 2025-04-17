import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../config/firebase-config";

/**
 * Custom hook to delete a document from a Firestore collection.
 *
 * @returns {Object} An object containing the `firebaseDeleteDoc` function.
 */
export const useFirebaseDeleteDoc = () => {
  /**
   * Deletes a document from the specified Firestore collection.
   *
   * @async
   * @param {string} id - The ID of the document to delete.
   * @param {string} path - The name/path of the Firestore collection.
   * 
   * @example
   * const { firebaseDeleteDoc } = useFirebaseDeleteDoc();
   * await firebaseDeleteDoc("abc123", "budgets");
   */
  const firebaseDeleteDoc = async (id, path) => {
    await deleteDoc(doc(db, path, id));
  };

  return { firebaseDeleteDoc };
};
