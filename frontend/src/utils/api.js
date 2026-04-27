// API utility for backend calls
const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const api = {
  get: (endpoint) => fetch(`${API_BASE}${endpoint}`, {
    headers: { 'Content-Type': 'application/json' }
  }).then(r => r.json()),

  post: (endpoint, data, token) => fetch(`${API_BASE}${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` })
    },
    body: JSON.stringify(data)
  }).then(r => r.json()),
};

export default api;
