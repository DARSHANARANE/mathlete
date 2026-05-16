import React, { useState } from "react";
import { useQuery } from "@apollo/client/react";

import GlobalFilter from "../../components/common/GlobalFilter";
import Table from "../../components/common/table/tablelayout";
import { GET_BOOK_ORDERS } from "../../graphql/queries";

type BookOrderItem = {
  id: string;

  studentName: string;
  mobile: string;
  email: string;
  address: string;
  pincode: string;

  amount: number;

  razorpayPaymentId: string;

  status: string;

  createdAt: string;

  book?: {
    title: string;
    className: string;
    level: string;
  };
};

type GetBookOrdersResponse = {
  getBookOrders: BookOrderItem[];
};

type OrderRow = {
  id: string;

  studentName: string;

  mobile: string;

  amount: string;

  bookName: string;

  className: string;

  level: string;

  razorpayPaymentId: string;

  status: string;

  createdAt: string;

  address: string;
};

const BookOrders: React.FC = () => {
  const [search, setSearch] = useState("");

  const { data, loading } =
    useQuery<GetBookOrdersResponse>(
      GET_BOOK_ORDERS
    );

  const orders: OrderRow[] =
    data?.getBookOrders?.map((item) => ({
      id: item.id,

      studentName: item.studentName,

      mobile: item.mobile,

      amount: `₹${item.amount}`,

      bookName: item.book?.title || "-",

      className:
        item.book?.className || "-",

      level: item.book?.level || "-",

      razorpayPaymentId:
        item.razorpayPaymentId || "-",

      status: item.status || "-",

      createdAt: item.createdAt
        ? new Date(
            item.createdAt
          ).toLocaleString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })
        : "-",

      address: `${item.address} - ${item.pincode}`,
    })) || [];

  // ======================
  // SEARCH FILTER
  // ======================
  const filteredOrders = orders.filter(
    (item) => {
      const keyword =
        search.toLowerCase();

      return (
        item.studentName
          .toLowerCase()
          .includes(keyword) ||
        item.bookName
          .toLowerCase()
          .includes(keyword) ||
        item.mobile
          .toLowerCase()
          .includes(keyword)
      );
    }
  );

  // ======================
  // TABLE COLUMNS
  // ======================
  const columns = [
    {
      header: "Student",
      accessor:
        "studentName" as keyof OrderRow,
    },

    {
      header: "Mobile",
      accessor:
        "mobile" as keyof OrderRow,
    },

    {
      header: "Book",
      accessor:
        "bookName" as keyof OrderRow,
    },

    {
      header: "Class",
      accessor:
        "className" as keyof OrderRow,
      render: (
        value: OrderRow["className"]
      ) => `Class ${value}`,
    },

    {
      header: "Level",
      accessor:
        "level" as keyof OrderRow,
    },

    {
      header: "Amount",
      accessor:
        "amount" as keyof OrderRow,
    },

    {
      header: "Payment ID",
      accessor:
        "razorpayPaymentId" as keyof OrderRow,
    },

    {
      header: "Address",
      accessor:
        "address" as keyof OrderRow,
    },

    {
      header: "Status",
      accessor:
        "status" as keyof OrderRow,

      render: (
        value: OrderRow["status"]
      ) => {
        const status = String(
          value || ""
        ).toLowerCase();

        const styles =
          status === "paid"
            ? "bg-green-100 text-green-700"
            : "bg-red-100 text-red-700";

        return (
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${styles}`}
          >
            {status || "-"}
          </span>
        );
      },
    },

    {
      header: "Created At",
      accessor:
        "createdAt" as keyof OrderRow,
    },
  ];

  return (
    <div className="flex flex-col bg-gray-100">
      <div className="p-4">
        <GlobalFilter
          showAddButton={false}
          searchValue={search}
          onSearch={setSearch}
          showExportButton={true}
          exportData={orders}
          searchPlaceholder="Search by Student or Book"
          showStatus={false}
        />
      </div>

      <div className="px-4 mb-4">
        {loading ? (
          <div className="bg-white rounded-2xl shadow-md p-6">
            Loading book orders...
          </div>
        ) : (
          <Table<OrderRow>
            data={filteredOrders}
            columns={columns}
          />
        )}
      </div>
    </div>
  );
};

export default BookOrders;