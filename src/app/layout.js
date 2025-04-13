// src/app/layout.js
"use client";
import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
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

  const parallaxBgRef = useRef(null);
  const quoteParallaxRef = useRef(null);
  const ctaParallaxRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);

      if (parallaxBgRef.current) {
        parallaxBgRef.current.style.transform = `translateY(${currentScrollY * 0.4}px)`;
      }

      if (quoteParallaxRef.current) {
        quoteParallaxRef.current.style.transform = `translateY(${currentScrollY * 0.2}px)`;
      }

      if (ctaParallaxRef.current) {
        ctaParallaxRef.current.style.transform = `translateY(${currentScrollY * 0.15}px)`;
      }

      const animateElements = document.querySelectorAll('.animate-on-scroll');
      animateElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (elementTop < windowHeight - 100) {
          element.classList.add('animate-in');
        }
      });

      setNavbarScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
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
            <Link href="/" className="navbar-logo">
              <a>
                <img src="/images/logo.png" alt="AP Ace Logo" width={40} height={40} />
                <span>AP Ace</span>
              </a>
            </Link>

            <div className="nav-items">
              <div className="nav-item">
                <Link href="/" className="nav-link"><a>Home</a></Link>
              </div>

              <div className="nav-item dropdown">
                <Link href="/courses" className="nav-link"><a>Courses</a></Link>
              </div>

              <div className="nav-item dropdown">
                <Link href="/guides" className="nav-link"><a>Guides</a></Link>
                <div className="dropdown-content">
                  <Link href="/guides/research-methods" className="dropdown-item"><a>Research Methods</a></Link>
                  <Link href="/guides/writing" className="dropdown-item"><a>Academic Writing</a></Link>
                  <Link href="/guides/presentation" className="dropdown-item"><a>Presentation Skills</a></Link>
                </div>
              </div>

              <div className="nav-item dropdown">
                <Link href="/dashboard" className="nav-link"><a>Dashboard</a></Link>
              </div>

              <div className="nav-item">
                <Link href="/ai-tools" className="nav-link"><a>AI Tools</a></Link>
              </div>

              <div className="nav-item">
                <Link href="/blog" className="nav-link"><a>Blog</a></Link>
              </div>

              <div className="nav-item">
                <Link href="/about" className="nav-link"><a>About</a></Link>
              </div>

              <div className="nav-item">
                <Link href="/contact" className="nav-link"><a>Contact</a></Link>
              </div>
            </div>

            <div className="navbar-right">
              <div className="search-box">
                <input type="text" className="search-input" placeholder="Search..." />
                <svg className="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>

              <Link href="/login"><a className="login-button">Login</a></Link>

              <button className="mobile-menu-button" onClick={() => setMobileNavOpen(true)}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 12H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M3 6H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile Navigation */}
        <div className={`mobile-overlay ${mobileNavOpen ? 'active' : ''}`} onClick={() => setMobileNavOpen(false)}></div>

        <div className={`mobile-nav ${mobileNavOpen ? 'active' : ''}`}>
          <div className="mobile-nav-header">
            <Link href="/" className="navbar-logo">
              <a>
                <Image src="/images/logo.png" alt="AP Ace Logo" width={40} height={40} />
                <span>AP Ace</span>
              </a>
            </Link>
            <button className="mobile-nav-close" onClick={() => setMobileNavOpen(false)}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          <div className="mobile-nav-items">
            <div className="mobile-nav-item">
              <Link href="/"><a className="mobile-nav-link">Home</a></Link>
            </div>

            <div className="mobile-nav-item">
              <button className={`mobile-dropdown-toggle ${mobileDropdowns.courses ? 'active' : ''}`} onClick={() => toggleMobileDropdown('courses')}>
                Courses
                <svg className="mobile-dropdown-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>

            <div className="mobile-nav-item">
              <button className={`mobile-dropdown-toggle ${mobileDropdowns.guides ? 'active' : ''}`} onClick={() => toggleMobileDropdown('guides')}>
                Guides
                <svg className="mobile-dropdown-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              {mobileDropdowns.guides && (
                <div className="mobile-submenu">
                  <Link href="/guides/research-methods"><a className="mobile-nav-link">Research Methods</a></Link>
                  <Link href="/guides/writing"><a className="mobile-nav-link">Academic Writing</a></Link>
                  <Link href="/guides/presentation"><a className="mobile-nav-link">Presentation Skills</a></Link>
                </div>
              )}
            </div>

            <div className="mobile-nav-item">
              <Link href="/dashboard"><a className="mobile-nav-link">Dashboard</a></Link>
            </div>

            <div className="mobile-nav-item">
              <Link href="/ai-tools"><a className="mobile-nav-link">AI Tools</a></Link>
            </div>

            <div className="mobile-nav-item">
              <Link href="/blog"><a className="mobile-nav-link">Blog</a></Link>
            </div>

            <div className="mobile-nav-item">
              <Link href="/about"><a className="mobile-nav-link">About</a></Link>
            </div>

            <div className="mobile-nav-item">
              <Link href="/contact"><a className="mobile-nav-link">Contact</a></Link>
            </div>

            <div className="mobile-nav-item">
              <Link href="/login"><a className="mobile-nav-link">Login</a></Link>
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
