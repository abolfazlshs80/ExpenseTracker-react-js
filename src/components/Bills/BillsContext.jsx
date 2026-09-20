import React, { createContext, useEffect, useState } from "react";

export const billContext = createContext();

const BillProvider = ({ children }) => {
  const [transactions, setTransactions] = useState(
    JSON.parse(localStorage.getItem("transactions")) || []
  );

  const [categories, setCategories] = useState([
    { id: 1, name: "food", value: "100" },
    { id: 2, name: "transportation", value: "50" },
    { id: 3, name: "rent", value: "80" },
  ]);

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = (transaction) =>
    setTransactions([...transactions, transaction]);
  const addCategory = (category) => setCategories([...categories, category]);

  return (
    <billContext.Provider
      value={{ transactions, addTransaction, categories, addCategory }}
    >
      {children}
    </billContext.Provider>
  );
};

export default BillProvider;
