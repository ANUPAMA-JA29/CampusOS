
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const adminModules = [
    {
      title: "Students",
      description: "View and manage registered students.",
      icon: "🎓",
      path: "/admin/students",
    },
    {
      title: "Companies",
      description: "Review and manage company accounts.",
      icon: "🏢",
      path: "/admin/companies",
    },
    {
      title: "Opportunities",
      description: "Manage jobs and internship opportunities.",
      icon: "💼",
      path: "/admin/opportunities",
    },
    {
      title: "Categories",
      description: "Manage platform categories.",
      icon: "📂",
      path: "/admin/categories",
    },
    {
      title: "Marketplace",
      description: "Oversee the CampusOS marketplace.",
      icon: "🛍️",
      path: "/admin/marketplace",
    },
    {
      title: "Reports",
      description: "Review platform activity and reports.",
      icon: "📊",
      path: "/admin/reports",
    },
  ];

  return (
    <main style={styles.page}>
      <header style={styles.header}>
        <div>
          <p style={styles.eyebrow}>CAMPUSOS ADMINISTRATION</p>
          <h1 style={styles.heading}>Admin Dashboard</h1>
          <p style={styles.subtitle}>
            Manage your campus ecosystem from one place.
          </p>
        </div>

        <button
          style={styles.logout}
          onClick={() => navigate("/welcome")}
        >
          Back to CampusOS
        </button>
      </header>

      <section style={styles.welcome}>
        <h2>Welcome to CampusOS Administration 👋</h2>
        <p>
          Monitor and manage students, companies, opportunities
          and other platform activities.
        </p>
      </section>

      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Platform Management</h2>

        <div style={styles.grid}>
          {adminModules.map((module) => (
            <button
              key={module.title}
              style={styles.moduleCard}
              onClick={() => navigate(module.path)}
            >
              <span style={styles.icon}>{module.icon}</span>
              <h3 style={styles.cardTitle}>{module.title}</h3>
              <p style={styles.cardDescription}>
                {module.description}
              </p>
              <span style={styles.openLink}>
                Open section →
              </span>
            </button>
          ))}
        </div>
      </section>

      <footer style={styles.footer}>
        CampusOS Administration · Manage your campus ecosystem
      </footer>
    </main>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    padding: "40px 6%",
    background: "#f8f7fc",
    color: "#29243b",
    fontFamily: "Inter, sans-serif",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "20px",
    marginBottom: "35px",
  },
  eyebrow: {
    color: "#8056d9",
    fontSize: "11px",
    fontWeight: "700",
    letterSpacing: "2px",
  },
  heading: {
    fontSize: "30px",
    margin: "8px 0",
  },
  subtitle: {
    color: "#777286",
    fontSize: "14px",
  },
  logout: {
    padding: "11px 18px",
    background: "#fff",
    border: "1px solid #e7e2f0",
    borderRadius: "9px",
    cursor: "pointer",
    color: "#514477",
  },
  welcome: {
    background: "linear-gradient(120deg, #7049c6, #9877e5)",
    color: "#fff",
    padding: "30px",
    borderRadius: "16px",
    marginBottom: "35px",
  },
  section: {
    marginTop: "25px",
  },
  sectionTitle: {
    fontSize: "20px",
    marginBottom: "20px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "18px",
  },
  moduleCard: {
    textAlign: "left",
    background: "#fff",
    border: "1px solid #eeeaf5",
    borderRadius: "14px",
    padding: "24px",
    cursor: "pointer",
    color: "#29243b",
  },
  icon: {
    fontSize: "30px",
  },
  cardTitle: {
    fontSize: "17px",
    marginBottom: "8px",
  },
  cardDescription: {
    fontSize: "13px",
    lineHeight: "1.6",
    color: "#777286",
    minHeight: "42px",
  },
  openLink: {
    display: "inline-block",
    marginTop: "15px",
    color: "#8056d9",
    fontSize: "13px",
    fontWeight: "600",
  },
  footer: {
    marginTop: "50px",
    paddingTop: "20px",
    borderTop: "1px solid #e8e4ef",
    color: "#888397",
    fontSize: "12px",
  },
};
