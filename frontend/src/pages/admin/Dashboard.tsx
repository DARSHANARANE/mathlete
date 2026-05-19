import StatCard from "../../components/common/StatCard";
import ActiveState from "../../components/common/ActiveState";
import { SlCalender } from "react-icons/sl";
import { RiLoader2Line } from "react-icons/ri";
import { FaUserGraduate } from "react-icons/fa";
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
const Dashboard: React.FC = () => {
const { data } = useQuery<GetOrdersResponse>(GET_ORDERS);

const totalOrders = data?.getOrders?.length || 0;
const totalRevenue =
  data?.getOrders
    ?.filter((order) => order.status === "paid")
    .reduce((sum, order) => sum + Number(order.amount || 0), 0) || 0;
  const cards = [
    {
      title: "Total Orders",
      value: totalOrders,
      icon: <SlCalender />,
      bgColor: "bg-blue-500"
    },
    {
      title: "Revenue",
      value: `₹ ${totalRevenue}`,
      icon: <RiLoader2Line />,
      bgColor: "bg-green-500",
    },
    {
      title: "Students",
      value: 150,
      icon: <FaUserGraduate />,
      bgColor: "bg-purple-500"
    }
  ];

  return (
    <div className="p-4 md:p-6 space-y-6">

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {cards.map((card, index) => (
          <StatCard
            key={index}
            title={card.title}
            value={card.value}
            icon={card.icon}
            bgColor={card.bgColor}
          />
        ))}
      </div>

      {/* Active State */}
      <ActiveState />

    </div>
  );
};

export default Dashboard;