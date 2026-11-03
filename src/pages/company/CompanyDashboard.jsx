
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabaseClient";

export default function CompanyDashboard() {
  const navigate = useNavigate();

  async function handleLogout() {
    const { error } = await supabase.auth.signOut();

    if (error) {
      alert(error.message);
      return;
    }

    navigate("/welcome", { replace: true });
  }

  const modules = [
    {
      icon: "💼",
      title: "Post a Job",
      description: "Create and publish job opportunities.",
      path: "/company/post-job",
    },
    {
      icon: "🎓",
      title: "Post Internship",
      description: "Share internship opportunities with students.",
      path: "/company/post-internship",
    },
    {
      icon: "👥",
      title: "Applicants",
      description: "Review and manage applications.",
      path: "/company/applicants",
    },
    {
      icon: "🌟",
      title: "Talent Pool",
      description: "Discover potential student talent.",
      path: "/company/talent-pool",
    },
    {
      icon: "👤",
      title: "Company Profile",
      description: "Manage your company information.",
      path: "/company/profile",
    },
    {
      icon: "💬",
      title: "Messages",
      description: "Connect with students.",
      path: "/company/messages",
    },
  ];

  return (
    <main style={styles.page}>
      <header style={styles.header}>
        <div>
          <p style={styles.eyebrow}>CAMPUSOS COMPANY PORTAL</p>
          <h1 style={styles.heading}>Company Dashboard</h1>
          <p style={styles.subtitle}>
            Manage opportunities and connect with campus talent.
          </p>
        </div>

        <button style={styles.logout} onClick={handleLogout}>
          Sign out
        </button>
      </header>

      <section style={styles.welcome}>
        <p style={styles.welcomeLabel}>YOUR COMPANY WORKSPACE</p>
        <h2>Welcome to CampusOS 👋</h2>
        <p>
          Find talented students, publish opportunities and
          manage your recruitment activities.
        </p>
      </section>

      <section>
        <h2 style={styles.sectionTitle}>Quick Access</h2>

        <div style={styles.grid}>
          {modules.map((module) => (
            <button
              key={module.title}
              style={styles.card}
              onClick={() => navigate(module.path)}
            >
              <span style={styles.icon}>{module.icon}</span>

              <h3 style={styles.cardTitle}>
                {module.title}
              </h3>

              <p style={styles.description}>
                {module.description}
              </p>

              <span style={styles.link}>
                Open section →
              </span>
            </button>
          ))}
        </div>
      </section>

      <footer style={styles.footer}>
        CampusOS · Company Workspace
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
    lineHeight: "1.7",
  },
  welcomeLabel: {
    fontSize: "11px",
    letterSpacing: "1.5px",
    fontWeight: "700",
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
  card: {
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
  description: {
    fontSize: "13px",
    lineHeight: "1.6",
    color: "#777286",
    minHeight: "42px",
  },
  link: {
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
