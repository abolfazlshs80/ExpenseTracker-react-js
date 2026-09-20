import React, { useState, useContext } from "react";
import { useAuth } from "../Auth/AuthContext";
import { billContext } from "../Bills/BillsContext";
import Inputs from "../Inputs/Inputs";
import profileIcon from "../../images/profile.png";
import userIcon from "../../images/profile.png";
import lockIcon from "../../images/setting.png";
import moneyIcon from "../../images/money.png";
import calenderIcon from "../../images/calender.png";
import Button from "../Button/Button";

const Profile = () => {
  const { user, logout } = useAuth();
  const { transactions, categories } = useContext(billContext);
  const [activeTab, setActiveTab] = useState("overview");
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    username: user?.username || "",
    email: "",
    fullName: "",
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState({ type: "", text: "" });

  const totalIncome = transactions
    .filter((t) => t.value > 0)
    .reduce((sum, t) => sum + t.value, 0);
  const totalExpense = transactions
    .filter((t) => t.value < 0)
    .reduce((sum, t) => sum + Math.abs(t.value), 0);
  const balance = totalIncome - totalExpense;

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setMessage({ type: "success", text: "Profile updated successfully!" });
    setEditMode(false);
    setTimeout(() => setMessage({ type: "", text: "" }), 3000);
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage({ type: "error", text: "New passwords do not match!" });
      return;
    }
    if (passwordData.currentPassword !== "123") {
      setMessage({ type: "error", text: "Current password is incorrect!" });
      return;
    }
    setMessage({ type: "success", text: "Password changed successfully!" });
    setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
    setTimeout(() => setMessage({ type: "", text: "" }), 3000);
  };

  const recentTransactions = transactions.slice(-5).reverse();

  return (
    <div className="col-span-2 row-span-3 bg-white/30 rounded-2xl p-6 shadow-lg shadow-black/45">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-700">Profile</h2>
        <div className="flex items-center gap-3">
          <img src={profileIcon} alt="profile" className="w-10 h-10 rounded-full border-2 border-indigo-500" />
          <span className="font-medium text-gray-700">{user?.username}</span>
        </div>
      </div>

      {message.text && (
        <div
          className={`mb-4 p-3 rounded-lg text-sm text-center ${
            message.type === "success"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {message.text}
        </div>
      )}

      <div className="border-b border-gray-300 mb-6">
        <nav className="flex gap-4" role="tablist">
          {[
            { id: "overview", label: "Overview", icon: profileIcon },
            { id: "settings", label: "Settings", icon: lockIcon },
            { id: "stats", label: "Statistics", icon: moneyIcon },
          ].map((tab) => (
            <button
              key={tab.id}
              role="tab"
              aria-selected={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? "bg-indigo-100 text-indigo-700"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
              }`}
            >
              <img src={tab.icon} alt="" className="w-5 h-5" />
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {activeTab === "overview" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-green-50 border border-green-200 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <img src={moneyIcon} alt="income" className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-green-700">Total Income</p>
                  <p className="text-xl font-bold text-green-800">${totalIncome.toFixed(2)}</p>
                </div>
              </div>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                  <img src={moneyIcon} alt="expense" className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <p className="text-sm text-red-700">Total Expense</p>
                  <p className="text-xl font-bold text-red-800">${totalExpense.toFixed(2)}</p>
                </div>
              </div>
            </div>
            <div className={`bg-blue-50 border border-blue-200 rounded-xl p-4 ${
              balance >= 0 ? "border-green-200" : "border-red-200"
            }`}>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  balance >= 0 ? "bg-green-100" : "bg-red-100"
                }`}>
                  <img src={moneyIcon} alt="balance" className={`w-5 h-5 ${
                    balance >= 0 ? "text-green-600" : "text-red-600"
                  }`} />
                </div>
                <div>
                  <p className="text-sm text-gray-700">Current Balance</p>
                  <p className={`text-xl font-bold ${
                    balance >= 0 ? "text-green-800" : "text-red-800"
                  }`}>${balance.toFixed(2)}</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-3">Recent Transactions</h3>
            {recentTransactions.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No transactions yet</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-100 text-gray-600">
                      <th className="p-3 text-left">Title</th>
                      <th className="p-3 text-left">Category</th>
                      <th className="p-3 text-right">Amount</th>
                      <th className="p-3 text-left">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentTransactions.map((t) => (
                      <tr key={t.id} className="border-t border-gray-100 hover:bg-gray-50">
                        <td className="p-3">{t.title}</td>
                        <td className="p-3">
                          <span className="px-2 py-1 text-xs bg-indigo-100 text-indigo-700 rounded">
                            {t.value > 0 ? "Income" : "Expense"}
                          </span>
                        </td>
                        <td className="p-3 text-right font-medium">
                          {t.value > 0 ? "+" : ""}${Math.abs(t.value).toFixed(2)}
                        </td>
                        <td className="p-3 text-gray-500">{t.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === "settings" && (
        <div className="space-y-6 max-w-xl">
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              {editMode ? "Edit Profile" : "Profile Information"}
            </h3>
            {!editMode ? (
              <div className="space-y-3 bg-gray-50 rounded-xl p-4">
                <div className="flex items-center gap-4">
                  <img src={userIcon} alt="user" className="w-16 h-16 rounded-full border-2 border-indigo-500" />
                  <div>
                    <p className="font-medium text-gray-700">{formData.username || "admin"}</p>
                    <p className="text-sm text-gray-500">Administrator</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-gray-200">
                  <div>
                    <p className="text-xs text-gray-500">Full Name</p>
                    <p className="font-medium text-gray-700">{formData.fullName || "Not set"}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Email</p>
                    <p className="font-medium text-gray-700">{formData.email || "Not set"}</p>
                  </div>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSaveProfile} className="space-y-4 bg-gray-50 rounded-xl p-4">
                <Inputs
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={formData.username}
                  icon={userIcon}
                  onchange={handleInputChange}
                />
                <Inputs
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  value={formData.fullName}
                  icon={userIcon}
                  onchange={handleInputChange}
                />
                <Inputs
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  icon={userIcon}
                  onchange={handleInputChange}
                />
                <div className="flex gap-2 pt-2">
                  <Button type="submit" label="Save" />
                  <Button
                    type="button"
                    label="Cancel"
                    onClick={() => setEditMode(false)}
                    className="bg-gray-500 hover:bg-gray-600"
                  />
                </div>
              </form>
            )}
            <button
              onClick={() => setEditMode(!editMode)}
              className="text-sm text-indigo-600 hover:text-indigo-800 font-medium"
            >
              {editMode ? "Cancel Editing" : "Edit Profile"}
            </button>
          </div>

          <div className="pt-6 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Change Password</h3>
            <form onSubmit={handleChangePassword} className="space-y-4 bg-gray-50 rounded-xl p-4">
              <Inputs
                type="password"
                name="currentPassword"
                placeholder="Current Password"
                value={passwordData.currentPassword}
                icon={lockIcon}
                onchange={handlePasswordChange}
              />
              <Inputs
                type="password"
                name="newPassword"
                placeholder="New Password"
                value={passwordData.newPassword}
                icon={lockIcon}
                onchange={handlePasswordChange}
              />
              <Inputs
                type="password"
                name="confirmPassword"
                placeholder="Confirm New Password"
                value={passwordData.confirmPassword}
                icon={lockIcon}
                onchange={handlePasswordChange}
              />
              <Button type="submit" label="Change Password" className="w-full" />
            </form>
          </div>

          <div className="pt-6 border-t border-gray-200">
            <button
              onClick={logout}
              className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-colors font-medium"
            >
              Logout
            </button>
          </div>
        </div>
      )}

      {activeTab === "stats" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4">
              <h3 className="font-semibold text-indigo-800 mb-3">Account Info</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Username</span>
                  <span className="font-medium text-gray-800">{user?.username}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Transactions</span>
                  <span className="font-medium text-gray-800">{transactions.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Categories</span>
                  <span className="font-medium text-gray-800">{categories.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Member Since</span>
                  <span className="font-medium text-gray-800">2024</span>
                </div>
              </div>
            </div>
            <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
              <h3 className="font-semibold text-purple-800 mb-3">Transaction Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Income Transactions</span>
                  <span className="font-medium text-green-700">
                    {transactions.filter((t) => t.value > 0).length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Expense Transactions</span>
                  <span className="font-medium text-red-700">
                    {transactions.filter((t) => t.value < 0).length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Average Transaction</span>
                  <span className="font-medium text-gray-800">
                    ${transactions.length
                      ? (transactions.reduce((sum, t) => sum + Math.abs(t.value), 0) / transactions.length).toFixed(2)
                      : "0.00"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Largest Expense</span>
                  <span className="font-medium text-red-700">
                    ${transactions.length
                      ? Math.max(...transactions.filter((t) => t.value < 0).map((t) => Math.abs(t.value)), 0).toFixed(2)
                      : "0.00"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-4">
            <h3 className="font-semibold text-gray-700 mb-3">Categories</h3>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <span
                  key={cat.id}
                  className="px-3 py-1 bg-indigo-100 text-indigo-700 text-sm rounded-full"
                >
                  {cat.name} (${cat.value})
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;