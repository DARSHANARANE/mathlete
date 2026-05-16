import {
  FaTachometerAlt,
  FaFileAlt,
  FaShoppingCart,
  FaSignOutAlt,
  FaTimes,
  FaBook,
  FaChevronDown,
  FaChevronRight,
} from "react-icons/fa";

import {
  NavLink,
} from "react-router-dom";

import useIsMobile from "../hooks/useIsMobile";
import useAuth from "../hooks/useAuth";
import { useState } from "react";

type Props = {
  isOpen: boolean;
  closeSidebar: () => void;
};

const Sidebar: React.FC<Props> = ({
  isOpen,
  closeSidebar,
}) => {
  const isMobile = useIsMobile();

  const { logout } = useAuth();

  const [openProducts, setOpenProducts] =
    useState(false);

  const [openOrders, setOpenOrders] =
    useState(false);

  const linkStyle = ({
    isActive,
  }: {
    isActive: boolean;
  }) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg transition
     ${
       isActive
         ? "bg-indigo-500"
         : "hover:bg-indigo-500"
     }`;

  return (
    <>
      {/* OVERLAY */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={closeSidebar}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          fixed top-0 left-0 z-50
          h-full min-h-screen w-56
          bg-gradient-to-b from-indigo-600 to-indigo-800
          text-white flex flex-col
          transition-transform duration-300

          ${
            isMobile
              ? isOpen
                ? "translate-x-0"
                : "-translate-x-full"
              : "translate-x-0"
          }
        `}
      >
        {/* HEADER */}
        <div className="flex items-center justify-between p-5 border-b border-indigo-500">
          <h1 className="text-xl font-bold">
            ExamHub
          </h1>

          {isMobile && (
            <button
              onClick={closeSidebar}
              className="text-lg"
            >
              <FaTimes />
            </button>
          )}
        </div>

        {/* MENU */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {/* DASHBOARD */}
          <NavLink
            to="/admin/dashboard"
            onClick={
              isMobile
                ? closeSidebar
                : undefined
            }
            className={linkStyle}
          >
            <FaTachometerAlt />
            Dashboard
          </NavLink>

          {/* PRODUCTS */}
          <button
            onClick={() =>
              setOpenProducts(
                !openProducts
              )
            }
            className="w-full flex items-center justify-between px-4 py-3 rounded-lg hover:bg-indigo-500 transition"
          >
            <div className="flex items-center gap-3">
              <FaBook />
              Products
            </div>

            {openProducts ? (
              <FaChevronDown size={12} />
            ) : (
              <FaChevronRight size={12} />
            )}
          </button>

          {openProducts && (
            <div className="ml-6 space-y-1">
              <NavLink
                to="/admin/question-papers"
                onClick={
                  isMobile
                    ? closeSidebar
                    : undefined
                }
                className={linkStyle}
              >
                <FaFileAlt />
                Add  Paper
              </NavLink>

              <NavLink
                to="/admin/books"
                onClick={
                  isMobile
                    ? closeSidebar
                    : undefined
                }
                className={linkStyle}
              >
                <FaBook />
                Add Book
              </NavLink>
            </div>
          )}

          {/* ORDERS */}
          <button
            onClick={() =>
              setOpenOrders(!openOrders)
            }
            className="w-full flex items-center justify-between px-4 py-3 rounded-lg hover:bg-indigo-500 transition"
          >
            <div className="flex items-center gap-3">
              <FaShoppingCart />
              Orders
            </div>

            {openOrders ? (
              <FaChevronDown size={12} />
            ) : (
              <FaChevronRight size={12} />
            )}
          </button>

          {openOrders && (
            <div className="ml-6 space-y-1">
              <NavLink
                to="/admin/orders"
                onClick={
                  isMobile
                    ? closeSidebar
                    : undefined
                }
                className={linkStyle}
              >
                <FaShoppingCart />
                 Paper Orders
              </NavLink>

              <NavLink
                to="/admin/book-orders"
                onClick={
                  isMobile
                    ? closeSidebar
                    : undefined
                }
                className={linkStyle}
              >
                <FaShoppingCart />
                Book Orders
              </NavLink>
            </div>
          )}

          {/* RESULTS */}
          <NavLink
            to="/admin/results-upload"
            onClick={
              isMobile
                ? closeSidebar
                : undefined
            }
            className={linkStyle}
          >
            <FaFileAlt />
            Results Upload
          </NavLink>

          {/* CONTACTS */}
          <NavLink
            to="/admin/contacts"
            onClick={
              isMobile
                ? closeSidebar
                : undefined
            }
            className={linkStyle}
          >
            <FaFileAlt />
            Contacts
          </NavLink>
        </nav>

        {/* FOOTER */}
        <div className="p-4 border-t border-indigo-500">
          <button
            onClick={logout}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-lg hover:bg-indigo-500 transition"
          >
            <FaSignOutAlt />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;