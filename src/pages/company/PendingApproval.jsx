
import { Link } from "react-router-dom";
import { logoutUser } from "../../services/authService";

export default function PendingApproval() {
  async function handleLogout() {
    try {
      await logoutUser();
    } catch (error) {
      console.error("Logout failed:", error.message);
    }
  }

  return (
    <main style={styles.page}>
      <section style={styles.card}>
        <div style={styles.icon}>◷</div>

        <p style={styles.label}>COMPANY VERIFICATION</p>

        <h1>Application under review</h1>

        <p style={styles.description}>
          Thank you for registering with CampusOS.
          Your company account is awaiting administrator approval.
          Once approved, you'll be able to access your company workspace
          and publish opportunities.
        </p>

        <div style={styles.status}>
          <span style={styles.dot}></span>
          Pending approval
        </div>

        <button onClick={handleLogout} style={styles.button}>
          Sign out
        </button>

        <Link to="/welcome" style={styles.link}>
          Back to CampusOS
        </Link>
      </section>
    </main>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "24px",
    background: "#f7f5ff",
    fontFamily: "Inter, sans-serif",
  },
  card: {
    width: "100%",
    maxWidth: "480px",
    padding: "42px 32px",
    borderRadius: "20px",
    background: "#fff",
    textAlign: "center",
    boxShadow: "0 15px 50px rgba(64,42,120,0.08)",
  },
  icon: {
    fontSize: "44px",
    color: "#7952d5",
    marginBottom: "15px",
  },
  label: {
    color: "#7952d5",
    fontSize: "11px",
    fontWeight: "700",
    letterSpacing: "1.5px",
  },
  description: {
    color: "#77738a",
    fontSize: "14px",
    lineHeight: "1.8",
    margin: "18px 0",
  },
  status: {
    display: "inline-flex",
    alignItems: "center",
    gap: "9px",
    padding: "10px 16px",
    borderRadius: "30px",
    background: "#fff6e5",
    color: "#94651b",
    fontSize: "13px",
    margin: "10px 0 25px",
  },
  dot: {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    background: "#d89b32",
  },
  button: {
    display: "block",
    width: "100%",
    padding: "13px",
    border: "none",
    borderRadius: "9px",
    background: "#7952d5",
    color: "#fff",
    fontWeight: "700",
    cursor: "pointer",
  },
  link: {
    display: "inline-block",
    marginTop: "20px",
    color: "#7952d5",
    fontSize: "13px",
    textDecoration: "none",
  },
};
