import { Navigate, Routes, Route } from "react-router-dom";

import DashboardPage from "./pages/DashboardPage";

import LoginPage from "./pages/LoginPage";

import ProductsPage from "./pages/ProductsPage";

import OrdersPage from "./pages/OrdersPage";

import InventoryLogsPage from "./pages/InventoryLogsPage";

import UsersPage from "./pages/UsersPage";
import SuppliersPage from "./pages/SuppliersPage";

import NotFoundPage from "./pages/NotFoundPage";

import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />

      <Route path="/login" element={<LoginPage />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/products"
        element={
          <ProtectedRoute>
            <ProductsPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/orders"
        element={
          <ProtectedRoute>
            <OrdersPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/inventory-logs"
        element={
          <ProtectedRoute>
            <InventoryLogsPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/users"
        element={
          <ProtectedRoute>
            <UsersPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/suppliers"
        element={
          <ProtectedRoute>
            <SuppliersPage />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
