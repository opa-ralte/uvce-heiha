// This component will be integrated into AdminDashboard.js
// It contains all the Student Corner admin UI sections

export const StudentCornerSections = {
  renderSubTabs: (activeSection, setActiveSection, G) => (
    <div style={{
      display: 'flex',
      gap: '8px',
      flexWrap: 'wrap',
      marginBottom: '20px',
      padding: '12px',
      background: 'rgba(0,0,0,0.3)',
      borderRadius: '6px',
    }}>
      {[
        { id: 'resources', label: '📚 Resources', count: 'resources' },
        { id: 'tips', label: '💡 Tips', count: 'tips' },
        { id: 'collegeInfo', label: '🏫 College Info', count: 'collegeInfo' },
        { id: 'faqs', label: '❓ FAQs', count: 'faqs' },
        { id: 'links', label: '🔗 Links', count: 'usefulLinks' },
        { id: 'contact', label: '📞 Contact' },
      ].map((section) => (
        <button
          key={section.id}
          onClick={() => setActiveSection(section.id)}
          style={{
            background: activeSection === section.id 
              ? `linear-gradient(135deg, ${G} 0%, #c09828 100%)`
              : 'rgba(20, 26, 56, 0.8)',
            color: activeSection === section.id ? '#060d1e' : G,
            border: activeSection === section.id ? 'none' : `1px solid ${G}60`,
            padding: '8px 16px',
            borderRadius: '4px',
            fontSize: '10px',
            fontWeight: '600',
            cursor: 'pointer',
            textTransform: 'uppercase',
          }}
        >
          {section.label}
        </button>
      ))}
    </div>
  ),
};
