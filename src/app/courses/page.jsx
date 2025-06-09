'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import './CoursesPage.css';

const CoursesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [animateCards, setAnimateCards] = useState(false);

  // Course data with descriptions and levels
  const courses = [
    {
      id: 'ap_biology',
      title: 'AP Biology',
      description: 'Explore the science of life through laboratory investigations and advanced study of cellular processes, genetics, evolution, and ecology.',
      level: 'Advanced',
      icon: 'ap_biology.svg'
    },
    {
      id: 'ap_calculus_ab',
      title: 'AP Calculus AB',
      description: 'Master the fundamentals of differential and integral calculus through limits, derivatives, and their applications.',
      level: 'Advanced',
      icon: 'ap_calculus_ab.svg'
    },
    {
      id: 'ap_calculus_bc',
      title: 'AP Calculus BC',
      description: 'Advanced calculus covering all AB topics plus additional techniques of integration, series, and parametric equations.',
      level: 'Expert',
      icon: 'ap_calculus_bc.svg'
    },
    {
      id: 'ap_chemistry',
      title: 'AP Chemistry',
      description: 'Dive deep into chemical reactions, atomic structure, bonding, and thermodynamics through hands-on laboratory work.',
      level: 'Advanced',
      icon: 'ap_chemistry.svg'
    },
    {
      id: 'ap_computer_science_a',
      title: 'AP Computer Science A',
      description: 'Learn object-oriented programming in Java, including data structures, algorithms, and software design principles.',
      level: 'Advanced',
      icon: 'ap_computer_science_a.svg'
    },
    {
      id: 'ap_computer_science_principles',
      title: 'AP Computer Science Principles',
      description: 'Explore the foundational concepts of computer science including programming, algorithms, and the impact of computing.',
      level: 'Intermediate',
      icon: 'ap_computer_science_principles.svg'
    },
    {
      id: 'ap_english_language',
      title: 'AP English Language and Composition',
      description: 'Develop advanced writing and analytical skills through the study of rhetoric, argumentation, and composition.',
      level: 'Advanced',
      icon: 'ap_english_language.svg'
    },
    {
      id: 'ap_english_literature',
      title: 'AP English Literature and Composition',
      description: 'Analyze and interpret literature while developing sophisticated writing skills and critical thinking abilities.',
      level: 'Advanced',
      icon: 'ap_english_literature.svg'
    },
    {
      id: 'ap_environmental_science',
      title: 'AP Environmental Science',
      description: 'Study environmental systems, human impact on the environment, and solutions to environmental problems.',
      level: 'Intermediate',
      icon: 'ap_environmental_science.svg'
    },
    {
      id: 'ap_european_history',
      title: 'AP European History',
      description: 'Explore European history from 1450 to present, analyzing historical documents and developing historical thinking skills.',
      level: 'Advanced',
      icon: 'ap_european_history.svg'
    },
    {
      id: 'ap_human_geography',
      title: 'AP Human Geography',
      description: 'Examine patterns and processes that shape human understanding and use of Earth at local, regional, and global scales.',
      level: 'Intermediate',
      icon: 'ap_human_geography.svg'
    },
    {
      id: 'ap_macroeconomics',
      title: 'AP Macroeconomics',
      description: 'Study economic principles that apply to an economy as a whole, including national income, inflation, and fiscal policy.',
      level: 'Advanced',
      icon: 'ap_macroeconomics.svg'
    },
    {
      id: 'ap_microeconomics',
      title: 'AP Microeconomics',
      description: 'Analyze individual economic behavior, market structures, and the role of government in correcting market failures.',
      level: 'Advanced',
      icon: 'ap_microeconomics.svg'
    },
    {
      id: 'ap_physics_1',
      title: 'AP Physics 1',
      description: 'Explore mechanics, waves, and sound through inquiry-based laboratory investigations and mathematical analysis.',
      level: 'Intermediate',
      icon: 'ap_physics_1.svg'
    },
    {
      id: 'ap_physics_2',
      title: 'AP Physics 2',
      description: 'Study electricity, magnetism, optics, thermodynamics, and modern physics through hands-on experiments.',
      level: 'Advanced',
      icon: 'ap_physics_2.svg'
    },
    {
      id: 'ap_physics_c_mechanics',
      title: 'AP Physics C: Mechanics',
      description: 'Advanced calculus-based study of classical mechanics including kinematics, dynamics, and energy conservation.',
      level: 'Expert',
      icon: 'ap_physics_c_mechanics.svg'
    },
    {
      id: 'ap_physics_c_electricity_magnetism',
      title: 'AP Physics C: Electricity & Magnetism',
      description: 'Calculus-based exploration of electric fields, magnetic fields, and electromagnetic induction.',
      level: 'Expert',
      icon: 'ap_physics_c_electricity_magnetism.svg'
    },
    {
      id: 'ap_precalculus',
      title: 'AP Precalculus',
      description: 'Build mathematical foundation for calculus through functions, trigonometry, and analytical geometry.',
      level: 'Intermediate',
      icon: 'ap_precalculus.svg'
    },
    {
      id: 'ap_psychology',
      title: 'AP Psychology',
      description: 'Examine human behavior and mental processes through scientific methods and psychological perspectives.',
      level: 'Intermediate',
      icon: 'ap_psychology.svg'
    },
    {
      id: 'ap_research',
      title: 'AP Research',
      description: 'Conduct independent research on a topic of personal interest, culminating in an academic paper and presentation.',
      level: 'Expert',
      icon: 'ap_research.svg'
    },
    {
      id: 'ap_seminar',
      title: 'AP Seminar',
      description: 'Develop critical thinking and research skills through investigation of complex, real-world issues and problems.',
      level: 'Advanced',
      icon: 'ap_seminar.svg'
    },
    {
      id: 'ap_spanish_language',
      title: 'AP Spanish Language and Culture',
      description: 'Develop proficiency in Spanish through authentic materials and cultural exploration of Spanish-speaking countries.',
      level: 'Advanced',
      icon: 'ap_spanish_language.svg'
    },
    {
      id: 'ap_statistics',
      title: 'AP Statistics',
      description: 'Learn statistical concepts and methods for collecting, analyzing, and interpreting data in real-world contexts.',
      level: 'Advanced',
      icon: 'ap_statistics.svg'
    },
    {
      id: 'ap_united_states_government_politics',
      title: 'AP U.S. Government and Politics',
      description: 'Study the American political system, constitutional principles, and the role of citizens in democratic society.',
      level: 'Advanced',
      icon: 'ap_united_states_government_politics.svg'
    },
    {
      id: 'ap_united_states_history',
      title: 'AP U.S. History',
      description: 'Examine American history from pre-Columbian times to present, developing historical analysis and writing skills.',
      level: 'Advanced',
      icon: 'ap_united_states_history.svg'
    },
    {
      id: 'ap_world_history',
      title: 'AP World History: Modern',
      description: 'Explore global historical processes and connections from 1200 CE to present across different civilizations.',
      level: 'Advanced',
      icon: 'ap_world_history.svg'
    }
  ];

  // Filter courses based on search term
  const filteredCourses = useMemo(() => {
    if (!searchTerm.trim()) return courses;
    
    return courses.filter(course =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.level.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

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
    // This will navigate to the individual course page
    window.location.href = `/courses/${courseId}`;
  };

  // Loading skeleton
  const LoadingSkeleton = () => (
    <div className="loading-grid">
      {[...Array(8)].map((_, index) => (
        <div key={index} className="loading-card">
          <div className="loading-image"></div>
          <div className="loading-content">
            <div className="loading-title"></div>
            <div className="loading-text"></div>
            <div className="loading-text" style={{ width: '80%' }}></div>
            <div className="loading-text" style={{ width: '60%' }}></div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="courses-page">
      {/* Header Section */}
      <div className="courses-header animate-on-scroll animate-in">
        <h1 className="courses-title">AP Courses</h1>
        <div className="underline"></div>
        <p className="courses-subtitle">
          Discover our comprehensive collection of Advanced Placement courses designed to challenge and prepare you for college-level academic work. 
          Each course offers rigorous curriculum, expert instruction, and the opportunity to earn college credit.
        </p>
      </div>

      {/* Search Section */}
      <div className="search-section animate-on-scroll animate-in">
        <div className="search-container">
          <div className="search-icon">🔍</div>
          <input
            type="text"
            className="search-input"
            placeholder="Search courses by name, description, or level..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
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
                  animationDelay: `${index * 0.1}s`
                }}
              >
                <div className="course-image-container">
                  <img
                    src={`/icons/${course.icon}`}
                    alt={course.title}
                    className="course-image"
                    onError={(e) => {
                      // Fallback to a default icon if image fails to load
                      e.target.src = '/icons/default-course.svg';
                    }}
                  />
                </div>
                <div className="course-content">
                  <h3 className="course-title">{course.title}</h3>
                  <p className="course-description">{course.description}</p>
                  <div className="course-footer">
                    <span className="course-level">{course.level}</span>
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
          // No results message
          <div className="no-results">
            <h3>No courses found</h3>
            <p>
              We couldn't find any courses matching "{searchTerm}". 
              Try adjusting your search terms or browse all available courses.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CoursesPage;