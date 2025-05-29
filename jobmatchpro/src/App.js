import React, { useState } from 'react';
import './App.css';
import './dashboard.css';

// Sidebar navigation options
const NAV_OPTIONS = [
  { key: 'profile', label: 'Profile Matching', icon: '👤' },
  { key: 'jobs', label: 'Job Feed', icon: '💼' },
  { key: 'skills', label: 'Skill Recommendations', icon: '🧠' },
  { key: 'tracker', label: 'Application Tracker', icon: '📋' },
];

// PUBLIC_INTERFACE
function App() {
  // Track which section is active in the dashboard
  const [activeNav, setActiveNav] = useState('jobs');

  return (
    <div className="jobmatchpro-app light-theme">
      <SidebarNavigation
        navOptions={NAV_OPTIONS}
        activeNav={activeNav}
        onChange={setActiveNav}
      />
      <main className="jm-main">
        <Topbar />
        <section className="jm-content">
          {/* Render content based on active navigation option */}
          {activeNav === 'profile' && <ProfileMatching />}
          {activeNav === 'jobs' && <JobFeed />}
          {activeNav === 'skills' && <SkillRecommendations />}
          {activeNav === 'tracker' && <ApplicationTracker />}
        </section>
      </main>
    </div>
  );
}

// SidebarNavigation: The navigation on the left sidebar
function SidebarNavigation({ navOptions, activeNav, onChange }) {
  return (
    <nav className="jm-sidebar">
      <div className="jm-logo">
        <span className="jm-logo-mark">🌟</span>
        JobMatchPro
      </div>
      <ul className="jm-nav-list">
        {navOptions.map(option => (
          <li
            key={option.key}
            className={`jm-nav-item${activeNav === option.key ? ' active' : ''}`}
            onClick={() => onChange(option.key)}
          >
            <span className="jm-nav-icon" aria-label={option.label}>{option.icon}</span>
            <span>{option.label}</span>
          </li>
        ))}
      </ul>
    </nav>
  );
}

// Topbar: Simple user greeting + CTA
function Topbar() {
  return (
    <header className="jm-topbar">
      <span className="jm-title">Welcome back, <b>Candidate</b>!</span>
      <button className="jm-cta-btn">Complete Your Profile</button>
    </header>
  );
}

// ProfileMatching: Matches the user's profile to jobs
function ProfileMatching() {
  // Mock data
  const skills = ['JavaScript', 'React', 'UI Design'];
  const matchedPercent = 82;
  const tips = ["Add more skills for better matches.", "Keep your experience updated."];
  return (
    <div className="jm-section-box">
      <h2>Profile Matching</h2>
      <div className="jm-profile-matching">
        <div className="jm-pct-match">
          <div className="jm-pct-chart">
            <svg width="90" height="90">
              <circle
                cx="45" cy="45" r="38"
                stroke="#eee"
                strokeWidth="8"
                fill="none"
              />
              <circle
                cx="45" cy="45" r="38"
                stroke="#2D6A4F"
                strokeWidth="8"
                fill="none"
                strokeDasharray={2 * Math.PI * 38}
                strokeDashoffset={2 * Math.PI * 38 * (1 - matchedPercent / 100)}
                strokeLinecap="round"
                style={{ transition: 'stroke-dashoffset 1s' }}
              />
            </svg>
            <span className="jm-match-pct">{matchedPercent}%</span>
            <div className="jm-match-label">Match Rate</div>
          </div>
          <div className="jm-profile-skills">
            <div className="jm-profile-skill-title">Top Skills</div>
            <div>
              {skills.map(skill => (
                <span key={skill} className="jm-skill-chip">{skill}</span>
              ))}
            </div>
          </div>
        </div>
        <div className="jm-profile-tips">
          <ul>
            {tips.map(tip => <li key={tip}>{tip}</li>)}
          </ul>
        </div>
      </div>
    </div>
  );
}

// SkillRecommendations: Lists recommended skills for the user
function SkillRecommendations() {
  const recommendations = [
    { skill: 'TypeScript', reason: 'Required for modern React jobs' },
    { skill: 'Redux', reason: 'State management for large apps' },
    { skill: 'Tailwind CSS', reason: 'Sought-after in UI roles' },
    { skill: 'Node.js', reason: 'Back-end/full stack opportunities' },
  ];
  return (
    <div className="jm-section-box">
      <h2>Skill Recommendations</h2>
      <div className="jm-skills-list">
        {recommendations.map(rec => (
          <div className="jm-skill-recommend" key={rec.skill}>
            <span className="jm-skill-accent">{rec.skill}</span>
            <span className="jm-skill-reason">{rec.reason}</span>
            <button className="jm-learn-btn">Learn</button>
          </div>
        ))}
      </div>
    </div>
  );
}

// JobFeed: Personalized feed of jobs for the user
function JobFeed() {
  // Mock job data
  const jobs = [
    {
      title: 'Frontend React Developer',
      company: 'GreenTech Solutions',
      location: 'Remote',
      match: 91,
      description: 'Work on modern React apps for sustainable tech products.',
      isNew: true
    },
    {
      title: 'UI/UX Designer',
      company: 'Startup Inc.',
      location: 'New York, NY',
      match: 76,
      description: 'Design beautiful user interfaces and experiences.'
    },
    {
      title: 'Full Stack Engineer',
      company: 'InnovateX',
      location: 'San Francisco, CA',
      match: 82,
      description: 'Develop React and Node.js apps for innovative projects.'
    }
  ];
  return (
    <div className="jm-section-box">
      <h2>Personalized Job Feed</h2>
      <div className="jm-jobs-list">
        {jobs.map(job => (
          <div className="jm-job-card" key={job.title + job.company}>
            {job.isNew && <span className="jm-new-label">NEW</span>}
            <div className="jm-job-row">
              <span className="jm-job-title">{job.title}</span>
              <span className="jm-job-match" style={{
                color: job.match >= 90 ? '#2D6A4F' : '#40916C'
              }}>{job.match}% match</span>
            </div>
            <div className="jm-job-company">{job.company} <span className="jm-job-location">{job.location}</span></div>
            <span className="jm-job-desc">{job.description}</span>
            <button className="jm-apply-btn">Apply</button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ApplicationTracker: Track the jobs the user has applied to
function ApplicationTracker() {
  // Mock applications
  const applications = [
    { job: 'Frontend React Developer', company: 'GreenTech Solutions', status: 'Interview' },
    { job: 'UI/UX Designer', company: 'Startup Inc.', status: 'Submitted' },
    { job: 'Full Stack Engineer', company: 'InnovateX', status: 'Rejected' }
  ];
  // Status color helper
  const statusColor = status =>
    status === 'Interview'
      ? '#2D6A4F'
      : status === 'Submitted'
        ? '#F9C74F'
        : '#d9534f';
  return (
    <div className="jm-section-box">
      <h2>Application Tracker</h2>
      <table className="jm-tracker-table">
        <thead>
          <tr>
            <th>Job Title</th>
            <th>Company</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {applications.map(app => (
            <tr key={app.job + app.company}>
              <td>{app.job}</td>
              <td>{app.company}</td>
              <td>
                <span
                  className="jm-status-chip"
                  style={{ background: statusColor(app.status) }}
                >
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

export default App;
