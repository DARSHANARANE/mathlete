import React, { useState } from "react";
import { useQuery } from "@apollo/client/react";
import GlobalFilter from "../../components/common/GlobalFilter";
import Table from "../../components/common/table/tablelayout";
import type { Column } from "../../components/common/table/tablelayout";
import { GET_CONTACTS } from "../../graphql/queries";

type Contact = {
  id: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  createdAt: string;
};

type ContactTableRow = {
  id: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  createdAt: string;
};

type GetContactsResponse = {
  getContacts: Contact[];
};

const ContactPage: React.FC = () => {
  const [search, setSearch] = useState("");

const { data, loading } =
  useQuery<GetContactsResponse>(GET_CONTACTS);
  const contacts = data?.getContacts || [];

  const filteredContacts = contacts.filter((item) => {
    const keyword = search.toLowerCase();

    return (
      item.name.toLowerCase().includes(keyword) ||
      item.email.toLowerCase().includes(keyword) ||
      (item.subject || "").toLowerCase().includes(keyword)
    );
  });

  const tableData: ContactTableRow[] = filteredContacts.map((item) => ({
    ...item,
  createdAt: new Date(item.createdAt).toLocaleString("en-GB", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
}),
  }));

  const columns: Column<ContactTableRow>[] = [
    { header: "Name", accessor: "name" },
    { header: "Email", accessor: "email" },
    { header: "Subject", accessor: "subject" },
    { header: "Message", accessor: "message" },
    { header: "Created At", accessor: "createdAt" },
  ];

  return (
    <div className="p-2 space-y-4">
      <GlobalFilter
        title="Contact Messages"
        searchValue={search}
        onSearch={setSearch}
        showStatus={false}
        searchPlaceholder="Search by name, email or subject"
      />

      <div className="overflow-x-auto">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <Table data={tableData} columns={columns} />
        )}
      </div>
    </div>
  );
};

export default ContactPage;