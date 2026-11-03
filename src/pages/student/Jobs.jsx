
import { useEffect, useState } from "react";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import { useAuth } from "../../context/AuthContext";
import { supabase } from "../../lib/supabaseClient";
import {
  Search,
  MapPin,
  BriefcaseBusiness,
  Clock,
  ArrowUpRight,
  X,
} from "lucide-react";

export default function Jobs() {
  const { user } = useAuth();

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [selectedJob, setSelectedJob] = useState(null);
  const [coverLetter, setCoverLetter] = useState("");
  const [applying, setApplying] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [appliedJobIds, setAppliedJobIds] = useState([]);

  useEffect(() => {
    fetchJobs();
    fetchApplications();
  }, []);

  
async function fetchJobs() {
  setLoading(true);
  setError("");

  const { data, error } = await supabase
    .from("jobs")
    .select("*")
    .eq("status", "published")
    .order("created_at", { ascending: false });

  if (error) {
    setError(error.message);
    setLoading(false);
    return;
  }

  const companyIds = [
    ...new Set((data || []).map((job) => job.company_id)),
  ];

  let companyMap = {};

  if (companyIds.length > 0) {
    const { data: companies, error: companyError } = await supabase
      .from("company_profiles")
      .select("id, company_name")
      .in("id", companyIds);

    if (companyError) {
      setError(companyError.message);
      setLoading(false);
      return;
    }

    (companies || []).forEach((company) => {
      companyMap[company.id] = company.company_name;
    });
  }

  const jobsWithCompany = (data || []).map((job) => ({
    ...job,
    company_name: companyMap[job.company_id] || "CampusOS Company",
  }));

  setJobs(jobsWithCompany);
  setLoading(false);
}


  async function fetchApplications() {
    if (!user?.id) return;

    const { data, error } = await supabase
      .from("applications")
      .select("job_id")
      .eq("student_id", user.id);

    if (!error && data) {
      setAppliedJobIds(data.map((item) => item.job_id));
    }
  }

  const categories = [
    "All",
    ...new Set(
      jobs.map((job) => job.category).filter(Boolean)
    ),
  ];

  const filteredJobs = jobs.filter((job) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      job.title?.toLowerCase().includes(searchText) ||
      job.company_name?.toLowerCase().includes(searchText) ||
      job.location?.toLowerCase().includes(searchText);

    const matchesCategory =
      category === "All" || job.category === category;

    return matchesSearch && matchesCategory;
  });

  async function handleApply() {
    if (!selectedJob || !user?.id) return;

    setApplying(true);
    setMessage("");
    setError("");

    const { error } = await supabase
      .from("applications")
      .insert({
        job_id: selectedJob.id,
        student_id: user.id,
        cover_letter: coverLetter.trim(),
      });

    if (error) {
      if (error.code === "23505") {
        setError("You have already applied for this job.");
      } else {
        setError(error.message);
      }
    } else {
      setAppliedJobIds((previous) => [
        ...previous,
        selectedJob.id,
      ]);

      setMessage("Your application was submitted successfully!");
      setCoverLetter("");
    }

    setApplying(false);
  }

  return (
    <DashboardLayout
      role="student"
      title="Explore Jobs"
      subtitle="Discover opportunities that match your skills and career goals."
    >
      <div className="jobs-page">

        <div className="jobs-welcome">
          <div>
            <span>CAREER OPPORTUNITIES</span>
            <h2>Find your next opportunity.</h2>
            <p>
              Explore jobs shared by companies in the CampusOS network.
            </p>
          </div>
          <BriefcaseBusiness size={65} />
        </div>

        <div className="jobs-toolbar">
          <div className="jobs-search">
            <Search size={19} />
            <input
              type="text"
              placeholder="Search job title or location..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((item) => (
              <option key={item} value={item}>
                {item === "All" ? "All Categories" : item}
              </option>
            ))}
          </select>
        </div>

        <div className="jobs-results-heading">
          <h3>Available Jobs</h3>
          <span>{filteredJobs.length} opportunities</span>
        </div>

        {loading ? (
          <div className="jobs-empty">Loading jobs...</div>
        ) : error ? (
          <div className="jobs-error">{error}</div>
        ) : filteredJobs.length === 0 ? (
          <div className="jobs-empty">
            <BriefcaseBusiness size={42} />
            <h3>No jobs found</h3>
            <p>
              There are no published jobs matching your search right now.
              Please check again later.
            </p>
          </div>
        ) : (
          <div className="jobs-grid">
            {filteredJobs.map((job) => (
              <div className="job-card" key={job.id}>
                <div className="job-card-top">
                  <div className="job-company-icon">
                    <BriefcaseBusiness size={22} />
                  </div>

                  <span className="job-type">
                    {job.employment_type || "Job"}
                  </span>
                </div>

                <h3>{job.title}</h3>
                <p className="job-company-name">
                  {job.company_name || "CampusOS Company"}
                </p>

                <div className="job-card-details">
                  <span>
                    <MapPin size={15} />
                    {job.location || "Location not specified"}
                  </span>

                  <span>
                    <Clock size={15} />
                    {job.work_mode || "Work mode not specified"}
                  </span>
                </div>

                <p className="job-description">
                  {job.description?.length > 125
                    ? job.description.substring(0, 125) + "..."
                    : job.description}
                </p>

                <div className="job-card-footer">
                  {appliedJobIds.includes(job.id) ? (
                    <span className="job-applied-label">
                      Already Applied
                    </span>
                  ) : (
                    <button
                      onClick={() => {
                        setSelectedJob(job);
                        setMessage("");
                        setError("");
                      }}
                    >
                      View & Apply <ArrowUpRight size={16} />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {selectedJob && (
          <div className="job-modal-overlay">
            <div className="job-modal">
              <button
                className="job-modal-close"
                onClick={() => {
                  setSelectedJob(null);
                  setMessage("");
                  setError("");
                }}
              >
                <X size={20} />
              </button>

              <span className="job-modal-label">JOB DETAILS</span>
              <h2>{selectedJob.title}</h2>

              <p className="job-modal-company">
                {selectedJob.company_name || "CampusOS Company"}
              </p>

              <div className="job-modal-details">
                <p>
                  <MapPin size={16} />
                  {selectedJob.location || "Not specified"}
                </p>
                <p>
                  <BriefcaseBusiness size={16} />
                  {selectedJob.employment_type || "Not specified"}
                </p>
              </div>

              <h4>About the role</h4>
              <p className="job-modal-description">
                {selectedJob.description}
              </p>

              <h4>Requirements</h4>
              <p className="job-modal-description">
                {selectedJob.requirements || "No specific requirements provided."}
              </p>

              <h4>Salary range</h4>
              <p className="job-modal-description">
                {selectedJob.salary_range || "Not disclosed"}
              </p>

              <h4>Application deadline</h4>
              <p className="job-modal-description">
                {selectedJob.application_deadline || "Not specified"}
              </p>

              {message && (
                <div className="jobs-success">{message}</div>
              )}

              {error && (
                <div className="jobs-error">{error}</div>
              )}

              {!appliedJobIds.includes(selectedJob.id) && (
                <>
                  <h4>Cover Letter</h4>
                  <textarea
                    value={coverLetter}
                    onChange={(e) => setCoverLetter(e.target.value)}
                    placeholder="Introduce yourself and explain why you are interested in this opportunity..."
                    rows="4"
                  />

                  <button
                    className="job-apply-button"
                    onClick={handleApply}
                    disabled={applying}
                  >
                    {applying ? "Submitting..." : "Submit Application"}
                  </button>
                </>
              )}
            </div>
          </div>
        )}

      </div>
    </DashboardLayout>
  );
}
