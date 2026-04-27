// Input validation utilities
export const validatePhone = (phone) => /^[6-9]\d{9}$/.test(phone);
export const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
export const validatePincode = (pin) => /^\d{6}$/.test(pin);
export const sanitizeInput = (str) => str?.trim().replace(/<[^>]*>/g, '') || '';
