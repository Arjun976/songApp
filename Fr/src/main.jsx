// src/main.jsx or src/index.js
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./context/AuthContext.jsx";
import "./index.css";
import {GoogleOAuthProvider} from "@react-oauth/google";
import { BrowserRouter } from "react-router-dom"; 
const ClientId = "854588636300-mite8nehqharn9avntacgtoh736rc914.apps.googleusercontent.com";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={ClientId}>
      <BrowserRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </BrowserRouter>
    </GoogleOAuthProvider>
  </React.StrictMode>
);