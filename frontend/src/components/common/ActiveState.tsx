import {
  FaChartLine,
  FaCalendarAlt,
  FaClipboardList,
} from "react-icons/fa";

import { useQuery } from "@apollo/client/react";
import { GET_ORDERS, GET_PDFS, GET_BOOKS } from "../../graphql/queries";


type OrderItem = {
  id: string;
  amount: number;
  razorpayOrderId: string;
  razorpayPaymentId: string;
  status: string;
  createdAt: string;
  fileUrl: string;
};
type getpdfsResponse = {
  getPdfs: {
    id: string;
  }[];
};
type getbooksResponse = {
  getBooks: {
    id: string;
  }[];
};
type GetOrdersResponse = {
  getOrders: OrderItem[];
};

type Card = {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
  bg: string;
  cardBg: string;
};

const DashboardCards: React.FC = () => {
  const { data } = useQuery<GetOrdersResponse>(GET_ORDERS);
  const { data: pdfData } = useQuery<getpdfsResponse>(GET_PDFS);
  const { data: bookData } = useQuery<getbooksResponse>(GET_BOOKS);
  const orders = data?.getOrders || [];

  // Today's Sales
  const today = new Date().toDateString();

  const todaysSales = orders
    .filter(
      (order) =>
        order.status === "paid" &&
        new Date(order.createdAt).toDateString() === today
    )
    .reduce((sum, order) => sum + Number(order.amount || 0), 0);

  // This Month Orders
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const totalPdfs = pdfData?.getPdfs?.length || 0;
  const activebooks = bookData?.getBooks?.length || 0;
  const thisMonthRevenue = orders
    .filter((order) => {
      const orderDate = new Date(order.createdAt);

      return (
        order.status === "paid" &&
        orderDate.getMonth() === currentMonth &&
        orderDate.getFullYear() === currentYear
      );
    })
    .reduce((sum, order) => sum + Number(order.amount || 0), 0);





  const cards: Card[] = [
    {
      title: "Today's Sales",
      value: `₹${todaysSales}`,
      icon: <FaChartLine />,
      color: "text-green-700",
      bg: "bg-white/60",
      cardBg: "bg-gradient-to-br from-green-100 to-green-50"
    },
    {
      title: "This Month Revenue",
      value: `₹${thisMonthRevenue}`,
      icon: <FaCalendarAlt />,
      color: "text-indigo-700",
      bg: "bg-white/60",
      cardBg: "bg-gradient-to-br from-indigo-100 to-indigo-50"
    },
    {
      title: "Total Active Papers",
      value: totalPdfs,
      icon: <FaClipboardList />,
      color: "text-orange-700",
      bg: "bg-white/60",
      cardBg: "bg-gradient-to-br from-orange-100 to-orange-50"
    },
    {
      title: "Total Active Books",
      value: ` ${activebooks}`,
      icon: <FaClipboardList />,
      color: "text-orange-700",
      bg: "bg-white/60",
      cardBg: "bg-gradient-to-br from-orange-100 to-orange-50"
    }
  ];

  return (
    <div className="grid grid-cols-1">
      <div className="lg:col-span-2 bg-white p-6 rounded-3xl shadow-md border border-gray-100">

        <h2 className="text-lg font-semibold text-gray-800 mb-6">
          Active Stats
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {cards.map((card) => (
            <div
              key={card.title}
              className={`flex items-center justify-between p-5 ${card.cardBg} rounded-2xl border border-white/40 backdrop-blur-md shadow-sm hover:shadow-xl hover:-translate-y-1 hover:scale-[1.02] cursor-pointer transition-all duration-300`}
            >
              <div>
                <p className="text-xs text-gray-500 mb-1">
                  {card.title}
                </p>

                <h3 className={`text-xl font-bold ${card.color}`}>
                  {card.value}
                </h3>
              </div>

              <div
                className={`p-3 rounded-xl ${card.bg} ${card.color} text-xl shadow`}
              >
                {card.icon}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardCards;