import { useFirebaseUpdateDoc } from "../firebaseHooks";

export const useUpdateTransactionField = () => {
  const { firebaseUpdateDoc } = useFirebaseUpdateDoc();

  const updateTransactionField = async (transactionId, fieldKey, value) => {
    const path = "transactions";

    try {
      await firebaseUpdateDoc(path, transactionId, { [fieldKey]: value });
      console.log(`Transaction ${transactionId} updated: ${fieldKey} = ${value}`);
    } catch (error) {
      console.error("Error updating transaction field:", error);
    }
  };

  return { updateTransactionField };
};
