
import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import SplashScreen from "./pages/public/SplashScreen";
import Welcome from "./pages/public/Welcome";
import Login from "./pages/public/Login";
import PendingApproval from "./pages/company/PendingApproval";
import Jobs from "./pages/student/Jobs";
import StudentDashboard from "./pages/student/StudentDashboard";
import CompanyDashboard from "./pages/company/CompanyDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import StudentProfile from "./pages/student/StudentProfile";
import ProtectedRoute from "./components/auth/ProtectedRoute";

function App() {
  const [showSplash, setShowSplash] = useState(true);

  if (showSplash) {
    return (
      <SplashScreen onFinish={() => setShowSplash(false)} />
    );
  }

  return (
    <Routes>
      {/* Public pages */}
      <Route path="/" element={<Navigate to="/welcome" replace />} />
      <Route path="/welcome" element={<Welcome />} />
      <Route path="/login/:role" element={<Login />} />

      {/* Student dashboard */}
      <Route
        path="/student/dashboard"
        element={
          <ProtectedRoute allowedRole="student">
            <StudentDashboard />
          </ProtectedRoute>
        }
      />

      {/* Company dashboard */}
      <Route
        path="/company/dashboard"
        element={
          <ProtectedRoute allowedRole="company">
            <CompanyDashboard />
          </ProtectedRoute>
        }
      />

      {/* Company pending approval */}
      <Route
        path="/company/pending-approval"
        element={
          <ProtectedRoute
            allowedRole="company"
            allowPending={true}
          >
            <PendingApproval />
          </ProtectedRoute>
        }
      />

      {/* Admin dashboard */}
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute allowedRole="admin">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
     <Route
  path="/student/profile"
  element={
    <ProtectedRoute allowedRole="student">
      <StudentProfile />
    </ProtectedRoute>
  }
/>
<Route
  path="/student/jobs"
  element={
    <ProtectedRoute allowedRole="student">
      <Jobs />
    </ProtectedRoute>
  }
/>
      {/* Unknown routes */}
      <Route
        path="*"
        element={<Navigate to="/welcome" replace />}
      />
    </Routes>
  );
}

export default App;
