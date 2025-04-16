import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useDeleteTransaction } from "../hooks/useDeleteTransaction";

const tableColumns = [
  { key: "pick", width: "w-[5%]" },
  { key: "modify", width: "w-[5%]" },
  { key: "transactionDate", width: "w-[15%]" },
  { key: "account", width: "w-2/12" },
  { key: "description", width: "w-2/12" },
  { key: "category", width: "w-2/12" },
  { key: "transactionAmount", width: "w-2/12" },
  { key: "transactionType", width: "w-1/12" },
];

// 👇 Cell render logic: easily extendable!
const renderCell = {
  pick: () => (
    <input
      type="checkbox"
      className="form-checkbox h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
    />
  ),
  modify: (transaction, onDelete) => (
    <div className="flex gap-4 items-center">
      <FontAwesomeIcon icon={faEdit} className="text-yellow-500 cursor-pointer" />
      <FontAwesomeIcon icon={faTrashCan} className="text-red-500 cursor-pointer" onClick={onDelete(transaction.id)} />
    </div>
  ),
  transactionAmount: (transaction) => (
    <span className="text-green-600 font-medium">${transaction.transactionAmount}</span>
  ),
  transactionType: (transaction) => (
    <span className={`font-medium ${transaction.transactionType === "income" ? "text-green-500" : "text-red-500"}`}>
      {transaction.transactionType}
    </span>
  ),
};

export const TransactionList = ({ index, transaction }) => {
  const { deleteTransaction } = useDeleteTransaction();

  const onDelete = (id) => (e) => {
    e.preventDefault();
    deleteTransaction(id);
  };

  return (
    <div key={index} className={`flex transition text-white ${index % 2 === 0 ? "bg-zinc-800" : "bg-zinc-700"}`}>
      {tableColumns.map(({ key, width }) => {
        const content = renderCell[key] ? renderCell[key](transaction, onDelete) : transaction[key];

        return (
          <div key={key} className={`${width} px-4 py-2 border-b`}>
            {content}
          </div>
        );
      })}
    </div>
  );
};
