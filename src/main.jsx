import { createRoot } from "react-dom/client";

import "./index.css";

import { ApolloProvider } from "@apollo/client";
import { client } from "./Apollo/Apollo.js";

import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
