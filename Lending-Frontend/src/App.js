import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import ForgotPassword from "./Pages/Forgot Password";
import ResetPassword from "./Pages/Reset Password";
import Signup from "./Pages/SignUp/SignUp";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "react-toastify/dist/ReactToastify.min.css";
import { ToastContainer } from "react-toastify";
import Dashboard from "./Dashboard";
import { useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";
import Admin from "./Admin";

function App() {
  const theme = createTheme({
    typography: { fontFamily: "Mulish" },
  });

  const { user } = useSelector((state) => state.auth);
  const { loader } = useSelector((state) => state);
  return (
    <ThemeProvider theme={theme}>
      {loader && (
        <div
          style={{
            zIndex: 1000,
            position: "fixed",
            backgroundColor: "rgba(0,0,0,0.7)",
            top: 0,
            height: "100vh",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <ClipLoader color="#4267b2" size={110} />
          <p style={{ color: "#4267b2" }}>Please Wait...</p>
        </div>
      )}
      <ToastContainer
        position="top-center"
        autoClose={10000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        limit={3}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover={false}
      />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={
              user ? (
                <Navigate
                  to={user.role === "user" ? "/dashboard" : "/admin"}
                  replace
                />
              ) : (
                <Login />
              )
            }
          />
          <Route
            path="/forgot-password"
            element={
              user ? (
                <Navigate
                  to={user.role === "user" ? "/dashboard" : "/admin"}
                  replace
                />
              ) : (
                <ForgotPassword />
              )
            }
          />
          <Route path="/sign-up" element={<Signup />} />
          <Route
            path="/dashboard/*"
            element={
              user && user?.role === "user" ? (
                <Dashboard />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route path="/reset-password/:id" element={<ResetPassword />} />
          <Route
            path="/admin/*"
            element={
              user && user?.role === "admin" ? (
                <Admin />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
