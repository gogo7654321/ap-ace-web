"use client";

import React, { useEffect, useState, useRef } from 'react';
import './ap-research.css';

const APClassTemplate = () => {
  const [scrollY, setScrollY] = useState(0);
  const [activeDropdown, setActiveDropdown] = useState(null);
  
  // Enhanced parallax effect with useRef for better performance
  const parallaxBgRef = useRef(null);
  const quoteParallaxRef = useRef(null);
  const ctaParallaxRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
      
      // Enhanced parallax effect for multiple elements
      if (parallaxBgRef.current) {
        parallaxBgRef.current.style.transform = `translateY(${currentScrollY * 0.4}px)`;
      }
      
      if (quoteParallaxRef.current) {
        // Fixed parallax effect for quote section - adjusted coefficient
        quoteParallaxRef.current.style.transform = `translateY(${currentScrollY * 0.2}px)`;
      }
      
      if (ctaParallaxRef.current) {
        // Fixed parallax effect for CTA section - adjusted coefficient
        ctaParallaxRef.current.style.transform = `translateY(${currentScrollY * 0.15}px)`;
      }
      
      // Animate in elements when they become visible
      const animateElements = document.querySelectorAll('.animate-on-scroll');
      animateElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (elementTop < windowHeight - 100) {
          element.classList.add('animate-in');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    // Initial call to handle any elements already in view
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDropdown = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  return (
    <div className="landing-container">
      {/* Hero section with parallax effect */}
      <div className="hero-section">
        <div className="parallax-bg" ref={parallaxBgRef}></div>
        <div className="hero-content">
          <div className="hero-logo">
            {/* Using an icon from your public folder */}
            <img src="/ap_research.png" alt="AP® Class Logo" />
          </div>
          <h1 className="hero-title">Welcome to <span className="class-name">AP® Research</span></h1>
          <p className="hero-subtitle">Develop critical thinking and research skills through independent investigation, analysis, and academic paper development.</p>
          
          <div className="hero-buttons">
            <a href="#overview" className="cta-button">
              Explore Course <span className="btn-icon">→</span>
            </a>
            <a href="/ap-research/resources" className="secondary-button">Course Materials</a>
          </div>
        </div>
        
        <div className="scroll-indicator">
          <span>Scroll to learn more</span>
          <div className="scroll-arrow"></div>
        </div>
      </div>

      {/* Course overview section */}
      <div id="overview" className="features-section">
        <div className="section-header">
          <h2>Course Overview</h2>
          <div className="underline"></div>
        </div>
        <p className="section-subheading">
          AP® Research is the second course in the AP® Capstone program, focusing on independent research methodology, academic writing, and critical analysis.
        </p>
        
        <div className="features-grid">
          <div className="feature-card animate-on-scroll">
            <div className="feature-icon">
              <img src="/icons/research-icon.svg" alt="Research" />
            </div>
            <h3>Research Methodology</h3>
            <p>Learn sophisticated research methods to contribute new knowledge to academic disciplines.</p>
          </div>
          
          <div className="feature-card animate-on-scroll">
            <div className="feature-icon">
              <img src="/icons/writing-icon.svg" alt="Writing" />
            </div>
            <h3>Academic Writing</h3>
            <p>Develop college-level academic writing skills for a 4,000-5,000 word research paper.</p>
          </div>
          
          <div className="feature-card animate-on-scroll">
            <div className="feature-icon">
              <img src="/icons/presentation-icon.svg" alt="Presentation" />
            </div>
            <h3>Presentation Skills</h3>
            <p>Prepare and deliver professional presentations to defend your research findings.</p>
          </div>
          
          <div className="feature-card animate-on-scroll">
            <div className="feature-icon">
              <img src="/icons/analytics-icon.svg" alt="Analytics" />
            </div>
            <h3>Data Analysis</h3>
            <p>Master quantitative and qualitative research methodologies to support your academic arguments.</p>
          </div>
        </div>
      </div>

      {/* Accordion/Dropdown section for AP details */}
      <div className="accordion-section">
        <div className="section-header">
          <h2>AP® Research Details</h2>
          <div className="underline"></div>
        </div>
        
        <div className="accordion-container">
          <div className="accordion-item">
            <div 
              className={`accordion-header ${activeDropdown === 0 ? 'active' : ''}`} 
              onClick={() => toggleDropdown(0)}
            >
              <h3>About the AP® Exam</h3>
              <span className="dropdown-icon">{activeDropdown === 0 ? '−' : '+'}</span>
            </div>
            <div className={`accordion-content ${activeDropdown === 0 ? 'active' : ''}`}>
              <p>AP® Research does not include a traditional end-of-course exam. Instead, students submit a 4,000-5,000 word academic paper and deliver a 15-20 minute presentation with an oral defense. These assessments are scored by College Board and account for 100% of the AP® score (1-5).</p>
            </div>
          </div>
          
          <div className="accordion-item">
            <div 
              className={`accordion-header ${activeDropdown === 1 ? 'active' : ''}`} 
              onClick={() => toggleDropdown(1)}
            >
              <h3>Course Rigor</h3>
              <span className="dropdown-icon">{activeDropdown === 1 ? '−' : '+'}</span>
            </div>
            <div className={`accordion-content ${activeDropdown === 1 ? 'active' : ''}`}>
              <p>AP® Research represents college-level rigor, requiring strong time management, independent work ethic, and advanced analytical skills. Students work throughout the year on one major research project, with continuous feedback from peers and instructors. The course demands sophisticated research, writing, and revision processes similar to undergraduate research seminars.</p>
            </div>
          </div>
          
          <div className="accordion-item">
            <div 
              className={`accordion-header ${activeDropdown === 2 ? 'active' : ''}`} 
              onClick={() => toggleDropdown(2)}
            >
              <h3>Prerequisites</h3>
              <span className="dropdown-icon">{activeDropdown === 2 ? '−' : '+'}</span>
            </div>
            <div className={`accordion-content ${activeDropdown === 2 ? 'active' : ''}`}>
              <p>Students must have successfully completed AP® Seminar before enrolling in AP® Research. The skills developed in AP® Seminar—critical reading, argumentative writing, and team collaboration—provide an essential foundation for success in AP® Research's more independent structure.</p>
            </div>
          </div>
          
          <div className="accordion-item">
            <div 
              className={`accordion-header ${activeDropdown === 3 ? 'active' : ''}`} 
              onClick={() => toggleDropdown(3)}
            >
              <h3>College Credit Opportunities</h3>
              <span className="dropdown-icon">{activeDropdown === 3 ? '−' : '+'}</span>
            </div>
            <div className={`accordion-content ${activeDropdown === 3 ? 'active' : ''}`}>
              <p>Many colleges grant credit or placement for successful completion of AP® Research, especially when combined with AP® Seminar as part of the AP® Capstone Diploma. The research skills developed in this course directly prepare students for college-level coursework across disciplines, making it a valuable credential for college admissions.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quote section with fixed parallax effect */}
      <div className="quote-section">
        <div className="quote-parallax" ref={quoteParallaxRef}></div>
        <div className="quote-content">
          <h2>"Research is formalized curiosity. It is poking and prying with a purpose."</h2>
          <p>- Zora Neale Hurston</p>
        </div>
      </div>
      {/* Timeline section - new addition */}
      <div className="timeline-section">
        <div className="section-header">
          <h2>AP® Research Timeline</h2>
          <div className="underline"></div>
        </div>
        <div className="timeline-container">
          <div className="timeline-item">
            <div className="timeline-marker"></div>
            <div className="timeline-content animate-on-scroll">
              <h3>September - October</h3>
              <h4>Research Question Development</h4>
              <p>Students explore disciplines, develop research questions, and begin to identify relevant scholarly literature.</p>
            </div>
          </div>
          
          <div className="timeline-item">
            <div className="timeline-marker"></div>
            <div className="timeline-content animate-on-scroll">
              <h3>November - December</h3>
              <h4>Literature Review</h4>
              <p>Analyze previous research in the field, identify gaps in the literature, and refine research methods.</p>
            </div>
          </div>
          
          <div className="timeline-item">
            <div className="timeline-marker"></div>
            <div className="timeline-content animate-on-scroll">
              <h3>January - February</h3>
              <h4>Data Collection</h4>
              <p>Execute the research method, gather and organize data, and begin preliminary analysis.</p>
            </div>
          </div>
          
          <div className="timeline-item">
            <div className="timeline-marker"></div>
            <div className="timeline-content animate-on-scroll">
              <h3>March - April</h3>
              <h4>Paper Development & Presentation</h4>
              <p>Analyze findings, draw conclusions, and prepare both the written paper and oral presentation.</p>
            </div>
          </div>
          
          <div className="timeline-item">
            <div className="timeline-marker"></div>
            <div className="timeline-content animate-on-scroll">
              <h3>May</h3>
              <h4>Final Submission</h4>
              <p>Submit final research paper and complete the oral defense presentation for AP® scoring.</p>
            </div>
          </div>
        </div>
      </div>
      {/* Footer */}
      <footer className="landing-footer">
        <div className="footer-content">
          <div className="footer-logo">
            <img src="/logo.png" alt="AP Ace Logo" />
            <h3>AP Ace</h3>
          </div>
          <div className="footer-links">
            <div className="link-group">
              <h4>Resources</h4>
              <ul>
                <li><a href="#">Study Guides</a></li>
                <li><a href="#">Practice Tests</a></li>
                <li><a href="#">Flashcards</a></li>
                <li><a href="#">Tutoring</a></li>
              </ul>
            </div>
            <div className="link-group">
              <h4>Company</h4>
              <ul>
                <li><a href="#">About Us</a></li>
                <li><a href="#">Careers</a></li>
                <li><a href="#">Blog</a></li>
                <li><a href="#">Contact</a></li>
              </ul>
            </div>
            <div className="link-group">
              <h4>Legal</h4>
              <ul>
                <li><a href="#">Terms of Service</a></li>
                <li><a href="#">Privacy Policy</a></li>
                <li><a href="#">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="copyright">
          <p>&copy; {new Date().getFullYear()} AP Ace. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default APClassTemplate;