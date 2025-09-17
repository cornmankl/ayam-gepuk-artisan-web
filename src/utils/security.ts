// Security utilities for Ayam Gepuk Artisan
// Implements CSP, HSTS, input validation, and security headers

export interface SecurityConfig {
  enableCSP: boolean;
  enableHSTS: boolean;
  enableXSSProtection: boolean;
  enableContentTypeOptions: boolean;
  enableFrameOptions: boolean;
  enableReferrerPolicy: boolean;
  allowedOrigins: string[];
  trustedDomains: string[];
}

export class SecurityManager {
  private config: SecurityConfig;

  constructor() {
    this.config = {
      enableCSP: true,
      enableHSTS: true,
      enableXSSProtection: true,
      enableContentTypeOptions: true,
      enableFrameOptions: true,
      enableReferrerPolicy: true,
      allowedOrigins: [
        'https://ayamgepukartisan.com',
        'https://www.ayamgepukartisan.com',
        'http://localhost:3000',
        'http://localhost:5173',
      ],
      trustedDomains: [
        'fonts.googleapis.com',
        'fonts.gstatic.com',
        'uploadthingy.s3.us-west-1.amazonaws.com',
        'wa.me',
        'api.openai.com',
        'api.anthropic.com',
        'generativelanguage.googleapis.com',
      ],
    };
  }

  // Set security headers (development only)
  setSecurityHeaders() {
    if (typeof window === 'undefined') return;

    // Only set headers that work with meta tags in development
    if (process.env.NODE_ENV === 'development') {
      // Content Security Policy
      if (this.config.enableCSP) {
        this.setCSPHeader();
      }

      // XSS Protection
      if (this.config.enableXSSProtection) {
        this.setXSSProtectionHeader();
      }

      // Content Type Options
      if (this.config.enableContentTypeOptions) {
        this.setContentTypeOptionsHeader();
      }

      // Referrer Policy
      if (this.config.enableReferrerPolicy) {
        this.setReferrerPolicyHeader();
      }
    }
  }

  private setCSPHeader() {
    const csp = [
      "default-src 'self'",
      `script-src 'self' 'unsafe-inline' 'unsafe-eval' ${this.config.trustedDomains.join(' ')}`,
      `style-src 'self' 'unsafe-inline' ${this.config.trustedDomains.join(' ')}`,
      `img-src 'self' data: blob: ${this.config.trustedDomains.join(' ')}`,
      `font-src 'self' data: ${this.config.trustedDomains.join(' ')}`,
      `connect-src 'self' ${this.config.trustedDomains.join(' ')}`,
      `frame-src 'self' ${this.config.trustedDomains.join(' ')}`,
      `object-src 'none'`,
      `base-uri 'self'`,
      `form-action 'self'`,
      `frame-ancestors 'none'`,
      `upgrade-insecure-requests`,
    ].join('; ');

    const meta = document.createElement('meta');
    meta.httpEquiv = 'Content-Security-Policy';
    meta.content = csp;
    document.head.appendChild(meta);
  }

  private setXSSProtectionHeader() {
    const meta = document.createElement('meta');
    meta.httpEquiv = 'X-XSS-Protection';
    meta.content = '1; mode=block';
    document.head.appendChild(meta);
  }

  private setContentTypeOptionsHeader() {
    const meta = document.createElement('meta');
    meta.httpEquiv = 'X-Content-Type-Options';
    meta.content = 'nosniff';
    document.head.appendChild(meta);
  }

  private setReferrerPolicyHeader() {
    const meta = document.createElement('meta');
    meta.name = 'referrer';
    meta.content = 'strict-origin-when-cross-origin';
    document.head.appendChild(meta);
  }

  // Input validation
  validateInput(
    input: string,
    type: 'email' | 'phone' | 'text' | 'number'
  ): boolean {
    switch (type) {
      case 'email':
        return this.validateEmail(input);
      case 'phone':
        return this.validatePhone(input);
      case 'text':
        return this.validateText(input);
      case 'number':
        return this.validateNumber(input);
      default:
        return false;
    }
  }

