export const TransactionList = ({ index, description, transactionAmount, transactionType }) => {
  return (
    <tr key={index} className="hover:bg-gray-50 transition">
      <td className="px-4 py-2 border-b"></td>
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
