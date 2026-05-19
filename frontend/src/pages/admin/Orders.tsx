import React, { useState } from "react";
import GlobalFilter from "../../components/common/GlobalFilter";
import Table from "../../components/common/table/tablelayout";
import { useQuery } from "@apollo/client/react";
import { GET_ORDERS } from "../../graphql/queries";


type OrderItem = {
  id: string;
  amount: number;
  razorpayOrderId: string;
  razorpayPaymentId: string;
  status: string;
  createdAt: string;
  fileUrl: string;
};

type GetOrdersResponse = {
  getOrders: OrderItem[];
};

type OrderRow = {
  id: string;
  amount: string;
  razorpayOrderId: string;
  razorpayPaymentId: string;
  status: string;
  createdAt: string;
  fileUrl: string;
};

const Orders: React.FC = () => {
  const { data, loading } = useQuery<GetOrdersResponse>(GET_ORDERS);
 const [search, setSearch] = useState("");
  const orders: OrderRow[] =
    data?.getOrders?.map((item) => ({
      id: item.id,
      amount: `₹${item.amount}`,
      razorpayOrderId: item.razorpayOrderId || "-",
      razorpayPaymentId: item.razorpayPaymentId || "-",
      status: item.status || "-",
     createdAt: item.createdAt
  ? new Date(item.createdAt).toLocaleString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  : "-",
      fileUrl: item.fileUrl || "",
    })) || [];
  const filteredOrders = orders.filter((item) => {
    const keyword = search.toLowerCase();

    return (
      item.id.toLowerCase().includes(keyword) ||
      item.razorpayOrderId.toLowerCase().includes(keyword) ||
      item.razorpayPaymentId.toLowerCase().includes(keyword)
    );
  });
  const columns = [
    {
      header: "Order ID",
      accessor: "id" as keyof OrderRow,
    },
    {
      header: "Amount",
      accessor: "amount" as keyof OrderRow,
    },
    {
      header: "Razorpay Order",
      accessor: "razorpayOrderId" as keyof OrderRow,
    },
    {
      header: "Payment ID",
      accessor: "razorpayPaymentId" as keyof OrderRow,
    },
    {
      header: "Status",
      accessor: "status" as keyof OrderRow,
      render: (value: OrderRow["status"]) => {
        const status = String(value || "").toLowerCase();

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
      accessor: "createdAt" as keyof OrderRow,
    },
    {
      header: "Download",
      accessor: "fileUrl" as keyof OrderRow,
      render: (_value: OrderRow["fileUrl"], row: OrderRow) => (
        <a
          href={`http://localhost:5000/api/upload/payment/download/${row.id}`}
          target="_blank"
          rel="noreferrer"
          className="text-blue-600 underline"
        >
          Download
        </a>
      ),
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
          searchPlaceholder="Search by Order ID"
          showStatus={false}
        />
      </div>

      <div className="px-4 mb-4">
        {loading ? (
          <div className="bg-white rounded-2xl shadow-md p-6">
            Loading orders...
          </div>
        ) : (
       <Table<OrderRow> data={filteredOrders} columns={columns} />
        )}
      </div>
    </div>
  );
};

export default Orders;