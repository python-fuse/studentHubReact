import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ChakraBaseProvider } from "@chakra-ui/react";
import theme from "./chakra/theme.js";
import { AuthProvider } from "./auth/AuthProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraBaseProvider theme={theme}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ChakraBaseProvider>
  </React.StrictMode>
);
