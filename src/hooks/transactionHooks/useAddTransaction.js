import { useGetUserInfo } from "../firebaseHooks";
import { useFirebaseAddDoc } from "../firebaseHooks";

export const useAddTransaction = () => {
  const { firebaseAddDoc } = useFirebaseAddDoc();
  const { userID } = useGetUserInfo();
  const transactionPath = "transactions";

  const addTransaction = async (transactionData) => {
    // const { description, account, transactionAmount, category, transactionType, transactionDate } = transactionData;
    const transactionToBeAdded = {
      ...transactionData,
      transactionAmount: parseFloat(transactionData.transactionAmount),
      userID,
    };

    firebaseAddDoc(transactionToBeAdded, transactionPath);
  };
  return { addTransaction };
};
