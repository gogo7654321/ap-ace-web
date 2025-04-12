'use client';

import { useEffect, useState, useRef } from 'react';
import { FaGraduationCap, FaBook, FaLaptop, FaUsers, FaArrowRight, FaChartLine } from 'react-icons/fa';
import Link from 'next/link';
import './styles/landing.css';

export default function LandingPage() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isVisible, setIsVisible] = useState({
    passRateGraph: false,
    features: false,
    courses: false
  });
  const [barHeights, setBarHeights] = useState({
    national: 0,
    apAce: 0,
    nationalScoring5: 0,
    apAceScoring5: 0
  });
  const [circleProgress, setCircleProgress] = useState(326.7); // Start with no progress (full circle)
  const [statValues, setStatValues] = useState({
    improvementRate: 0,
    likelihood: 0,
    studentsHelped: 0
  });

  const passRateRef = useRef(null);
  const featuresRef = useRef(null);
  const coursesRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
      
      // Check if elements are visible
      if (passRateRef.current) {
        const passRatePos = passRateRef.current.getBoundingClientRect();
        const isNowVisible = passRatePos.top < window.innerHeight * 0.8;
        
        setIsVisible(prev => {
          // Only trigger animations when first becoming visible
          if (!prev.passRateGraph && isNowVisible) {
            // Animate bar heights
            animateBars();
            // Animate circle graph
            animateCircle();
            // Animate stats
            animateStats();
          }
          return {
            ...prev,
            passRateGraph: isNowVisible
          };
        });
      }
      
      if (featuresRef.current) {
        const featuresPos = featuresRef.current.getBoundingClientRect();
        setIsVisible(prev => ({
          ...prev,
          features: featuresPos.top < window.innerHeight * 0.8
        }));
      }
      
      if (coursesRef.current) {
        const coursesPos = coursesRef.current.getBoundingClientRect();
        setIsVisible(prev => ({
          ...prev,
          courses: coursesPos.top < window.innerHeight * 0.8
        }));
      }
    };

    const animateBars = () => {
      // Target heights for each bar
      const targetNational = 60;
      const targetApAce = 92;
      const targetNationalScoring5 = 20;
      const targetApAceScoring5 = 45;
      
      let startTime = null;
      const duration = 1500; // 1.5 seconds

      const animateStep = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);

        setBarHeights({
          national: Math.floor(progress * targetNational),
          apAce: Math.floor(progress * targetApAce),
          nationalScoring5: Math.floor(progress * targetNationalScoring5),
          apAceScoring5: Math.floor(progress * targetApAceScoring5),
        });

        if (progress < 1) {
          window.requestAnimationFrame(animateStep);
        }
      };
      
      window.requestAnimationFrame(animateStep);
    };

    const animateCircle = () => {
      // Circle circumference is 326.7 (2 * PI * r where r=52)
      // 40% of 326.7 is about 130.68, so we need to go from 326.7 to 326.7 - 130.68 = 196.02
      const targetOffset = 196.02;
      const startOffset = 326.7;
      
      let startTime = null;
      const duration = 2000; // 2 seconds

      const animateStep = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Linear interpolation from startOffset to targetOffset
        const currentOffset = startOffset - (progress * (startOffset - targetOffset));
        
        setCircleProgress(currentOffset);

        if (progress < 1) {
          window.requestAnimationFrame(animateStep);
        }
      };
      
      window.requestAnimationFrame(animateStep);
    };

    const animateStats = () => {
      // Target values
      const targetImprovement = 96;
      const targetLikelihood = 2;
      const targetStudents = 50;
      
      let startTime = null;
      const duration = 2000; // 2 seconds

      const animateStep = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);

        setStatValues({
          improvementRate: Math.floor(progress * targetImprovement),
          likelihood: progress < 0.5 ? 0 : progress < 0.75 ? 1 : 2, // Step animation for small numbers
          studentsHelped: Math.floor(progress * targetStudents),
        });

        if (progress < 1) {
          window.requestAnimationFrame(animateStep);
        }
      };
      
      window.requestAnimationFrame(animateStep);
    };

    window.addEventListener('scroll', handleScroll);
    // Initial check
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Popular AP courses in order of popularity
  const popularCourses = [
    { name: "Calculus AB", icon: "ap_calculus_ab.svg" },
    { name: "US History", icon: "ap_united_states_history.svg" },
    { name: "English Language", icon: "ap_english_language_and_composition.svg" },
    { name: "Psychology", icon: "ap_psychology.svg" },
    { name: "Biology", icon: "ap_biology.svg" },
    { name: "Statistics", icon: "ap_statistics.svg" },
    { name: "World History", icon: "ap_world_history_modern.svg" },
    { name: "Computer Science Principles", icon: "ap_computer_science_principles.svg" }
  ];

  return (
    <div className="landing-container">
      {/* Hero Section with Parallax */}
      <section className="hero-section">
        <div 
          className="parallax-bg" 
          style={{ transform: `translateY(${scrollPosition * 0.5}px)` }}
        ></div>
        <div className="hero-content">
          <img 
            src="images/logo.png" 
            alt="AP Ace Logo" 
            className="hero-logo"
            style={{ transform: `translateY(${-scrollPosition * 0.2}px)` }}
          />
          <h1 
            className="hero-title"
            style={{ transform: `translateY(${-scrollPosition * 0.1}px)` }}
          >
            Master Your AP Exams
          </h1>
          <p 
            className="hero-subtitle"
            style={{ transform: `translateY(${-scrollPosition * 0.05}px)` }}
          >
            Personalized study plans, practice tests, and resources to help you excel
          </p>
          <div className="hero-buttons">
            <Link href="/auth" className="cta-button">
              Get Started <FaArrowRight className="btn-icon" />
            </Link>
            <button className="secondary-button">Learn More</button>
          </div>
        </div>
        <div className="scroll-indicator">
          <span>Scroll Down</span>
          <div className="scroll-arrow"></div>
        </div>
      </section>

      {/* Pass Rate Graphs with Parallax */}
      <section className="pass-rate-section" ref={passRateRef}>
        <div className="section-header">
          <h2>See the Difference</h2>
          <div className="underline"></div>
          <p className="section-subheading">Our students consistently outperform national averages on AP exams</p>
        </div>
        
        <div className="graphs-container">
          <div className={`graph-wrapper ${isVisible.passRateGraph ? 'animate-in' : ''}`}>
            <div className="graph-card">
              <h3>AP Pass Rates</h3>
              <div className="graph-content">
                <div className="bar national">
                  <div className="bar-fill" style={{height: `${barHeights.national}%`}}></div>
                  <span className="bar-value">{barHeights.national}%</span>
                  <span className="bar-label">National Avg.</span>
                </div>
                <div className="bar ap-ace">
                  <div className="bar-fill" style={{height: `${barHeights.apAce}%`}}></div>
                  <span className="bar-value">{barHeights.apAce}%</span>
                  <span className="bar-label">AP Ace Users</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className={`graph-wrapper ${isVisible.passRateGraph ? 'animate-in delay-1' : ''}`}>
            <div className="graph-card">
              <h3>Students Scoring 5</h3>
              <div className="graph-content">
                <div className="bar national">
                  <div className="bar-fill" style={{height: `${barHeights.nationalScoring5}%`}}></div>
                  <span className="bar-value">{barHeights.nationalScoring5}%</span>
                  <span className="bar-label">National Avg.</span>
                </div>
                <div className="bar ap-ace">
                  <div className="bar-fill" style={{height: `${barHeights.apAceScoring5}%`}}></div>
                  <span className="bar-value">{barHeights.apAceScoring5}%</span>
                  <span className="bar-label">AP Ace Users</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className={`graph-wrapper ${isVisible.passRateGraph ? 'animate-in delay-2' : ''}`}>
            <div className="graph-card">
              <h3>Study Time Efficiency</h3>
              <div className="graph-content">
                <div className="circle-graph">
                  <div className="circle-inner">
                    <div className="percentage">40%</div>
                    <div className="sub-text">Less Time</div>
                  </div>
                  <svg viewBox="0 0 120 120" className="circle-progress">
                    <circle r="52" cx="60" cy="60" className="circle-bg" />
                    <circle r="52" cx="60" cy="60" className="circle-value" strokeDasharray="326.7 326.7" strokeDashoffset={circleProgress} />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="var(--primary-gradient-start)" />
                        <stop offset="100%" stopColor="var(--primary-gradient-end)" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <div className="graph-caption">
                  <span>Our students achieve better results with 40% less study time</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="stats-row">
          <div className={`stat-item ${isVisible.passRateGraph ? 'animate-in delay-3' : ''}`}>
            <div className="stat-number counter">{statValues.improvementRate}%</div>
            <div className="stat-text">of our students improve their scores</div>
          </div>
          <div className={`stat-item ${isVisible.passRateGraph ? 'animate-in delay-4' : ''}`}>
            <div className="stat-number counter">{statValues.likelihood}x</div>
            <div className="stat-text">more likely to score a 5</div>
          </div>
          <div className={`stat-item ${isVisible.passRateGraph ? 'animate-in delay-5' : ''}`}>
            <div className="stat-number counter">{statValues.studentsHelped}k+</div>
            <div className="stat-text">students helped last year</div>
          </div>
        </div>
      </section>

      {/* Trusted by Many Section */}
      <section className="trusted-section">
        <div className="trusted-content">
          <h2>Used and trusted by schools all over the world!</h2>
        </div>
      </section>

      {/* Logo Marquee Section */}
      <section className="logo-marquee-section">
        <div className="logos">
          <div className="logos-slide">
            <img src="images/sprayberry.png" alt="Sprayberry" />
            <img src="images/south cobb.png" alt="South Cobb" />
            <img src="images/pope.png" alt="Pope" />
            <img src="images/pebblebrook.png" alt="Pebblebrook" />
            <img src="images/osborne.png" alt="Osborne" />
            <img src="images/north cobb.png" alt="North Cobb" />
            <img src="images/mceachern.png" alt="McEachern" />
            <img src="images/lassiter.png" alt="Lassiter" />
            <img src="images/kennesaw.png" alt="Kennesaw" />
            <img src="images/kell.png" alt="Kell" />
            <img src="images/hillgrove.png" alt="Hillgrove" />
            <img src="images/harrison.png" alt="Harrison" />
            <img src="images/campbell.png" alt="Campbell" />
            <img src="images/allatoona.png" alt="Allatoona" />
            {/* Duplicate the logos for seamless looping */}
            <img src="images/sprayberry.png" alt="Sprayberry" />
            <img src="images/south cobb.png" alt="South Cobb" />
            <img src="images/pope.png" alt="Pope" />
            <img src="images/pebblebrook.png" alt="Pebblebrook" />
            <img src="images/osborne.png" alt="Osborne" />
            <img src="images/north cobb.png" alt="North Cobb" />
            <img src="images/mceachern.png" alt="McEachern" />
            <img src="images/lassiter.png" alt="Lassiter" />
            <img src="images/kennesaw.png" alt="Kennesaw" />
            <img src="images/kell.png" alt="Kell" />
            <img src="images/hillgrove.png" alt="Hillgrove" />
            <img src="images/harrison.png" alt="Harrison" />
            <img src="images/campbell.png" alt="Campbell" />
            <img src="images/allatoona.png" alt="Allatoona" />
          </div>
        </div>
      </section>

      {/* Features Section with Apple-like design */}
      <section className="features-section" ref={featuresRef}>
        <div className="section-header">
          <h2>Why Choose AP Ace?</h2>
          <div className="underline"></div>
        </div>

        <div className="features-grid">
          <div 
            className={`feature-card ${isVisible.features ? 'animate-slide-up' : ''}`}
            style={{ transitionDelay: '0ms' }}
          >
            <div className="feature-icon">
              <FaGraduationCap />
            </div>
            <h3>Expert Content</h3>
            <p>Created by experienced AP teachers and exam scorers to align perfectly with exam requirements.</p>
          </div>

          <div 
            className={`feature-card ${isVisible.features ? 'animate-slide-up' : ''}`}
            style={{ transitionDelay: '200ms' }}
          >
            <div className="feature-icon">
              <FaBook />
            </div>
            <h3>Comprehensive Resources</h3>
            <p>From detailed study guides to thousands of practice questions spanning all AP subjects.</p>
          </div>

          <div 
            className={`feature-card ${isVisible.features ? 'animate-slide-up' : ''}`}
            style={{ transitionDelay: '400ms' }}
          >
            <div className="feature-icon">
              <FaLaptop />
            </div>
            <h3>Adaptive Learning</h3>
            <p>Our platform adjusts to your strengths and weaknesses to create personalized study plans.</p>
          </div>

          <div 
            className={`feature-card ${isVisible.features ? 'animate-slide-up' : ''}`}
            style={{ transitionDelay: '600ms' }}
          >
            <div className="feature-icon">
              <FaUsers />
            </div>
            <h3>Community Support</h3>
            <p>Connect with other AP students and get help from our community of experienced tutors.</p>
          </div>
        </div>
      </section>

      {/* Product Showcase Section (Apple-inspired) */}
      <section className="product-showcase">
        <div className="showcase-container">
          <div className="showcase-item">
            <div className="showcase-content">
              <h2>Study Smarter, Not Harder</h2>
              <p>Our intelligent system identifies your knowledge gaps and creates a personalized study plan that focuses on what you need most.</p>
              <Link href="/features" className="learn-more-link">
                Learn more <FaArrowRight className="arrow-icon" />
              </Link>
            </div>
            <div className="showcase-image">
              <div className="image-wrapper">
                <img src="/api/placeholder/600/400" alt="Personalized Study" className="mockup-image" />
              </div>
            </div>
          </div>
          
          <div className="showcase-item reverse">
            <div className="showcase-content">
              <h2>Real Exam Experience</h2>
              <p>Practice with authentic AP-style questions and timed tests that simulate the real exam environment.</p>
              <Link href="/features" className="learn-more-link">
                Learn more <FaArrowRight className="arrow-icon" />
              </Link>
            </div>
            <div className="showcase-image">
              <div className="image-wrapper">
                <img src="/api/placeholder/600/400" alt="Exam Practice" className="mockup-image" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Parallax Quote Section */}
      <section 
        className="quote-section"
        style={{ backgroundPositionY: `${(scrollPosition - 800) * 0.15}px` }}
      >
        <div className="quote-content">
          <h2>"AP Ace transformed my study routine. I went from struggling to scoring a 5 on my AP Calculus exam."</h2>
          <p>— Khaleel A., Stanford University</p>
        </div>
      </section>

      {/* Courses Section with Custom Icons */}

