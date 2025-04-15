import { useState } from "react";
import { useAddTransaction } from "../../hooks/useAddTransaction";
import { useGetTransactions } from "../../hooks/useGetTransactions";
import { useGetCategories } from "../../hooks/useGetCategories";
import { TransactionList } from "../components/TransactionList";

export const ExpenseTracker = () => {
  const { addTransaction } = useAddTransaction();
  const { transactions } = useGetTransactions();
  const { categories } = useGetCategories();

  const [description, setDescription] = useState("");
  const [transactionAmount, setTransactionAmount] = useState(0);
  const [transactionType, setTransactionType] = useState("expense");

  const onSubmit = (e) => {
    e.preventDefault();
    addTransaction({
      description,
      transactionAmount,
      transactionType,
    });
  };

  return (
    <>
      <h1 className="text-3xl font-bold text-center mb-6 mt-6">Expense Tracker</h1>

      <div className="expense-tracker flex flex-col items-center gap-6 p-4 bg-zinc-700 min-h-screen text-white">
        {/* Balance & Summary */}
        <div className="info-container flex flex-col items-center w-full max-w-3xl">
          <div className="flex justify-center gap-6 w-full">
            <div className="balance bg-zinc-800 shadow-md rounded-lg w-full max-w-sm p-4 text-center">
              <h3 className="text-lg font-semibold text-zinc-300">Current Balance</h3>
              <h2 className="text-2xl font-bold text-green-600">$191.00</h2>
            </div>
            <div className="summary bg-zinc-800 shadow-md rounded-lg w-full max-w-sm p-4 text-center">
              <div className="income">
                <h3 className="text-lg font-semibold text-zinc-300">Income</h3>
                <p className="text-xl font-bold text-green-500">$200.00</p>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="transactions w-full max-w-3xl bg-zinc-800 shadow-md rounded-lg p-6">
          <form className="add-transaction flex flex-col gap-4 mb-6" onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="Description"
              required
              className="p-2 border border-zinc-700 rounded w-full bg-zinc-700 text-white placeholder-gray-400 focus:outline-none focus:ring-0 focus:border-zinc-500"
              onChange={(e) => setDescription(e.target.value)}
            />
            <input
              type="number"
              placeholder="Amount"
              required
              className="p-2 border border-zinc-700 rounded w-full bg-zinc-700 text-white placeholder-gray-400 focus:outline-none focus:ring-0 focus:border-zinc-500"
              onChange={(e) => setTransactionAmount(e.target.value)}
            />
            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  id="expense"
                  value="expense"
                  checked={transactionType === "expense"}
                  onChange={(e) => setTransactionType(e.target.value)}
                  className="p-2 border border-zinc-700 rounded w-full bg-zinc-700 text-white placeholder-gray-400"
                />
                Expense
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  id="income"
                  value="income"
                  checked={transactionType === "income"}
                  onChange={(e) => setTransactionType(e.target.value)}
                  className="p-2 border border-zinc-700 rounded w-full bg-zinc-700 text-white placeholder-gray-400"
                />
                Income
              </label>
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 transition"
            >
              Add Transaction
            </button>
          </form>

          {/* Table */}
          <h3 className="text-xl font-semibold mb-4 text-zinc-300">Transactions</h3>
          <div className="overflow-x-auto">
            <table className="table-auto w-full text-left border-collapse">
              <thead>
                <tr className="bg-zinc-800 text-white">
                  <th className="px-4 py-2 border-b font-semibold"></th>
                  <th className="px-4 py-2 border-b font-semibold"></th>
                  <th className="px-4 py-2 border-b font-semibold">Description</th>
                  <th className="px-4 py-2 border-b font-semibold">Amount</th>
                  <th className="px-4 py-2 border-b font-semibold">Type</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction, index) => {
                  const { description, transactionAmount, transactionType } = transaction;
                  return (
                    <TransactionList
                      index={index}
                      description={description}
                      transactionAmount={transactionAmount}
                      transactionType={transactionType}
                    />
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};
