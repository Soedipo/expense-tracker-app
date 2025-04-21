import { useState, useReducer } from "react";
import { useGetTransactions, useGetCategories } from "../../hooks/firebaseHooks";
import { useAddTransaction } from "../../hooks/transactionHooks";

import { SideNav } from "../../components/SideNav";
import { TransactionList } from "../../components/TransactionList";
import { TransactionForm } from "../../components/TransactionForm";
import { transactionFields } from "../../constants/transactions";
import { TableColumn } from "../../components/TableColumn";
import { AmountCard } from "../../components/AmountCard";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons/faAdd";


const tableColumns = transactionFields.filter((field) => field.showInTable);

// const tableColumns = [
//   { title: "", sortKey: "pick", width: "w-[5%]" },
//   { title: "", sortKey: "delete", width: "w-[5%]" },
//   { title: "Date", sortKey: "transactionDate", width: "w-[15%]" },
//   { title: "Account", sortKey: "account", width: "w-2/12" },
//   { title: "Description", sortKey: "description", width: "w-2/12" },
//   { title: "Category", sortKey: "category", width: "w-2/12" },
//   { title: "Amount", sortKey: "transactionAmount", width: "w-2/12" },
//   { title: "Type", sortKey: "transactionType", width: "w-1/12" },
//   // {
//   //   title: "Power Usage",
//   //   sortKey: "powerUsage",
//   //   sortBy: (v) => ["LOW", "MEDIUM", "HIGH"].indexOf(v.powerUsage),
//   // },
// ];

export const Transaction = () => {
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
    account: "",
    description: "",
    transactionAmount: 0,
    category: "",
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
      case "EDIT":
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

  const expense = transactions.reduce((acc, transaction) => {
    return acc + (transaction.transactionType === "expense" ? transaction.transactionAmount : 0);
  }, 0);

  const transactionFormHandlers = {
    onChange: handleChange,
    onSubmit: handleSubmit,
    onAddTransaction: onAddTransaction,
  };

  return (
    <>
      <SideNav />
      <div className="flex bg-zinc-900 min-h-screen">
        {/* Main Content */}
        <div className="expense-tracker ml-64 w-11/12 flex flex-col items-center gap-6 p-4 bg-zinc-700 min-h-screen text-white">
          <h1 className="text-3xl font-bold text-center mb-6 mt-6">Transactions</h1>

          {/* Balance & Summary */}
          <div className="info-container flex w-full max-w-3xl">
            <div className="flex justify-center gap-6 w-full">
              <AmountCard text="Current Balance" amount={"$" + currentBalance} />
              <AmountCard text="Income" amount={"+$" + income} color="green" />
              <AmountCard text="Expense" amount={"-$" + expense} color="red" />
            </div>
          </div>

          <div className="transactions w-full bg-zinc-800 shadow-md rounded-lg p-6">
            {/* Table */}
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-zinc-300">Transaction List</h3>
              <button
                className="bg-blue-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 transition flex items-center gap-2"
                onClick={!showTransactionForm ? onAddTransaction : undefined}
              >
                <FontAwesomeIcon icon={faAdd} />
                <span className="text-zinc-300"> Add Transaction</span>
              </button>
            </div>

            {/* Body */}
            <div className="overflow-x-auto">
              <div className="w-full text-left border-collapse">
                {/* Column */}
                <TableColumn tableColumns={tableColumns} setOrder={setOrder} />

                <div>
                  {/* Form */}
                  {showTransactionForm && (
                    <TransactionForm formState={formState} handlers={transactionFormHandlers} categories={categories} />
                  )}

                  {/* Transaction List */}
                  {transactions.map((transaction, index) => (
                    <TransactionList key={transaction.id} index={index} transaction={transaction} categories={categories} />
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
