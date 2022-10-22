import "./App.css";
import React, { useState, useEffect } from "react";
import { getToken1, onMessageListener } from "./firebase";
import { ReactQueryDevtools } from "react-query/devtools";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Login from "./Pages/Login/Login";
import Signup from "./Pages/Signup/Signup";
import Home from "./Pages/Home/Home";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import AddPayment from "./Pages/AddPayment/AddPayment";
import EditPayment from "./Pages/EditPayment/EditPayment";
import { AuthProvider } from "./Context/AuthContext";
import AuthGuard from "./Guard/AuthGuard";
import UnprotectedGuard from "./Guard/UnprotectedGuard";
function App() {
  const queryClient = new QueryClient();

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route element={<UnprotectedGuard />}>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Route>
          <Route element={<AuthGuard />}>
            <Route path="/home" element={<Home />} />
            <Route path="/addpayment" element={<AddPayment />} />
            <Route path="/editpayment" element={<EditPayment />} />
          </Route>
        </Routes>
        <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default App;
