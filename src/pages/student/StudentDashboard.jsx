
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import {
  UserRound,
  BriefcaseBusiness,
  GraduationCap,
  FileText,
  Store,
  MessageCircle,
  Bell,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";

export default function StudentDashboard() {
  const navigate = useNavigate();
  const { profile } = useAuth();

  const modules = [
    {
      title: "My Profile",
      description: "Build and manage your student profile.",
      icon: UserRound,
      path: "/student/profile",
      color: "#8056d9",
      background: "#f1eaff",
    },
    {
      title: "Jobs",
      description: "Explore job opportunities that match your skills.",
      icon: BriefcaseBusiness,
      path: "/student/jobs",
      color: "#3984c6",
      background: "#eaf4ff",
    },
    {
      title: "Internships",
      description: "Discover internships and gain practical experience.",
      icon: GraduationCap,
      path: "/student/internships",
      color: "#299c82",
      background: "#e7f8f2",
    },
    {
      title: "Applications",
      description: "Track your submitted job and internship applications.",
      icon: FileText,
      path: "/student/applications",
      color: "#d28b35",
      background: "#fff4e5",
    },
    {
      title: "Marketplace",
      description: "Explore products and services in your campus.",
      icon: Store,
      path: "/student/marketplace",
      color: "#d16a91",
      background: "#fff0f5",
    },
    {
      title: "Messages",
      description: "Stay connected with companies and campus members.",
      icon: MessageCircle,
      path: "/student/messages",
      color: "#6874c9",
      background: "#eef0ff",
    },
    {
      title: "Notifications",
      description: "Stay updated with important campus activities.",
      icon: Bell,
      path: "/student/notifications",
      color: "#c18b35",
      background: "#fff7e6",
    },
  ];

  return (
    <DashboardLayout
      role="student"
      title="Student Dashboard"
      subtitle="Your campus opportunities, all in one place."
    >
      <section className="student-welcome-banner">
        <div>
          <span className="student-banner-label">
            <Sparkles size={14} /> YOUR CAMPUSOS WORKSPACE
          </span>

          <h2>
            Welcome back{profile?.full_name ? `, ${profile.full_name}` : ""}!
          </h2>

          <p>
            Discover opportunities, build your profile and make the most
            of your campus journey.
          </p>
        </div>

        <div className="student-banner-decoration">✦</div>
      </section>

      <section className="student-quick-section">
        <div className="student-section-heading">
          <div>
            <h2>Explore CampusOS</h2>
            <p>Everything you need for your campus journey.</p>
          </div>

          <span>{modules.length} sections</span>
        </div>

        <div className="student-module-grid">
          {modules.map((module) => {
            const Icon = module.icon;

            return (
              <button
                key={module.title}
                className="student-module-card"
                onClick={() => navigate(module.path)}
              >
                <div className="student-card-top">
                  <span
                    className="student-module-icon"
                    style={{
                      color: module.color,
                      background: module.background,
                    }}
                  >
                    <Icon size={22} />
                  </span>

                  <ArrowUpRight size={18} className="student-card-arrow" />
                </div>

                <h3>{module.title}</h3>
                <p>{module.description}</p>

                <span className="student-card-link">
                  Explore section →
                </span>
              </button>
            );
          })}
        </div>
      </section>
    </DashboardLayout>
  );
}
