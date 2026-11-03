import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import {
  GraduationCap,
  Building2,
  ShieldCheck,
  ArrowRight,
  Users,
  Lightbulb,
  Network
} from "lucide-react";

import Navbar from "../../components/landing/Navbar";
import Hero from "../../components/landing/Hero";
import FeatureCards from "../../components/landing/FeatureCards";

function Welcome() {

  const roles = [
    {
      title: "Student",
      description:
        "Discover opportunities, showcase your skills and make the most of your resources.",
      action: "Continue as Student",
      icon: GraduationCap,
      color: "purple",
      path: "/login/student"
    },
    {
      title: "Company",
      description:
        "Connect with talented students, publish opportunities and find the right people.",
      action: "Continue as Company",
      icon: Building2,
      color: "blue",
      path: "/login/company"
    },
    {
      title: "Admin",
      description:
        "Manage the campus ecosystem, verify users and maintain a trusted community.",
      action: "Admin Access",
      icon: ShieldCheck,
      color: "green",
      path: "/login/admin"
    }
  ];

  return (
    <div className="landing-page">

      <Navbar />

      <main>

        <Hero />

        <FeatureCards />

        <section className="ecosystem section" id="about">

          <div className="section-heading">
            <span className="section-label">THE CAMPUSOS ECOSYSTEM</span>

            <h2>
              More than a platform.
              <span> A connected community.</span>
            </h2>

            <p>
              Bringing student talent, company requirements and
              campus resources together.
            </p>
          </div>

          <div className="ecosystem-grid">

            <div className="ecosystem-item">
              <Users size={30} />
              <h3>Student Talent</h3>
              <p>Skills, experience, creativity and potential.</p>
            </div>

            <div className="ecosystem-item">
              <Lightbulb size={30} />
              <h3>Opportunities</h3>
              <p>Internships, projects and paid work.</p>
            </div>

            <div className="ecosystem-item">
              <Network size={30} />
              <h3>Resource Sharing</h3>
              <p>Connecting people with the resources they need.</p>
            </div>

          </div>

        </section>

        <section className="role-section section" id="roles">

          <div className="section-heading">

            <span className="section-label">GET STARTED</span>

            <h2>
              Your journey starts <span>here.</span>
            </h2>

            <p>
              Choose your role to explore the CampusOS experience.
            </p>

          </div>

          <div className="role-grid">

            {roles.map((role, index) => {

              const Icon = role.icon;

              return (
                <motion.div
                  className="role-card"
                  key={role.title}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                >

                  <div className={`role-icon ${role.color}`}>
                    <Icon size={32} />
                  </div>

                  <h3>{role.title}</h3>

                  <p>{role.description}</p>

                  <Link to={role.path} className="role-button">
                    {role.action}
                    <ArrowRight size={17} />
                  </Link>

                </motion.div>

              );

            })}

          </div>

        </section>

        <section className="final-cta">

          <h2>Make more of your campus experience.</h2>

          <p>
            Opportunities are closer than you think.
            Discover them with CampusOS.
          </p>

          <a href="#roles" className="primary-button">
            Get Started <ArrowRight size={18} />
          </a>

        </section>

      </main>

      <footer className="footer">

        <Link to="/welcome" className="brand">
          CampusOS
        </Link>

        <p>Connecting talent, opportunities and resources.</p>

        <span>© 2026 CampusOS. All rights reserved.</span>

      </footer>

    </div>
  );
}

export default Welcome;