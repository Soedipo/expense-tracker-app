import { Input } from "./Input";

export const TransactionForm = ({
  description,
  setDescription,
  transactionAmount,
  setTransactionAmount,
  transactionType,
  setTransactionType,
  onSubmit,
  onAddTransaction
}) => {
  return (
    <form className="add-transaction" onSubmit={onSubmit}>
      <div className="flex text-white">
        <div className="w-1/12 px-4 py-2 border-b"></div>
        <div className="w-1/12 px-4 py-2 border-b"></div>
        <div className="flex w-7/12 px-4 py-2 border-b">
          <Input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="flex w-2/12 px-4 py-2 border-b">
          <Input
            type="number"
            placeholder="Amount"
            value={transactionAmount}
            onChange={(e) => setTransactionAmount(e.target.value)}
          />
        </div>
        <div className="w-1/12 px-4 py-2 border-b">
          <select
            className={`p-1 border border-zinc-700 rounded w-full bg-zinc-700 ${
              transactionType === "income" ? "text-green-700" : "text-red-700"
            } text-white placeholder-gray-400`}
            value={transactionType}
            onChange={(e) => setTransactionType(e.target.value)}
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
        </div>
      </div>
      <div className={"flex transition text-white"}>
        <div className="w-1/6 px-4 py-2 border-b"></div>
        <div className="w-1/6 px-4 py-2 border-b"></div>
        <div className="w-1/6 px-4 py-2 border-b"></div>
        <div className="w-1/6 px-4 py-2 border-b"></div>
        <div className="flex w-2/6 px-4 py-2 border-b gap-2 justify-end">
          <button
            type="submit"
            className="bg-blue-600 text-white text-sm font-semibold py-1 px-2 rounded hover:bg-blue-700 transition"
          >
            Add
          </button>
          <button
            className="bg-red-600 text-white text-sm font-semibold py-1 px-2 rounded hover:bg-red-700 transition"
            onClick={onAddTransaction}
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
};
