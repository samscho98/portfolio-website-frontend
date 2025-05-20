// src/services/api.js

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
 * Projects API endpoints
 */
export const projectsApi = {
  getAll: () => apiRequest('/projects'),
  getFeatured: () => apiRequest('/projects/featured'),
  getById: (id) => apiRequest(`/projects/${id}`),
  getBySlug: (slug) => apiRequest(`/projects/${slug}`),
};

/**
 * Contact form API endpoint
 */
export const contactApi = {
  sendMessage: (formData) => apiRequest('/contact', {
    method: 'POST',
    body: JSON.stringify(formData),
  }),
};

export default {
  projectsApi,
  contactApi,
};