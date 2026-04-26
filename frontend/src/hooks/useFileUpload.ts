export const useFileUpload = () => {
  const uploadFile = async (
    file: File,
    year: string,
    className: string,
    heading: string
  ) => {
    const formData = new FormData();

    formData.append("file", file);
    formData.append("year", year);
    formData.append("className", className);
    formData.append("heading", heading);

    const token = localStorage.getItem("token");

    const res = await fetch("http://localhost:5000/upload", {
      method: "POST",
      body: formData,
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("UPLOAD ERROR RESPONSE:", errorText);
      throw new Error("Upload failed");
    }

    return res.json();
  };

  return { uploadFile };
};