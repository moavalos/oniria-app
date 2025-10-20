import { Routes, Route } from "react-router-dom";
import { Login, MainLayout, Register } from "../pages";
import PrivateRoute from "../features/auth/components/PrivateRoute";

export default function AuthRoute() {
  return (
    <Routes>
      <Route index element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/home"
        element={
          <PrivateRoute>
            <MainLayout />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}
