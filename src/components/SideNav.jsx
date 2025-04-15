export const SideNav = () => {
  return (
    <div className="side-nav w-1/12 bg-zinc-800 text-white w-64 h-screen p-4">
      <h2 className="text-xl font-bold mb-4">Expense Tracker</h2>
      <ul className="flex flex-col gap-2">
        <li className="hover:bg-zinc-700 p-2 rounded">
          <a href="#transactions">Transactions</a>
        </li>
        <li className="hover:bg-zinc-700 p-2 rounded">
          <a href="#categories">Categories</a>
        </li>
        <li className="hover:bg-zinc-700 p-2 rounded">
          <a href="#reports">Reports</a>
        </li>
        <li className="hover:bg-zinc-700 p-2 rounded">
          <a href="#settings">Settings</a>
        </li>
      </ul>
    </div>
  );
};