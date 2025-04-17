import { useGetUserInfo } from "../firebaseHooks";
import { useFirebaseAddDoc } from "../firebaseHooks";

export const useAddTransaction = () => {
  const { firebaseAddDoc } = useFirebaseAddDoc();
  const { userID } = useGetUserInfo();
  const transactionPath = "transactions";

  const addTransaction = async (transactionData) => {
    const { description, account, transactionAmount, category, transactionType, transactionDate } = transactionData;
    const transactionToBeAdded = {
      userID,
      description,
      account,
      transactionAmount: parseFloat(transactionAmount),
      category,
      transactionType,
      transactionDate,
    };

    firebaseAddDoc(transactionToBeAdded, transactionPath);
  };
  return { addTransaction };
};
