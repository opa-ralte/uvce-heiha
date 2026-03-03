import React, { useState } from 'react';
import MarqueeBar from '../components/MarqueeBar';

/* ── tokens ─────────────────────────────────── */
const G = '#f0c040';
const O = '#ff7040';
const GN = '#4cda70';

const card = {
  background: 'rgba(12, 26, 56, 0.72)',
  border: '1px solid rgba(240, 192, 64, 0.38)',
  borderRadius: '8px',
  boxShadow: '0 8px 32px rgba(0,0,0,0.45), 0 0 18px rgba(240,192,64,0.22)',
  backdropFilter: 'blur(14px)',
  WebkitBackdropFilter: 'blur(14px)',
  padding: '24px',
  marginBottom: '24px',
};

const bodyText = {
  fontFamily: "'Inter', sans-serif",
  fontSize: '14px',
  lineHeight: '1.7',
  color: 'rgba(228,216,192,0.85)',
};

const sectionTitle = {
  fontFamily: "'Press Start 2P', monospace",
  fontSize: '10px',
  color: G,
  textShadow: `0 0 14px rgba(240,192,64,0.5)`,
  marginBottom: '16px',
  paddingBottom: '10px',
  borderBottom: `1px solid rgba(240,192,64,0.3)`,
  lineHeight: '1.6',
};

const faqs = [
  { q: 'When should I arrive in Bangalore?', a: 'Try to arrive a week before classes start. This gives you time to settle in, explore the campus, and connect with HEIHA seniors who will help you get oriented.' },
  { q: 'How do I get from the airport/railway station to UVCE?', a: 'Take the Metro (Purple Line) to KR Market or Majestic, then an auto-rickshaw to UVCE. Seniors in the HEIHA WhatsApp group can help you navigate. Always save the college address: Dr. Ambedkar Veedhi, Bengaluru - 560001.' },
  { q: 'What should I bring from home?', a: 'Traditional foods/spices (hard to find locally), warm clothes (Bangalore gets cold Nov-Jan), all original documents (TC, mark sheets, birth certificate), and passport-size photos.' },
  { q: 'How do I get a local SIM card?', a: 'Jio and Airtel are best for Bangalore. You will need your Aadhaar card or passport. HEIHA seniors can accompany you to the store to help with the process.' },
  { q: 'Where can I find NE food in Bangalore?', a: 'There are several NE restaurants near UVCE in the Indiranagar, Koramangala, and Ejipura areas. HEIHA seniors maintain an updated list — ask in the WhatsApp group!' },
  { q: 'What if I face any issue or discrimination?', a: 'Reach out to any HEIHA executive committee member immediately. We have protocols in place and connections with college administration. You are protected and supported.' },
  { q:'Civil nen campus khatah in awm em?', a:'Civil engineering hi Jnanabharti campus-ah an awm a, hostelah an awm thei lo a, a nawlpuiin in an luah thin '},
  { q:'ZB Laipi tih in hria em ?', a:'Aw hria e, UVCE Mizo Mech ah a thiam ber '},
  { q:'Gym a awm em?', a:'Kan college ah hian gym chu a awm lo a, mahse hosteller tan hostel tang hla vak loh ah student tan gym tlawmte a awm, BU campus tan gym hi a free '}

];

/* ── hover-aware useful link ─────────────────── */
function UsefulLink({ link }) {
  const [hovered, setHovered] = React.useState(false);
  return (
    <a
      key={link.label}
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        background: 'rgba(20,36,22,0.75)',
        border: hovered ? '1px solid rgba(76,218,112,0.65)' : '1px solid rgba(76,218,112,0.3)',
        borderRadius: '6px',
        padding: '10px 12px',
        color: GN,
        textDecoration: 'none',
        fontFamily: "'Inter', sans-serif",
        fontSize: '13px',
        fontWeight: '500',
        boxShadow: hovered ? '0 0 12px rgba(76,218,112,0.25)' : 'none',
        transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span>{link.icon}</span>
      <span>{link.label}</span>
    </a>
  );
}

