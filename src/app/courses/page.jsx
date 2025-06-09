'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import './CoursesPage.css';

const CoursesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [animateCards, setAnimateCards] = useState(false);

  // Course data with descriptions (removed levels)
  const courses = [
    [
  {
    id: 'ap_african_american_studies',
    title: 'AP African American Studies',
    description: 'Examine the history, culture, and contributions of African Americans across time through an interdisciplinary lens.',
    icon: 'ap_african_american_studies.svg'
  },
  {
    id: 'ap_art_history',
    title: 'AP Art History',
    description: 'Explore global art across centuries, cultures, and media, learning to analyze visual artworks critically.',
    icon: 'ap_art_history.svg'
  },
  {
    id: 'ap_biology',
    title: 'AP Biology',
    description: 'Dive into the science of life—cell functions, genetics, evolution, and ecosystems—through labs and inquiry.',
    icon: 'ap_biology.svg'
  },
  {
    id: 'ap_calculus_ab',
    title: 'AP Calculus AB',
    description: 'Master limits, derivatives, and integrals while learning to model real-world phenomena with calculus.',
    icon: 'ap_calculus_ab.svg'
  },
  {
    id: 'ap_calculus_bc',
    title: 'AP Calculus BC',
    description: 'Extend your calculus knowledge with series, polar functions, and advanced integration techniques.',
    icon: 'ap_calculus_bc.svg'
  },
  {
    id: 'ap_chemistry',
    title: 'AP Chemistry',
    description: 'Explore atomic structure, bonding, reactions, and thermodynamics with labs and mathematical reasoning.',
    icon: 'ap_chemistry.svg'
  },
  {
    id: 'ap_chinese_language_and_culture',
    title: 'AP Chinese Language and Culture',
    description: 'Develop proficiency in Mandarin Chinese and understand Chinese-speaking cultures through authentic resources.',
    icon: 'ap_chinese_language_and_culture.svg'
  },
  {
    id: 'ap_comparative_government_and_politics',
    title: 'AP Comparative Government and Politics',
    description: 'Compare political systems across countries and analyze governments, policies, and citizen roles globally.',
    icon: 'ap_comparative_government_and_politics.svg'
  },
  {
    id: 'ap_computer_science_a',
    title: 'AP Computer Science A',
    description: 'Learn Java programming, algorithms, and object-oriented design through problem-solving and projects.',
    icon: 'ap_computer_science_a.svg'
  },
  {
    id: 'ap_computer_science_principles',
    title: 'AP Computer Science Principles',
    description: 'Explore computing principles, the internet, data, and app development with a broad, creative approach.',
    icon: 'ap_computer_science_principles.svg'
  },
  {
    id: 'ap_english_language_and_composition',
    title: 'AP English Language and Composition',
    description: 'Analyze nonfiction texts and write arguments, syntheses, and analyses with rhetorical precision.',
    icon: 'ap_english_language_and_composition.svg'
  },
  {
    id: 'ap_english_literature_and_composition',
    title: 'AP English Literature and Composition',
    description: 'Read and analyze literary texts from various genres and time periods, crafting insightful essays.',
    icon: 'ap_english_literature_and_composition.svg'
  },
  {
    id: 'ap_environmental_science',
    title: 'AP Environmental Science',
    description: 'Investigate ecological processes, human impact, and sustainability through data and experimentation.',
    icon: 'ap_environmental_science.svg'
  },
  {
    id: 'ap_european_history',
    title: 'AP European History',
    description: 'Study European events, movements, and ideologies from the Renaissance to present day.',
    icon: 'ap_european_history.svg'
  },
  {
    id: 'ap_french_language_and_culture',
    title: 'AP French Language and Culture',
    description: 'Improve your French proficiency and explore Francophone cultures through immersive, authentic sources.',
    icon: 'ap_french_language_and_culture.svg'
  },
  {
    id: 'ap_german_language_and_culture',
    title: 'AP German Language and Culture',
    description: 'Enhance your German skills while exploring cultural themes in historical and modern contexts.',
    icon: 'ap_german_language_and_culture.svg'
  },
  {
    id: 'ap_human_geography',
    title: 'AP Human Geography',
    description: 'Explore how humans shape the world through population trends, urbanization, and cultural diffusion.',
    icon: 'ap_human_geography.svg'
  },
  {
    id: 'ap_italian_language_and_culture',
    title: 'AP Italian Language and Culture',
    description: 'Deepen your Italian communication skills and cultural understanding using real-world media.',
    icon: 'ap_italian_language_and_culture.svg'
  },
  {
    id: 'ap_japanese_language_and_culture',
    title: 'AP Japanese Language and Culture',
    description: 'Build fluency in Japanese and connect with modern and traditional elements of Japanese culture.',
    icon: 'ap_japanese_language_and_culture.svg'
  },
  {
    id: 'ap_latin',
    title: 'AP Latin',
    description: 'Translate classical Latin texts and explore Roman culture, literature, and historical context.',
    icon: 'ap_latin.svg'
  },
  {
    id: 'ap_macroeconomics',
    title: 'AP Macroeconomics',
    description: 'Analyze the economy at a national and global scale, learning about inflation, unemployment, and policy.',
    icon: 'ap_macroeconomics.svg'
  },
  {
    id: 'ap_microeconomics',
    title: 'AP Microeconomics',
    description: 'Focus on individual decision-making units, markets, and how prices and policies affect behavior.',
    icon: 'ap_microeconomics.svg'
  },
  {
    id: 'ap_music_theory',
    title: 'AP Music Theory',
    description: 'Understand musical structure through analysis, ear training, sight-singing, and composition.',
    icon: 'ap_music_theory.svg'
  },
  {
    id: 'ap_physics_1',
    title: 'AP Physics 1',
    description: 'Explore mechanics, waves, and sound through inquiry-based laboratory investigations and mathematical analysis.',
    icon: 'ap_physics_1.svg'
  },
  {
    id: 'ap_physics_2',
    title: 'AP Physics 2',
    description: 'Dive into fluid dynamics, thermodynamics, electricity, and quantum physics with a conceptual approach.',
    icon: 'ap_physics_2.svg'
  },
  {
    id: 'ap_physics_c_mechanics',
    title: 'AP Physics C: Mechanics',
    description: 'Study Newtonian mechanics with rigorous calculus-based problem solving and applications.',
    icon: 'ap_physics_c_mechanics.svg'
  },
  {
    id: 'ap_physics_c_electricity_and_magnetism',
    title: 'AP Physics C: Electricity and Magnetism',
    description: 'Explore electrostatics, circuits, and magnetism through a calculus-based lens.',
    icon: 'ap_physics_c_electricity_and_magnetism.svg'
  },
  {
    id: 'ap_precalculus',
    title: 'AP Precalculus',
    description: 'Build a strong mathematical foundation with functions, modeling, and trigonometry.',
    icon: 'ap_precalculus.svg'
  },
  {
    id: 'ap_psychology',
    title: 'AP Psychology',
    description: 'Learn the scientific study of behavior and mental processes, from cognition to disorders.',
    icon: 'ap_psychology.svg'
  },
  {
    id: 'ap_research',
    title: 'AP Research',
    description: 'Design, conduct, and present an independent research project on a topic of your choice.',
    icon: 'ap_research.svg'
  },
  {
    id: 'ap_seminar',
    title: 'AP Seminar',
    description: 'Investigate real-world issues through interdisciplinary research and collaborative projects.',
    icon: 'ap_seminar.svg'
  },
  {
    id: 'ap_spanish_language_and_culture',
    title: 'AP Spanish Language and Culture',
    description: 'Enhance your Spanish proficiency and explore cultural perspectives through varied sources.',
    icon: 'ap_spanish_language_and_culture.svg'
  },
  {
    id: 'ap_spanish_literature_and_culture',
    title: 'AP Spanish Literature and Culture',
    description: 'Analyze Spanish-language literary works and connect them with historical and cultural contexts.',
    icon: 'ap_spanish_literature_and_culture.svg'
  },
  {
    id: 'ap_statistics',
    title: 'AP Statistics',
    description: 'Collect, analyze, and interpret data using statistical methods and real-world applications.',
    icon: 'ap_statistics.svg'
  },
  {
    id: 'ap_studio_art_2d',
    title: 'AP Studio Art: 2-D Design',
    description: 'Create a portfolio demonstrating mastery of 2D design principles using digital or traditional media.',
    icon: 'ap_studio_art_2d.svg'
  },
  {
    id: 'ap_studio_art_3d',
    title: 'AP Studio Art: 3-D Design',
    description: 'Design a 3D art portfolio exploring space, depth, and form across multiple media.',
    icon: 'ap_studio_art_3d.svg'
  },
  {
    id: 'ap_studio_art_drawing',
    title: 'AP Studio Art: Drawing',
    description: 'Build a drawing portfolio that showcases your technical skill, visual style, and creative expression.',
    icon: 'ap_studio_art_drawing.svg'
  },
  {
    id: 'ap_united_states_government_and_politics',
    title: 'AP U.S. Government and Politics',
    description: 'Study the U.S. Constitution, political institutions, and behaviors that shape American democracy.',
    icon: 'ap_united_states_government_and_politics.svg'
  },
  {
    id: 'ap_united_states_history',
    title: 'AP U.S. History',
    description: 'Trace major events, themes, and turning points in American history from colonization to today.',
    icon: 'ap_united_states_history.svg'
  },
  {
    id: 'ap_world_history',
    title: 'AP World History: Modern',
    description: 'Examine global developments and interactions from 1200 CE to the present.',
    icon: 'ap_world_history.svg'
  }
]
  ];

  // Filter courses based on search term
  const filteredCourses = useMemo(() => {
    if (!searchTerm.trim()) return courses;
    
    return courses.filter(course =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase())
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
          <img
            src="./images/search-icon.svg"
            alt="Search"
            className="search-icon"
          />
          <input
            type="text"
            className="search-input"
            placeholder="Search courses by name or description..."
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
                    src={`./images/${course.icon}`}
                    alt={course.title}
                    className="course-icon"
                    onError={(e) => {
                      // Fallback to a default icon if image fails to load
                      e.target.src = './images/default-course.svg';
                    }}
                  />
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