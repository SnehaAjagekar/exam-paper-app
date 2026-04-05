import React from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from './layout/DashboardLayout';
import { FaLock, FaUserShield, FaCogs, FaGraduationCap, FaPhone, FaEnvelope, FaAward } from 'react-icons/fa';
import '../styles/pages.css';

const AboutPage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <FaLock />,
      title: 'Secure Exam Uploads',
      description: 'End-to-end encryption ensures exam papers are protected with military-grade security standards.'
    },
    {
      icon: <FaUserShield />,
      title: 'Role-Based Access',
      description: 'Granular permission levels for administrators, distributors, and receivers.'
    },
    {
      icon: <FaCogs />,
      title: 'Easy Management',
      description: 'Intuitive interface for handling exam papers and managing distributions effortlessly.'
    },
    {
      icon: <FaAward />,
      title: 'Audit Trail',
      description: 'Complete logging of all actions for compliance and accountability.'
    }
  ];

  const team = [
    {
      name: 'Sneha Ajagekar',
      role: 'Lead Developer',
      initials: 'SA',
      bio: 'Full-stack engineer passionate about secure education technology'
    }
  ];

  return (
    <DashboardLayout>
      <div className="about-page">
        {/* Header Section */}
        <div className="about-header fade-in-up">
          <div className="about-header-content">
            <h1>About SecureExam Portal</h1>
            <p>Revolutionizing exam management through secure, efficient digital solutions</p>
          </div>
        </div>

        {/* Mission Section */}
        <section className="about-section fade-in-up fade-in-up-1">
          <div className="section-container">
            <h2 className="section-title">Our Mission</h2>
            <p className="section-description">
              We empower educational institutions with a secure, intuitive platform for managing examination materials. 
              SecureExam Portal reduces administrative overhead while maintaining the highest security standards, 
              ensuring every exam paper reaches the right hands at the right time.
            </p>
          </div>
        </section>

        {/* Features Section */}
        <section className="about-section features-section fade-in-up fade-in-up-2">
          <div className="section-container">
            <h2 className="section-title">Key Features</h2>
            <div className="features-grid">
              {features.map((feature, index) => (
                <div key={index} className={`feature-card fade-in-up fade-in-up-${index + 3}`}>
                  <div className="feature-icon">
                    {feature.icon}
                  </div>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="about-section team-section fade-in-up fade-in-up-3">
          <div className="section-container">
            <h2 className="section-title">Meet the Team</h2>
            <div className="team-grid">
              {team.map((member, index) => (
                <div key={index} className="team-member">
                  <div className="team-member-avatar">{member.initials}</div>
                  <h3>{member.name}</h3>
                  <p className="member-role">{member.role}</p>
                  <p className="member-bio">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="about-section contact-section fade-in-up fade-in-up-4">
          <div className="section-container">
            <h2 className="section-title">Get in Touch</h2>
            <p className="section-description">
              Have questions about SecureExam Portal? We're here to help!
            </p>
            <div className="contact-info">
              <div className="contact-item">
                <FaEnvelope className="contact-icon" />
                <a href="mailto:contact@secureexam.com">contact@secureexam.com</a>
              </div>
              <div className="contact-item">
                <FaPhone className="contact-icon" />
                <a href="tel:+919876543210">+91 9876543210</a>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="about-section cta-section fade-in-up fade-in-up-5">
          <div className="section-container">
            <h2>Ready to Get Started?</h2>
            <p>Join educational institutions using SecureExam Portal for secure exam management.</p>
            <div className="cta-buttons">
              <button className="btn-primary" onClick={() => navigate('/dashboard')}>
                Go to Dashboard
              </button>
              <button className="btn-secondary" onClick={() => navigate('/')}>
                Back to Home
              </button>
            </div>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
};

export default AboutPage;