<section className="courses-section" ref={coursesRef}>
  <div className="section-header">
    <h2>Popular AP Courses</h2>
    <div className="underline"></div>
  </div>

  <div className="courses-grid">
    {popularCourses.map((course, index) => {
      // Manually assign each icon based on course name
      let iconPath = '';
      switch (course.name) {
        case 'AP Biology':
          iconPath = '/images/ap-bio.svg';
          break;
        case 'AP Calculus AB':
          iconPath = '/images/ap-calc-ab.svg';
          break;
        case 'AP Calculus BC':
          iconPath = '/images/ap-calc-bc.svg';
          break;
        case 'AP Chemistry':
          iconPath = '/images/ap-chem.svg';
          break;
        case 'AP Computer Science A':
          iconPath = '/images/ap-cs-a.svg';
          break;
        case 'AP Computer Science Principles':
          iconPath = '/images/ap-csp.svg';
          break;
        case 'AP English Language':
          iconPath = '/images/ap-lang.svg';
          break;
        case 'AP English Literature':
          iconPath = '/images/ap-lit.svg';
          break;
        case 'AP Environmental Science':
          iconPath = '/images/ap-envsci.svg';
          break;
        case 'AP Human Geography':
          iconPath = '/images/ap-hug.svg';
          break;
        case 'AP Macroeconomics':
          iconPath = '/images/ap-macro.svg';
          break;
        case 'AP Microeconomics':
          iconPath = '/images/ap-micro.svg';
          break;
        case 'AP Physics 1':
          iconPath = '/images/ap-phys1.svg';
          break;
        case 'AP Psychology':
          iconPath = '/images/ap-psych.svg';
          break;
        case 'AP Statistics':
          iconPath = '/images/ap-stats.svg';
          break;
        case 'AP U.S. Government':
          iconPath = '/images/ap-gov.svg';
          break;
        case 'AP U.S. History':
          iconPath = '/images/apush.svg';
          break;
        case 'AP World History':
          iconPath = '/images/ap-world.svg';
          break;
        default:
          iconPath = '/images/default.svg';
      }

      return (
        <div 
          key={index} 
          className={`course-card ${isVisible.courses ? 'animate-fade-in' : ''}`}
          style={{ transitionDelay: `${index * 100}ms` }}
        >
          <div className="course-icon">
            <img src={iconPath} alt={course.name} />
          </div>
          <h3>{course.name}</h3>
          <button className="course-btn">Explore</button>
        </div>
      );
    })}
  </div>
