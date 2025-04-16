import { useState } from "react";
import { useAddTransaction } from "../../hooks/useAddTransaction";
import { useGetTransactions } from "../../hooks/useGetTransactions";
import { useGetCategories } from "../../hooks/useGetCategories";
import { TransactionList } from "../../components/TransactionList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons/faAdd";
import { TransactionForm } from "../../components/TransactionForm";
import { SideNav } from "../../components/SideNav";
import { useReducer } from "react";

export const ExpenseTracker = () => {
  const { addTransaction } = useAddTransaction();
  var { transactions } = useGetTransactions();
  const { categories } = useGetCategories();
  const [showTransactionForm, setShowTransactionForm] = useState(false);
  const [order, setOrder] = useState("desc");

  const sortTransactionsByDate = (transactions, order = "asc") => {
    return [...transactions].sort((a, b) => {
      const dateA = new Date(a.transactionDate);
      const dateB = new Date(b.transactionDate);

      if (order === "asc") return dateB - dateA; // Sort in descending order
      else if (order === "desc") return dateA - dateB; // Sort in ascending order
      else return 0; // No sorting
    });
  };

  transactions = sortTransactionsByDate(transactions, order);

  const initialState = {
    description: "",
    transactionAmount: 0,
    transactionCategory: "",
    transactionDate: new Date().toISOString().split("T")[0],
    transactionType: "expense",
  };

  function reducer(state, action) {
    switch (action.type) {
      case "SET_FIELD":
        return {
          ...state,
          [action.field]: action.value,
        };
      case "RESET":
        return initialState;
      default:
        return state;
    }
  }

  const [formState, dispatch] = useReducer(reducer, initialState);

  const handleChange = (field, value) => {
    dispatch({ type: "SET_FIELD", field, value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addTransaction(formState);
    dispatch({ type: "RESET" });
    setShowTransactionForm(false);
  };

  const onAddTransaction = () => {
    setShowTransactionForm(!showTransactionForm);
    dispatch({ type: "RESET" });
  };

  const currentBalance = transactions.reduce((acc, transaction) => {
    return (
      acc + (transaction.transactionType === "income" ? transaction.transactionAmount : -transaction.transactionAmount)
    );
  }, 0);

  const income = transactions.reduce((acc, transaction) => {
    return acc + (transaction.transactionType === "income" ? transaction.transactionAmount : 0);
  }, 0);

  const onOrderByDate = () => {
    setOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };

  return (
    <>
      <div className="flex bg-zinc-900 min-h-screen">
        <SideNav />
        {/* Main Content */}
        <div className="expense-tracker w-11/12 flex flex-col items-center gap-6 p-4 bg-zinc-700 min-h-screen text-white">
          <h1 className="text-3xl font-bold text-center mb-6 mt-6">Expense Tracker</h1>
          {/* Balance & Summary */}
          <div className="info-container flex flex-col items-center w-full max-w-3xl">
            <div className="flex justify-center gap-6 w-full">
              <div className="balance bg-zinc-800 shadow-md rounded-lg w-full max-w-sm p-4 text-center">
                <h3 className="text-lg font-semibold text-zinc-300">Current Balance</h3>
                <h2 className="text-2xl font-bold text-green-600">${currentBalance}</h2>
              </div>
              <div className="summary bg-zinc-800 shadow-md rounded-lg w-full max-w-sm p-4 text-center">
                <div className="income">
                  <h3 className="text-lg font-semibold text-zinc-300">Income</h3>
                  <p className="text-xl font-bold text-green-500">${income}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="transactions w-full bg-zinc-800 shadow-md rounded-lg p-6">
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
              <div className="w-full text-left border-collapse">
                <div>
                  <div className="flex">
                    <div className="w-1/12 px-4 py-2 border-b font-semibold"></div>
                    <div className="w-1/12 px-4 py-2 border-b font-semibold"></div>
                    <div className="w-5/12 px-4 py-2 border-b font-semibold active:bg-zinc-600 hover:bg-zinc-700" onClick={onOrderByDate}>
                      Date
                    </div>
                    <div className="w-5/12 px-4 py-2 border-b font-semibold">Description</div>
                    <div className="w-2/12 px-4 py-2 border-b font-semibold">Category</div>
                    <div className="w-2/12 px-4 py-2 border-b font-semibold">Amount</div>
                    <div className="w-1/12 px-4 py-2 border-b font-semibold">Type</div>
                  </div>
                </div>
                <div>
                  {showTransactionForm && (
                    <TransactionForm
                      formState={formState}
                      onChange={handleChange}
                      onSubmit={handleSubmit}
                      onAddTransaction={onAddTransaction}
                      categories={categories}
                    />
                  )}

                  {transactions.map((transaction, index) => (
                    <TransactionList index={index} transaction={transaction} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
