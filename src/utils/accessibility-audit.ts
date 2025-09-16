/**
 * Accessibility Audit Utility
 * Checks common accessibility issues in the DOM
 */

interface AccessibilityIssue {
  element: Element;
  issue: string;
  severity: 'error' | 'warning' | 'info';
  recommendation: string;
}

export class AccessibilityAuditor {
  private issues: AccessibilityIssue[] = [];

  public audit(): AccessibilityIssue[] {
    this.issues = [];

    this.checkMissingAltText();
    this.checkMissingLabels();
    this.checkHeadingStructure();
    this.checkColorContrast();
    this.checkFocusableElements();
    this.checkAriaAttributes();

    return this.issues;
  }

  private checkMissingAltText(): void {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      if (!img.hasAttribute('alt') || img.getAttribute('alt')?.trim() === '') {
        this.addIssue(
          img,
          'Missing alt text',
          'error',
          'Add descriptive alt text for screen readers'
        );
      }
    });
  }

  private checkMissingLabels(): void {
    const inputs = document.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
      const id = input.getAttribute('id');
      const hasLabel = id && document.querySelector(`label[for="${id}"]`);
      const hasAriaLabel = input.hasAttribute('aria-label');
      const hasAriaLabelledBy = input.hasAttribute('aria-labelledby');

      if (!hasLabel && !hasAriaLabel && !hasAriaLabelledBy) {
        this.addIssue(
          input,
          'Missing label',
          'error',
          'Add a label, aria-label, or aria-labelledby attribute'
        );
      }
    });
  }

  private checkHeadingStructure(): void {
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    let previousLevel = 0;

    headings.forEach(heading => {
      const currentLevel = parseInt(heading.tagName.substring(1));

      if (currentLevel - previousLevel > 1) {
        this.addIssue(
          heading,
          'Heading level skipped',
          'warning',
          "Use proper heading hierarchy (don't skip levels)"
        );
      }

      previousLevel = currentLevel;
    });
  }

  private checkColorContrast(): void {
    // This would require more complex calculations in a real implementation
    // For now, we'll check for common issues
    const elements = document.querySelectorAll('*');
    elements.forEach(element => {
      const style = window.getComputedStyle(element);
      const color = style.color;
      const backgroundColor = style.backgroundColor;

      // Simple check for very light text on light backgrounds
      if (color.includes('rgb(255') && backgroundColor.includes('rgb(255')) {
        this.addIssue(
          element,
          'Potential contrast issue',
          'warning',
          'Check color contrast meets WCAG standards'
        );
      }
    });
  }

  private checkFocusableElements(): void {
    const focusableElements = document.querySelectorAll(
      'a[href], button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
    );

    focusableElements.forEach(element => {
      const tabindex = element.getAttribute('tabindex');
      if (tabindex && parseInt(tabindex) > 0) {
        this.addIssue(
          element,
          'Positive tabindex',
          'warning',
          'Avoid positive tabindex values, use 0 or -1'
        );
      }
    });
  }

  private checkAriaAttributes(): void {
    const elementsWithRole = document.querySelectorAll('[role]');
    elementsWithRole.forEach(element => {
      const role = element.getAttribute('role');

      // Check for required ARIA attributes based on roles
      if (
        role === 'button' &&
        !element.hasAttribute('aria-label') &&
        !element.textContent?.trim()
      ) {
        this.addIssue(
          element,
          'Button role without label',
          'error',
          'Add aria-label or visible text'
        );
      }

      if (role === 'tab' && !element.hasAttribute('aria-selected')) {
        this.addIssue(
          element,
          'Tab without aria-selected',
          'error',
          'Add aria-selected attribute'
        );
      }
    });
  }

  private addIssue(
    element: Element,
    issue: string,
    severity: AccessibilityIssue['severity'],
    recommendation: string
  ): void {
    this.issues.push({
      element,
      issue,
      severity,
      recommendation,
    });
  }

  public generateReport(): string {
    const errorCount = this.issues.filter(i => i.severity === 'error').length;
    const warningCount = this.issues.filter(
      i => i.severity === 'warning'
    ).length;
    const infoCount = this.issues.filter(i => i.severity === 'info').length;

    let report = `Accessibility Audit Report\n`;
    report += `==========================\n`;
    report += `Errors: ${errorCount}\n`;
    report += `Warnings: ${warningCount}\n`;
    report += `Info: ${infoCount}\n\n`;

    this.issues.forEach((issue, index) => {
      report += `${index + 1}. [${issue.severity.toUpperCase()}] ${issue.issue}\n`;
      report += `   Element: ${issue.element.tagName}${issue.element.id ? '#' + issue.element.id : ''}${issue.element.className ? '.' + issue.element.className.split(' ').join('.') : ''}\n`;
      report += `   Recommendation: ${issue.recommendation}\n\n`;
    });

    return report;
  }
}

// Usage function for development
export const runAccessibilityAudit = (): void => {
  if (process.env.NODE_ENV === 'development') {
    const auditor = new AccessibilityAuditor();
    const issues = auditor.audit();

    if (issues.length > 0) {
      console.group('🔍 Accessibility Audit Results');
      console.log(auditor.generateReport());
      console.groupEnd();
    } else {
      console.log('✅ No accessibility issues found!');
    }
  }
};