</section>


      {/* Final CTA with Parallax */}
      <section 
        className="cta-section"
        style={{ backgroundPositionY: `${(scrollPosition - 1600) * 0.1}px` }}
      >
        <div className="cta-content">
          <h2>Ready to Ace Your AP Exams?</h2>
          <p>Join thousands of students who've improved their scores with AP Ace</p>
          <Link href="/auth" className="cta-button">
            Start Now <FaArrowRight className="btn-icon" />
          </Link>
        </div>
      </section>

      {/* Student Testimonials - New Section */}
      <section className="testimonials-section">
        <div className="section-header">
          <h2>What Our Students Say</h2>
          <div className="underline"></div>
        </div>
        
        <div className="testimonials-container">
          <div className="testimonial-card">
            <div className="testimonial-image">
              <img src="images/adam.JPEG" alt="Student" className="student-avatar" />
            </div>
            <div className="testimonial-stars">★★★★★</div>
            <p className="testimonial-text">"AP Ace helped me organize my study schedule and focus on my weak areas. I improved from a 3 to a 5 on my AP Human exam!"</p>
            <p className="testimonial-author">Adam K., High School Freshman</p>
          </div>
          
          <div className="testimonial-card">
            <div className="testimonial-image">
              <img src="images/mann.jpeg" alt="Student" className="student-avatar" />
            </div>
            <div className="testimonial-stars">★★★★★</div>
            <p className="testimonial-text">"The practice questions are spot-on! They really match the difficulty and style of the actual AP exams. Highly recommend!"</p>
            <p className="testimonial-author">Mann P., College Freshman</p>
          </div>
          
          <div className="testimonial-card">
            <div className="testimonial-image">
              <img src="images/gabe.jpeg" alt="Student" className="student-avatar" />
            </div>
            <div className="testimonial-stars">★★★★★</div>
            <p className="testimonial-text">"AP Ace's detailed explanations for each practice question helped me understand complex concepts I had been struggling with."</p>
            <p className="testimonial-author">Gabe A., High School Junior</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="footer-content">
          <div className="footer-logo">
            <img src="images/logo.png" alt="AP Ace Logo" />
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