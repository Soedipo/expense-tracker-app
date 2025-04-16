import "./App.css";
import { BrowserRouter as Router, Route, Routes, createBrowserRouter, RouterProvider } from "react-router-dom";
import { Auth } from "./pages/auth/index";
import { Transaction } from "./pages/transaction/index";
import { Budget } from "./pages/budget/index";
import { Account } from "./pages/account/index";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Auth />,
    },
    {
      path: "/transaction",
      element: <Transaction />,
    },
    {
      path: "/budget",
      element: <Budget />,
    },
    {
      path: "/account",
      element: <Account />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
      {/* <Router>
        <Routes>
          <Route path="/" exact element={<Auth />} />
          <Route path="/transaction" element={<Transaction />} />
          <Route path="/budget" element={<Budget />} />
          <Route path="/account" element={<Account />} />
        </Routes>
      </Router> */}
    </>
  );
}

export default App;
