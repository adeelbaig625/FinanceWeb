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
function App() {
  const queryClient = new QueryClient();

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/home"
            element={
              <AuthGuard>
                <Home />
              </AuthGuard>
            }
          />
          <Route
            path="/addpayment"
            element={
              <AuthGuard>
                <AddPayment />
              </AuthGuard>
            }
          />
          <Route
            path="/editpayment/:paymentid"
            element={
              <AuthGuard>
                <EditPayment />
              </AuthGuard>
            }
          />
        </Routes>
        <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default App;
