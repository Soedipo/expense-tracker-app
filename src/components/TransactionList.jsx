import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useFirebaseDeleteDoc } from "../hooks/firebaseHooks";
import { InlineEdit } from "./InlineEdit";

const tableColumns = [
  { key: "pick", width: "w-[5%]" },
  { key: "delete", width: "w-[5%]" },
  { key: "transactionDate", width: "w-[15%]" },
  { key: "account", width: "w-2/12" },
  { key: "description", width: "w-2/12" },
  { key: "category", width: "w-2/12" },
  { key: "transactionAmount", width: "w-2/12" },
  { key: "transactionType", width: "w-1/12" },
];

const unEditableFields = ["pick", "delete"];
const transactionPath = "transactions";

const renderCell = {
  pick: () => (
    <input
      type="checkbox"
      className="form-checkbox h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
    />
  ),
  delete: (transaction, onDelete) => (
    <div className="flex gap-4 items-center">
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
  const { firebaseDeleteDoc } = useFirebaseDeleteDoc();

  const onDelete = (id) => (e) => {
    e.preventDefault();
    firebaseDeleteDoc(id, transactionPath)
      .then(() => alert("Transaction deleted successfully"))
      .catch((error) => alert("Error deleting transaction:", error));
  };

  return (
    <div
      // key={transaction.id}
      className={`flex transition text-white ${index % 2 === 0 ? "bg-zinc-800" : "bg-zinc-700"}`}
    >
      {tableColumns.map(({ key, width }) => {
        const content = renderCell[key] ? renderCell[key](transaction, onDelete) : transaction[key];

        return (
          <InlineEdit
            key={key}
            fieldKey={key}
            unEditableFields={unEditableFields}
            width={width}
            content={content}
            data={transaction}
            path={transactionPath}
            type={key === "transactionDate" ? "date" : key === "transactionAmount" ? "number" : "text"}
          />
        );
      })}
    </div>
  );
};
