import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../config/firebase-config";
import { useGetUserInfo } from "./useGetUserInfo";

export const useAddTransaction = () => {
  const transactionCollectionRef = collection(db, "transactions");
  const { userID } = useGetUserInfo();

  const addTransaction = async ({
    description,
    account,
    transactionAmount,
    category,
    transactionType,
    transactionDate,
  }) => {
    await addDoc(transactionCollectionRef, {
      userID: userID,
      description: description,
      account: account,
      transactionAmount: transactionAmount,
      category: category,
      transactionType: transactionType,
      transactionDate: transactionDate,
      createdAt: serverTimestamp(),
    });
  };
  return { addTransaction };
};
