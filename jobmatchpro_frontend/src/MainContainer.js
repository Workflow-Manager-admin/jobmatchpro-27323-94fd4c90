import React, { useState } from "react";
import "./MainContainer.css";

/**
 * JobMatchPro Main Container
 * Dashboard layout with sidebar and main content sections.
 * - Sidebar navigation: Profile, Jobs, Skills, Tracker
 * - Main area: Job Feed, Skill Recommendations, Application Tracker
 * - Uses light theme and custom color palette
 */

// PUBLIC_INTERFACE
function MainContainer() {
  const [activeSection, setActiveSection] = useState("jobs");

  const sidebarItems = [
    { key: "profile", label: "Profile" },
    { key: "jobs", label: "Jobs" },
    { key: "skills", label: "Skills" },
    { key: "tracker", label: "Tracker" },
  ];

  return (
    <div className="jmp-dashboard-root">
      {/* Sidebar Navigation */}
      <aside className="jmp-sidebar">
        <div className="jmp-sidebar-logo">
          <span className="jmp-logo-accent">Job</span>
          <span>MatchPro</span>
        </div>
        <nav className="jmp-nav">
          {sidebarItems.map((item) => (
            <button
              key={item.key}
              className={`jmp-nav-item ${activeSection === item.key ? "active" : ""}`}
              onClick={() => setActiveSection(item.key)}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="jmp-main">
        <header className="jmp-main-header">
          <span className="jmp-welcome">Welcome back,</span>
          <span className="jmp-user">Alex Doe</span>
        </header>
        <div className="jmp-main-sections">
          {activeSection === "profile" && (
            <section className="jmp-section jmp-section-profile">
              <h2>Profile</h2>
              <div className="jmp-profile-summary">
                {/* Demo: Basic Profile Details */}
                <img
                  src="https://www.gravatar.com/avatar?d=mp"
                  alt="user avatar"
                  className="jmp-profile-avatar"
                />
                <div>
                  <div className="jmp-profile-name">Alex Doe</div>
                  <div className="jmp-profile-role">Software Engineer</div>
                  <div className="jmp-profile-skills-label">Key Skills:</div>
                  <div className="jmp-profile-skills">JavaScript, React, Node.js</div>
                </div>
              </div>
              <div className="jmp-profile-actions">
                <button className="jmp-cta">Update Profile</button>
              </div>
            </section>
          )}

          {activeSection === "jobs" && (
            <section className="jmp-section jmp-section-jobs">
              <h2>
                Personalized Job Feed
                <span className="jmp-section-accent">🧭</span>
              </h2>
              <div className="jmp-job-list">
                {/* Sample job cards */}
                <JobCard
                  title="Frontend Developer"
                  company="Techo Solutions"
                  location="Remote"
                  tags={["React", "UI/UX"]}
                  applied={false}
                />
                <JobCard
                  title="Full Stack Engineer"
                  company="Innovatax"
                  location="San Francisco, CA"
                  tags={["Node.js", "React", "Cloud"]}
                  applied={true}
                />
                <JobCard
                  title="Junior Software Engineer"
                  company="DevTools Inc."
                  location="Austin, TX"
                  tags={["JavaScript", "API"]}
                  applied={false}
                />
              </div>
            </section>
          )}

          {activeSection === "skills" && (
            <section className="jmp-section jmp-section-skills">
              <h2>
                Skill Recommendations
                <span className="jmp-section-accent">🌱</span>
              </h2>
              <div className="jmp-skill-list">
                <SkillCard skill="TypeScript" reason="Popular in modern web dev roles" />
                <SkillCard skill="GraphQL" reason="In demand for API management" />
                <SkillCard skill="CI/CD" reason="Automates deployment & testing" />
              </div>
            </section>
          )}

          {activeSection === "tracker" && (
            <section className="jmp-section jmp-section-tracker">
              <h2>
                Application Tracker
                <span className="jmp-section-accent">📊</span>
              </h2>
              <ApplicationTracker
                applications={[
                  {
                    job: "Frontend Developer",
                    company: "Techo Solutions",
                    status: "Interviewing",
                  },
                  {
                    job: "Full Stack Engineer",
                    company: "Innovatax",
                    status: "Applied",
                  },
                  {
                    job: "Junior Software Engineer",
                    company: "DevTools Inc.",
                    status: "Rejected",
                  },
                ]}
              />
            </section>
          )}
        </div>
      </main>
    </div>
  );
}

/*
 * Presentational: Individual Job Card
 */
function JobCard({ title, company, location, tags, applied }) {
  return (
    <div className={`jmp-job-card${applied ? " applied" : ""}`}>
      <div className="jmp-job-title">{title}</div>
      <div className="jmp-job-meta">
        <span className="jmp-job-company">{company}</span>
        <span className="jmp-job-location">{location}</span>
      </div>
      <div className="jmp-job-tags">
        {tags.map((tag) => (
          <span className="jmp-job-tag" key={tag}>
            {tag}
          </span>
        ))}
      </div>
      <button className={`jmp-cta${applied ? " disabled" : ""}`} disabled={applied}>
        {applied ? "Already Applied" : "Apply Now"}
      </button>
    </div>
  );
}

/*
 * Presentational: Skill Recommendation Card
 */
function SkillCard({ skill, reason }) {
  return (
    <div className="jmp-skill-card">
      <div className="jmp-skill-name">{skill}</div>
      <div className="jmp-skill-reason">{reason}</div>
      <button className="jmp-cta-secondary">Learn More</button>
    </div>
  );
}

/*
 * Presentational: Application Tracker Table
 */
function ApplicationTracker({ applications }) {
  return (
    <div className="jmp-tracker-table-wrapper">
      <table className="jmp-tracker-table">
        <thead>
          <tr>
            <th>Position</th>
            <th>Company</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((app, idx) => (
            <tr key={idx} className={`status-${app.status.toLowerCase()}`}>
              <td>{app.job}</td>
              <td>{app.company}</td>
              <td>
                <span className={`jmp-status-badge jmp-status-${app.status.toLowerCase()}`}>
                  {app.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MainContainer;
