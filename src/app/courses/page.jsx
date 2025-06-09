'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Search, BookOpen, Clock, Award } from 'lucide-react';

const CoursesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [animateCards, setAnimateCards] = useState(false);

  // Complete list of all 40 AP courses
  const courses = [
    {
      id: 'ap_art_history',
      title: 'AP Art History',
      description: 'Explore the history of art through critical analysis of architecture, sculpture, painting, and other artistic media.',
      icon: '🎨',
      subject: 'Arts'
    },
    {
      id: 'ap_biology',
      title: 'AP Biology',
      description: 'Explore the science of life through laboratory investigations and advanced study of cellular processes, genetics, evolution, and ecology.',
      icon: '🧬',
      subject: 'Science'
    },
    {
      id: 'ap_calculus_ab',
      title: 'AP Calculus AB',
      description: 'Master the fundamentals of differential and integral calculus through limits, derivatives, and their applications.',
      icon: '📊',
      subject: 'Mathematics'
    },
    {
      id: 'ap_calculus_bc',
      title: 'AP Calculus BC',
      description: 'Advanced calculus covering all AB topics plus additional techniques of integration, series, and parametric equations.',
      icon: '📈',
      subject: 'Mathematics'
    },
    {
      id: 'ap_capstone_research',
      title: 'AP Capstone Research',
      description: 'Conduct independent research on a topic of personal interest, culminating in an academic paper and presentation.',
      icon: '🔬',
      subject: 'Interdisciplinary'
    },
    {
      id: 'ap_capstone_seminar',
      title: 'AP Capstone Seminar',
      description: 'Develop critical thinking and research skills through investigation of complex, real-world issues and problems.',
      icon: '💭',
      subject: 'Interdisciplinary'
    },
    {
      id: 'ap_chemistry',
      title: 'AP Chemistry',
      description: 'Dive deep into chemical reactions, atomic structure, bonding, and thermodynamics through hands-on laboratory work.',
      icon: '⚗️',
      subject: 'Science'
    },
    {
      id: 'ap_chinese_language',
      title: 'AP Chinese Language and Culture',
      description: 'Develop proficiency in Chinese through authentic materials and cultural exploration of Chinese-speaking regions.',
      icon: '🏮',
      subject: 'World Languages'
    },
    {
      id: 'ap_comparative_government',
      title: 'AP Comparative Government and Politics',
      description: 'Compare political systems, institutions, and processes across different countries and regions.',
      icon: '🏛️',
      subject: 'Social Studies'
    },
    {
      id: 'ap_computer_science_a',
      title: 'AP Computer Science A',
      description: 'Learn object-oriented programming in Java, including data structures, algorithms, and software design principles.',
      icon: '💻',
      subject: 'Computer Science'
    },
    {
      id: 'ap_computer_science_principles',
      title: 'AP Computer Science Principles',
      description: 'Explore the foundational concepts of computer science including programming, algorithms, and the impact of computing.',
      icon: '🖥️',
      subject: 'Computer Science'
    },
    {
      id: 'ap_drawing',
      title: 'AP Drawing',
      description: 'Develop artistic skills and personal voice through various drawing media and techniques.',
      icon: '✏️',
      subject: 'Arts'
    },
    {
      id: 'ap_english_language',
      title: 'AP English Language and Composition',
      description: 'Develop advanced writing and analytical skills through the study of rhetoric, argumentation, and composition.',
      icon: '📝',
      subject: 'English'
    },
    {
      id: 'ap_english_literature',
      title: 'AP English Literature and Composition',
      description: 'Analyze and interpret literature while developing sophisticated writing skills and critical thinking abilities.',
      icon: '📚',
      subject: 'English'
    },
    {
      id: 'ap_environmental_science',
      title: 'AP Environmental Science',
      description: 'Study environmental systems, human impact on the environment, and solutions to environmental problems.',
      icon: '🌱',
      subject: 'Science'
    },
    {
      id: 'ap_european_history',
      title: 'AP European History',
      description: 'Explore European history from 1450 to present, analyzing historical documents and developing historical thinking skills.',
      icon: '🏰',
      subject: 'Social Studies'
    },
    {
      id: 'ap_french_language',
      title: 'AP French Language and Culture',
      description: 'Develop proficiency in French through authentic materials and cultural exploration of French-speaking countries.',
      icon: '🇫🇷',
      subject: 'World Languages'
    },
    {
      id: 'ap_german_language',
      title: 'AP German Language and Culture',
      description: 'Develop proficiency in German through authentic materials and cultural exploration of German-speaking countries.',
      icon: '🇩🇪',
      subject: 'World Languages'
    },
    {
      id: 'ap_human_geography',
      title: 'AP Human Geography',
      description: 'Examine patterns and processes that shape human understanding and use of Earth at local, regional, and global scales.',
      icon: '🌍',
      subject: 'Social Studies'
    },
    {
      id: 'ap_italian_language',
      title: 'AP Italian Language and Culture',
      description: 'Develop proficiency in Italian through authentic materials and cultural exploration of Italian-speaking regions.',
      icon: '🇮🇹',
      subject: 'World Languages'
    },
    {
      id: 'ap_japanese_language',
      title: 'AP Japanese Language and Culture',
      description: 'Develop proficiency in Japanese through authentic materials and cultural exploration of Japan.',
      icon: '🎌',
      subject: 'World Languages'
    },
    {
      id: 'ap_latin',
      title: 'AP Latin',
      description: 'Study Latin literature, language, and Roman culture through reading and analysis of classical texts.',
      icon: '📜',
      subject: 'World Languages'
    },
    {
      id: 'ap_macroeconomics',
      title: 'AP Macroeconomics',
      description: 'Study economic principles that apply to an economy as a whole, including national income, inflation, and fiscal policy.',
      icon: '💰',
      subject: 'Social Studies'
    },
    {
      id: 'ap_microeconomics',
      title: 'AP Microeconomics',
      description: 'Analyze individual economic behavior, market structures, and the role of government in correcting market failures.',
      icon: '📊',
      subject: 'Social Studies'
    },
    {
      id: 'ap_music_theory',
      title: 'AP Music Theory',
      description: 'Develop skills in music composition, analysis, and aural perception through study of musical elements and structures.',
      icon: '🎵',
      subject: 'Arts'
    },
    {
      id: 'ap_physics_1',
      title: 'AP Physics 1',
      description: 'Explore mechanics, waves, and sound through inquiry-based laboratory investigations and mathematical analysis.',
      icon: '⚛️',
      subject: 'Science'
    },
    {
      id: 'ap_physics_2',
      title: 'AP Physics 2',
      description: 'Study electricity, magnetism, optics, thermodynamics, and modern physics through hands-on experiments.',
      icon: '🔬',
      subject: 'Science'
    },
    {
      id: 'ap_physics_c_mechanics',
      title: 'AP Physics C: Mechanics',
      description: 'Advanced calculus-based study of classical mechanics including kinematics, dynamics, and energy conservation.',
      icon: '🎯',
      subject: 'Science'
    },
    {
      id: 'ap_physics_c_electricity_magnetism',
      title: 'AP Physics C: Electricity & Magnetism',
      description: 'Calculus-based exploration of electric fields, magnetic fields, and electromagnetic induction.',
      icon: '⚡',
      subject: 'Science'
    },
    {
      id: 'ap_precalculus',
      title: 'AP Precalculus',
      description: 'Build mathematical foundation for calculus through functions, trigonometry, and analytical geometry.',
      icon: '📐',
      subject: 'Mathematics'
    },
    {
      id: 'ap_psychology',
      title: 'AP Psychology',
      description: 'Examine human behavior and mental processes through scientific methods and psychological perspectives.',
      icon: '🧠',
      subject: 'Social Studies'
    },
    {
      id: 'ap_spanish_language',
      title: 'AP Spanish Language and Culture',
      description: 'Develop proficiency in Spanish through authentic materials and cultural exploration of Spanish-speaking countries.',
      icon: '🇪🇸',
      subject: 'World Languages'
    },
    {
      id: 'ap_spanish_literature',
      title: 'AP Spanish Literature and Culture',
      description: 'Analyze Spanish and Latin American literary works while developing advanced language skills.',
      icon: '📖',
      subject: 'World Languages'
    },
    {
      id: 'ap_statistics',
      title: 'AP Statistics',
      description: 'Learn statistical concepts and methods for collecting, analyzing, and interpreting data in real-world contexts.',
      icon: '📊',
      subject: 'Mathematics'
    },
    {
      id: 'ap_studio_art_2d',
      title: 'AP Studio Art: 2-D Art and Design',
      description: 'Create a portfolio of 2-D artworks that demonstrate mastery of design concepts and personal artistic voice.',
      icon: '🎨',
      subject: 'Arts'
    },
    {
      id: 'ap_studio_art_3d',
      title: 'AP Studio Art: 3-D Art and Design',
      description: 'Create a portfolio of 3-D artworks exploring form, space, and sculptural concepts.',
      icon: '🏺',
      subject: 'Arts'
    },
    {
      id: 'ap_studio_art_drawing',
      title: 'AP Studio Art: Drawing',
      description: 'Develop drawing skills and create a portfolio demonstrating artistic growth and personal expression.',
      icon: '✏️',
      subject: 'Arts'
    },
    {
      id: 'ap_united_states_government_politics',
      title: 'AP U.S. Government and Politics',
      description: 'Study the American political system, constitutional principles, and the role of citizens in democratic society.',
      icon: '🗳️',
      subject: 'Social Studies'
    },
    {
      id: 'ap_united_states_history',
      title: 'AP U.S. History',
      description: 'Examine American history from pre-Columbian times to present, developing historical analysis and writing skills.',
      icon: '🇺🇸',
      subject: 'Social Studies'
    },
    {
      id: 'ap_world_history',
      title: 'AP World History: Modern',
      description: 'Explore global historical processes and connections from 1200 CE to present across different civilizations.',
      icon: '🌏',
      subject: 'Social Studies'
    }
  ];

  // Filter courses based on search term
  const filteredCourses = useMemo(() => {
    if (!searchTerm.trim()) return courses;
    
    const searchLower = searchTerm.toLowerCase();
    return courses.filter(course =>
      course.title.toLowerCase().includes(searchLower) ||
      course.description.toLowerCase().includes(searchLower) ||
      course.subject.toLowerCase().includes(searchLower)
    );
  }, [searchTerm, courses]);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setTimeout(() => setAnimateCards(true), 100);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Handle search input
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle course card click
  const handleCourseClick = (courseId) => {
    console.log(`Navigating to course: ${courseId}`);
    // This would navigate to the individual course page
  };

  // Loading skeleton
  const LoadingSkeleton = () => (
    <div className="loading-grid">
      {[...Array(12)].map((_, index) => (
        <div key={index} className="loading-card">
          <div className="loading-image"></div>
          <div className="loading-content">
            <div className="loading-title"></div>
            <div className="loading-text"></div>
            <div className="loading-text short"></div>
            <div className="loading-text shorter"></div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="courses-page">
      {/* Header Section */}
      <div className={`courses-header ${animateCards ? 'animate-in' : ''}`}>
        <h1 className="courses-title">AP Courses</h1>
        <div className="underline"></div>
        <p className="courses-subtitle">
          Discover our comprehensive collection of all 40 Advanced Placement courses designed to challenge and prepare you for college-level academic work. 
          Each course offers rigorous curriculum, expert instruction, and the opportunity to earn college credit.
        </p>
        <div className="stats-container">
          <div className="stat-item">
            <BookOpen className="stat-icon" />
            <span className="stat-number">{courses.length}</span>
            <span className="stat-label">Courses</span>
          </div>
          <div className="stat-item">
            <Award className="stat-icon" />
            <span className="stat-number">9</span>
            <span className="stat-label">Subject Areas</span>
          </div>
          <div className="stat-item">
            <Clock className="stat-icon" />
            <span className="stat-number">5</span>
            <span className="stat-label">Score Goal</span>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div className={`search-section ${animateCards ? 'animate-in' : ''}`}>
        <div className="search-container">
          <Search className="search-icon" size={20} />
          <input
            type="text"
            className="search-input"
            placeholder="Search courses by name, description, or subject..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
          {searchTerm && (
            <button 
              className="clear-search"
              onClick={() => setSearchTerm('')}
              aria-label="Clear search"
            >
              ✕
            </button>
          )}
        </div>
        {searchTerm && (
          <div className="search-results-info">
            Found {filteredCourses.length} course{filteredCourses.length !== 1 ? 's' : ''} matching "{searchTerm}"
          </div>
        )}
      </div>

      {/* Courses Grid */}
      <div className="courses-container">
        {isLoading ? (
          <LoadingSkeleton />
        ) : filteredCourses.length > 0 ? (
          <div className="courses-grid">
            {filteredCourses.map((course, index) => (
              <div
                key={course.id}
                className={`course-card ${animateCards ? 'animate-in' : ''}`}
                onClick={() => handleCourseClick(course.id)}
                style={{
                  animationDelay: `${Math.min(index * 0.05, 2)}s`
                }}
              >
                <div className="course-image-container">
                  <div className="course-icon-wrapper">
                    <span className="course-icon-emoji">{course.icon}</span>
                  </div>
                  <div className="subject-badge">{course.subject}</div>
                </div>
                <div className="course-content">
                  <h3 className="course-title">{course.title}</h3>
                  <p className="course-description">{course.description}</p>
                  <div className="course-footer">
                    <button className="learn-more-btn">
                      Learn More
                      <span className="btn-arrow">→</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-results">
            <div className="no-results-icon">🔍</div>
            <h3>No courses found</h3>
            <p>
              We couldn't find any courses matching "{searchTerm}". 
              Try adjusting your search terms or browse all available courses.
            </p>
            <button 
              className="clear-search-btn"
              onClick={() => setSearchTerm('')}
            >
              Show All Courses
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CoursesPage;

// Styles embedded in the component
const styles = `
/* CoursesPage.css - Modern AP Courses Page with All 40 Courses */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

:root {
  --primary-dark-blue: #1e3a8a;
  --primary-accent: #3b82f6;
  --primary-gradient-start: #1e3a8a;
  --primary-gradient-end: #3b82f6;
  --accent-teal: #0ea5e9;
  --text-white: #ffffff;
  --text-dark: #1a1a1a;
  --text-secondary: #64748b;
  --bg-light: #f8fafc;
  --bg-gray: #f1f5f9;
  --border-light: #e2e8f0;
  --animation-timing: cubic-bezier(0.4, 0, 0.2, 1);
  --card-shadow: 0 10px 40px rgba(0, 0, 0, 0.06);
  --card-shadow-hover: 0 20px 60px rgba(0, 0, 0, 0.15);
  --success-color: #10b981;
  --warning-color: #f59e0b;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', sans-serif;
  background-color: var(--bg-light);
  color: var(--text-dark);
  line-height: 1.6;
  overflow-x: hidden;
}

/* Page Container */
.courses-page {
  min-height: 100vh;
  padding: 100px 20px 60px;
  position: relative;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
}

/* Header Section */
.courses-header {
  text-align: center;
  margin-bottom: 60px;
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s var(--animation-timing);
}

.courses-header.animate-in {
  opacity: 1;
  transform: translateY(0);
}

.courses-title {
  font-size: 3.5rem;
  font-weight: 800;
  color: var(--primary-dark-blue);
  margin-bottom: 16px;
  letter-spacing: -0.5px;
  background: linear-gradient(135deg, var(--primary-gradient-start), var(--primary-gradient-end));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.courses-subtitle {
  font-size: 1.3rem;
  color: var(--text-secondary);
  margin-bottom: 40px;
  font-weight: 400;
  line-height: 1.6;
}

.underline {
  width: 80px;
  height: 4px;
  background: linear-gradient(to right, var(--primary-gradient-start), var(--primary-gradient-end));
  margin: 0 auto 40px;
  border-radius: 2px;
}

/* Stats Container */
.stats-container {
  display: flex;
  justify-content: center;
  gap: 40px;
  margin-top: 40px;
  flex-wrap: wrap;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 16px;
  box-shadow: var(--card-shadow);
  backdrop-filter: blur(10px);
  min-width: 120px;
}

.stat-icon {
  color: var(--primary-accent);
  margin-bottom: 8px;
}

.stat-number {
  font-size: 2rem;
  font-weight: 800;
  color: var(--primary-dark-blue);
  line-height: 1;
}

.stat-label {
  font-size: 0.9rem;
  color: var(--text-secondary);
  font-weight: 500;
}

/* Search Section */
.search-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 60px;
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s var(--animation-timing);
}

.search-section.animate-in {
  opacity: 1;
  transform: translateY(0);
}

.search-container {
  position: relative;
  max-width: 600px;
  width: 100%;
  margin-bottom: 16px;
}

.search-input {
  width: 100%;
  padding: 18px 24px 18px 56px;
  font-size: 1.1rem;
  border: 2px solid transparent;
  border-radius: 50px;
  background-color: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  box-shadow: var(--card-shadow);
  outline: none;
  transition: all 0.3s var(--animation-timing);
  font-weight: 500;
  color: var(--text-dark);
}

.search-input:focus {
  border-color: var(--primary-accent);
  box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1), var(--card-shadow-hover);
  transform: translateY(-2px);
  background-color: white;
}

.search-input::placeholder {
  color: var(--text-secondary);
  font-weight: 400;
}

.search-icon {
  position: absolute;
  left: 20px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-secondary);
  pointer-events: none;
  z-index: 2;
}

.clear-search {
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  font-size: 1.2rem;
  padding: 4px;
  border-radius: 50%;
  transition: all 0.2s ease;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.clear-search:hover {
  background-color: rgba(239, 68, 68, 0.1);
  color: #ef4444;
}

.search-results-info {
  font-size: 0.95rem;
  color: var(--text-secondary);
  font-weight: 500;
  text-align: center;
  padding: 8px 16px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 20px;
  backdrop-filter: blur(5px);
}

/* Courses Grid */
.courses-container {
  max-width: 1400px;
  margin: 0 auto;
}

.courses-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 32px;
  margin-bottom: 60px;
}

/* Course Card */
.course-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: var(--card-shadow);
  transition: all 0.4s var(--animation-timing);
  cursor: pointer;
  position: relative;
  border: 1px solid rgba(226, 232, 240, 0.5);
  opacity: 0;
  transform: translateY(30px);
  height: fit-content;
}

.course-card.animate-in {
  opacity: 1;
  transform: translateY(0);
}

.course-card:hover {
  transform: translateY(-12px) scale(1.02);
  box-shadow: var(--card-shadow-hover);
  border-color: rgba(59, 130, 246, 0.2);
  background: white;
}

.course-card:hover .course-icon-emoji {
  transform: scale(1.1);
}

.course-card:hover .course-title {
  color: var(--primary-accent);
}

.course-card:hover .learn-more-btn {
  background: var(--primary-accent);
  color: white;
  transform: translateX(4px);
}

.course-card:hover .subject-badge {
  background: var(--primary-accent);
  color: white;
}

/* Course Image Container */
.course-image-container {
  height: 200px;
  background: linear-gradient(135deg, #f1f5f9, #e2e8f0);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
  border-bottom: 1px solid var(--border-light);
}

.course-icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 100px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 24px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  transition: all 0.4s var(--animation-timing);
}

.course-icon-emoji {
  font-size: 3rem;
  transition: transform 0.4s var(--animation-timing);
}

.subject-badge {
  position: absolute;
  top: 16px;
  right: 16px;
  background: rgba(255, 255, 255, 0.9);
  color: var(--text-secondary);
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  backdrop-filter: blur(5px);
  transition: all 0.3s ease;
}

/* Course Content */
.course-content {
  padding: 28px;
}

.course-title {
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--primary-dark-blue);
  margin-bottom: 12px;
  transition: color 0.3s ease;
  line-height: 1.3;
}

.course-description {
  font-size: 1rem;
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 24px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.course-footer {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.learn-more-btn {
  background: transparent;
  color: var(--primary-accent);
  border: 2px solid var(--primary-accent);
  padding: 8px 20px;
  border-radius: 25px;
  font-weight: 600;
  font-size: 0.9rem;
  transition: all 0.3s var(--animation-timing);
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
}

.btn-arrow {
  transition: transform 0.3s ease;
}

/* No Results Message */
.no-results {
  text-align: center;
  padding: 80px 20px;
  color: var(--text-secondary);
}

.no-results-icon {
  font-size: 4rem;
  margin-bottom: 20px;
}

.no-results h3 {
  font-size: 1.8rem;
  margin-bottom: 16px;
  color: var(--text-dark);
}

.no-results p {
  font-size: 1.1rem;
  max-width: 500px;
  margin: 0 auto 30px;
}

.clear-search-btn {
  background: var(--primary-accent);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 25px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.clear-search-btn:hover {
  background: var(--primary-dark-blue);
  transform: translateY(-2px);
}

/* Loading Animation */
.loading-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 32px;
}

.loading-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: var(--card-shadow);
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.loading-image {
  height: 200px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: shimmer 2s infinite;
}

.loading-content {
  padding: 28px;
}

.loading-title {
  height: 24px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: shimmer 2s infinite;
  border-radius: 4px;
  margin-bottom: 16px;
}

.loading-text {
  height: 16px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: shimmer 2s infinite;
  border-radius: 4px;
  margin-bottom: 12px;
}

.loading-text.short {
  width: 80%;
}

.loading-text.shorter {
  width: 60%;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.8;
  }
}

@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}

/* Responsive Design */
@media screen and (max-width: 1200px) {
  .courses-grid {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 28px;
  }
  
  .stats-container {
    gap: 30px;
  }
}

@media screen and (max-width: 768px) {
  .courses-page {
    padding: 80px 15px 40px;
  }

  .courses-title {
    font-size: 2.8rem;
  }

  .courses-subtitle {
    font-size: 1.1rem;
  }

  .search-input {
    padding: 16px 20px 16px 48px;
    font-size: 1rem;
  }

  .search-icon {
    left: 16px;
    width: 18px;
    height: 18px;
  }

  .courses-grid {
    grid-template-columns: 1fr;
    gap: 24px;
  }

  .course-content {
    padding: 24px;
  }

  .course-title {
    font-size: 1.25rem;
  }

  .course-footer {
    justify-content: center;
  }

  .stats-container {
    gap: 20px;
  }

  .stat-item {
    min-width: 100px;
    padding: 16px;
  }

  .stat-number {
    font-size: 1.5rem;
  }
}

@media screen and (max-width: 480px) {
  .courses-title {
    font-size: 2.2rem;
  }

  .courses-subtitle {
    font-size: 1rem;
  }

  .course-image-container {
    height: 160px;
  }

  .course-icon-wrapper {
    width: 80px;
    height: 80px;
  }

  .course-icon-emoji {
    font-size: 2.5rem;
  }

  .course-content {
    padding: 20px;
  }

  .stats-container {
    flex-direction: column;
    align-items: center;
    gap: 16px;
  }

  .stat-item {
    flex-direction: row;
    gap: 12px;
    min-width: 200px;
  }

  .search-container {
    max-width: 100%;
  }
}

/* Performance optimizations for large grids */
.courses-grid {
  contain: layout style paint;
}

.course-card {
  contain: layout style paint;
  will-change: transform;
}

/* Reduced motion for accessibility */
@media (prefers-reduced-motion: reduce) {
  .course-card,
  .search-input,
  .learn-more-btn,
  .courses-header,
  .search-section {
    transition: none;
    animation: none;
  }
  
  .course-card.animate-in {
    animation: none;
    opacity: 1;
    transform: none;
  }
}

/* Focus styles for accessibility */
.course-card:focus {
  outline: 3px solid var(--primary-accent);
  outline-offset: 2px;
}

.search-input:focus {
  outline: none;
}

.learn-more-btn:focus,
.clear-search:focus,
.clear-search-btn:focus {
  outline: 2px solid var(--primary-accent);
  outline-offset: 2px;
}

/* Improved contrast for better readability */
@media (prefers-contrast: high) {
  :root {
    --text-secondary: #374151;
    --border-light: #9ca3af;
  }
}
`;

// Inject styles
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}