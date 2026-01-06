import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const portfolioService = {
  // Fetch all content
  async getAbout() {
    try {
      const response = await api.get('/content/about');
      return {
        success: true,
        data: response.data.data,
        error: null
      };
    } catch (error) {
      console.error('Error fetching about:', error);
      return {
        success: false,
        data: null,
        error: error.response?.data?.error || 'Failed to fetch about information'
      };
    }
  },

  async getSkills() {
    try {
      const response = await api.get('/content/skills');
      return {
        success: true,
        data: response.data.data,
        error: null
      };
    } catch (error) {
      console.error('Error fetching skills:', error);
      return {
        success: false,
        data: [],
        error: error.response?.data?.error || 'Failed to fetch skills'
      };
    }
  },

  async getProjects(params = {}) {
    try {
      const response = await api.get('/content/projects', { params });
      return {
        success: true,
        data: response.data.data,
        count: response.data.count,
        error: null
      };
    } catch (error) {
      console.error('Error fetching projects:', error);
      return {
        success: false,
        data: [],
        count: 0,
        error: error.response?.data?.error || 'Failed to fetch projects'
      };
    }
  },

  async getExperiences() {
    try {
      const response = await api.get('/content/experience');
      return {
        success: true,
        data: response.data.data,
        error: null
      };
    } catch (error) {
      console.error('Error fetching experiences:', error);
      return {
        success: false,
        data: [],
        error: error.response?.data?.error || 'Failed to fetch experiences'
      };
    }
  },

  async getTestimonials() {
    try {
      const response = await api.get('/content/testimonials');
      return {
        success: true,
        data: response.data.data,
        error: null
      };
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      return {
        success: false,
        data: [],
        error: error.response?.data?.error || 'Failed to fetch testimonials'
      };
    }
  },

  async getServices() {
    try {
      const response = await api.get('/content/services');
      return {
        success: true,
        data: response.data.data,
        error: null
      };
    } catch (error) {
      console.error('Error fetching services:', error);
      return {
        success: false,
        data: [],
        error: error.response?.data?.error || 'Failed to fetch services'
      };
    }
  },

  async getBlogs(params = {}) {
    try {
      const response = await api.get('/content/blogs', { params });
      return {
        success: true,
        data: response.data.data,
        count: response.data.count,
        error: null
      };
    } catch (error) {
      console.error('Error fetching blogs:', error);
      return {
        success: false,
        data: [],
        count: 0,
        error: error.response?.data?.error || 'Failed to fetch blogs'
      };
    }
  },

  // NEW: Fetch certificates
  async getCertificates(params = {}) {
    try {
      const response = await api.get('/certificates', { params });
      return {
        success: true,
        data: response.data.data,
        count: response.data.count,
        error: null
      };
    } catch (error) {
      console.error('Error fetching certificates:', error);
      return {
        success: false,
        data: [],
        count: 0,
        error: error.response?.data?.error || 'Failed to fetch certificates'
      };
    }
  },

  // NEW: Fetch achievements
  async getAchievements(params = {}) {
    try {
      const response = await api.get('/achievements', { params });
      return {
        success: true,
        data: response.data.data,
        count: response.data.count,
        error: null
      };
    } catch (error) {
      console.error('Error fetching achievements:', error);
      return {
        success: false,
        data: [],
        count: 0,
        error: error.response?.data?.error || 'Failed to fetch achievements'
      };
    }
  },

  async submitContact(data) {
    try {
      const response = await api.post('/content/contact', data);
      return {
        success: true,
        data: response.data.data,
        message: response.data.message,
        error: null
      };
    } catch (error) {
      console.error('Error submitting contact form:', error);
      return {
        success: false,
        data: null,
        message: null,
        error: error.response?.data?.error || 'Failed to send message'
      };
    }
  },
};

export default portfolioService;