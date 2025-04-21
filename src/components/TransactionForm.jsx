import { Input } from "./Input";

export const TransactionForm = ({ formState, handlers, categories }) => {
  const { onChange, onSubmit, onAddTransaction } = handlers;

  const transactionTypeOptions = ["income", "expense"];
  const categoryOptions = categories.map(({ name }) => ({
    label: name,
    value: name,
  }));

  const formFields = [
    { key: "transactionDate", width: "w-[15%]", type: "date", placeholder: "Date", required: true },
    { key: "account", width: "w-2/12", type: "text", placeholder: "Account", required: true },
    { key: "description", width: "w-2/12", type: "text", placeholder: "Description", required: true },
    { key: "category", width: "w-2/12", type: "select-option", required: true },
    { key: "transactionAmount", width: "w-2/12", type: "number", placeholder: "Amount", required: true },
    { key: "transactionType", width: "w-1/12", type: "select-option", required: true },
  ];

  const renderField = {
    default: ({ key, type, placeholder, required }) => (
      <Input
        type={type}
        placeholder={placeholder}
        value={formState[key]}
        onChange={(e) => onChange(key, type === "number" ? parseFloat(e.target.value || 0) : e.target.value)}
        step={type === "number" ? "any" : undefined}
        required={required}
      />
    ),
    category: ({ key, type, required }) => (
      <Input
        type={type}
        value={formState[key]}
        options={categoryOptions}
        onChange={(e) => onChange(key, e.target.value)}
        required={required}
      />
    ),
    transactionType: ({ key, type, required }) => (
      <Input
        type={type}
        value={formState[key]}
        options={transactionTypeOptions}
        onChange={(e) => onChange(key, e.target.value)}
        required={required}
      />
    ),
  };

  return (
    <form className="add-transaction" onSubmit={onSubmit}>
      <div className="flex text-white">
        {/* empty cells for pick & modify */}
        <div className="w-[5%] px-4 py-2 border-b"></div>
        <div className="w-[5%] px-4 py-2 border-b"></div>

        {formFields
          .filter(({ key }) => key !== "pick" && key !== "delete")
          .map(({ key, width, type, placeholder, required }) => (
            <div key={key} className={`flex ${width} px-4 py-2 border-b`}>
              {(renderField[key] || renderField["default"])({ key, type, placeholder, required })}
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
