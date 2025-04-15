import { useState } from "react";
import { useAddTransaction } from "../../hooks/useAddTransaction";
import { useGetTransactions } from "../../hooks/useGetTransactions";
import { useGetCategories } from "../../hooks/useGetCategories";
import { TransactionList } from "../components/TransactionList";
import { Input } from "../components/Input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons/faAdd";

export const ExpenseTracker = () => {
  const { addTransaction } = useAddTransaction();
  const { transactions } = useGetTransactions();
  const { categories } = useGetCategories();

  const [description, setDescription] = useState("");
  const [transactionAmount, setTransactionAmount] = useState(0);
  const [transactionType, setTransactionType] = useState("expense");
  const [showTransactionForm, setShowTransactionForm] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    addTransaction({
      description,
      transactionAmount,
      transactionType,
    });
  };

  const onAddTransaction = () => {
    setShowTransactionForm(!showTransactionForm);
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

        <div className="transactions w-full max-w-3xl bg-zinc-800 shadow-md rounded-lg p-6">
          {/* Table */}
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-zinc-300">Transaction List</h3>
            <button
              className="bg-blue-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 transition flex items-center gap-2"
              onClick={!showTransactionForm ? onAddTransaction : false}
            >
              <FontAwesomeIcon icon={faAdd} />
              <span className="text-zinc-300"> Add Transaction</span>
            </button>
          </div>
          <div className="overflow-x-auto">
            {/* Form */}
            {showTransactionForm && (
              <div>
                <form className="add-transaction flex flex-col gap-4 mb-6" onSubmit={onSubmit}>
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
                      <tr>
                        <td className="px-4 border-b">
                          <Input
                            type="text"
                            placeholder="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                          />
                        </td>
                        <td className="px-4 border-b text-green-600 font-medium">
                          <Input
                            type="number"
                            placeholder="Amount"
                            value={transactionAmount}
                            onChange={(e) => setTransactionAmount(e.target.value)}
                          />
                        </td>
                        <td className="px-4 border-b text-green-600 font-medium">
                          <select
                            className={`p-1 m-1 border border-zinc-700 rounded w-full bg-zinc-700 ${
                              transactionType === "income" ? "text-green-700" : "text-red-700"
                            } text-white placeholder-gray-400`}
                            value={transactionType}
                            onChange={(e) => setTransactionType(e.target.value)}
                          >
                            <option value="expense">Expense</option>
                            <option value="income">Income</option>
                          </select>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="flex justify-end gap-4">
                    <button
                      type="submit"
                      className="bg-blue-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 transition"
                    >
                      Add
                    </button>
                    <button
                      className="bg-red-600 text-white font-semibold py-2 px-4 rounded hover:bg-red-700 transition"
                      onClick={onAddTransaction}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}

            <div className="w-full text-left border-collapse">
              <div className="thead">
                <div className="tr flex">
                  <div className="th w-1/12 px-4 py-2 border-b font-semibold"></div>
                  <div className="th w-2/12 px-4 py-2 border-b font-semibold"></div>
                  <div className="th w-3/12 px-4 py-2 border-b font-semibold">Description</div>
                  <div className="th w-3/12 px-4 py-2 border-b font-semibold">Amount</div>
                  <div className="th w-3/12 px-4 py-2 border-b font-semibold">Type</div>
                </div>
              </div>
              <div className="tbody">
                {transactions.map((transaction, index) => (
                  <TransactionList index={index} transaction={transaction} />
                ))}
                <div className="tr flex">
                  <div className="td w-1/12 px-4 py-2 border-b"></div>
                  <div className="td w-2/12 px-4 py-2 border-b"></div>
                  <div className="td w-3/12 px-4 py-2 border-b">abd</div>
                  <div className="td w-3/12 px-4 py-2 border-b">200</div>
                  <div className="td w-3/12 px-4 py-2 border-b">expense</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
