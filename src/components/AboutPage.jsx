import React from 'react';

const AboutPage = () => {
  return (
    <div style={styles.container}>
      {/* Hero Section */}
      <div style={styles.hero}>
        <h1 style={styles.heroTitle}>About Our Exam Portal</h1>
        <p style={styles.heroSubtitle}>
          A secure platform for managing and distributing examination materials
        </p>
      </div>

      {/* Mission Section */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Our Mission</h2>
        <p style={styles.sectionText}>
          We aim to revolutionize exam management by providing educational institutions with a secure, 
          efficient, and user-friendly platform for handling examination materials. Our solution 
          reduces administrative overhead while maintaining the highest security standards.
        </p>
      </div>

      {/* Features Section */}
      <div style={{...styles.section, backgroundColor: '#f8f1e9'}}>
        <h2 style={styles.sectionTitle}>Key Features</h2>
        <div style={styles.featuresContainer}>
          <div style={styles.featureCard}>
            <h3 style={styles.featureTitle}>Secure Exam Uploads</h3>
            <p style={styles.featureText}>
              Our system ensures secure and authenticated exam paper submissions with end-to-end encryption.
            </p>
          </div>
          <div style={styles.featureCard}>
            <h3 style={styles.featureTitle}>Role-Based Access</h3>
            <p style={styles.featureText}>
              Different access levels for administrators, teachers, and students to maintain data integrity.
            </p>
          </div>
          <div style={styles.featureCard}>
            <h3 style={styles.featureTitle}>Easy Management</h3>
            <p style={styles.featureText}>
              Intuitive interface for managing and organizing exam papers efficiently.
            </p>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Our Team</h2>
        <div style={styles.teamContainer}>
          <div style={styles.teamMember}>
            <div style={styles.teamMemberAvatar}>S</div>
            <h3 style={styles.teamMemberName}>Sneha Ajagekar</h3>
            <p style={styles.teamMemberRole}>Lead Developer</p>
            <p style={styles.teamMemberBio}>
              Student
            </p>
          </div>
          <div style={styles.teamMember}>
            <div style={styles.teamMemberAvatar}>M</div>
            <h3 style={styles.teamMemberName}>Madhura Patil</h3>
            <p style={styles.teamMemberRole}>UI/UX Designer</p>
            <p style={styles.teamMemberBio}>
              Student
            </p>
          </div>
          <div style={styles.teamMember}>
            <div style={styles.teamMemberAvatar}>v</div>
            <h3 style={styles.teamMemberName}>Vaishnavi PAtil</h3>
            <p style={styles.teamMemberRole}>Project Manager</p>
            <p style={styles.teamMemberBio}>
              Student
            </p>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div style={{...styles.section, backgroundColor: '#6d4c41', color: 'white'}}>
        <h2 style={styles.sectionTitle}>Have Questions?</h2>
        <p style={styles.sectionText}>
          We're here to help! Contact our support team for any inquiries.
        </p>
        <p style={{...styles.sectionText, fontWeight: 'bold'}}>
          contact@examportal.com | +1 (555) 123-4567
        </p>
      </div>
    </div>
  );
};

// Brownish Theme Styles
const styles = {
  container: {
    fontFamily: '"Georgia", serif',
    lineHeight: '1.6',
    color: '#5d4037',
    backgroundColor: '#fffdfa'
  },
  hero: {
    backgroundColor: '#8d6e63',
    color: '#fff8e1',
    padding: '4rem 1rem',
    textAlign: 'center',
    marginBottom: '2rem',
    background: 'linear-gradient(to right, #6d4c41, #8d6e63)'
  },
  heroTitle: {
    fontSize: '2.5rem',
    marginBottom: '1rem',
    textShadow: '1px 1px 2px rgba(0,0,0,0.2)'
  },
  heroSubtitle: {
    fontSize: '1.25rem',
    margin: '0 auto',
    maxWidth: '800px',
    opacity: 0.9
  },
  section: {
    padding: '3rem 1rem',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  sectionTitle: {
    textAlign: 'center',
    fontSize: '2rem',
    marginBottom: '2rem',
    color: '#5d4037'
  },
  sectionText: {
    maxWidth: '800px',
    margin: '0 auto 1rem',
    textAlign: 'center',
    color: '#5d4037'
  },
  featuresContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '2rem',
    marginTop: '2rem',
  },
  featureCard: {
    flex: '1',
    minWidth: '250px',
    maxWidth: '350px',
    backgroundColor: '#fff',
    padding: '1.5rem',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(93,64,55,0.1)',
    border: '1px solid #d7ccc8',
    transition: 'transform 0.3s, box-shadow 0.3s',
    ':hover': {
      transform: 'translateY(-5px)',
      boxShadow: '0 5px 15px rgba(93,64,55,0.2)'
    }
  },
  featureTitle: {
    color: '#6d4c41',
    marginBottom: '1rem',
    borderBottom: '2px solid #d7ccc8',
    paddingBottom: '0.5rem'
  },
  featureText: {
    margin: 0,
    color: '#5d4037'
  },
  teamContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '2rem',
    marginTop: '2rem',
  },
  teamMember: {
    flex: '1',
    minWidth: '250px',
    maxWidth: '300px',
    textAlign: 'center',
    padding: '1.5rem',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(93,64,55,0.1)',
    border: '1px solid #d7ccc8'
  },
  teamMemberAvatar: {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    backgroundColor: '#8d6e63',
    color: '#fff8e1',
    fontSize: '3rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 1rem',
    fontWeight: 'bold'
  },
  teamMemberName: {
    margin: '0.5rem 0',
    color: '#5d4037'
  },
  teamMemberRole: {
    color: '#8d6e63',
    margin: '0.5rem 0',
    fontStyle: 'italic'
  },
  teamMemberBio: {
    margin: '0.5rem 0',
    color: '#5d4037'
  },
};

export default AboutPage;