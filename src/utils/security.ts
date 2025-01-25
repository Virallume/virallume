// PII patterns to detect and redact
const PII_PATTERNS = {
  email: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g,
  phone: /(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}/g,
  ssn: /\b\d{3}[-]?\d{2}[-]?\d{4}\b/g,
  creditCard: /\b\d{4}[-]?\d{4}[-]?\d{4}[-]?\d{4}\b/g,
  ipAddress: /\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/g
};

/**
 * Sanitizes text by removing potential PII
 */
export function sanitizeText(text: string): string {
  let sanitized = text;
  
  // Replace each PII pattern with redacted text
  Object.entries(PII_PATTERNS).forEach(([type, pattern]) => {
    sanitized = sanitized.replace(pattern, `[REDACTED ${type.toUpperCase()}]`);
  });
  
  return sanitized;
}

/**
 * Validates that a string doesn't contain any PII
 */
export function containsPII(text: string): boolean {
  return Object.values(PII_PATTERNS).some(pattern => pattern.test(text));
}

/**
 * Encrypts sensitive data before storage
 */
export function encryptSensitiveData(data: string, key: string): string {
  // Implementation would use a proper encryption library
  // This is a placeholder for demonstration
  return btoa(data);
}

/**
 * Decrypts sensitive data
 */
export function decryptSensitiveData(encryptedData: string, key: string): string {
  // Implementation would use a proper encryption library
  // This is a placeholder for demonstration
  return atob(encryptedData);
}

/**
 * Validates API keys format
 */
export function validateApiKey(key: string): boolean {
  // Add specific validation logic based on API key format
  return key.length >= 32 && /^[a-zA-Z0-9_-]+$/.test(key);
}

/**
 * Sanitizes user input to prevent XSS
 */
export function sanitizeHtml(html: string): string {
  return html
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
