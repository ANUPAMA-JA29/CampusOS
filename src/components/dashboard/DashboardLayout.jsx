
import { NavLink, useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabaseClient";
import { useAuth } from "../../context/AuthContext";
import {
  LayoutDashboard,
  UserRound,
  BriefcaseBusiness,
  GraduationCap,
  FileText,
  Store,
  MessageCircle,
  Bell,
  Users,
  Building2,
  FolderOpen,
  ChartNoAxesCombined,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";
import "./DashboardLayout.css";

const navigation = {
  student: [
    { label: "Dashboard", path: "/student/dashboard", icon: LayoutDashboard },
    { label: "My Profile", path: "/student/profile", icon: UserRound },
    { label: "Jobs", path: "/student/jobs", icon: BriefcaseBusiness },
    { label: "Internships", path: "/student/internships", icon: GraduationCap },
    { label: "Applications", path: "/student/applications", icon: FileText },
    { label: "Marketplace", path: "/student/marketplace", icon: Store },
    { label: "Messages", path: "/student/messages", icon: MessageCircle },
    { label: "Notifications", path: "/student/notifications", icon: Bell },
  ],

  company: [
    { label: "Dashboard", path: "/company/dashboard", icon: LayoutDashboard },
    { label: "Company Profile", path: "/company/profile", icon: Building2 },
    { label: "Post a Job", path: "/company/post-job", icon: BriefcaseBusiness },
    { label: "Post Internship", path: "/company/post-internship", icon: GraduationCap },
    { label: "Applicants", path: "/company/applicants", icon: Users },
    { label: "Talent Pool", path: "/company/talent-pool", icon: UserRound },
    { label: "Messages", path: "/company/messages", icon: MessageCircle },
  ],

  admin: [
    { label: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
    { label: "Students", path: "/admin/students", icon: Users },
    { label: "Companies", path: "/admin/companies", icon: Building2 },
    { label: "Opportunities", path: "/admin/opportunities", icon: BriefcaseBusiness },
    { label: "Categories", path: "/admin/categories", icon: FolderOpen },
    { label: "Marketplace", path: "/admin/marketplace", icon: Store },
    { label: "Reports", path: "/admin/reports", icon: ChartNoAxesCombined },
  ],
};

const roleNames = {
  student: "Student Portal",
  company: "Company Portal",
  admin: "Administration",
};

export default function DashboardLayout({
  role,
  title,
  subtitle,
  children,
}) {
  const navigate = useNavigate();
  const { profile } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const links = navigation[role] || [];
  const displayName =
    profile?.full_name ||
    profile?.company_name ||
    profile?.email ||
    "CampusOS User";

  async function handleLogout() {
    const { error } = await supabase.auth.signOut();

    if (error) {
      alert(error.message);
      return;
    }

    navigate("/welcome", { replace: true });
  }

  return (
    <div className="dashboard-shell">
      {menuOpen && (
        <button
          className="sidebar-overlay"
          aria-label="Close navigation"
          onClick={() => setMenuOpen(false)}
        />
      )}

      <aside className={`dashboard-sidebar ${menuOpen ? "sidebar-open" : ""}`}>
        <div className="sidebar-brand">
          <span className="brand-mark">C</span>
          <span>Campus<span className="brand-accent">OS</span></span>

          <button
            className="mobile-close"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        <div className="sidebar-portal">
          <span className="portal-dot" />
          {roleNames[role]}
        </div>

        <nav className="sidebar-navigation">
          <p className="sidebar-label">WORKSPACE</p>

          {links.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `sidebar-link ${isActive ? "sidebar-link-active" : ""}`
                }
              >
                <Icon size={19} strokeWidth={1.8} />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        <div className="sidebar-bottom">
          <div className="sidebar-user">
            <div className="user-avatar">
              {displayName.charAt(0).toUpperCase()}
            </div>

            <div className="user-details">
              <strong>{displayName}</strong>
              <span>{roleNames[role]}</span>
            </div>
          </div>

          <button className="sidebar-logout" onClick={handleLogout}>
            <LogOut size={18} />
            <span>Sign out</span>
          </button>
        </div>
      </aside>

      <div className="dashboard-main">
        <header className="dashboard-topbar">
          <button
            className="mobile-menu"
            onClick={() => setMenuOpen(true)}
            aria-label="Open navigation"
          >
            <Menu size={22} />
          </button>

          <div>
            <p className="topbar-eyebrow">{roleNames[role]}</p>
            <h1>{title}</h1>
          </div>

          <div className="topbar-profile">
            <div className="topbar-avatar">
              {displayName.charAt(0).toUpperCase()}
            </div>
            <div>
              <strong>{displayName}</strong>
              <span>{profile?.email || ""}</span>
            </div>
          </div>
        </header>

        <main className="dashboard-content">
          {subtitle && <p className="dashboard-subtitle">{subtitle}</p>}
          {children}
        </main>
      </div>
    </div>
  );
}
