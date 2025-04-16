import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useDeleteTransaction } from "../hooks/useDeleteTransaction";

export const TransactionList = ({ index, transaction }) => {
  const { id, account, transactionDate, description, transactionAmount, transactionType, transactionCategory } = transaction;
  const { deleteTransaction } = useDeleteTransaction();
  
  const onDelete = (transactionID) => (e) => {
    e.preventDefault();
    deleteTransaction(transactionID);
  };

  return (
    <div key={index} className={`flex transition text-white ${index % 2 === 0 ? "bg-zinc-800" : "bg-zinc-700"}`}>
      <div className="w-1/12 px-4 py-2 border-b">
        <input
          type="checkbox"
          className="form-checkbox h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        />
      </div>
      <div className="flex w-1/12 items-center px-4 py-2 border-b gap-4">
        <FontAwesomeIcon icon={faEdit} className="text-yellow-500" />
        <FontAwesomeIcon icon={faTrashCan} className="text-red-500" onClick={onDelete(id)}/>
      </div>
      <div className="w-2/12 px-4 py-2 border-b">{transactionDate}</div>
      <div className="w-3/12 px-4 py-2 border-b">{account}</div>
      <div className="w-3/12 px-4 py-2 border-b">{description}</div>
      <div className="w-2/12 px-4 py-2 border-b">{transactionCategory}</div>
      <div className="w-3/12 px-4 py-2 border-b text-green-600 font-medium">${transactionAmount}</div>
      <div
        className={`w-2/12 px-4 py-2 border-b ${
          transactionType === "income" ? "text-green-500" : "text-red-500"
        } font-medium`}
      >
        {transactionType}
      </div>
    </div>
  );
};
