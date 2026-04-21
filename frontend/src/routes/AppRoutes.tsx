import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/admin/Login";
import Dashboard from "../pages/admin/Dashboard";
import AdminLayout from "../layout/AdminLayout";
import QuestionPaper from "../pages/admin/QuestionPaper";
import Orders from "../pages/admin/Orders";

const AppRoutes = () => {
  return (
    <Routes>

      {/* DEFAULT */}
      <Route path="/" element={<Navigate to="/student" replace />} />

      {/* ADMIN LOGIN */}
      <Route path="/admin/login" element={<Login />} />

      {/* ADMIN PANEL */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
         <Route path="question-papers" element={<QuestionPaper />} />
            <Route path="orders" element={<Orders />} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<h1>404 - Page Not Found</h1>} />

    </Routes>
  );
};

export default AppRoutes;