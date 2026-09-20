import React, { useContext, useState } from "react";
import { billContext } from "./BillsContext";
import editIcon from "../../images/document.png";
import deleteIcon from "../../images/bell.png";

const ShowBills = () => {
  const { transactions, deleteTransaction, updateTransaction } = useContext(
    billContext
  );
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editValue, setEditValue] = useState("");
  const [editDate, setEditDate] = useState("");

  const handleEdit = (transaction) => {
    setEditingId(transaction.id);
    setEditTitle(transaction.title);
    setEditValue(transaction.value);
    setEditDate(transaction.date);
  };

  const handleSave = (id) => {
    updateTransaction(id, {
      title: editTitle,
      value: parseFloat(editValue),
      date: editDate,
    });
    setEditingId(null);
  };

  const handleCancel = () => {
    setEditingId(null);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this transaction?")) {
      deleteTransaction(id);
    }
  };

  return (
    <div className=" bg-white/30 col-span-1 row-span-3 rounded-2xl p-4 shadow-lg shadow-black/45 text-sm">
      <h2 className="text-gray-700 font-bold border-b-2 mb-3 p-2">
        RECENT TRANSACTION
      </h2>

      <div className=" overflow-y-scroll h-45">
        <table className="border-collapse w-full bg-white/40 text-gray-600 text-sm">
          <thead>
            <tr>
              <th className="border-b-2 p-2 text-center">ID</th>
              <th className="border-b-2 p-2 text-center">Title</th>
              <th className="border-b-2 p-2 text-center">Value</th>
              <th className="border-b-2 p-2 text-center">Date</th>
              <th className="border-b-2 p-2 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {transactions.map((item, index) => (
              <tr key={item.id} className="hover:bg-indigo-300">
                <td className="border-b-2 p-2 text-center">{index + 1}</td>
                {editingId === item.id ? (
                  <>
                    <td className="border-b-2 p-2 text-center">
                      <input
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        className="border p-1 rounded w-full text-center"
                      />
                    </td>
                    <td className="border-b-2 p-2 text-center">
                      <input
                        type="number"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        className="border p-1 rounded w-full text-center"
                      />
                    </td>
                    <td className="border-b-2 p-2 text-center">
                      <input
                        type="date"
                        value={editDate}
                        onChange={(e) => setEditDate(e.target.value)}
                        className="border p-1 rounded w-full text-center"
                      />
                    </td>
                    <td className="border-b-2 p-2 text-center">
                      <button
                        onClick={() => handleSave(item.id)}
                        className="text-green-600 hover:text-green-800 mx-1"
                      >
                        Save
                      </button>
                      <button
                        onClick={handleCancel}
                        className="text-gray-600 hover:text-gray-800 mx-1"
                      >
                        Cancel
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="border-b-2 p-2 text-center">{item.title}</td>
                    <td className="border-b-2 p-2 text-center">{item.value} $</td>
                    <td className="border-b-2 p-2 text-center">{item.date}</td>
                    <td className="border-b-2 p-2 text-center">
                      <button
                        onClick={() => handleEdit(item)}
                        className="text-blue-600 hover:text-blue-800 mx-1"
                      >
                        <img
                          src={editIcon}
                          alt="edit"
                          className="w-5 h-5 inline"
                        />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="text-red-600 hover:text-red-800 mx-1"
                      >
                        <img
                          src={deleteIcon}
                          alt="delete"
                          className="w-5 h-5 inline"
                        />
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ShowBills;