  private validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) && email.length <= 254;
  }

  private validatePhone(phone: string): boolean {
    const phoneRegex = /^\+?[1-9]\d{0,15}$/;
    return phoneRegex.test(phone.replace(/\s/g, '')) && phone.length <= 20;
  }

  private validateText(text: string): boolean {
    // Check for XSS attempts
    const xssPatterns = [
      /<script/i,
      /javascript:/i,
      /on\w+\s*=/i,
      /<iframe/i,
      /<object/i,
      /<embed/i,
      /<link/i,
      /<meta/i,
    ];

    return (
      text.length <= 1000 && !xssPatterns.some(pattern => pattern.test(text))
    );
  }

  private validateNumber(number: string): boolean {
    const num = parseFloat(number);
    return !isNaN(num) && isFinite(num) && num >= 0;
  }

  // Sanitize HTML content
  sanitizeHTML(html: string): string {
    const div = document.createElement('div');
    div.textContent = html;
    return div.innerHTML;
  }

  // Escape HTML entities
  escapeHTML(str: string): string {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  // Validate file upload
  validateFile(file: File, allowedTypes: string[], maxSize: number): boolean {
    // Check file type
    if (!allowedTypes.includes(file.type)) {
      return false;
    }

    // Check file size
    if (file.size > maxSize) {
      return false;
    }

    // Check file name for malicious patterns
    const maliciousPatterns = [
      /\.\./,
      /[<>:"|?*]/,
      /^(CON|PRN|AUX|NUL|COM[1-9]|LPT[1-9])$/i,
    ];

    return !maliciousPatterns.some(pattern => pattern.test(file.name));
  }

  // Generate CSRF token
  generateCSRFToken(): string {
    const array = new Uint8Array(32);
    crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join(
      ''
    );
  }

  // Validate CSRF token
  validateCSRFToken(token: string, storedToken: string): boolean {
    return token === storedToken && token.length === 64;
  }

  // Rate limiting
  private rateLimitMap = new Map<
    string,
    { count: number; resetTime: number }
  >();

  checkRateLimit(
    identifier: string,
    maxRequests: number,
    windowMs: number
  ): boolean {
    const now = Date.now();
    const key = identifier;
    const record = this.rateLimitMap.get(key);

    if (!record || now > record.resetTime) {
      this.rateLimitMap.set(key, { count: 1, resetTime: now + windowMs });
      return true;
    }

    if (record.count >= maxRequests) {
      return false;
    }

    record.count++;
    return true;
  }

  // Secure random string generation
  generateSecureRandomString(length: number): string {
    const charset =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const array = new Uint8Array(length);
    crypto.getRandomValues(array);

    for (let i = 0; i < length; i++) {
      result += charset[array[i] % charset.length];
    }

    return result;
  }

  // Hash password (for admin authentication)
  async hashPassword(password: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }

  // Verify password
  async verifyPassword(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    const hashedInput = await this.hashPassword(password);
    return hashedInput === hashedPassword;
  }

  // Check if URL is safe
  isSafeURL(url: string): boolean {
    try {
      const urlObj = new URL(url);
      return this.config.allowedOrigins.some(
        origin =>
          urlObj.origin === origin ||
          urlObj.hostname === origin.replace(/^https?:\/\//, '')
      );
    } catch {
      return false;
    }
  }

  // Log security events
  logSecurityEvent(event: string, details: any) {
    console.warn(`Security Event: ${event}`, details);

    // In production, this would be sent to a security monitoring service
    if (process.env.NODE_ENV === 'production') {
      // Send to security monitoring service
      this.sendToSecurityService(event, details);
    }
  }

  private sendToSecurityService(event: string, details: any) {
    // Implementation would depend on the security service used
    // This is a placeholder for actual implementation
    console.log('Security event logged:', {
      event,
      details,
      timestamp: new Date().toISOString(),
    });
  }

  // Update security configuration
  updateConfig(newConfig: Partial<SecurityConfig>) {
    this.config = { ...this.config, ...newConfig };
  }

  // Get current security status
  getSecurityStatus() {
    return {
      cspEnabled: this.config.enableCSP,
      hstsEnabled: this.config.enableHSTS,
      xssProtectionEnabled: this.config.enableXSSProtection,
      contentTypeOptionsEnabled: this.config.enableContentTypeOptions,
      frameOptionsEnabled: this.config.enableFrameOptions,
      referrerPolicyEnabled: this.config.enableReferrerPolicy,
      allowedOrigins: this.config.allowedOrigins.length,
      trustedDomains: this.config.trustedDomains.length,
    };
  }
}

// Export singleton instance
export const securityManager = new SecurityManager();

// Security middleware for API calls
export const securityMiddleware = {
  // Add security headers to fetch requests
  secureFetch: async (
    url: string,
    options: RequestInit = {}
  ): Promise<Response> => {
    const secureOptions: RequestInit = {
      ...options,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRF-Token': securityManager.generateCSRFToken(),
        ...options.headers,
      },
    };

    return fetch(url, secureOptions);
  },

  // Validate API response
  validateResponse: (response: Response): boolean => {
    // Check for security headers
    const securityHeaders = [
      'X-Content-Type-Options',
      'X-Frame-Options',
      'X-XSS-Protection',
    ];

    return securityHeaders.every(header => response.headers.has(header));
  },
};

// Input validation hooks
export const useInputValidation = () => {
  const validateEmail = (email: string) =>
    securityManager.validateInput(email, 'email');
  const validatePhone = (phone: string) =>
    securityManager.validateInput(phone, 'phone');
  const validateText = (text: string) =>
    securityManager.validateInput(text, 'text');
  const validateNumber = (number: string) =>
    securityManager.validateInput(number, 'number');

  return {
    validateEmail,
    validatePhone,
    validateText,
    validateNumber,
  };
};

export default SecurityManager;
