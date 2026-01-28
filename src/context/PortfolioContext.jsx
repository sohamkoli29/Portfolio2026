import React, { createContext, useState, useContext, useEffect } from 'react';
import portfolioService from '../services/api';

const PortfolioContext = createContext();

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};

export const PortfolioProvider = ({ children }) => {
  const [about, setAbout] = useState(null);
  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [services, setServices] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [criticalDataLoaded, setCriticalDataLoaded] = useState(false);
  // Fetch all portfolio data

    const fetchCriticalData = async () => {
    try {
      setIsLoading(true);
      const [aboutRes, skillsRes] = await Promise.all([
        portfolioService.getAbout(),
        portfolioService.getSkills()
      ]);

      if (aboutRes.success) setAbout(aboutRes.data);
      if (skillsRes.success) setSkills(skillsRes.data);
      
      setCriticalDataLoaded(true);
    } catch (error) {
      console.error('Error loading critical data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Load non-critical data after critical data
  const fetchNonCriticalData = async () => {
    const [
      projectsRes,
      experiencesRes,
      testimonialsRes,
      servicesRes,
      blogsRes,
      certificatesRes,
      achievementsRes
    ] = await Promise.all([
      portfolioService.getProjects({ featured: true, limit: 3 }),
      portfolioService.getExperiences(),
      portfolioService.getTestimonials({ featured: true, limit: 4 }),
      portfolioService.getServices(),
      portfolioService.getBlogs({ published: true, limit: 3 }),
      portfolioService.getCertificates({ featured: true }),
      portfolioService.getAchievements({ featured: true })
    ]);

    if (projectsRes.success) setProjects(projectsRes.data);
    if (experiencesRes.success) setExperiences(experiencesRes.data);
    if (testimonialsRes.success) setTestimonials(testimonialsRes.data);
    if (servicesRes.success) setServices(servicesRes.data);
    if (blogsRes.success) setBlogs(blogsRes.data);
    if (certificatesRes.success) setCertificates(certificatesRes.data);
    if (achievementsRes.success) setAchievements(achievementsRes.data);
  };

  useEffect(() => {
    fetchCriticalData();
  }, []);

  useEffect(() => {
    if (criticalDataLoaded) {
      fetchNonCriticalData();
    }
  }, [criticalDataLoaded]);

  


  // Fetch single resource functions
  const fetchAbout = async () => {
    const result = await portfolioService.getAbout();
    if (result.success) {
      setAbout(result.data);
    }
    return result;
  };

  const fetchSkills = async () => {
    const result = await portfolioService.getSkills();
    if (result.success) {
      setSkills(result.data);
    }
    return result;
  };

  const fetchProjects = async (params) => {
    const result = await portfolioService.getProjects(params);
    if (result.success) {
      setProjects(result.data);
    }
    return result;
  };

  const fetchExperiences = async () => {
    const result = await portfolioService.getExperiences();
    if (result.success) {
      setExperiences(result.data);
    }
    return result;
  };

  const fetchCertificates = async (params) => {
    const result = await portfolioService.getCertificates(params);
    if (result.success) {
      setCertificates(result.data);
    }
    return result;
  };

  const fetchAchievements = async (params) => {
    const result = await portfolioService.getAchievements(params);
    if (result.success) {
      setAchievements(result.data);
    }
    return result;
  };

  // Refresh all data
const refreshData = async () => {
  await fetchCriticalData();
};


  // Initial data fetch


  const value = {
    // Data
    about,
    skills,
    projects,
    experiences,
    testimonials,
    services,
    blogs,
    certificates,
    achievements,
    
    // Loading state
    isLoading,
    
    // Error state
    error,
    
    // Functions
    refreshData,
    fetchAbout,
    fetchSkills,
    fetchProjects,
    fetchExperiences,
    fetchCertificates,
    fetchAchievements,
  };

  return (
    <PortfolioContext.Provider value={value}>
      {children}
    </PortfolioContext.Provider>
  );
};