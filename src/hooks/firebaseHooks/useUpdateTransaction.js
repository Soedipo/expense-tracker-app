import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../config/firebase-config";

export const useUpdateTransaction = () => {
  const updateTransaction = async (transactionId, transactionData) => {
    const transactionRef = doc(db, "transactions", transactionId);
    await updateDoc(transactionRef, transactionData);
  };

  return { updateTransaction };
};
