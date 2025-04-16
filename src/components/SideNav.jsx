import { Link } from "react-router-dom";

export const SideNav = () => {
  return (
    <div className="side-nav fixed left-0 top-0 bg-zinc-800 text-white w-64 h-screen p-4">
      <h2 className="text-xl font-bold mb-4">Expense Tracker</h2>
      <ul className="flex flex-col gap-2">
        {/* <li className="hover:bg-zinc-700 p-2 rounded">
          <a href="#reports">Reports/Dashboard</a>
        </li> */}
        <li className="hover:bg-zinc-700 p-2 rounded">
          <Link to="/transaction">Transactions</Link>
        </li>
        <li className="hover:bg-zinc-700 p-2 rounded">
          <Link to="/budget">Budgets</Link>
        </li>
        <li className="hover:bg-zinc-700 p-2 rounded">
          <Link to="/account">Accounts</Link>
        </li>
        {/* <li className="hover:bg-zinc-700 p-2 rounded">
          <a href="#categories">Categories</a>
        </li>
        <li className="hover:bg-zinc-700 p-2 rounded">
          <a href="#settings">Settings</a>
        </li> */}
      </ul>
    </div>
  );
};
