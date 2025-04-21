export const transactionFields = [
    { key: "pick", title: "", type: "checkbox", width: "w-[5%]", showInForm: false, showInTable: true },
    { key: "delete", title: "", type: "delete", width: "w-[5%]", showInForm: false, showInTable: true },
    { key: "transactionDate", title: "Date", type: "date", placeholder: "Date", required: true, width: "w-[15%]", showInForm: true, showInTable: true },
    { key: "account", title: "Account", type: "text", placeholder: "Account", required: true, width: "w-2/12", showInForm: true, showInTable: true },
    { key: "description", title: "Description", type: "text", placeholder: "Description", required: true, width: "w-2/12", showInForm: true, showInTable: true },
    { key: "category", title: "Category", type: "select-option", required: true, width: "w-2/12", showInForm: true, showInTable: true },
    { key: "transactionAmount", title: "Amount", type: "number", placeholder: "Amount", required: true, width: "w-2/12", showInForm: true, showInTable: true },
    { key: "transactionType", title: "Type", type: "select-option", required: true, width: "w-1/12", showInForm: true, showInTable: true },
  ];