import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./Register.jsx";
import { ToastContainer } from "react-toastify";
import Login from "./Login.jsx";
import Admin from "./Admin.jsx";
import AccessDenied from "./AccessDenied.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";

let user =
  sessionStorage.getItem("user") != null
    ? JSON.parse(sessionStorage.getItem("user"))
    : "";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ToastContainer theme="colored" />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/403" element={<AccessDenied />}></Route>
        <Route
          path="/admin"
          element={
            <ProtectedRoute user={user} redirectPath="/login">
              <Admin />
            </ProtectedRoute>
          }></Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
