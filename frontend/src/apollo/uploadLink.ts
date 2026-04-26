import { ApolloLink, Observable } from "@apollo/client";

function isFile(obj: any) {
  return (
    obj instanceof File ||
    obj instanceof Blob ||
    obj?.createReadStream
  );
}

function createFormData(operation: any) {
  const form = new FormData();

  form.append("operations", JSON.stringify(operation));

  form.append(
    "map",
    JSON.stringify({ 0: ["variables.file"] })
  );

  const file = operation.variables.file;
  form.append("0", file);

  return form;
}

export const uploadLink = new ApolloLink((operation) => {
  return new Observable((observer) => {
    const formData = createFormData(operation);

    fetch("http://localhost:5000/graphql", {
      method: "POST",
      body: formData,
      headers: {
        Authorization:
          localStorage.getItem("token") || "",
      },
    })
      .then(async (response) => {
        const data = await response.json();
        observer.next(data);
        observer.complete();
      })
      .catch((err) => observer.error(err));
  });
});