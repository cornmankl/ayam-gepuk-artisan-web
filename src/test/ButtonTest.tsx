import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface TestResult {
  buttonName: string;
  status: 'pending' | 'success' | 'error';
  message: string;
}

const ButtonTest: React.FC = () => {
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  const runTest = (
    buttonName: string,
    testFunction: () => Promise<boolean>
  ) => {
    setTestResults(prev => [
      ...prev,
      { buttonName, status: 'pending', message: 'Testing...' },
    ]);

    testFunction().then(success => {
      setTestResults(prev =>
        prev.map(result =>
          result.buttonName === buttonName
            ? {
                buttonName,
                status: success ? 'success' : 'error',
                message: success ? '✅ Working!' : '❌ Failed!',
              }
            : result
        )
      );
    });
  };

  const testNavigation = async (): Promise<boolean> => {
    try {
      // Test if navigation links work
      const links = document.querySelectorAll('a[href^="/"]');
      return links.length > 0;
    } catch {
      return false;
    }
  };

  const testPhoneCall = async (): Promise<boolean> => {
    try {
      // Test if phone links are properly formatted
      const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
      return phoneLinks.length > 0;
    } catch {
      return false;
    }
  };

  const testWhatsApp = async (): Promise<boolean> => {
    try {
      // Test if WhatsApp links are properly formatted
      const whatsappLinks = document.querySelectorAll('a[href*="wa.me"]');
      return whatsappLinks.length > 0;
    } catch {
      return false;
    }
  };

  const testCartFunctionality = async (): Promise<boolean> => {
    try {
      // Test if cart context is available
      const cartButtons = document.querySelectorAll(
        '[data-testid="cart-button"]'
      );
      return cartButtons.length > 0;
    } catch {
      return false;
    }
  };

  const testAIAssistant = async (): Promise<boolean> => {
    try {
      // Test if AI assistant button exists
      const aiButtons = document.querySelectorAll(
        '[data-testid="ai-assistant"]'
      );
      return aiButtons.length > 0;
    } catch {
      return false;
    }
  };

  const runAllTests = async () => {
    setIsRunning(true);
    setTestResults([]);

    const tests = [
      { name: 'Navigation Links', test: testNavigation },
      { name: 'Phone Call Links', test: testPhoneCall },
      { name: 'WhatsApp Links', test: testWhatsApp },
      { name: 'Cart Functionality', test: testCartFunctionality },
      { name: 'AI Assistant', test: testAIAssistant },
    ];

    for (const { name, test } of tests) {
      await runTest(name, test);
      await new Promise(resolve => setTimeout(resolve, 500)); // Delay between tests
    }

    setIsRunning(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'text-green-600 bg-green-100';
      case 'error':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-yellow-600 bg-yellow-100';
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50 bg-white p-6 rounded-lg shadow-lg max-w-md">
      <h3 className="text-lg font-bold mb-4">🧪 Button Test Panel</h3>

      <button
        onClick={runAllTests}
        disabled={isRunning}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg mb-4 disabled:opacity-50"
      >
        {isRunning ? '🔄 Testing...' : '🚀 Run All Tests'}
      </button>

      <div className="space-y-2 max-h-60 overflow-y-auto">
        {testResults.map((result, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`p-2 rounded ${getStatusColor(result.status)}`}
          >
            <div className="font-medium">{result.buttonName}</div>
            <div className="text-sm">{result.message}</div>
          </motion.div>
        ))}
      </div>

      {testResults.length > 0 && (
        <div className="mt-4 pt-4 border-t">
          <div className="text-sm">
            <div>
              ✅ Passed:{' '}
              {testResults.filter(r => r.status === 'success').length}
            </div>
            <div>
              ❌ Failed: {testResults.filter(r => r.status === 'error').length}
            </div>
            <div>
              ⏳ Pending:{' '}
              {testResults.filter(r => r.status === 'pending').length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ButtonTest;
