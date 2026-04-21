import { Outlet, useLocation } from "react-router-dom";
import { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const getTitle = (pathname: string) => {
    switch (pathname) {
      case "/admin/dashboard":
        return "Dashboard";
      case "/admin/question-papers":
        return "Question Papers";
      case "/admin/orders":
        return "Orders";
      default:
        return "Dashboard";
    }
  };

  const pageTitle = getTitle(location.pathname);

  return (
    <div className="flex min-h-screen">

      <Sidebar
        isOpen={sidebarOpen}
        closeSidebar={() => setSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col md:ml-56">

        <Navbar
          openSidebar={() => setSidebarOpen(true)}
          isSidebarOpen={sidebarOpen}
          title={pageTitle}
          showLogout
        />

        <main className="flex-1 bg-gray-100 overflow-y-auto">
          <Outlet />
        </main>

      </div>
    </div>
  );
};

export default AdminLayout;