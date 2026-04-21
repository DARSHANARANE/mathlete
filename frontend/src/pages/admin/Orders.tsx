import SearchFilter from "../../components/common/GlobalFilter";
import Table from "../../components/common/table/tablelayout";

const Orders: React.FC = () => {
  return (
    <div className="flex flex-col bg-gray-100">

      <div className="p-4">
        <SearchFilter
          showAddButton={false} showExportButton={true} exportData={[]} />
      </div>

      <div className="px-4 mb-4">
        <Table data={[]} columns={[]} />
      </div>


    </div>
  );
};

export default Orders;