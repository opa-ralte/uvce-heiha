import React, { useState } from 'react';
import MarqueeBar from '../components/MarqueeBar';

const pageStyle = {
  minHeight: '100vh',
  backgroundColor: '#0a0a1a',
  padding: '30px 20px',
};

const boxStyle = {
  border: '3px solid #ffd700',
  boxShadow: '5px 5px 0px #000, 9px 9px 0px #8b6914',
  backgroundColor: '#0d1b2a',
  padding: '25px',
  marginBottom: '25px',
};

const faqs = [
  { q: 'When should I arrive in Bangalore?', a: 'Try to arrive a week before classes start. This gives you time to settle in, explore the campus, and connect with HEIHA seniors who will help you get oriented.' },
  { q: 'How do I get from the airport/railway station to UVCE?', a: 'Take the Metro (Purple Line) to KR Market or Majestic, then an auto-rickshaw to UVCE. Seniors in the HEIHA WhatsApp group can help you navigate. Always save the college address: Dr. Ambedkar Veedhi, Bengaluru - 560001.' },
  { q: 'What should I bring from home?', a: 'Traditional foods/spices (hard to find locally), warm clothes (Bangalore gets cold Nov-Jan), all original documents (TC, mark sheets, birth certificate), and passport-size photos.' },
  { q: 'How do I get a local SIM card?', a: 'Jio and Airtel are best for Bangalore. You will need your Aadhaar card or passport. HEIHA seniors can accompany you to the store to help with the process.' },
  { q: 'Where can I find NE food in Bangalore?', a: 'There are several NE restaurants near UVCE in the Indiranagar, Koramangala, and Ejipura areas. HEIHA seniors maintain an updated list — ask in the WhatsApp group!' },
  { q: 'What if I face any issue or discrimination?', a: 'Reach out to any HEIHA executive committee member immediately. We have protocols in place and connections with college administration. You are protected and supported.' },
];

