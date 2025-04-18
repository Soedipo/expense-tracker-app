import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "../../config/firebase-config";

export const useFirebaseUpdateDoc = () => {
  const firebaseUpdateDoc = async (path, id, data) => {
    const collectionRef = doc(db, path, id);
    await updateDoc(collectionRef, { ...data, updatedAt: serverTimestamp() })
      .then(() => {
        console.log("Document successfully updated!");
      })
      .catch((error) => {
        console.error("Error updating document: ", error);
      });
  };

  return { firebaseUpdateDoc };
};
