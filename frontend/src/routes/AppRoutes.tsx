import { Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/admin/Login";
import Dashboard from "../pages/admin/Dashboard";
import AdminLayout from "../layout/AdminLayout";
import QuestionPaper from "../pages/admin/QuestionPaper";
import Orders from "../pages/admin/Orders";
import ProtectedRoute from "./ProtectedRoute";
import Home from "../pages/student/Home";
import About from "../pages/student/About";
import Contact from "../pages/student/Contact";
import StudentResults from "../pages/student/StudentResults";
import ResultsUpload from "../pages/admin/ResultsUpload";
import Gallery from "../pages/student/Gallery";
import Page404 from "../pages/Page404";
import StudentQuestionPaper from "../pages/student/StudentQuestionPaper";
import QuestionPaperCheckoutPage from "../pages/student/QuestionPaperCheckoutPage";
import OrderSuccessPage from "../pages/student/OrderSuccessPage";
import ContactPage from "../pages/admin/ContactPage";

const AppRoutes = () => {
  return (
    <Routes>

      {/* DEFAULT REDIRECT */}
      <Route path="/" element={<Navigate to="/home" replace />} />

      {/* STUDENT ROUTES */}
      <Route path="/home" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/results" element={<StudentResults />} />
      <Route path="/papers" element={<StudentQuestionPaper />} />
      <Route path="/gallery" element={<Gallery />} />
         <Route
          path="/papers/checkout/:id"
          element={<QuestionPaperCheckoutPage />}
        />
      <Route path="order-success" element={<OrderSuccessPage />} />
      {/* ADMIN LOGIN */}
      <Route path="/admin/login" element={<Login />} />

      {/* 🔐 ADMIN PANEL (PROTECTED) */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        {/* Default admin route */}
        <Route index element={<Navigate to="/admin/dashboard" replace />} />

        <Route path="dashboard" element={<Dashboard />} />
        <Route path="question-papers" element={<QuestionPaper />} />
        <Route path="orders" element={<Orders />} />
        <Route path="results-upload" element={<ResultsUpload />} />
        <Route path="contacts" element={<ContactPage />} />
     
      </Route>

      {/* 404 PAGE */}
      <Route path="*" element={<Page404 />} />

    </Routes>
  );
};

export default AppRoutes;