function StudentCorner() {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div style={pageStyle}>
      <MarqueeBar text="★ STUDENT CORNER ★ | Tips, info, and resources for new UVCE students ★ | Your seniors have got you covered ★" />
      
      <div style={{ maxWidth: '1100px', margin: '30px auto 0' }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h1 style={{
            fontFamily: "'Press Start 2P', monospace",
            fontSize: '18px',
            color: '#ffd700',
            textShadow: '4px 4px 0px #000, -2px -2px 0px #8b6914',
          }}>
            ★ STUDENT CORNER ★
          </h1>
          <p style={{
            fontFamily: "'VT323', monospace",
            fontSize: '20px',
            color: '#ff6b35',
            marginTop: '10px',
          }}>
            Everything you need to know before and after arriving at UVCE
          </p>
        </div>

        {/* Tips for New Students */}
        <div style={boxStyle}>
          <h2 style={{
            fontFamily: "'Press Start 2P', monospace",
            fontSize: '12px',
            color: '#ffd700',
            textShadow: '2px 2px 0px #000',
            marginBottom: '20px',
            borderBottom: '2px solid #ffd700',
            paddingBottom: '10px',
          }}>
            💡 TIPS FOR NEW STUDENTS
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '15px' }}>
            {[
              { icon: '📱', tip: 'Join the HEIHA WhatsApp Group', desc: 'First thing to do. Your seniors are there 24/7 to help with any questions.' },
              { icon: '🏠', tip: 'Hostel Application', desc: 'Apply for hostel as early as possible. Limited seats — NE students often get priority consideration.' },
              { icon: '📚', tip: 'Academic Support', desc: "HEIHA runs peer tutoring sessions. Don't hesitate to ask seniors for notes and guidance." },
              { icon: '🍛', tip: 'Food Adjustment', desc: "The food may be different. Many seniors cook NE food on weekends — join in! You'll also find good local food options." },
              { icon: '🚌', tip: 'City Navigation', desc: 'Learn the BMTC bus routes and download the Namma Metro app. Bangalore is very navigable once you know the system.' },
              { icon: '💰', tip: 'Budget Wisely', desc: 'Create a monthly budget. Bangalore can be expensive. Seniors will show you affordable options for food, transport, and shopping.' },
            ].map((item) => (
              <div key={item.tip} style={{
                border: '2px solid #8b6914',
                backgroundColor: '#1a1a2a',
                padding: '15px',
                boxShadow: '3px 3px 0px #000',
              }}>
                <div style={{ fontSize: '24px', marginBottom: '8px' }}>{item.icon}</div>
                <div style={{
                  fontFamily: "'Press Start 2P', monospace",
                  fontSize: '9px',
                  color: '#ffd700',
                  marginBottom: '8px',
                }}>
                  {item.tip}
                </div>
                <p style={{
                  fontFamily: "'VT323', monospace",
                  fontSize: '18px',
                  color: '#f0e6c8',
                  lineHeight: '1.4',
                }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Important College Info */}
        <div style={{ ...boxStyle, backgroundColor: '#1a0a2a', border: '3px solid #ff6b35', boxShadow: '5px 5px 0px #000, 9px 9px 0px #8b3214' }}>
          <h2 style={{
            fontFamily: "'Press Start 2P', monospace",
            fontSize: '12px',
            color: '#ff6b35',
            textShadow: '2px 2px 0px #000',
            marginBottom: '20px',
            borderBottom: '2px solid #ff6b35',
            paddingBottom: '10px',
          }}>
            🏫 IMPORTANT COLLEGE INFO
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
            <div>
              <h3 style={{
                fontFamily: "'Press Start 2P', monospace",
                fontSize: '9px',
                color: '#ffd700',
                marginBottom: '12px',
              }}>
                ACADEMIC CALENDAR
              </h3>
              <ul style={{
                fontFamily: "'VT323', monospace",
                fontSize: '19px',
                lineHeight: '1.8',
                color: '#f0e6c8',
                paddingLeft: '20px',
              }}>
                <li>Semester 1 &amp; 2: Aug - May</li>
                <li>Mid-term exams: October &amp; March</li>
                <li>End-term exams: December &amp; May</li>
                <li>Min. 75% attendance required</li>
                <li>VTU exam registration is separate</li>
              </ul>
            </div>
            <div>
              <h3 style={{
                fontFamily: "'Press Start 2P', monospace",
                fontSize: '9px',
                color: '#ffd700',
                marginBottom: '12px',
              }}>
                KEY OFFICES
              </h3>
              <ul style={{
                fontFamily: "'VT323', monospace",
                fontSize: '19px',
                lineHeight: '1.8',
                color: '#f0e6c8',
                paddingLeft: '20px',
              }}>
                <li>Principal's Office: Main Block, 1st Floor</li>
                <li>Student Welfare: Admin Block</li>
                <li>Hostel Office: Near Boys Hostel</li>
                <li>Library: Central Block</li>
                <li>Health Center: Near Girls Hostel</li>
              </ul>
            </div>
            <div>
              <h3 style={{
                fontFamily: "'Press Start 2P', monospace",
                fontSize: '9px',
                color: '#ffd700',
                marginBottom: '12px',
              }}>
                USEFUL APPS &amp; WEBSITES
              </h3>
              <ul style={{
                fontFamily: "'VT323', monospace",
                fontSize: '19px',
                lineHeight: '1.8',
                color: '#f0e6c8',
                paddingLeft: '20px',
              }}>
                <li>VTU Website: vtu.ac.in</li>
                <li>UVCE Official: uvce.ac.in</li>
                <li>Namma Metro App</li>
                <li>BMTC Bus Tracker</li>
                <li>Google Pay / PhonePe for payments</li>
              </ul>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div style={boxStyle}>
          <h2 style={{
            fontFamily: "'Press Start 2P', monospace",
            fontSize: '12px',
            color: '#ffd700',
            textShadow: '2px 2px 0px #000',
            marginBottom: '20px',
            borderBottom: '2px solid #ffd700',
            paddingBottom: '10px',
          }}>
            ❓ FREQUENTLY ASKED QUESTIONS
          </h2>
          {faqs.map((faq, index) => (
            <div key={index} style={{
              border: '2px solid #8b6914',
              marginBottom: '10px',
              boxShadow: '2px 2px 0px #000',
            }}>
              <button
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  backgroundColor: openFaq === index ? '#ffd700' : '#1a1a2a',
                  color: openFaq === index ? '#0a0a1a' : '#ffd700',
                  border: 'none',
                  padding: '12px 15px',
                  fontFamily: "'VT323', monospace",
                  fontSize: '20px',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <span>Q: {faq.q}</span>
                <span style={{
                  fontFamily: "'Press Start 2P', monospace",
                  fontSize: '10px',
                }}>
                  {openFaq === index ? '[-]' : '[+]'}
                </span>
              </button>
              {openFaq === index && (
                <div style={{
                  padding: '12px 15px',
                  backgroundColor: '#0d1b2a',
                  borderTop: '2px solid #8b6914',
                  fontFamily: "'VT323', monospace",
                  fontSize: '19px',
                  color: '#f0e6c8',
                  lineHeight: '1.6',
                }}>
                  <strong style={{ color: '#ffd700' }}>A:</strong> {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Links Section */}
        <div style={{ ...boxStyle, backgroundColor: '#0a1a0a', border: '3px solid #4caf50', boxShadow: '5px 5px 0px #000, 9px 9px 0px #1b5e20' }}>
          <h2 style={{
            fontFamily: "'Press Start 2P', monospace",
            fontSize: '12px',
            color: '#4caf50',
            textShadow: '2px 2px 0px #000',
            marginBottom: '20px',
            borderBottom: '2px solid #4caf50',
            paddingBottom: '10px',
          }}>
            🔗 USEFUL LINKS
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
            {[
              { label: 'UVCE Official Website', url: 'http://uvce.ac.in', icon: '🏛️' },
              { label: 'VTU Portal', url: 'http://vtu.ac.in', icon: '📋' },
              { label: 'VTU Results', url: 'http://results.vtu.ac.in', icon: '📊' },
              { label: 'NPTEL Courses', url: 'http://nptel.ac.in', icon: '🎓' },
              { label: 'KVPY Fellowship', url: 'http://kvpy.iisc.ernet.in', icon: '🏆' },
              { label: 'Internshala Jobs', url: 'http://internshala.com', icon: '💼' },
            ].map((link) => (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  border: '2px solid #4caf50',
                  backgroundColor: '#1a2a1a',
                  padding: '10px 12px',
                  boxShadow: '2px 2px 0px #000',
                  color: '#4caf50',
                  textDecoration: 'none',
                  fontFamily: "'VT323', monospace",
                  fontSize: '18px',
                }}
              >
                <span>{link.icon}</span>
                <span>{link.label}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Contact Box */}
        <div style={{
          border: '3px solid #ffd700',
          backgroundColor: '#1a1a0a',
          padding: '20px',
          textAlign: 'center',
          boxShadow: '5px 5px 0px #000',
        }}>
          <h3 style={{
            fontFamily: "'Press Start 2P', monospace",
            fontSize: '11px',
            color: '#ffd700',
            marginBottom: '15px',
          }}>
            📞 NEED HELP? CONTACT US!
          </h3>
          <p style={{
            fontFamily: "'VT323', monospace",
            fontSize: '20px',
            color: '#f0e6c8',
            marginBottom: '10px',
          }}>
            Email: heiha.uvce@gmail.com | WhatsApp: Ask any HEIHA member for the group link
          </p>
          <p style={{
            fontFamily: "'VT323', monospace",
            fontSize: '18px',
            color: '#a0a0a0',
          }}>
            We respond within 24 hours. For urgent matters, contact the President directly.
          </p>
        </div>
      </div>
    </div>
  );
}

export default StudentCorner;
