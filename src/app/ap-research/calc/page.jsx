"use client";

import React, { useEffect, useState, useRef } from 'react';
import '../ap-research.css';
import './ap-research-calculator.css';  // The new calculator CSS

const APResearchCalculator = () => {
  const [scrollY, setScrollY] = useState(0);
  const [activeDropdown, setActiveDropdown] = useState(null);
  
  // Academic Paper score
  const [paperScore, setPaperScore] = useState(50); // Default value is midpoint (50%)
  
  // Presentation and Oral Defense detailed scores
  const [designsResearch, setDesignsResearch] = useState(1); // out of 3
  const [establishesArgument, setEstablishesArgument] = useState(3); // out of 6
  const [reflectsOnFindings, setReflectsOnFindings] = useState(1); // out of 3
  const [engagesAudience, setEngagesAudience] = useState(3); // out of 6
  const [explainsRationale, setExplainsRationale] = useState(1); // out of 2
  const [providesDetail, setProvidesDetail] = useState(1); // out of 2
  const [demonstratesSignificance, setDemonstratesSignificance] = useState(1); // out of 2

  // Calculated scores
  const [presentationTotalScore, setPresentationTotalScore] = useState(0); // out of 24
  const [presentationPercentage, setPresentationPercentage] = useState(0); // percentage
  const [totalWeightedScore, setTotalWeightedScore] = useState(0); // out of 100
  const [finalScore, setFinalScore] = useState(1); // AP Scale from 1-5
  
  // Enhanced parallax effect with useRef for better performance
  const quoteParallaxRef = useRef(null);
  const ctaParallaxRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
      
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

  // Calculate presentation scores and final AP score when values change
  useEffect(() => {
    // Calculate presentation total (out of 24)
    const presentationTotal = 
      designsResearch + 
      establishesArgument + 
      reflectsOnFindings + 
      engagesAudience + 
      explainsRationale + 
      providesDetail + 
      demonstratesSignificance;
    
    setPresentationTotalScore(presentationTotal);
    
    // Convert to percentage
    const presentationPercent = (presentationTotal / 24) * 100;
    setPresentationPercentage(presentationPercent);
    
    // Calculate weighted total score (out of 100)
    const weighted = (paperScore * 0.75) + (presentationPercent * 0.25);
    setTotalWeightedScore(Math.round(weighted));
    
    // Convert to AP scale (1-5)
    let apScore = 1; // Default minimum score
    
    if (weighted >= 90) {
      apScore = 5;
    } else if (weighted >= 80) {
      apScore = 4;
    } else if (weighted >= 70) {
      apScore = 3;
    } else if (weighted >= 60) {
      apScore = 2;
    }
    
    setFinalScore(apScore);
  }, [paperScore, designsResearch, establishesArgument, reflectsOnFindings, 
      engagesAudience, explainsRationale, providesDetail, demonstratesSignificance]);

  const toggleDropdown = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  // Reset all scores to default values
  const resetScores = () => {
    setPaperScore(100);
    setDesignsResearch(3);
    setEstablishesArgument(6);
    setReflectsOnFindings(3);
    setEngagesAudience(6);
    setExplainsRationale(2);
    setProvidesDetail(2);
    setDemonstratesSignificance(2);
  };

  return (
    <div className="landing-container">
      {/* Simplified header section */}
      <div className="simplified-header" style={{ 
        padding: '40px 20px', 
        textAlign: 'center', 
        backgroundColor: 'var(--bg-light)' 
      }}>
        <div className="header-logo" style={{ marginBottom: '20px' }}>
          <img src="images/ap_research.png" alt="AP® Research Logo" style={{ maxHeight: '80px' }} />
        </div>
        <h1 style={{ color: 'var(--primary-dark-blue)', marginBottom: '15px' }}>AP® Research Score Calculator</h1>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '800px', margin: '0 auto' }}>
          Estimate your score based on the 2026 scoring guidelines
        </p>
      </div>

      {/* Calculator section */}
      <div id="calculator" className="features-section" style={{ paddingTop: '30px' }}>
        <div className="calculator-container" style={{ maxWidth: '800px', margin: '0 auto', padding: '30px', backgroundColor: 'white', borderRadius: '16px', boxShadow: '0 10px 40px rgba(0, 0, 0, 0.06)' }}>
          <div className="calculator-component">
            {/* Academic Paper Slider */}
            <div className="score-slider-group" style={{ marginBottom: '40px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                <h3 style={{ color: 'var(--primary-dark-blue)', fontSize: '1.3rem' }}>Academic Paper (4,000–5,000 words)</h3>
                <span style={{ fontWeight: 'bold', fontSize: '1.2rem', color: 'var(--primary-accent)' }}>{paperScore}%</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                <span>College Board scored (75% of total)</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={paperScore} 
                onChange={(e) => setPaperScore(parseInt(e.target.value))}
                style={{ 
                  width: '100%', 
                  height: '10px',
                  borderRadius: '5px',
                  background: `linear-gradient(to right, var(--primary-gradient-start), var(--primary-gradient-end))`,
                  outline: 'none',
                  appearance: 'none',
                  cursor: 'pointer'
                }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '5px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                <span>0%</span>
                <span>100%</span>
              </div>
            </div>
            
            {/* Presentation and Oral Defense Section */}
            <div style={{ 
              marginBottom: '40px', 
              padding: '20px', 
              backgroundColor: 'var(--bg-gray)', 
              borderRadius: '12px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h3 style={{ color: 'var(--primary-dark-blue)', fontSize: '1.3rem' }}>Presentation and Oral Defense</h3>
                <span style={{ fontWeight: 'bold', fontSize: '1.2rem', color: 'var(--primary-accent)' }}>
                  {presentationTotalScore}/24 ({Math.round(presentationPercentage)}%)
                </span>
              </div>
              <div style={{ marginBottom: '5px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                <span>Teacher scored (25% of total)</span>
              </div>
              
              {/* Detailed categories */}
              <div style={{ marginTop: '20px' }}>
                {/* Designs Research */}
                <div style={{ marginBottom: '15px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '5px' }}>
                    <span style={{ fontWeight: '500' }}>Designs Research </span>
                    <span style={{ fontWeight: 'bold', color: 'var(--primary-accent)' }}>{designsResearch}/3</span>
                  </div>
                  <input 
                    type="range" 
                    min="0" 
                    max="3" 
                    step="1"
                    value={designsResearch} 
                    onChange={(e) => setDesignsResearch(parseInt(e.target.value))}
                    style={{ 
                      width: '100%', 
                      height: '8px',
                      borderRadius: '4px',
                      background: `linear-gradient(to right, var(--primary-gradient-start), var(--primary-gradient-end))`,
                      outline: 'none',
                      appearance: 'none',
                      cursor: 'pointer'
                    }}
                  />
                </div>
                
                {/* Establishes Argument */}
                <div style={{ marginBottom: '15px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '5px' }}>
                    <span style={{ fontWeight: '500' }}>Establishes Argument </span>
                    <span style={{ fontWeight: 'bold', color: 'var(--primary-accent)' }}>{establishesArgument}/6</span>
                  </div>
                  <input 
                    type="range" 
                    min="0" 
                    max="6" 
                    step="1"
                    value={establishesArgument} 
                    onChange={(e) => setEstablishesArgument(parseInt(e.target.value))}
                    style={{ 
                      width: '100%', 
                      height: '8px',
                      borderRadius: '4px',
                      background: `linear-gradient(to right, var(--primary-gradient-start), var(--primary-gradient-end))`,
                      outline: 'none',
                      appearance: 'none',
                      cursor: 'pointer'
                    }}
                  />
                </div>
                
                {/* Reflects on Findings */}
                <div style={{ marginBottom: '15px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '5px' }}>
                    <span style={{ fontWeight: '500' }}>Reflects on Findings </span>
                    <span style={{ fontWeight: 'bold', color: 'var(--primary-accent)' }}>{reflectsOnFindings}/3</span>
                  </div>
                  <input 
                    type="range" 
                    min="0" 
                    max="3" 
                    step="1"
                    value={reflectsOnFindings} 
                    onChange={(e) => setReflectsOnFindings(parseInt(e.target.value))}
                    style={{ 
                      width: '100%', 
                      height: '8px',
                      borderRadius: '4px',
                      background: `linear-gradient(to right, var(--primary-gradient-start), var(--primary-gradient-end))`,
                      outline: 'none',
                      appearance: 'none',
                      cursor: 'pointer'
                    }}
                  />
                </div>
                
                {/* Engages Audience */}
                <div style={{ marginBottom: '15px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '5px' }}>
                    <span style={{ fontWeight: '500' }}>Engages Audience </span>
                    <span style={{ fontWeight: 'bold', color: 'var(--primary-accent)' }}>{engagesAudience}/6</span>
                  </div>
                  <input 
                    type="range" 
                    min="0" 
                    max="6" 
                    step="1"
                    value={engagesAudience} 
                    onChange={(e) => setEngagesAudience(parseInt(e.target.value))}
                    style={{ 
                      width: '100%', 
                      height: '8px',
                      borderRadius: '4px',
                      background: `linear-gradient(to right, var(--primary-gradient-start), var(--primary-gradient-end))`,
                      outline: 'none',
                      appearance: 'none',
                      cursor: 'pointer'
                    }}
                  />
                </div>
                
                {/* Explains Rationale */}
                <div style={{ marginBottom: '15px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '5px' }}>
                    <span style={{ fontWeight: '500' }}>Explains Rationale </span>
                    <span style={{ fontWeight: 'bold', color: 'var(--primary-accent)' }}>{explainsRationale}/2</span>
                  </div>
                  <input 
                    type="range" 
                    min="0" 
                    max="2" 
                    step="1"
                    value={explainsRationale} 
                    onChange={(e) => setExplainsRationale(parseInt(e.target.value))}
                    style={{ 
                      width: '100%', 
                      height: '8px',
                      borderRadius: '4px',
                      background: `linear-gradient(to right, var(--primary-gradient-start), var(--primary-gradient-end))`,
                      outline: 'none',
                      appearance: 'none',
                      cursor: 'pointer'
                    }}
                  />
                </div>
                
                {/* Provides Detail */}
                <div style={{ marginBottom: '15px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '5px' }}>
                    <span style={{ fontWeight: '500' }}>Provides Detail </span>
                    <span style={{ fontWeight: 'bold', color: 'var(--primary-accent)' }}>{providesDetail}/2</span>
                  </div>
                  <input 
                    type="range" 
                    min="0" 
                    max="2" 
                    step="1"
                    value={providesDetail} 
                    onChange={(e) => setProvidesDetail(parseInt(e.target.value))}
                    style={{ 
                      width: '100%', 
                      height: '8px',
                      borderRadius: '4px',
                      background: `linear-gradient(to right, var(--primary-gradient-start), var(--primary-gradient-end))`,
                      outline: 'none',
                      appearance: 'none',
                      cursor: 'pointer'
                    }}
                  />
                </div>
                
                {/* Demonstrates Significance */}
                <div style={{ marginBottom: '5px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '5px' }}>
                    <span style={{ fontWeight: '500' }}>Demonstrates Significance (2)</span>
                    <span style={{ fontWeight: 'bold', color: 'var(--primary-accent)' }}>{demonstratesSignificance}/2</span>
                  </div>
                  <input 
                    type="range" 
                    min="0" 
                    max="2" 
                    step="1"
                    value={demonstratesSignificance} 
                    onChange={(e) => setDemonstratesSignificance(parseInt(e.target.value))}
                    style={{ 
                      width: '100%', 
                      height: '8px',
                      borderRadius: '4px',
                      background: `linear-gradient(to right, var(--primary-gradient-start), var(--primary-gradient-end))`,
                      outline: 'none',
                      appearance: 'none',
                      cursor: 'pointer'
                    }}
                  />
                </div>
              </div>
            </div>
            
            {/* Total Score out of 100 */}
            <div style={{ 
              marginBottom: '30px', 
              padding: '15px', 
              backgroundColor: 'rgba(59, 130, 246, 0.1)', 
              borderRadius: '8px',
              textAlign: 'center'
            }}>
              <h3 style={{ color: 'var(--primary-dark-blue)', marginBottom: '10px' }}>Total Weighted Score</h3>
              <div style={{ 
                fontSize: '2.5rem', 
                fontWeight: 'bold', 
                color: 'var(--primary-accent)' 
              }}>
                {totalWeightedScore}/100
              </div>
            </div>
            
            {/* Action Buttons */}
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              marginBottom: '30px',
              gap: '15px'
            }}>
              <button 
                onClick={resetScores}
                style={{ 
                  flex: '1',
                  padding: '12px 20px',
                  backgroundColor: '#f3f4f6',
                  color: '#4b5563',
                  border: 'none',
                  borderRadius: '8px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
                }}
              >
                Reset Scores
              </button>
              
              <a 
                href="/ap-research/resources"
                style={{ 
                  flex: '1',
                  padding: '12px 20px',
                  backgroundColor: 'var(--primary-accent)',
                  color: 'white',
                  textAlign: 'center',
                  textDecoration: 'none',
                  borderRadius: '8px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: '0 4px 6px rgba(59, 130, 246, 0.25)'
                }}
              >
                Boost Your Score
              </a>
            </div>
            
            {/* Results Display */}
            <div className="results-display" style={{ 
              backgroundColor: 'var(--bg-gray)', 
              padding: '25px', 
              borderRadius: '12px',
              textAlign: 'center'
            }}>
              <h2 style={{ marginBottom: '15px', color: 'var(--primary-dark-blue)' }}>Your Estimated AP® Score</h2>
              
              <div style={{ 
                fontSize: '5rem', 
                fontWeight: 'bold', 
                color: 'var(--primary-accent)',
                marginBottom: '15px'
              }}>
                {finalScore}
              </div>
              
              <p style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>
                {finalScore >= 3 ? 
                  "Congratulations! A score of 3 or higher typically qualifies for college credit." : 
                  "Keep working! A score of 3 or higher is typically needed to qualify for college credit."}
              </p>
              
              <div style={{ 
                marginTop: '25px', 
                padding: '15px', 
                backgroundColor: 'rgba(59, 130, 246, 0.1)', 
                borderRadius: '8px', 
                fontSize: '0.9rem',
                color: 'var(--text-secondary)',
                textAlign: 'left'
              }}>
                <strong>Note:</strong> This calculator provides an estimate based on the 2026 AP® Research scoring guidelines. Actual scores may vary based on College Board's specific rubrics and evaluation criteria.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Accordion/Dropdown section for scoring details */}
      <div className="accordion-section">
        <div className="section-header">
          <h2>AP® Research Scoring Details</h2>
          <div className="underline"></div>
        </div>
        
        <div className="accordion-container">
          <div className="accordion-item">
            <div 
              className={`accordion-header ${activeDropdown === 0 ? 'active' : ''}`} 
              onClick={() => toggleDropdown(0)}
            >
              <h3>Academic Paper Scoring</h3>
              <span className="dropdown-icon">{activeDropdown === 0 ? '−' : '+'}</span>
            </div>
            <div className={`accordion-content ${activeDropdown === 0 ? 'active' : ''}`}>
              <p>The Academic Paper (4,000-5,000 words) accounts for 75% of your total AP® Research score. College Board evaluators assess your paper based on research question formulation, method selection and implementation, evidence analysis, conclusion development, and adherence to academic writing standards. Strong papers demonstrate sophisticated thinking, thorough research, and clear connections between evidence and claims.</p>
            </div>
          </div>
          
          <div className="accordion-item">
            <div 
              className={`accordion-header ${activeDropdown === 1 ? 'active' : ''}`} 
              onClick={() => toggleDropdown(1)}
            >
              <h3>Presentation & Oral Defense Scoring</h3>
              <span className="dropdown-icon">{activeDropdown === 1 ? '−' : '+'}</span>
            </div>
            <div className={`accordion-content ${activeDropdown === 1 ? 'active' : ''}`}>
              <p>The Presentation and Oral Defense (15-20 minutes total) constitutes 25% of your AP® Research score. This component evaluates your ability to clearly communicate your research process, findings, and implications to an audience. During the defense, a panel of three evaluators will ask 3-4 questions about your research. You'll be assessed on presentation quality, defense of reasoning, and response to questions that may challenge aspects of your work.</p>
            </div>
          </div>
          
          <div className="accordion-item">
            <div 
              className={`accordion-header ${activeDropdown === 2 ? 'active' : ''}`} 
              onClick={() => toggleDropdown(2)}
            >
              <h3>Understanding the AP® 1-5 Scale</h3>
              <span className="dropdown-icon">{activeDropdown === 2 ? '−' : '+'}</span>
            </div>
            <div className={`accordion-content ${activeDropdown === 2 ? 'active' : ''}`}>
              <p>AP® Research scores are reported on the standard 1-5 scale: 5 (Extremely well qualified), 4 (Well qualified), 3 (Qualified), 2 (Possibly qualified), and 1 (No recommendation). Most colleges grant credit for scores of 3 or higher, though selective institutions may require 4 or 5. The College Board converts your combined paper and presentation scores to this scale using a conversion formula that may vary slightly year to year.</p>
            </div>
          </div>
          
          <div className="accordion-item">
            <div 
              className={`accordion-header ${activeDropdown === 3 ? 'active' : ''}`} 
              onClick={() => toggleDropdown(3)}
            >
              <h3>2026 Scoring Updates</h3>
              <span className="dropdown-icon">{activeDropdown === 3 ? '−' : '+'}</span>
            </div>
            <div className={`accordion-content ${activeDropdown === 3 ? 'active' : ''}`}>
              <p>The 2026 AP® Research assessment maintains the same structure as previous years, with 75% weight on the Academic Paper and 25% on the Presentation and Oral Defense. However, the rubric has been refined to place greater emphasis on methodological rigor and the contribution to the field of study. Students should focus on clearly articulating the significance of their research findings and demonstrating sophisticated engagement with existing scholarship in their chosen discipline.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quote section with fixed parallax effect */}
      <div className="quote-section">
        <div className="quote-parallax" ref={quoteParallaxRef}></div>
        <div className="quote-content">
          <h2>"The ultimate goal of research is not objectivity, but truth."</h2>
          <p>- Helene Deutsch</p>
        </div>
      </div>

      {/* CTA section with parallax effect */}
      <div className="cta-section">
        <div className="cta-parallax" ref={ctaParallaxRef}></div>
        <div className="cta-content">
          <h2>Ready to Excel in AP® Research?</h2>
          <p>Access our complete library of study materials, practice prompts, and expert guidance.</p>
          <a href="/ap-research/resources" className="cta-button">
            Explore Resources <span className="btn-icon">→</span>
          </a>
        </div>
      </div>

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

export default APResearchCalculator;