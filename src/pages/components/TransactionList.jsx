import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashCan } from "@fortawesome/free-solid-svg-icons";

export const TransactionList = ({ index, transaction }) => {
  const { description, transactionAmount, transactionType } = transaction;
  
  return (
    <tr
      key={index}
      className={`${index % 2 === 0 ? "bg-zinc-800" : "bg-zinc-700"} transition text-white`}
    >
      <td className="px-4 py-2 border-b">
        <input
          type="checkbox"
          className="form-checkbox h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        />
      </td>
      <td className="px-4 py-2 border-b">
        <FontAwesomeIcon icon={faEdit} className="text-yellow-500" />
        <FontAwesomeIcon icon={faTrashCan} className="text-red-500" />
      </td>
      <td className="px-4 py-2 border-b">{description}</td>
      <td className="px-4 py-2 border-b text-green-600 font-medium">${transactionAmount}</td>
      <td
        className={`px-4 py-2 border-b ${transactionType === "income" ? "text-green-500" : "text-red-500"} font-medium`}
      >
        {transactionType}
      </td>
    </tr>
  );
};
