import { Input } from "./Input";

export const TransactionForm = ({ formState, onChange, onSubmit, onAddTransaction, categories }) => {
  const { description, transactionDate, account, transactionAmount, transactionCategory, transactionType } = formState;

  const formFields = [
    { key: "transactionDate", width: "w-[15%]", type: "date", placeholder: "Date" },
    { key: "account", width: "w-2/12", type: "text", placeholder: "Account" },
    { key: "description", width: "w-2/12", type: "text", placeholder: "Description" },
    { key: "transactionCategory", width: "w-2/12", type: "select-category" },
    { key: "transactionAmount", width: "w-2/12", type: "number", placeholder: "Amount" },
    { key: "transactionType", width: "w-1/12", type: "select-type" },
  ];

  const renderField = {
    default: ({ key, type, placeholder }) => (
      <Input
        type={type}
        placeholder={placeholder}
        value={formState[key]}
        onChange={(e) => onChange(key, type === "number" ? parseFloat(e.target.value) : e.target.value)}
      />
    ),
    "select-category": ({ key }) => (
      <select
        className="-ml-1 border border-zinc-700 rounded w-full bg-zinc-700 text-white placeholder-gray-400"
        value={formState[key]}
        onChange={(e) => onChange(key, e.target.value)}
      >
        <option value="" disabled>
          Select Category
        </option>
        {categories.map((category) => (
          <option key={category.name} value={category.name}>
            {category.name}
          </option>
        ))}
      </select>
    ),
    "select-type": ({ key }) => (
      <select
        className={`p-1 border border-zinc-700 rounded w-full bg-zinc-700 ${
          formState[key] === "income" ? "text-green-700" : "text-red-700"
        } text-white placeholder-gray-400`}
        value={formState[key]}
        onChange={(e) => onChange(key, e.target.value)}
      >
        <option value="expense">Expense</option>
        <option value="income">Income</option>
      </select>
    ),
  };

  return (
    <form className="add-transaction" onSubmit={onSubmit}>
      <div className="flex text-white">
        {/* empty cells for pick & modify */}
        <div className="w-[5%] px-4 py-2 border-b"></div>
        <div className="w-[5%] px-4 py-2 border-b"></div>

        {formFields.map(({ key, width, type, placeholder }) => (
          <div key={key} className={`flex ${width} px-4 py-2 border-b`}>
            {(renderField[type] || renderField["default"])({ key, type, placeholder })}
          </div>
        ))}
      </div>

      {/* Action buttons */}
      <div className="flex transition text-white">
        <div className="flex w-full px-4 py-2 border-b gap-2 justify-end">
          <button
            type="submit"
            className="bg-blue-600 text-white text-sm font-semibold py-1 px-2 rounded hover:bg-blue-700 transition"
          >
            Add
          </button>
          <button
            type="button"
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
