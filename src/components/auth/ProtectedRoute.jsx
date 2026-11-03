
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function ProtectedRoute({
  allowedRole,
  allowPending = false,
  children,
}) {
  const { user, profile, loading } = useAuth();

  if (loading) {
    return <div style={{ padding: "50px", textAlign: "center" }}>
      Loading CampusOS...
    </div>;
  }

  if (!user) {
    return <Navigate to={`/login/${allowedRole}`} replace />;
  }

  if (!profile) {
    return <div style={{ padding: "50px", textAlign: "center" }}>
      Unable to load your profile. Please sign in again.
    </div>;
  }

  const dashboardPaths = {
    student: "/student/dashboard",
    company: "/company/dashboard",
    admin: "/admin/dashboard",
  };

  if (profile.role !== allowedRole) {
    return (
      <Navigate
        to={dashboardPaths[profile.role] || "/welcome"}
        replace
      />
    );
  }

  if (profile.account_status === "rejected") {
    return <Navigate to="/welcome" replace />;
  }

  if (
    profile.role === "company" &&
    profile.account_status === "pending" &&
    !allowPending
  ) {
    return <Navigate to="/company/pending-approval" replace />;
  }

  if (
    profile.role === "company" &&
    profile.account_status !== "pending" &&
    allowPending
  ) {
    return <Navigate to="/company/dashboard" replace />;
  }

  return children;
}