function StudentCorner() {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div style={{ minHeight: '100vh', padding: '30px 20px' }}>
      <MarqueeBar text="★ STUDENT CORNER ★ · Tips, info, and resources for new UVCE students ★ · Your seniors have got you covered ★" />

      <div style={{ maxWidth: '1100px', margin: '30px auto 0' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h1 style={{
            fontFamily: "'Press Start 2P', monospace",
            fontSize: 'clamp(14px, 2.5vw, 20px)',
            color: G,
            textShadow: `0 0 26px rgba(240,192,64,0.6), 3px 3px 0px rgba(0,0,0,0.6)`,
            lineHeight: '1.5',
          }}>
            ★ Student Corner ★
          </h1>
          <p style={{
            fontFamily: "'Orbitron', sans-serif",
            fontSize: '11px',
            fontWeight: '500',
            letterSpacing: '1px',
            color: O,
            marginTop: '12px',
            textTransform: 'uppercase',
          }}>
            Everything you need to know before and after arriving at UVCE
          </p>
        </div>

        {/* Tips for New Students */}
        <div style={card}>
          <h2 style={sectionTitle}>💡 Tips for New Students</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '14px' }}>
            {[
              { icon: '📱', tip: 'Join the HEIHA WhatsApp Group', desc: 'First thing to do. Your seniors are there 24/7 to help with any questions.' },
              { icon: '🏠', tip: 'Hostel Application', desc: 'Apply for hostel as early as possible. Limited seats — NE students often get priority consideration.' },
              { icon: '📚', tip: 'Academic Support', desc: "HEIHA runs peer tutoring sessions. Don't hesitate to ask seniors for notes and guidance." },
              { icon: '🍛', tip: 'Food Adjustment', desc: "The food may be different. Many seniors cook NE food on weekends — join in! You'll also find good local food options." },
              { icon: '🚌', tip: 'City Navigation', desc: 'Learn the BMTC bus routes and download the Namma Metro app. Bangalore is very navigable once you know the system.' },
              { icon: '💰', tip: 'Budget Wisely', desc: 'Create a monthly budget. Bangalore can be expensive. Seniors will show you affordable options for food, transport, and shopping.' },
            ].map((item) => (
              <div key={item.tip} style={{
                background: 'rgba(20, 26, 50, 0.75)',
                border: '1px solid rgba(240,192,64,0.22)',
                borderRadius: '6px',
                padding: '14px 16px',
                backdropFilter: 'blur(8px)',
                transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
              }}>
                <div style={{ fontSize: '22px', marginBottom: '8px' }}>{item.icon}</div>
                <div style={{
                  fontFamily: "'Orbitron', sans-serif",
                  fontSize: '9px',
                  fontWeight: '600',
                  letterSpacing: '0.5px',
                  color: G,
                  marginBottom: '7px',
                  textTransform: 'uppercase',
                  lineHeight: '1.5',
                }}>
                  {item.tip}
                </div>
                <p style={{ ...bodyText, fontSize: '13px' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Important College Info */}
        <div style={{
          ...card,
          background: 'rgba(22, 10, 48, 0.72)',
          border: '1px solid rgba(255,112,64,0.4)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.45), 0 0 22px rgba(255,112,64,0.22)',
        }}>
          <h2 style={{ ...sectionTitle, color: O, borderBottomColor: 'rgba(255,112,64,0.3)', textShadow: '0 0 14px rgba(255,112,64,0.5)' }}>
            🏫 Important College Info
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            {[
              {
                title: 'Academic Calendar',
                items: ['Semester 1 & 2: Aug – May', 'Mid-term exams: October & March', 'End-term exams: December & May', 'Min. 75% attendance required', 'VTU exam registration is separate'],
              },
              {
                title: 'Key Offices',
                items: ["Principal's Office: Main Block, 1st Floor", 'Student Welfare: Admin Block', 'Hostel Office: Near Boys Hostel', 'Library: Central Block', 'Health Center: Near Girls Hostel'],
              },
              {
                title: 'Useful Apps & Websites',
                items: ['VTU Website: vtu.ac.in', 'UVCE Official: uvce.ac.in', 'Namma Metro App', 'BMTC Bus Tracker', 'Google Pay / PhonePe for payments'],
              },
            ].map((section) => (
              <div key={section.title}>
                <h3 style={{
                  fontFamily: "'Orbitron', sans-serif",
                  fontSize: '9px',
                  fontWeight: '700',
                  letterSpacing: '1px',
                  color: G,
                  textTransform: 'uppercase',
                  marginBottom: '12px',
                }}>
                  {section.title}
                </h3>
                <ul style={{ ...bodyText, paddingLeft: '16px', lineHeight: '2' }}>
                  {section.items.map(item => <li key={item}>{item}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div style={card}>
          <h2 style={sectionTitle}>❓ Frequently Asked Questions</h2>
          {faqs.map((faq, index) => (
            <div key={index} style={{
              border: '1px solid rgba(240,192,64,0.22)',
              borderRadius: '6px',
              marginBottom: '8px',
              overflow: 'hidden',
            }}>
              <button
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  background: openFaq === index
                    ? `linear-gradient(135deg, ${G} 0%, #c09828 100%)`
                    : 'rgba(20,26,50,0.75)',
                  color: openFaq === index ? '#060d1e' : 'rgba(228,216,192,0.9)',
                  border: 'none',
                  padding: '12px 16px',
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '14px',
                  fontWeight: openFaq === index ? '600' : '400',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  transition: 'background 0.2s ease',
                }}
              >
                <span>Q: {faq.q}</span>
                <span style={{
                  fontFamily: "'Press Start 2P', monospace",
                  fontSize: '9px',
                  flexShrink: 0,
                  marginLeft: '12px',
                }}>
                  {openFaq === index ? '[-]' : '[+]'}
                </span>
              </button>
              {openFaq === index && (
                <div style={{
                  padding: '12px 16px',
                  background: 'rgba(12,26,56,0.6)',
                  borderTop: '1px solid rgba(240,192,64,0.2)',
                  ...bodyText,
                  fontSize: '14px',
                }}>
                  <strong style={{ color: G }}>A:</strong> {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Useful Links */}
        <div style={{
          ...card,
          background: 'rgba(8, 22, 12, 0.72)',
          border: '1px solid rgba(76,218,112,0.35)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.45), 0 0 18px rgba(76,218,112,0.18)',
        }}>
          <h2 style={{ ...sectionTitle, color: GN, borderBottomColor: 'rgba(76,218,112,0.3)', textShadow: '0 0 14px rgba(76,218,112,0.5)' }}>
            🔗 Useful Links
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: '10px' }}>
            {[
              { label: 'UVCE Official Website', url: 'http://uvce.ac.in', icon: '🏛️' },
              { label: 'UUCMS', url: 'https://uucms.karnataka.gov.in/login/index', icon: '📋', description:'Tah hian result en thin ani' },
              { label: 'VTU Results', url: 'http://results.vtu.ac.in', icon: '📊' },
              { label: 'NPTEL Courses', url: 'http://nptel.ac.in', icon: '🎓' },
              { label: 'KVPY Fellowship', url: 'http://kvpy.iisc.ernet.in', icon: '🏆' },
              { label: 'Internshala Jobs', url: 'http://internshala.com', icon: '💼' },
            ].map((link) => (
              <UsefulLink key={link.label} link={link} />
            ))}
          </div>
        </div>

        {/* Contact Box */}
        <div style={{
          background: 'rgba(10, 16, 38, 0.72)',
          border: '1px solid rgba(240,192,64,0.3)',
          borderRadius: '8px',
          padding: '22px',
          textAlign: 'center',
          backdropFilter: 'blur(14px)',
          boxShadow: '0 8px 28px rgba(0,0,0,0.4), 0 0 14px rgba(240,192,64,0.15)',
        }}>
          <h3 style={{
            fontFamily: "'Press Start 2P', monospace",
            fontSize: '10px',
            color: G,
            textShadow: '0 0 12px rgba(240,192,64,0.5)',
            marginBottom: '14px',
            lineHeight: '1.6',
          }}>
            📞 Need Help? Contact Us!
          </h3>
          <p style={{ ...bodyText, fontSize: '15px', marginBottom: '8px' }}>
            Email: <span style={{ color: G }}>heiha.uvce@gmail.com</span> · WhatsApp: Ask any HEIHA member for the group link
          </p>
          <p style={{ ...bodyText, fontSize: '13px', color: 'rgba(136,152,184,0.75)' }}>
            We respond within 24 hours. For urgent matters, contact the President directly.
          </p>
        </div>
      </div>
    </div>
  );
}

export default StudentCorner;
