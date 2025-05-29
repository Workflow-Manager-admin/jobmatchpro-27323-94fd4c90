import React, { useState } from 'react';
import './JobMatchProContainer.css';

// Sidebar navigation items
const NAV_ITEMS = [
  { key: 'profile', label: 'Profile' },
  { key: 'jobs', label: 'Jobs' },
  { key: 'skills', label: 'Skills' },
  { key: 'tracker', label: 'Application Tracker' }
];

// Dashboard Main Container for JobMatchPro
// PUBLIC_INTERFACE
function JobMatchProContainer() {
  // Sidebar state
  const [selected, setSelected] = useState('jobs'); // Default landing

  // Render main content based on selected sidebar item
  const renderMain = () => {
    switch (selected) {
      case 'profile':
        return <ProfileMatching />;
      case 'jobs':
        return <PersonalizedJobFeed />;
      case 'skills':
        return <SkillRecommendations />;
      case 'tracker':
        return <ApplicationTracker />;
      default:
        return null;
    }
  };

  return (
    <div className="jmp-dashboard-root">
      <aside className="jmp-sidebar">
        <div className="jmp-sidebar-logo">
          <span className="jmp-logo-badge">JM</span>
          <span className="jmp-logo-title">JobMatchPro</span>
        </div>
        <nav className="jmp-nav">
          {NAV_ITEMS.map(item => (
            <button
              key={item.key}
              className={`jmp-nav-btn${selected === item.key ? ' selected' : ''}`}
              aria-current={selected === item.key}
              onClick={() => setSelected(item.key)}
            >
              {item.label}
            </button>
          ))}
        </nav>
        <div className="jmp-sidebar-footer">
          <button className="jmp-cta-secondary">
            Settings
          </button>
        </div>
      </aside>
      <main className="jmp-main-area">
        <header className="jmp-main-header">
          <h1>{NAV_ITEMS.find(i => i.key === selected)?.label}</h1>
        </header>
        <section className="jmp-main-content">{renderMain()}</section>
      </main>
    </div>
  );
}

// Section: Profile Matching
function ProfileMatching() {
  // Placeholder for profile data and matched jobs
  return (
    <div className="jmp-section">
      <h2 className="jmp-section-title">Welcome, Jane Doe!</h2>
      <p className="jmp-section-desc">
        Your profile matches <span className="jmp-stat-highlight">27</span> new job opportunities.
      </p>
      <div className="jmp-cards-list">
        <div className="jmp-card match">
          <h3>Product Designer</h3>
          <div className="jmp-card-details">
            <span>Acme Corp</span>
            <span className="jmp-match-score">Match: 85%</span>
          </div>
          <div className="jmp-card-tags">
            <span className="jmp-tag">UI/UX</span>
            <span className="jmp-tag">Figma</span>
            <span className="jmp-tag">Sketch</span>
          </div>
          <button className="jmp-cta-primary">View Job</button>
        </div>
        <div className="jmp-card match">
          <h3>Front-End Developer</h3>
          <div className="jmp-card-details">
            <span>BetaSoft</span>
            <span className="jmp-match-score">Match: 80%</span>
          </div>
          <div className="jmp-card-tags">
            <span className="jmp-tag">React</span>
            <span className="jmp-tag">JS</span>
            <span className="jmp-tag">CSS</span>
          </div>
          <button className="jmp-cta-primary">View Job</button>
        </div>
      </div>
      <button className="jmp-cta-tertiary">See All Matching Jobs</button>
    </div>
  );
}

// Section: Skill Recommendations
function SkillRecommendations() {
  const recommendedSkills = [
    { name: "TypeScript", reason: "Matches 42% more jobs" },
    { name: "AWS", reason: "Cloud roles preference" },
    { name: "Storybook", reason: "UI development trending" }
  ];

  return (
    <div className="jmp-section">
      <h2 className="jmp-section-title">Recommended Skills for You</h2>
      <ul className="jmp-skill-list">
        {recommendedSkills.map(skill => (
          <li key={skill.name} className="jmp-skill-list-item">
            <span className="jmp-tag skill">{skill.name}</span>
            <span className="jmp-skill-reason">{skill.reason}</span>
            <button className="jmp-cta-secondary">Learn</button>
          </li>
        ))}
      </ul>
      <button className="jmp-cta-tertiary">See All Recommendations</button>
    </div>
  );
}

// Section: Personalized Job Feed
function PersonalizedJobFeed() {
  const jobs = [
    {
      title: 'UI Developer',
      company: 'Pixl Studios',
      tags: ['React', 'Tailwind', 'Figma'],
      applied: false
    },
    {
      title: 'Fullstack Engineer',
      company: 'Netwise',
      tags: ['Node.js', 'React', 'MongoDB'],
      applied: true
    }
  ];

  return (
    <div className="jmp-section">
      <h2 className="jmp-section-title">Your Job Feed</h2>
      <div className="jmp-cards-list">
        {jobs.map(job => (
          <div className="jmp-card" key={job.title}>
            <h3>{job.title}</h3>
            <div className="jmp-card-details">
              <span>{job.company}</span>
              {job.applied && <span className="jmp-applied-badge">Applied</span>}
            </div>
            <div className="jmp-card-tags">
              {job.tags.map(t => (<span className="jmp-tag" key={t}>{t}</span>))}
            </div>
            {!job.applied ? (
              <button className="jmp-cta-primary">Apply</button>
            ) : (
              <button className="jmp-cta-secondary" disabled>Track Application</button>
            )}
          </div>
        ))}
      </div>
      <button className="jmp-cta-tertiary">Explore More Jobs</button>
    </div>
  );
}

// Section: Application Tracker
function ApplicationTracker() {
  const applications = [
    {
      title: 'Front-End Developer',
      company: 'Flowmatic',
      date: '2024-06-01',
      status: 'Interviewing'
    },
    {
      title: 'UI Developer',
      company: 'Pixl Studios',
      date: '2024-05-10',
      status: 'Submitted'
    }
  ];
  return (
    <div className="jmp-section">
      <h2 className="jmp-section-title">Application Tracker</h2>
      <table className="jmp-app-tracker-table">
        <thead>
          <tr>
            <th>Job</th>
            <th>Company</th>
            <th>Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {applications.map(a => (
            <tr key={a.title + a.company}>
              <td>{a.title}</td>
              <td>{a.company}</td>
              <td>{a.date}</td>
              <td>
                <span className={`jmp-status-badge ${a.status.toLowerCase()}`}>
                  {a.status}
                </span>
              </td>
              <td>
                <button className="jmp-cta-secondary">View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="jmp-cta-tertiary">Export Applications</button>
    </div>
  );
}

export default JobMatchProContainer;
