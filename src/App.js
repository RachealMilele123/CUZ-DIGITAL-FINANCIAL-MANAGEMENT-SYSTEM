import "./App.css";
import { MantineProvider } from "@mantine/core";
import { Login } from "./auth/Login";
import { Hero } from "./landingPage/Hero";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Navigation } from "./component/NavBar";
import ContactUs from "./landingPage/contactUs";
import { ForgotPassword } from "./auth/ForgotPassword";
import { ChooseAccountType } from "./register/ChooseAccountType";
import AuthStepper from "./auth/AuthStepper";
import { Dashboard } from "./dashBoard/index.jsx";
import Balance from "./dashBoard/Balance";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute, PublicRoute } from "./routes/ProtectedRoute.js";
import { DashboardLayout, PublicLayout } from "./routes/Layout.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Transfer from "./dashBoard/Transfer.js";
import Beneficiary from "./dashBoard/Beneficiary.js";
import Notifications from "./dashBoard/Notifications.js";
import Receipts from "./dashBoard/Receipts.js";
import Aboutus from "./landingPage/Aboutus.js";
import Deposit from "./admin/Deposit.js";
import ViewDeposits from "./admin/ViewDeposits.js";

function App() {
  return (
    <MantineProvider>
      <AuthProvider>
        <Router>
          <Routes>
            {/* Public routes - show navigation bar */}
            <Route
              path="/"
              element={
                <PublicLayout>
                  <Navigation />
                  <Hero />
                </PublicLayout>
              }
            />
            <Route
              path="/contact"
              element={
                <PublicLayout>
                  <Navigation />
                  <ContactUs />
                </PublicLayout>
              }
            />

            {/* Auth routes - redirect to dashboard if already logged in */}
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <PublicLayout>
                    <Navigation />
                    <Login />
                  </PublicLayout>
                </PublicRoute>
              }
            />

            <Route
              path="/about-us"
              element={
                <PublicRoute>
                  <PublicLayout>
                    <Navigation />
                    <Aboutus />
                  </PublicLayout>
                </PublicRoute>
              }
            />
            <Route
              path="/forgot-password"
              element={
                <PublicRoute>
                  <PublicLayout>
                    <Navigation />
                    <ForgotPassword />
                  </PublicLayout>
                </PublicRoute>
              }
            />
            <Route
              path="/choose-account"
              element={
                <PublicRoute>
                  <PublicLayout>
                    <Navigation />
                    <ChooseAccountType />
                  </PublicLayout>
                </PublicRoute>
              }
            />
            <Route
              path="/register"
              element={
                <PublicRoute>
                  <PublicLayout>
                    <Navigation />
                    <AuthStepper />
                  </PublicLayout>
                </PublicRoute>
              }
            />

            {/* Protected routes - no navigation bar, require authentication */}
            <Route
              path="/overview"
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <Dashboard />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate to="balance" replace />} />
              <Route path="balance" element={<Balance />} />
              <Route path="transfer" element={<Transfer />} />
              <Route path="beneficiary" element={<Beneficiary />} />
              <Route path="notifications" element={<Notifications />} />
              <Route path="receipts" element={<Receipts />} />
              <Route path="deposit" element={<Deposit />} />
              <Route path="deposits" element={<ViewDeposits />} />
            </Route>
          </Routes>
        </Router>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </AuthProvider>
    </MantineProvider>
  );
}

export default App;
