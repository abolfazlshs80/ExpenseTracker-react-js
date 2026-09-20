import "./App.css";
import { useAuth } from "./components/Auth/AuthContext";
import { AuthProvider } from "./components/Auth/AuthContext";
import Login from "./components/Auth/Login";
import EnterBills from "./components/Bills/EnterBills";
import ShowBills from "./components/Bills/ShowBills";
import Layout from "./components/Layout/Layout";
import MenuBar from "./components/MenuBar/MenuBar";
import Navbar from "./components/NavBar/Navbar";
import Tabels from "./components/Tables/Tables";
import MiddleLayout from "./components/Layout/MiddleLayout";
import BillsLayout from "./components/Bills/BillsLayout";
import BillProvider from "./components/Bills/BillsContext";
import Profile from "./components/Profile/Profile";
import { Routes, Route } from "react-router-dom";

function DashboardContent() {
  const { logout } = useAuth();

  return (
    <Layout>
      <MenuBar />
      <MiddleLayout>
        <Navbar onLogout={logout} />
        <div className="grid grid-cols-2 gap-4">
          <EnterBills />
          <ShowBills />
        </div>
        <div className="col-span-2">
          <Tabels />
        </div>
      </MiddleLayout>
    </Layout>
  );
}

function ProfilePage() {
  const { logout } = useAuth();

  return (
    <Layout>
      <MenuBar />
      <MiddleLayout>
        <Navbar onLogout={logout} />
        <Profile />
      </MiddleLayout>
    </Layout>
  );
}

function AppContent() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Login />;
  }

  return (
    <BillProvider>
      <Routes>
        <Route path="/" element={<DashboardContent />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </BillProvider>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
