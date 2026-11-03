import {
  BriefcaseBusiness,
  Laptop,
  ShoppingBag,
  ArrowUpRight
} from "lucide-react";

const features = [
  {
    number: "01",
    title: "Internships",
    description:
      "Discover internships that match your skills, interests and career goals.",
    icon: BriefcaseBusiness,
    color: "purple",
    tag: "Learn & Grow"
  },
  {
    number: "02",
    title: "Jobs & Freelance",
    description:
      "Turn your skills into opportunities through paid projects and part-time work.",
    icon: Laptop,
    color: "blue",
    tag: "Work & Earn"
  },
  {
    number: "03",
    title: "Marketplace",
    description:
      "Buy, sell, lend and borrow useful resources within your campus.",
    icon: ShoppingBag,
    color: "orange",
    tag: "Share & Save"
  }
];

function FeatureCards() {
  return (
    <section className="features section" id="features">

      <div className="section-heading">
        <span className="section-label">WHAT YOU CAN DO</span>
        <h2>Everything your campus needs, <span>in one place.</span></h2>
        <p>
          Three essential services designed to make campus life
          more connected and opportunity-driven.
        </p>
      </div>

      <div className="feature-grid">

        {features.map((feature) => {
          const Icon = feature.icon;

          return (
            <div className="feature-card" key={feature.number}>

              <div className={`feature-icon ${feature.color}`}>
                <Icon size={27} />
              </div>

              <span className="feature-number">
                {feature.number}
              </span>

              <span className="feature-tag">
                {feature.tag}
              </span>

              <h3>{feature.title}</h3>

              <p>{feature.description}</p>

              <a href="#roles" className="feature-link">
                Explore <ArrowUpRight size={17} />
              </a>

            </div>
          );
        })}

      </div>

    </section>
  );
}

export default FeatureCards;