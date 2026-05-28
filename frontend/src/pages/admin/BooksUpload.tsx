import React, { useMemo, useState } from "react";
import { useMutation, useQuery } from "@apollo/client/react";
import { FaTrash } from "react-icons/fa";

import GlobalFilter from "../../components/common/GlobalFilter";
import Table from "../../components/common/table/tablelayout";
import type { Column } from "../../components/common/table/tablelayout";

import DeleteModal from "../../components/common/Modal/DeleteModal";
import BookUploadModal from "../../components/common/Modal/BookUploadModal";
import { CREATE_BOOK, GET_BOOKS } from "../../graphql/queries";
import { DELETE_BOOK } from "../../graphql/mutations";

type Book = {
  id: string;
  title: string;
  description?: string;
  className: string;
  level?: string;
  price: number;
  createdAt: string;
};

type QueryData = {
  getBooks: Book[];
};

const BooksUpload: React.FC = () => {
  const [search, setSearch] = useState("");
  const [deleteId, setDeleteId] = useState<
    string | null
  >(null);

  const [openUploadModal, setOpenUploadModal] =
    useState(false);

  const { data, loading, refetch } =
    useQuery<QueryData>(GET_BOOKS);

  const [createBook] =
    useMutation(CREATE_BOOK);
  const [deleteBook] =
  useMutation(DELETE_BOOK);
  const books = data?.getBooks || [];

  const searchKeys: (keyof Book)[] = [
    "title",
    "className",
    "level",
  ];

  // ======================
  // CREATE BOOK
  // ======================
  const handleCreateBook = async (
    values: {
      title: string;
      description?: string;
      className: string;
      level?: string;
      price: number;
    }
  ) => {
    try {
      await createBook({
        variables: {
          title: values.title,
          description: values.description,
          className: values.className,
          level: values.level,
          price: Number(values.price),
        },
      });

      await refetch();

      setOpenUploadModal(false);
    } catch (error) {
      console.error(error);
    }
  };

  // ======================
  // TABLE COLUMNS
  // ======================
  const columns: Column<Book>[] = [
    {
      header: "Book Name",
      accessor: "title",
    },

    {
      header: "Class",
      accessor: "className",
      render: (value) => `Class ${value}`,
    },

    {
      header: "Level",
      accessor: "level",
    },

    {
      header: "Price",
      accessor: "price",
      render: (value) => `₹${value}`,
    },

    {
      header: "Created Date",
      accessor: "createdAt",
      render: (value) =>
        value
          ? new Date(value).toLocaleDateString(
              "en-GB"
            )
          : "N/A",
    },

    {
      header: "Actions",
      accessor: "id",
      render: (_, row) => (
        <button
          onClick={() => setDeleteId(row.id)}
          className="p-2 bg-red-50 text-red-500 rounded-md"
        >
          <FaTrash />
        </button>
      ),
    },
  ];

  // ======================
  // FILTER
  // ======================
  const filtered = useMemo(() => {
    const normalizedSearch =
      search.trim().toLowerCase();

    return books.filter((item) => {
      if (!normalizedSearch) return true;

      return searchKeys.some((key) =>
        (item[key] || "")
          .toString()
          .toLowerCase()
          .includes(normalizedSearch)
      );
    });
  }, [books, search]);

  return (
    <div className="p-2 space-y-4">
      {/* FILTER */}
      <GlobalFilter
        title="Books"
        searchValue={search}
        onSearch={setSearch}
        showAddButton
        addLabel="Add Book"
        onAddClick={() =>
          setOpenUploadModal(true)
        }
        searchPlaceholder="Search by Book Name"
      />

      {/* TABLE */}
      <div className="overflow-x-auto">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <Table
            data={filtered}
            columns={columns}
          />
        )}
      </div>

      {/* UPLOAD MODAL */}
      <BookUploadModal
        open={openUploadModal}
        onClose={() =>
          setOpenUploadModal(false)
        }
        onSubmit={handleCreateBook}
      />

      {/* DELETE MODAL */}
 <DeleteModal
  isOpen={!!deleteId}
  onClose={() => setDeleteId(null)}
  onDelete={async () => {
    try {
      if (!deleteId) return;

      await deleteBook({
        variables: {
          id: deleteId,
        },
      });

      await refetch();

      setDeleteId(null);
    } catch (error) {
      console.error(error);
    }
  }}
/>
    </div>
  );
};

export default BooksUpload;