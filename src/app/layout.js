"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
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
      if (window.scrollY > 50) {
        setNavbarScrolled(true);
      } else {
        setNavbarScrolled(false);
      }
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
            <Link href="/">
              <div className="navbar-logo">
                <img src="/images/logo.png" alt="AP Ace Logo" />
                <span>AP Ace</span>
              </div>
            </Link>

            <div className="nav-items">
              <div className="nav-item">
                <Link href="/"><div className="nav-link">Home</div></Link>
              </div>

              <div className="nav-item dropdown">
                <Link href="/courses"><div className="nav-link">Courses</div></Link>
              </div>

              <div className="nav-item dropdown">
                <Link href="/guides"><div className="nav-link">Guides</div></Link>
                <div className="dropdown-content">
                  <Link href="/guides/research-methods"><div className="dropdown-item">Research Methods</div></Link>
                  <Link href="/guides/writing"><div className="dropdown-item">Academic Writing</div></Link>
                  <Link href="/guides/presentation"><div className="dropdown-item">Presentation Skills</div></Link>
                </div>
              </div>

              <div className="nav-item dropdown">
                <Link href="/dashboard"><div className="nav-link">Dashboard</div></Link>
              </div>

              <div className="nav-item">
                <Link href="/ai-tools"><div className="nav-link">AI Tools</div></Link>
              </div>

              <div className="nav-item">
                <Link href="/blog"><div className="nav-link">Blog</div></Link>
              </div>

              <div className="nav-item">
                <Link href="/about"><div className="nav-link">About</div></Link>
              </div>

              <div className="nav-item">
                <Link href="/contact"><div className="nav-link">Contact</div></Link>
              </div>
            </div>

            <div className="navbar-right">
              <Link href="/auth">
                <div className="login-button">Login</div>
              </Link>

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
            <Link href="/">
              <div className="navbar-logo">
                <img src="/images/logo.png" alt="AP Ace Logo" />
                <span>AP Ace</span>
              </div>
            </Link>

            <button className="mobile-nav-close" onClick={() => setMobileNavOpen(false)}>
              {/* close svg */}
            </button>
          </div>

          <div className="mobile-nav-items">
            <div className="mobile-nav-item">
              <Link href="/"><div className="mobile-nav-link">Home</div></Link>
            </div>

            <div className="mobile-nav-item">
              <button className={`mobile-dropdown-toggle ${mobileDropdowns.courses ? 'active' : ''}`} onClick={() => toggleMobileDropdown('courses')}>
                Courses
              </button>
            </div>

            <div className="mobile-nav-item">
              <button className={`mobile-dropdown-toggle ${mobileDropdowns.guides ? 'active' : ''}`} onClick={() => toggleMobileDropdown('guides')}>
                Guides
              </button>

              {mobileDropdowns.guides && (
                <div className="mobile-submenu">
                  <Link href="/guides/research-methods"><div className="mobile-nav-link">Research Methods</div></Link>
                  <Link href="/guides/writing"><div className="mobile-nav-link">Academic Writing</div></Link>
                  <Link href="/guides/presentation"><div className="mobile-nav-link">Presentation Skills</div></Link>
                </div>
              )}
            </div>

            <div className="mobile-nav-item">
              <Link href="/dashboard"><div className="mobile-nav-link">Dashboard</div></Link>
            </div>

            <div className="mobile-nav-item">
              <Link href="/ai-tools"><div className="mobile-nav-link">AI Tools</div></Link>
            </div>

            <div className="mobile-nav-item">
              <Link href="/blog"><div className="mobile-nav-link">Blog</div></Link>
            </div>

            <div className="mobile-nav-item">
              <Link href="/about"><div className="mobile-nav-link">About</div></Link>
            </div>

            <div className="mobile-nav-item">
              <Link href="/contact"><div className="mobile-nav-link">Contact</div></Link>
            </div>

            <div className="mobile-nav-item">
              <Link href="/auth"><div className="mobile-nav-link">Login</div></Link>
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
