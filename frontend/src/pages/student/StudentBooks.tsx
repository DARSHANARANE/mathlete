// src/pages/student/studentBooks.tsx

import { useMemo, useState } from "react";
import { useQuery } from "@apollo/client/react/compiled";

import Navbar from "../../components/common/homepage/Navbar";
import GlobalFilter from "../../components/common/GlobalFilter";
import SearchBox from "../../components/common/SearchBox";
import { useNavigate } from "react-router-dom";
import {
  GET_BOOKS,
} from "../../graphql/queries";

import { BuyBookCard } from "../../components/common/QuestionPaperCardProps";

type YearsData = {
  getYears: string[];
};

type BookItem = {
  id: string;
  title: string;
  description?: string;
  className?: string;
  level?: string;
  price?: number;
};

type BookData = {
  getBooks: BookItem[];
};

export default function StudentBooks() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [className, setClassName] =
    useState("all");

  const [level, setLevel] =
    useState("all");

  const { data, loading } =
    useQuery<BookData>(GET_BOOKS);

  const filteredBooks = useMemo(() => {
    return (
      data?.getBooks || []
    ).filter((book) => {
      const matchSearch =
        !search ||
        book.title
          ?.toLowerCase()
          .includes(search.toLowerCase());

      const matchClass =
        className === "all" ||
        book.className === className;

      const matchLevel =
        level === "all" ||
        book.level === level;

      return (
        matchSearch &&
        matchClass &&
        matchLevel
      );
    });
  }, [
    data,
    search,
    className,
    level,
  ]);

  return (
    <>
      <Navbar />

      <div className="relative min-h-screen bg-gray-100 text-text">
        <div className="relative z-20 space-y-4 p-4">

          {/* HEADER */}
          <div className="rounded-[26px] bg-white p-5 shadow-[0_14px_30px_rgba(40,20,90,0.05)]">

            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

              {/* LEFT */}
              <div className="flex items-start gap-4">

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f4f0ff]">
                  <span className="text-2xl">
                    📘
                  </span>
                </div>

                <div className="flex items-center">
                  <h1 className="text-3xl font-black text-[#1b1444]">
                    Books
                  </h1>
                </div>
              </div>

              {/* RIGHT */}
              <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto">

                <GlobalFilter
                  align="left"
                  showSearch={false}
                  showStatus={false}

                  showClass
                  classOptions={[
                    ...[...Array(10)].map(
                      (_, i) => ({
                        label: `Class ${i + 1}`,
                        value: `${i + 1}`,
                      })
                    ),
                  ]}

                  classValue={className}
                  onClassChange={setClassName}

                  showLevel
                  levelValue={level}
                  onLevelChange={setLevel}

                  levelOptions={[

                    {
                      label: "Level 1",
                      value: "Level 1",
                    },

                    {
                      label: "Level 2",
                      value: "Level 2",
                    },
                  ]}
                />

                <div className="min-w-[240px]">
                  <SearchBox
                    value={search}
                    onChange={setSearch}
                    placeholder="Search Books..."
                  />
                </div>
              </div>
            </div>
          </div>

          {/* BOOKS */}
          {loading ? (
            <p className="text-gray-500">
              Loading books...
            </p>
          ) : filteredBooks.length === 0 ? (
            <p className="text-gray-500">
              No books found.
            </p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
              {filteredBooks.map((book) => (
               <BuyBookCard
                  key={book.id}
                  title={book.title}
                  description={book.description}
                  price={book.price}
                  className={book.className}
                  level={book.level}
                  onBuy={() =>
                    navigate(`/books/checkout/${book.id}`, {
                      state: { book },
                    })
                  }
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}