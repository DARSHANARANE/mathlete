export const usePdfActions = () => {
  const token = localStorage.getItem("token");

  // =========================
  // UPLOAD PDF
  // =========================
  const uploadPdf = async ({
    file,
    title,
    className,
    year,
    level,
    price,
  }: {
    file: File;
    title: string;
    className: string;
    year: string;
    level: string;
    price: number;
  }) => {
    const formData = new FormData();

    formData.append("file", file);
    formData.append("title", title);
    formData.append("className", className);
    formData.append("year", year);
    formData.append("level", level);
    formData.append("price", String(price));

    const res = await fetch("http://localhost:5000/api/upload/pdf", {
      method: "POST",
      body: formData,
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("PDF UPLOAD ERROR:", errorText);
      throw new Error("PDF upload failed");
    }

    return res.json();
  };

  // =========================
  // DELETE PDF
  // =========================
  const deletePdf = async (id: string) => {
    const res = await fetch(`http://localhost:5000/api/upload/pdf/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    });

    if (!res.ok) {
      throw new Error("Delete failed");
    }

    return true;
  };
    // =========================
  // Update PDF
  // =========================
const updatePdf = async (id: string, data: any) => {
  const res = await fetch(`http://localhost:5000/api/upload/pdf/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Update failed");

  return res.json();
};
 return {
  uploadPdf,
  deletePdf,
  updatePdf,
};
};