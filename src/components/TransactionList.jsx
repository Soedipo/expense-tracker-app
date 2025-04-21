import { useFirebaseDeleteDoc } from "../hooks/firebaseHooks";
import { transactionFields } from "../constants/transactions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { InlineEdit } from "./InlineEdit";

const tableFields = transactionFields.filter(field => field.showInTable);

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

export const TransactionList = ({ index, transaction, categories }) => {
  const { firebaseDeleteDoc } = useFirebaseDeleteDoc();

  const transactionTypeOptions = ["income", "expense"];
  const categoryOptions = categories.map(({ name }) => ({
    label: name,
    value: name,
  }));

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
      {tableFields.map(({ key, type, width }) => {
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
            type={type}
            options={key === "category" ? categoryOptions : key === "transactionType" ? transactionTypeOptions : []}
          />
        );
      })}
    </div>
  );
};
