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

function AppContent() {
  const { isAuthenticated, loading, logout } = useAuth();

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
      <Layout>
        <MenuBar />
        <MiddleLayout>
          <Navbar onLogout={logout} />
          <EnterBills />
          <ShowBills />
          <Tabels />
        </MiddleLayout>
      </Layout>
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
