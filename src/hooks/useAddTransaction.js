import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../config/firebase-config";
import { useGetUserInfo } from "./useGetUserInfo";

export const useAddTransaction = () => {
  const transactionCollectionRef = collection(db, "transactions");
  const { userID } = useGetUserInfo();

  const addTransaction = async ({
    description,
    transactionAmount,
    transactionCategory,
    transactionType,
  }) => {
    await addDoc(transactionCollectionRef, {
      userID: userID,
      description: description,
      transactionAmount: parseInt(transactionAmount),
      transactionCategory: transactionCategory,
      transactionType: transactionType,
      createdAt: serverTimestamp(),
    });
  };
  return { addTransaction };
};
