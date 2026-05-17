import React, { useState } from "react";
import BaseModal from "./BaseModal";

type Props = {
  open: boolean;
  onClose: () => void;

  onSubmit: (values: {
    title: string;
    description?: string;
    className: string;
    level?: string;
    price: number;
  }) => void;
};

const BookUploadModal: React.FC<Props> = ({
  open,
  onClose,
  onSubmit,
}) => {
  const [title, setTitle] = useState("");

  const [description, setDescription] =
    useState("");

  const [className, setClassName] =
    useState("1");

  const [level, setLevel] = useState("Level 1");

  const [price, setPrice] = useState("");

  useState("");
  return (
    <BaseModal
      isOpen={open}
      onClose={onClose}
      title="Add Book"
      footer={
        <>
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-md"
          >
            Cancel
          </button>

          <button
            onClick={() =>
              onSubmit({
                title,
                description,
                className,
                level,
                price: Number(price),
              })
            }
            className="px-4 py-2 bg-blue-600 text-white rounded-md"
          >
            Save Book
          </button>
        </>
      }
    >
      <div className="space-y-4">
        {/* BOOK NAME */}
        <input
          type="text"
          placeholder="Book Name"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
          className="w-full border p-2 rounded"
        />

        {/* DESCRIPTION */}
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) =>
            setDescription(e.target.value)
          }
          className="w-full border p-2 rounded"
          rows={4}
        />

        {/* CLASS */}
        <select
          value={className}
          onChange={(e) =>
            setClassName(e.target.value)
          }
          className="w-full border p-2 rounded"
        >
          {[...Array(7)].map((_, i) => (
            <option
              key={i}
              value={`${i + 1}`}
            >
              Class {i + 1}
            </option>
          ))}
        </select>

        {/* LEVEL */}
<select
  value={level}
  onChange={(e) => setLevel(e.target.value)}
  className="w-full border p-2 rounded"
>
  <option value="Level 1">
    Level 1
  </option>

  <option value="Level 2">
    Level 2
  </option>
</select>

        {/* PRICE */}
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) =>
            setPrice(e.target.value)
          }
          className="w-full border p-2 rounded"
        />
      </div>
    </BaseModal>
  );
};

export default BookUploadModal;