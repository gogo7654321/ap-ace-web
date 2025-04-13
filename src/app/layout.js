// src/app/layout.js
"use client";
import React, { useEffect, useState, useRef } from 'react';
import './styles/globals.css';

export default function RootLayout({ children }) {
  const [scrollY, setScrollY] = useState(0);
  const [navbarScrolled, setNavbarScrolled] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [mobileDropdowns, setMobileDropdowns] = useState({
    courses: false,
    resources: false,
    guides: false
  });
  
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
      
      // Handle navbar scrolling effect
      if (window.scrollY > 50) {
        setNavbarScrolled(true);
      } else {
        setNavbarScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    // Initial call to handle any elements already in view
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const toggleMobileDropdown = (menu) => {
    setMobileDropdowns(prev => ({
      ...prev,
      [menu]: !prev[menu]
    }));
  };

  return (
    <html lang="en">
      <body>
        {/* Navigation Bar */}
        <nav className={`navbar ${navbarScrolled ? 'scrolled' : ''}`}>
          <div className="navbar-container">
            <a href="/" className="navbar-logo">
              <img src="/images/logo.png" alt="AP Ace Logo" />
              <span>AP Ace</span>
            </a>
            
            <div className="nav-items">
              <div className="nav-item">
                <a href="/" className="nav-link">Home</a>
              </div>
              
              <div className="nav-item dropdown">
                <a href="/courses" className="nav-link">Courses</a>
              </div>
              
              <div className="nav-item dropdown">
                <a href="/guides" className="nav-link">Guides</a>
                <div className="dropdown-content">
                  <a href="/guides/research-methods" className="dropdown-item">Research Methods</a>
                  <a href="/guides/writing" className="dropdown-item">Academic Writing</a>
                  <a href="/guides/presentation" className="dropdown-item">Presentation Skills</a>
                </div>
              </div>
              
              <div className="nav-item dropdown">
                <a href="/dashboard" className="nav-link">Dashboard</a>
              </div>
              
              <div className="nav-item">
                <a href="/ai-tools" className="nav-link">AI Tools</a>
              </div>
              
              <div className="nav-item">
                <a href="/blog" className="nav-link">Blog</a>
              </div>
              
              <div className="nav-item">
                <a href="/about" className="nav-link">About</a>
              </div>
              
              <div className="nav-item">
                <a href="/contact" className="nav-link">Contact</a>
              </div>
            </div>
            
            <div className="navbar-right">
              <div className="search-box">
                <input type="text" className="search-input" placeholder="Search..." />
                <svg className="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              
              <a href="/auth" className="login-button">Login</a>
              
              <button className="mobile-menu-button" onClick={() => setMobileNavOpen(true)}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 12H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M3 6H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        </nav>
        
        {/* Mobile Navigation */}
        <div className={`mobile-overlay ${mobileNavOpen ? 'active' : ''}`} onClick={() => setMobileNavOpen(false)}></div>
        
        <div className={`mobile-nav ${mobileNavOpen ? 'active' : ''}`}>
          <div className="mobile-nav-header">
            <a href="/" className="navbar-logo">
              <img src="/images/logo.png" alt="AP Ace Logo" />
              <span>AP Ace</span>
            </a>
            <button className="mobile-nav-close" onClick={() => setMobileNavOpen(false)}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
          
          <div className="mobile-nav-items">
            <div className="mobile-nav-item">
              <a href="/" className="mobile-nav-link">Home</a>
            </div>
            
            <div className="mobile-nav-item">
              <button className={`mobile-dropdown-toggle ${mobileDropdowns.courses ? 'active' : ''}`} onClick={() => toggleMobileDropdown('courses')}>
                Courses
                <svg className="mobile-dropdown-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
            
            <div className="mobile-nav-item">
              <button className={`mobile-dropdown-toggle ${mobileDropdowns.guides ? 'active' : ''}`} onClick={() => toggleMobileDropdown('guides')}>
                Guides
                <svg className="mobile-dropdown-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              
              {mobileDropdowns.guides && (
                <div className="mobile-submenu">
                  <a href="/guides/research-methods" className="mobile-nav-link">Research Methods</a>
                  <a href="/guides/writing" className="mobile-nav-link">Academic Writing</a>
                  <a href="/guides/presentation" className="mobile-nav-link">Presentation Skills</a>
                </div>
              )}
            </div>
            
            <div className="mobile-nav-item">
              <a href="/dashboard" className="mobile-nav-link">Dashboard</a>
            </div>
            
            <div className="mobile-nav-item">
              <a href="/ai-tools" className="mobile-nav-link">AI Tools</a>
            </div>
            
            <div className="mobile-nav-item">
              <a href="/blog" className="mobile-nav-link">Blog</a>
            </div>
            
            <div className="mobile-nav-item">
              <a href="/about" className="mobile-nav-link">About</a>
            </div>
            
            <div className="mobile-nav-item">
              <a href="/contact" className="mobile-nav-link">Contact</a>
            </div>
            
            <div className="mobile-nav-item">
              <a href="/login" className="mobile-nav-link">Login</a>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}