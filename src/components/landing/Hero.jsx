import { motion } from "framer-motion";
import {
  ArrowRight,
  BriefcaseBusiness,
  GraduationCap,
  ShoppingBag,
  Sparkles
} from "lucide-react";

import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="hero" id="home">

      <div className="hero-content">

        <motion.div
          className="hero-label"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Sparkles size={15} />
          THE CAMPUS ECOSYSTEM
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          Find Opportunities.
          <br />
          <span>Earn. Share.</span>
        </motion.h1>

        <p>
          Your campus is full of opportunities, skills and resources.
          CampusOS brings them together in one trusted platform.
        </p>

        <div className="hero-actions">

          <a href="#roles" className="primary-button">
            Explore CampusOS
            <ArrowRight size={18} />
          </a>

          <a href="#features" className="secondary-button">
            Discover Features
          </a>

        </div>

        <div className="hero-trust">
          <Sparkles size={16} />
          Built for a connected campus community
        </div>

      </div>

      <motion.div
        className="hero-visual"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9 }}
      >

        <div className="visual-orbit orbit-one" />
        <div className="visual-orbit orbit-two" />

        <div className="floating-card float-top">
          <GraduationCap size={23} color="#795CE5" />
          <span>Student Opportunities</span>
        </div>

        <div className="visual-main">
          <Sparkles size={45} />
        </div>

        <div className="floating-card float-left">
          <BriefcaseBusiness size={23} color="#3989C7" />
          <span>Career & Growth</span>
        </div>

        <div className="floating-card float-right">
          <ShoppingBag size={23} color="#E88C75" />
          <span>Campus Marketplace</span>
        </div>

        <div className="visual-caption">
          <h3>One Campus.</h3>
          <p>Endless Possibilities.</p>
        </div>

      </motion.div>

    </section>
  );
}

export default Hero;