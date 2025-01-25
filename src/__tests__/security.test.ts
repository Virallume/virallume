import { 
  sanitizeText,
  containsPII,
  validateApiKey
} from '../utils/security';

describe('Security Utils', () => {
  describe('sanitizeText', () => {
    it('should redact email addresses', () => {
      const input = 'Contact me at user@example.com';
      const output = sanitizeText(input);
      expect(output).toBe('Contact me at [REDACTED EMAIL]');
    });

    it('should redact phone numbers', () => {
      const input = 'Call me at (123) 456-7890';
      const output = sanitizeText(input);
      expect(output).toBe('Call me at [REDACTED PHONE]');
    });

    it('should redact multiple PII instances', () => {
      const input = 'Email: user@example.com, Phone: 123-456-7890';
      const output = sanitizeText(input);
      expect(output).toBe('Email: [REDACTED EMAIL], Phone: [REDACTED PHONE]');
    });
  });

  describe('containsPII', () => {
    it('should detect email addresses', () => {
      expect(containsPII('user@example.com')).toBe(true);
    });

    it('should detect phone numbers', () => {
      expect(containsPII('123-456-7890')).toBe(true);
    });

    it('should return false for clean text', () => {
      expect(containsPII('Hello World!')).toBe(false);
    });
  });

  describe('validateApiKey', () => {
    it('should validate correct API key format', () => {
      expect(validateApiKey('sk-1234567890abcdef1234567890abcdef')).toBe(true);
    });

    it('should reject invalid API key format', () => {
      expect(validateApiKey('invalid-key')).toBe(false);
    });

    it('should reject empty API key', () => {
      expect(validateApiKey('')).toBe(false);
    });
  });
});
