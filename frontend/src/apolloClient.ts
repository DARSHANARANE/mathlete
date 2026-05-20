import {
  ApolloClient,
  InMemoryCache,
} from "@apollo/client";

import { setContext } from "@apollo/client/link/context";
import { createUploadLink } from "apollo-upload-client";

const uploadLink = createUploadLink({
  uri: import.meta.env.VITE_API_URL,
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token");

  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(uploadLink),
  cache: new InMemoryCache(),
});

export default client;