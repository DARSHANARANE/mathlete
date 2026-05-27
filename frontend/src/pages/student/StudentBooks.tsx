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
                    ...[...Array(7)].map(
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
  <div className="space-y-6">

    {/* Warmup Message */}
    <div className="rounded-3xl border border-red-100 bg-gradient-to-r from-red-50 via-rose-50 to-orange-50 p-5 text-center shadow-sm">

      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-sm">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-red-200 border-t-red-500"></div>
      </div>

      <h3 className="text-lg font-bold text-gray-800">
        Preparing Study Materials
      </h3>

      <p className="mt-1 text-sm text-gray-500">
        Please wait while we load books and resources...
      </p>
    </div>

    {/* Skeleton Cards */}
    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">

      {[...Array(5)].map((_, index) => (
        <div
          key={index}
          className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm"
        >

          {/* Top Skeleton */}
          <div className="animate-pulse bg-gradient-to-br from-red-50 to-orange-50 p-5">

            <div className="flex items-center justify-between">
              <div className="h-6 w-20 rounded-full bg-white"></div>

              <div className="h-6 w-16 rounded-full bg-white"></div>
            </div>

            <div className="mt-5 flex gap-4">
              <div className="h-14 w-14 rounded-2xl bg-white"></div>

              <div className="flex-1">
                <div className="h-3 w-20 rounded bg-white"></div>

                <div className="mt-3 h-4 w-full rounded bg-white"></div>

                <div className="mt-2 h-4 w-3/4 rounded bg-white"></div>
              </div>
            </div>
          </div>

          {/* Bottom Skeleton */}
          <div className="p-5 animate-pulse">

            <div className="h-4 w-full rounded bg-gray-100"></div>

            <div className="mt-2 h-4 w-2/3 rounded bg-gray-100"></div>

            <div className="mt-6 flex items-center justify-between">

              <div>
                <div className="h-3 w-10 rounded bg-gray-100"></div>

                <div className="mt-2 h-7 w-16 rounded bg-gray-200"></div>
              </div>

              <div className="h-10 w-28 rounded-2xl bg-gray-200"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
) : filteredBooks.length === 0 ? (
  <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-red-100 bg-gradient-to-br from-red-50/40 to-orange-50/30 py-16 text-center">

    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-sm">
      📚
    </div>

    <h3 className="text-xl font-bold text-gray-800">
      No Books Found
    </h3>

    <p className="mt-2 max-w-md text-sm text-gray-500">
      Try changing filters or check again later for new study materials.
    </p>
  </div>
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
          window.open(
            "https://form.qfixonline.com/edufitf",
            "_blank"
          )
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