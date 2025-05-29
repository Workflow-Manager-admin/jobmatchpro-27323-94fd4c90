import React, { useState } from 'react';
import './JobMatchProContainer.css';

/**
 * Simple Modal overlay component for interactive dashboard dialogs
 * Props: open (boolean), title (string), children (node), onClose (fn)
 */
function JMPModal({ open, title, onClose, children }) {
  if (!open) return null;
  return (
    <div className="jmp-modal-overlay" role="dialog" aria-modal="true">
      <div className="jmp-modal-panel" tabIndex={-1}>
        <header className="jmp-modal-header">
          <span className="jmp-modal-title">{title}</span>
          <button className="jmp-modal-close" onClick={onClose} aria-label="Close Dialog">&times;</button>
        </header>
        <div className="jmp-modal-content">{children}</div>
      </div>
    </div>
  );
}

// Sidebar navigation items
const NAV_ITEMS = [
  { key: 'profile', label: 'Profile' },
  { key: 'jobs', label: 'Jobs' },
  { key: 'skills', label: 'Skills' },
  { key: 'tracker', label: 'Application Tracker' }
];

// Dashboard Main Container for JobMatchPro
/**
 * PUBLIC_INTERFACE
 * Main container for JobMatchPro, includes overlay/modal state and handlers for all dashboard actions.
 */
function JobMatchProContainer() {
  // Sidebar state
  const [selected, setSelected] = useState('jobs'); // Default landing

  // Universal modal state: action, payload for the modal/panel dialog
  const [modal, setModal] = useState({
    open: false,
    type: null,
    payload: null
  });

  // Handler: Open modal for a given type/payload
  function handleShowModal(type, payload) {
    setModal({ open: true, type, payload });
  }
  // Handler: Hide modal
  function handleHideModal() {
    setModal({ open: false, type: null, payload: null });
  }

  // Section-specific action handler mappings
  const modalHandlers = {
    viewJob: (job) => handleShowModal('viewJob', job),
    applyJob: (job) => handleShowModal('applyJob', job),
    trackApplication: (app) => handleShowModal('trackApp', app),
    viewApplication: (app) => handleShowModal('viewApplication', app),
    learnSkill: (skill) => handleShowModal('learnSkill', skill),
    seeAll: (section) => handleShowModal('seeAll', { section }),
    exportApplications: () => handleShowModal('export', null),
  };

  // Render main content, passing handlers
  const renderMain = () => {
    switch (selected) {
      case 'profile':
        return <ProfileMatching onViewJob={modalHandlers.viewJob} onSeeAll={() => modalHandlers.seeAll('profile')} />;
      case 'jobs':
        return <PersonalizedJobFeed 
            onViewJob={modalHandlers.viewJob} 
            onApplyJob={modalHandlers.applyJob} 
            onTrackApplication={modalHandlers.trackApplication}
            onSeeAll={() => modalHandlers.seeAll('jobs')}
        />;
      case 'skills':
        return <SkillRecommendations 
            onLearnSkill={modalHandlers.learnSkill}
            onSeeAll={() => modalHandlers.seeAll('skills')}
        />;
      case 'tracker':
        return <ApplicationTracker onViewApplication={modalHandlers.viewApplication} onExport={modalHandlers.exportApplications} />;
      default:
        return null;
    }
  };

  // Render overlay modal content (maps modal.type to content)
  function renderModalContent() {
    switch (modal.type) {
      case 'viewJob':
        return (
          <>
            <h3>{modal.payload.title}</h3>
            <div><b>Company:</b> {modal.payload.company}</div>
            <div>
              <b>Tags:</b>{' '}
              {modal.payload.tags?.map((t) => <span className="jmp-tag" key={t}>{t}</span>)}
            </div>
            <div style={{marginTop: 10, color: "#777"}}>Job description preview... (static demo)</div>
          </>
        );
      case 'applyJob':
        return (
          <>
            <h3>Apply to {modal.payload.title}</h3>
            <div>Company: <b>{modal.payload.company}</b></div>
            <div style={{margin: "12px 0 0 0"}}>Successfully applied! (demo)</div>
          </>
        );
      case 'trackApp':
      case 'viewApplication':
        return (
          <>
            <h3>Application for {modal.payload.title}</h3>
            <div>Company: {modal.payload.company}</div>
            <div>Status: <span className={`jmp-status-badge ${modal.payload.status?.toLowerCase()}`}>{modal.payload.status || "In Progress"}</span></div>
            <div style={{marginTop: 10, color: "#777"}}>Status details/notes... (static demo)</div>
          </>
        );
      case 'learnSkill':
        return (
          <>
            <h3>Learn {modal.payload.name}</h3>
            <div>{modal.payload.reason}</div>
            <div style={{marginTop:10}}>Learning resources (demo): <a href="https://www.google.com/search?q=learn+{modal.payload.name}" target="_blank" rel="noopener noreferrer">{modal.payload.name} tutorials</a></div>
          </>
        );
      case 'seeAll':
        return (
          <>
            <h3>All in {modal.payload.section === "profile" ? "Profile Matches" : modal.payload.section.charAt(0).toUpperCase() + modal.payload.section.slice(1)}</h3>
            <div style={{marginTop: 10}}>Here you'd see the full list for "{modal.payload.section}". (Demo panel)</div>
          </>
        );
      case 'export':
        return (
          <>
            <h3>Export Applications</h3>
            <div style={{marginTop: 15}}>Exported! (Demo feedback)</div>
          </>
        );
      default:
        return null;
    }
  }

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
      <JMPModal open={modal.open} title={modalTitle(modal)} onClose={handleHideModal}>
        {renderModalContent()}
      </JMPModal>
    </div>
  );

  // Helper: Modal dynamic title
  function modalTitle(modal) {
    switch (modal.type) {
      case 'viewJob': return 'Job Details';
      case 'applyJob': return 'Apply';
      case 'trackApp': return 'Track Application';
      case 'viewApplication': return 'Application Details';
      case 'learnSkill': return 'Skill Resource';
      case 'seeAll': return 'Full List';
      case 'export': return 'Export';
      default: return '';
    }
  }
}

// Section: Profile Matching
function ProfileMatching({ onViewJob, onSeeAll }) {
  // Demo jobs
  const matches = [
    {
      title: "Product Designer",
      company: "Acme Corp",
      tags: ["UI/UX", "Figma", "Sketch"],
      match: "85%"
    },
    {
      title: "Front-End Developer",
      company: "BetaSoft",
      tags: ["React", "JS", "CSS"],
      match: "80%"
    }
  ];
  return (
    <div className="jmp-section">
      <h2 className="jmp-section-title">Welcome, Jane Doe!</h2>
      <p className="jmp-section-desc">
        Your profile matches <span className="jmp-stat-highlight">27</span> new job opportunities.
      </p>
      <div className="jmp-cards-list">
        {matches.map((job) => (
          <div className="jmp-card match" key={job.title + job.company}>
            <h3>{job.title}</h3>
            <div className="jmp-card-details">
              <span>{job.company}</span>
              <span className="jmp-match-score">Match: {job.match}</span>
            </div>
            <div className="jmp-card-tags">
              {job.tags.map((t) => <span className="jmp-tag" key={t}>{t}</span>)}
            </div>
            <button
              className="jmp-cta-primary"
              aria-label={`View Job: ${job.title} at ${job.company}`}
              tabIndex="0"
              type="button"
              onClick={() => onViewJob(job)}
            >
              View Job
            </button>
          </div>
        ))}
      </div>
      <button className="jmp-cta-tertiary" onClick={onSeeAll}>See All Matching Jobs</button>
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
