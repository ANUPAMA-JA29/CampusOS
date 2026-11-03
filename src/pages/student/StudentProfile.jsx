
import { useEffect, useState } from "react";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import { useAuth } from "../../context/AuthContext";
import { supabase } from "../../lib/supabaseClient";
import { Save, UserRound, GraduationCap } from "lucide-react";

export default function StudentProfile() {
  const { user, profile } = useAuth();

  const [formData, setFormData] = useState({
    college: "",
    department: "",
    academic_year: "",
    roll_number: "",
    bio: "",
    skills: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Load the student's existing details
  useEffect(() => {
    async function loadStudentProfile() {
      if (!user?.id) return;

      setLoading(true);
      setError("");

      const { data, error } = await supabase
        .from("student_profiles")
        .select("*")
        .eq("id", user.id)
        .maybeSingle();

      if (error) {
        setError(error.message);
      } else if (data) {
        setFormData({
          college: data.college || "",
          department: data.department || "",
          academic_year: data.academic_year || "",
          roll_number: data.roll_number || "",
          bio: data.bio || "",
          skills: Array.isArray(data.skills)
            ? data.skills.join(", ")
            : "",
        });
      }

      setLoading(false);
    }

    loadStudentProfile();
  }, [user?.id]);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setMessage("");
    setError("");
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!user?.id) {
      setError("Please sign in again to save your profile.");
      return;
    }

    setSaving(true);
    setMessage("");
    setError("");

    const skillsArray = formData.skills
      .split(",")
      .map((skill) => skill.trim())
      .filter((skill) => skill !== "");

    const profileData = {
      id: user.id,
      college: formData.college.trim(),
      department: formData.department.trim(),
      academic_year: formData.academic_year.trim(),
      roll_number: formData.roll_number.trim(),
      bio: formData.bio.trim(),
      skills: skillsArray,
    };

    const { error: saveError } = await supabase
      .from("student_profiles")
      .upsert(profileData, { onConflict: "id" });

    if (saveError) {
      setError(saveError.message);
    } else {
      setMessage("Your profile has been saved successfully!");
    }

    setSaving(false);
  }

  return (
    <DashboardLayout
      role="student"
      title="My Profile"
      subtitle="Manage your personal and academic information."
    >
      <div className="student-profile-container">

        <div className="profile-heading">
          <div className="profile-heading-icon">
            <UserRound size={25} />
          </div>
          <div>
            <h2>Student Profile</h2>
            <p>Keep your information updated to explore campus opportunities.</p>
          </div>
        </div>

        <div className="profile-account-card">
          <div className="profile-avatar">
            <UserRound size={30} />
          </div>

          <div>
            <h3>{profile?.full_name || "Student"}</h3>
            <p>{profile?.email || user?.email}</p>
            <span className="profile-role-label">Student Account</span>
          </div>
        </div>

        {loading ? (
          <div className="profile-loading">Loading your profile...</div>
        ) : (
          <form className="student-profile-form" onSubmit={handleSubmit}>

            <div className="profile-form-heading">
              <GraduationCap size={21} />
              <h3>Academic Information</h3>
            </div>

            <div className="profile-form-grid">
              <div className="profile-field">
                <label>College</label>
                <input
                  type="text"
                  name="college"
                  value={formData.college}
                  onChange={handleChange}
                  placeholder="Enter your college name"
                />
              </div>

              <div className="profile-field">
                <label>Department</label>
                <input
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  placeholder="e.g. Computer Science and Engineering"
                />
              </div>

              <div className="profile-field">
                <label>Academic Year</label>
                <input
                  type="text"
                  name="academic_year"
                  value={formData.academic_year}
                  onChange={handleChange}
                  placeholder="e.g. Third Year"
                />
              </div>

              <div className="profile-field">
                <label>Roll Number</label>
                <input
                  type="text"
                  name="roll_number"
                  value={formData.roll_number}
                  onChange={handleChange}
                  placeholder="Enter your roll number"
                />
              </div>
            </div>

            <div className="profile-field">
              <label>About Me</label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                placeholder="Write a short introduction about yourself..."
                rows="4"
              />
            </div>

            <div className="profile-field">
              <label>Skills</label>
              <input
                type="text"
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                placeholder="e.g. HTML, CSS, Python, Machine Learning"
              />
              <small>Separate each skill with a comma.</small>
            </div>

            {message && (
              <div className="profile-success-message">{message}</div>
            )}

            {error && (
              <div className="profile-error-message">{error}</div>
            )}

            <div className="profile-save-section">
              <button
                type="submit"
                className="profile-save-button"
                disabled={saving}
              >
                <Save size={18} />
                {saving ? "Saving..." : "Save Profile"}
              </button>
            </div>

          </form>
        )}
      </div>
    </DashboardLayout>
  );
}
