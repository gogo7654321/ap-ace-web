// src/app/layout.js
"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import './styles/globals.css';

export default function RootLayout({ children }) {
  const [navbarScrolled, setNavbarScrolled] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [mobileDropdowns, setMobileDropdowns] = useState({
    courses: false,
    guides: false,
  });

  useEffect(() => {
    const handleScroll = () => {
      setNavbarScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileDropdown = (menu) => {
    setMobileDropdowns((prev) => ({
      ...prev,
      [menu]: !prev[menu],
    }));
  };

  return (
    <html lang="en">
      <body>
        {/* Navigation Bar */}
        <nav className={`navbar ${navbarScrolled ? 'scrolled' : ''}`}>
          <div className="navbar-container">
            <Link href="/" className="navbar-logo">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Image
                  src="/images/logo.png"
                  alt="AP Ace Logo"
                  width={40}
                  height={40}
                  priority
                />
                <span>AP Ace</span>
              </div>
            </Link>

            <div className="nav-items">
              <div className="nav-item">
                <Link href="/" className="nav-link">Home</Link>
              </div>

              <div className="nav-item dropdown">
                <Link href="/courses" className="nav-link">Courses</Link>
              </div>

              <div className="nav-item dropdown">
                <Link href="/guides" className="nav-link">Guides</Link>
                <div className="dropdown-content">
                  <Link href="/guides/research-methods" className="dropdown-item">Research Methods</Link>
                  <Link href="/guides/writing" className="dropdown-item">Academic Writing</Link>
                  <Link href="/guides/presentation" className="dropdown-item">Presentation Skills</Link>
                </div>
              </div>

              <div className="nav-item dropdown">
                <Link href="/dashboard" className="nav-link">Dashboard</Link>
              </div>

              <div className="nav-item">
                <Link href="/ai-tools" className="nav-link">AI Tools</Link>
              </div>

              <div className="nav-item">
                <Link href="/blog" className="nav-link">Blog</Link>
              </div>

              <div className="nav-item">
                <Link href="/about" className="nav-link">About</Link>
              </div>

              <div className="nav-item">
                <Link href="/contact" className="nav-link">Contact</Link>
              </div>
            </div>

            <div className="navbar-right">
              <Link href="/auth" className="login-button">Login</Link>

              <button className="mobile-menu-button" onClick={() => setMobileNavOpen(true)}>
                {/* hamburger menu svg */}
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile Navigation */}
        <div className={`mobile-overlay ${mobileNavOpen ? 'active' : ''}`} onClick={() => setMobileNavOpen(false)}></div>

        <div className={`mobile-nav ${mobileNavOpen ? 'active' : ''}`}>
          <div className="mobile-nav-header">
            <Link href="/" className="navbar-logo">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Image
                  src="/images/logo.png"
                  alt="AP Ace Logo"
                  width={40}
                  height={40}
                  priority
                />
                <span>AP Ace</span>
              </div>
            </Link>
            <button className="mobile-nav-close" onClick={() => setMobileNavOpen(false)}>
              {/* close svg */}
            </button>
          </div>

          <div className="mobile-nav-items">
            <div className="mobile-nav-item">
              <Link href="/" className="mobile-nav-link">Home</Link>
            </div>

            <div className="mobile-nav-item">
              <button className={`mobile-dropdown-toggle ${mobileDropdowns.courses ? 'active' : ''}`} onClick={() => toggleMobileDropdown('courses')}>
                Courses
                {/* dropdown arrow */}
              </button>
            </div>

            <div className="mobile-nav-item">
              <button className={`mobile-dropdown-toggle ${mobileDropdowns.guides ? 'active' : ''}`} onClick={() => toggleMobileDropdown('guides')}>
                Guides
                {/* dropdown arrow */}
              </button>

              {mobileDropdowns.guides && (
                <div className="mobile-submenu">
                  <Link href="/guides/research-methods" className="mobile-nav-link">Research Methods</Link>
                  <Link href="/guides/writing" className="mobile-nav-link">Academic Writing</Link>
                  <Link href="/guides/presentation" className="mobile-nav-link">Presentation Skills</Link>
                </div>
              )}
            </div>

            <div className="mobile-nav-item">
              <Link href="/dashboard" className="mobile-nav-link">Dashboard</Link>
            </div>

            <div className="mobile-nav-item">
              <Link href="/ai-tools" className="mobile-nav-link">AI Tools</Link>
            </div>

            <div className="mobile-nav-item">
              <Link href="/blog" className="mobile-nav-link">Blog</Link>
            </div>

            <div className="mobile-nav-item">
              <Link href="/about" className="mobile-nav-link">About</Link>
            </div>

            <div className="mobile-nav-item">
              <Link href="/contact" className="mobile-nav-link">Contact</Link>
            </div>

            <div className="mobile-nav-item">
              <Link href="/auth" className="mobile-nav-link">Login</Link>
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