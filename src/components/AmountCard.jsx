export const AmountCard = ({ text="Total Amount", amount, color, width="w-full", height="" }) => {
  const colorList = {
    g: "bg-green-800",
    r: "bg-red-800",
    default: "bg-zinc-800",
  };

  const getColor = (type) => {
    if (type === "green") return colorList.g;
    if (type === "red") return colorList.r;
    return colorList.default;
  };

  return (
    <div className={`summary ${getColor(color)} shadow-md rounded-lg ${width} ${height} p-4 text-center`}>
      <div className="income">
        <h3 className="text-lg font-semibold text-zinc-300">{text}</h3>
        <p className={`text-xl font-bold`}>{amount}</p>
      </div>
    </div>
  );
};
