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
                  src="./images/logo.png"
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
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
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
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Image
                  src="./images/logo.png"
                  alt="AP Ace Logo"
                  width={40}
                  height={40}
                  priority
                />
                <span>AP Ace</span>
              </div>
            </Link>
            <button className="mobile-nav-close" onClick={() => setMobileNavOpen(false)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          <div className="mobile-nav-items">
            <div className="mobile-nav-item">
              <Link href="/" className="mobile-nav-link">Home</Link>
            </div>

            <div className="mobile-nav-item">
              <button className={`mobile-dropdown-toggle ${mobileDropdowns.courses ? 'active' : ''}`} onClick={() => toggleMobileDropdown('courses')}>
                Courses
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`dropdown-arrow ${mobileDropdowns.courses ? 'rotated' : ''}`}>
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </button>
            </div>

            <div className="mobile-nav-item">
              <button className={`mobile-dropdown-toggle ${mobileDropdowns.guides ? 'active' : ''}`} onClick={() => toggleMobileDropdown('guides')}>
                Guides
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`dropdown-arrow ${mobileDropdowns.guides ? 'rotated' : ''}`}>
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
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

        {/* Footer */}
        <footer className="landing-footer">
          <div className="footer-content">
            <div className="footer-branding">
              <div className="footer-logo">
                <Image
                  src="./images/logo.png"
                  alt="AP Ace Logo"
                  width={60}
                  height={60}
                  priority
                />
                <h3>AP Ace</h3>
              </div>
              <p className="footer-tagline">Ace your AP exams with confidence</p>
              <div className="social-icons">
                <a href="https://facebook.com" aria-label="Facebook" target="_blank" rel="noopener noreferrer" className="social-icon facebook">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#1877F2">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" stroke="#1877F2" strokeWidth="1"></path>
                  </svg>
                </a>
                <a href="https://twitter.com" aria-label="Twitter" target="_blank" rel="noopener noreferrer" className="social-icon twitter">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#1DA1F2">
                    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" stroke="#1DA1F2" strokeWidth="1"></path>
                  </svg>
                </a>
                <a href="https://instagram.com" aria-label="Instagram" target="_blank" rel="noopener noreferrer" className="social-icon instagram">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <defs>
                      <linearGradient id="instagram-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#FFDC80" />
                        <stop offset="25%" stopColor="#FCAF45" />
                        <stop offset="50%" stopColor="#F77737" />
                        <stop offset="75%" stopColor="#F56040" />
                        <stop offset="100%" stopColor="#C32AA3" />
                      </linearGradient>
                    </defs>
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="url(#instagram-gradient)" stroke="url(#instagram-gradient)" strokeWidth="1"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" fill="none" stroke="white" strokeWidth="1.5"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" stroke="white" strokeWidth="1.5" strokeLinecap="round"></line>
                  </svg>
                </a>
                <a href="https://youtube.com" aria-label="YouTube" target="_blank" rel="noopener noreferrer" className="social-icon youtube">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#FF0000">
                    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" stroke="#FF0000" strokeWidth="1"></path>
                    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="white"></polygon>
                  </svg>
                </a>
              </div>
            </div>
            <div className="footer-links">
              <div className="link-group">
                <h4>Resources</h4>
                <ul>
                  <li><Link href="/guides">Study Guides</Link></li>
                  <li><Link href="/practice-tests">Practice Tests</Link></li>
                  <li><Link href="/flashcards">Flashcards</Link></li>
                  <li><Link href="/tutoring">Tutoring</Link></li>
                </ul>
              </div>
              <div className="link-group">
                <h4>Company</h4>
                <ul>
                  <li><Link href="/about">About Us</Link></li>
                  <li><Link href="/careers">Careers</Link></li>
                  <li><Link href="/blog">Blog</Link></li>
                  <li><Link href="/contact">Contact</Link></li>
                </ul>
              </div>
              <div className="link-group">
                <h4>Legal</h4>
                <ul>
                  <li><Link href="/terms">Terms of Service</Link></li>
                  <li><Link href="/privacy">Privacy Policy</Link></li>
                  <li><Link href="/cookies">Cookie Policy</Link></li>
                </ul>
              </div>
              <div className="link-group">
                <h4>Support</h4>
                <ul>
                  <li><Link href="/help">Help Center</Link></li>
                  <li><Link href="/faq">FAQ</Link></li>
                  <li><Link href="/accessibility">Accessibility</Link></li>
                  <li><Link href="/report-issue">Report an Issue</Link></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="newsletter-section">
            <h4>Stay Updated</h4>
            <p>Subscribe to our newsletter for study tips, updates, and special offers</p>
            <div className="newsletter-form">
              <input type="email" placeholder="Your Email Address" aria-label="Email Address" />
              <button type="submit" aria-label="Subscribe">Subscribe</button>
            </div>
          </div>
          <div className="copyright">
            <p>&copy; {new Date().getFullYear()} AP Ace. All rights reserved.</p>
            <div className="app-links">
              <a href="https://apps.apple.com" target="_blank" rel="noopener noreferrer" className="app-badge">
                <Image
                  src="./images/app-store-badge.png"
                  alt="Download on the App Store"
                  width={120}
                  height={40}
                />
              </a>
              <a href="https://play.google.com" target="_blank" rel="noopener noreferrer" className="app-badge">
                <Image
                  src="./images/google-play-badge.png"
                  alt="Get it on Google Play"
                  width={135}
                  height={40}
                />
              </a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}