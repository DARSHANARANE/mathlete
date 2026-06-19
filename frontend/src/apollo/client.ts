import {
  ApolloClient,
  InMemoryCache,
  from,
  HttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { ErrorLink } from "@apollo/client/link/error";
import { CombinedGraphQLErrors } from "@apollo/client/errors";

const httpLink = new HttpLink({
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

const errorLink = new ErrorLink(({ error }) => {
  if (CombinedGraphQLErrors.is(error)) {
    const unauthorized = error.errors.some((err) =>
      err.message.toLowerCase().includes("unauthorized")
    );

    if (unauthorized) {
      localStorage.removeItem("token");

      if (window.location.pathname !== "/admin/login") {
        window.location.href = "/admin/login";
      }
    }
  }
});

const client = new ApolloClient({
  link: from([
    errorLink,
    authLink,
    httpLink,
  ]),
  cache: new InMemoryCache(),
});

export default client;