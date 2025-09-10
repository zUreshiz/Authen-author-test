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
import ManagedProduct from "./ManagedProduct.jsx";
import ManagedCustomer from "./ManagedCustomer.jsx";

let user =
  sessionStorage.getItem("user") != null
    ? JSON.parse(sessionStorage.getItem("user"))
    : "";
let role = user.role;
let accessAdminRoles = ["admin", "employee"];

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ToastContainer theme="colored" />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/403" element={<AccessDenied />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute
              user={user}
              isAccess={!!user && accessAdminRoles.includes(role)}
              redirectPath="/login"></ProtectedRoute>
          }>
          <Route index element={<Admin />} />
          <Route path="product" element={<ManagedProduct />} />
          <Route path="customer" element={<ManagedCustomer />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
