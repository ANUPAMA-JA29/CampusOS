import { Sparkles, Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">

      <Link to="/welcome" className="brand">
        <span className="brand-icon">
          <Sparkles size={22} />
        </span>
        CampusOS
      </Link>

      <div className={`nav-links ${menuOpen ? "active" : ""}`}>
        <a href="#home" onClick={() => setMenuOpen(false)}>Home</a>
        <a href="#features" onClick={() => setMenuOpen(false)}>Features</a>
        <a href="#how-it-works" onClick={() => setMenuOpen(false)}>How it works</a>
        <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
      </div>

      <Link to="/login/student" className="nav-button">
        Get Started
      </Link>

      <button
        className="mobile-menu"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <X /> : <Menu />}
      </button>

    </nav>
  );
}

export default Navbar;