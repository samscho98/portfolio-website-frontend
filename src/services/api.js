// src/services/api.js - Enhanced API service with localization support

const API_URL = process.env.REACT_APP_API_URL;

/**
 * Generic API request function with error handling
 */
async function apiRequest(endpoint, options = {}) {
  try {
    const url = `${API_URL}${endpoint}`;
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    // Handle non-2xx responses
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `API error: ${response.status}`);
    }

    // Parse JSON response or return raw response for non-JSON
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return await response.json();
    }
    
    return response;
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
}

/**
 * Languages API endpoints
 */
export const languagesApi = {
  getAll: () => apiRequest('/languages'),
  getStaticContent: (key, lang = 'en') => apiRequest(`/static-content/${key}?lang=${lang}`),
};

/**
 * Projects API endpoints with localization support
 */
export const projectsApi = {
  getAll: (lang = 'en', tag = null) => {
    const params = new URLSearchParams({ lang });
    if (tag) params.append('tag', tag);
    return apiRequest(`/projects?${params.toString()}`);
  },
  getFeatured: (lang = 'en') => apiRequest(`/projects/featured?lang=${lang}`),
  getById: (id, lang = 'en') => apiRequest(`/projects/${id}?lang=${lang}`),
  getBySlug: (slug, lang = 'en') => apiRequest(`/projects/${slug}?lang=${lang}`),
};

/**
 * Services API endpoints
 */
export const servicesApi = {
  getAll: (lang = 'en') => apiRequest(`/services?lang=${lang}`),
};

/**
 * Testimonials API endpoints
 */
export const testimonialsApi = {
  getAll: (lang = 'en') => apiRequest(`/testimonials?lang=${lang}`),
};

/**
 * Tags API endpoint
 */
export const tagsApi = {
  getAll: () => apiRequest('/tags'),
};

/**
 * Countries API endpoint
 */
export const countriesApi = {
  getAll: () => apiRequest('/countries'),
};

/**
 * Enhanced Contact form API endpoint
 */
export const contactApi = {
  sendMessage: (formData) => apiRequest('/contact', {
    method: 'POST',
    body: JSON.stringify(formData),
  }),
};

/**
 * Admin API endpoints (for future use)
 */
export const adminApi = {
  // Projects management
  projects: {
    getAll: (lang = 'en', allLanguages = false) => {
      const params = new URLSearchParams({ lang });
      if (allLanguages) params.append('all_languages', 'true');
      return apiRequest(`/admin/projects?${params.toString()}`);
    },
    create: (projectData) => apiRequest('/admin/projects', {
      method: 'POST',
      body: JSON.stringify(projectData),
    }),
    update: (id, projectData) => apiRequest(`/admin/projects/${id}`, {
      method: 'PUT',
      body: JSON.stringify(projectData),
    }),
  },
  
  // Translation management
  translations: {
    getMissing: (languageCode, entityType = null) => {
      const params = new URLSearchParams({ language_code: languageCode });
      if (entityType) params.append('entity_type', entityType);
      return apiRequest(`/admin/translations/missing?${params.toString()}`);
    },
    create: (translationData) => apiRequest('/admin/translations', {
      method: 'POST',
      body: JSON.stringify(translationData),
    }),
    bulkUpdate: (translations) => apiRequest('/admin/translations/bulk', {
      method: 'POST',
      body: JSON.stringify({ translations }),
    }),
  },
  
  // Contacts management
  contacts: {
    getAll: (filters = {}) => {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== null && value !== undefined && value !== '') {
          params.append(key, value);
        }
      });
      return apiRequest(`/admin/contacts?${params.toString()}`);
    },
  },
};

export default {
  languagesApi,
  projectsApi,
  servicesApi,
  testimonialsApi,
  tagsApi,
  countriesApi,
  contactApi,
  adminApi,
};