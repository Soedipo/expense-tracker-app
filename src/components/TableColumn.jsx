export const TableColumn = ({ tableColumns, setOrder }) => {
  const onOrderByDate = () => {
    setOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };

  return (
    <div className="flex">
      {tableColumns.map(({ title, width }) => (
        <div
          key={title}
          onClick={onOrderByDate}
          className={`${width} px-4 py-2 border-b font-semibold active:bg-zinc-600 hover:bg-zinc-700 cursor-pointer select-none`}
        >
          {title}
        </div>
      ))}
    </div>
  );
};
