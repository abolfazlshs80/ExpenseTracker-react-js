import React, { useContext, useState, useEffect } from "react";
import { billContext } from "./BillsContext";
import Inputs from "../Inputs/Inputs";
import calenderIcon from "../../images/calender.png";
import titleIcon from "../../images/plus.png";
import valueIcon from "../../images/money.png";
import Button from "../Button/Button";

const EnterBills = () => {
  const { addTransaction, updateTransaction, transactions } = useContext(
    billContext
  );
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [date, setDate] = useState("");
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    if (editingId) {
      const transaction = transactions.find((t) => t.id === editingId);
      if (transaction) {
        setTitle(transaction.title);
        setValue(transaction.value);
        setDate(transaction.date);
      }
    }
  }, [editingId, transactions]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !value || !date) return;

    if (editingId) {
      updateTransaction(editingId, { title, value: parseFloat(value), date });
      setEditingId(null);
    } else {
      addTransaction({ id: Date.now(), title, value: parseFloat(value), date });
    }
    setTitle("");
    setValue("");
    setDate("");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setTitle("");
    setValue("");
    setDate("");
  };

  return (
    <div className=" bg-white/30 col-span-1 row-span-3 ml-4 rounded-2xl p-4 shadow-lg shadow-black/45 text-sm">
      <form onSubmit={handleSubmit}>
        <h2 className="text-gray-700 font-bold border-b-2 mb-3 p-2">
          {editingId ? "EDIT TRANSACTION" : "ADD TRANSACTION"}
        </h2>
        <Inputs
          type={"text"}
          placeholder={"title"}
          value={title}
          icon={titleIcon}
          onchange={(e) => setTitle(e.target.value)}
        />
        <Inputs
          type={"number"}
          placeholder={"value"}
          value={value}
          icon={valueIcon}
          onchange={(e) => setValue(e.target.value)}
        />
        <Inputs
          type={"date"}
          placeholder={"date"}
          value={date}
          icon={calenderIcon}
          onchange={(e) => setDate(e.target.value)}
        />

        <div className="flex gap-2 mt-4">
          <Button
            type={"submit"}
            label={editingId ? "Update Transaction" : "Add Transaction"}
          />
          {editingId && (
            <Button
              type={"button"}
              label={"Cancel"}
              onClick={cancelEdit}
              className="bg-gray-500 hover:bg-gray-600"
            />
          )}
        </div>
      </form>
    </div>
  );
};

export default EnterBills;
