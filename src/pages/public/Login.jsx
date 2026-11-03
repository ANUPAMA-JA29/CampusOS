
import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

import { registerUser, loginUser } from "../../services/authService";
import "./Login.css";

export default function Login() {
  const { role: routeRole } = useParams();
  const navigate = useNavigate();

  const role = ["student", "company", "admin"].includes(routeRole)
    ? routeRole
    : "student";

  const [isRegistering, setIsRegistering] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const roleName = role.charAt(0).toUpperCase() + role.slice(1);

  async function handleSubmit(event) {
    event.preventDefault();

    setMessage("");
    setErrorMessage("");

    // Registration validation
    if (isRegistering) {
      if (role === "admin") {
        setErrorMessage(
          "Admin accounts cannot be created through public registration."
        );
        return;
      }

      if (password !== confirmPassword) {
        setErrorMessage("Passwords do not match.");
        return;
      }

      if (password.length < 8) {
        setErrorMessage(
          "Password must contain at least 8 characters."
        );
        return;
      }
    }

    setLoading(true);

    try {
      // REGISTRATION
      if (isRegistering) {
        const data = await registerUser({
          fullName,
          email,
          password,
          role,
        });

        if (data.session) {
          setMessage(
            role === "company"
              ? "Registration successful. Your company account is awaiting admin approval."
              : "Registration successful. You can now access CampusOS."
          );
        } else {
          setMessage(
            "Registration successful! Check your email and click the confirmation link before logging in."
          );
        }

        setIsRegistering(false);
        setPassword("");
        setConfirmPassword("");
      }

      // LOGIN
      else {
        const { profile } = await loginUser({
          email,
          password,
          expectedRole: role,
        });

        // Redirect pending companies
        if (
          profile.role === "company" &&
          profile.account_status === "pending"
        ) {
          navigate("/company/pending-approval", {
            replace: true,
          });
          return;
        }

        // Redirect other approved accounts
        const dashboardPaths = {
          student: "/student/dashboard",
          company: "/company/dashboard",
          admin: "/admin/dashboard",
        };

        navigate(dashboardPaths[profile.role] || "/welcome", {
          replace: true,
        });
      }
    } catch (error) {
      setErrorMessage(
        error.message || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="auth-page">
      <section className="auth-card">

        <Link to="/welcome" className="auth-brand">
          Campus<span>OS</span>
        </Link>

        <p className="auth-eyebrow">
          {roleName} Portal
        </p>

        <h1>
          {isRegistering
            ? "Create your account"
            : "Welcome back"}
        </h1>

        <p className="auth-description">
          {isRegistering
            ? `Join the CampusOS ${role} community.`
            : `Sign in to continue to your ${role} workspace.`}
        </p>

        {/* Error message */}
        {errorMessage && (
          <div
            className="auth-message auth-error"
            role="alert"
          >
            {errorMessage}
          </div>
        )}

        {/* Success message */}
        {message && (
          <div
            className="auth-message auth-success"
            role="status"
          >
            {message}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="auth-form"
        >

          {/* Full name */}
          {isRegistering && (
            <div className="auth-field">
              <label htmlFor="fullName">
                Full name
              </label>

              <input
                id="fullName"
                type="text"
                placeholder="Enter your full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>
          )}

          {/* Email */}
          <div className="auth-field">
            <label htmlFor="email">
              Email address
            </label>

            <input
              id="email"
              type="email"
              placeholder={
                role === "student"
                  ? "yourname@gecskp.ac.in"
                  : "Enter your email address"
              }
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            {role === "student" && isRegistering && (
              <small>
                Use your official @gecskp.ac.in college email.
              </small>
            )}
          </div>

          {/* Password */}
          <div className="auth-field">
            <label htmlFor="password">
              Password
            </label>

            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={8}
              required
            />
          </div>

          {/* Confirm password */}
          {isRegistering && (
            <div className="auth-field">
              <label htmlFor="confirmPassword">
                Confirm password
              </label>

              <input
                id="confirmPassword"
                type="password"
                placeholder="Re-enter your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                minLength={8}
                required
              />
            </div>
          )}

          {/* Submit */}
          <button
            className="auth-submit"
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Please wait..."
              : isRegistering
              ? "Create account"
              : "Sign in"}
          </button>

        </form>

        {/* Registration toggle */}
        {role !== "admin" && (
          <p className="auth-switch">
            {isRegistering
              ? "Already have an account?"
              : "Don't have an account?"}{" "}

            <button
              type="button"
              onClick={() => {
                setIsRegistering(!isRegistering);
                setMessage("");
                setErrorMessage("");
              }}
            >
              {isRegistering ? "Sign in" : "Register"}
            </button>
          </p>
        )}

        {/* Admin restriction */}
        {role === "admin" && (
          <p className="auth-admin-note">
            Admin access is restricted to authorised CampusOS administrators.
          </p>
        )}

        <Link to="/welcome" className="auth-back">
          ← Back to CampusOS
        </Link>

      </section>
    </main>
  );
}
