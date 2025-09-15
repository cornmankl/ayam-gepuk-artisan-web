import React from 'react';
import { motion } from 'framer-motion';

const MobileTest: React.FC = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-red-50 p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-md mx-auto bg-white rounded-2xl shadow-xl p-6"
            >
                <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl">📱</span>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">
                        Mobile Test
                    </h1>
                    <p className="text-gray-600">
                        Testing mobile responsiveness and functionality
                    </p>
                </div>

                <div className="space-y-4">
                    <div className="p-4 bg-green-50 rounded-lg">
                        <h3 className="font-semibold text-green-800 mb-2">✅ Server Status</h3>
                        <p className="text-sm text-green-700">Development server is running</p>
                    </div>

                    <div className="p-4 bg-blue-50 rounded-lg">
                        <h3 className="font-semibold text-blue-800 mb-2">📱 Mobile Features</h3>
                        <ul className="text-sm text-blue-700 space-y-1">
                            <li>• Responsive design</li>
                            <li>• Touch-friendly buttons</li>
                            <li>• Mobile-optimized navigation</li>
                            <li>• Fast loading</li>
                        </ul>
                    </div>

                    <div className="p-4 bg-yellow-50 rounded-lg">
                        <h3 className="font-semibold text-yellow-800 mb-2">🔧 Technical Status</h3>
                        <ul className="text-sm text-yellow-700 space-y-1">
                            <li>• React Router: Working</li>
                            <li>• Tailwind CSS: Loaded</li>
                            <li>• Framer Motion: Active</li>
                            <li>• TypeScript: Compiled</li>
                        </ul>
                    </div>

                    <div className="mt-6">
                        <button
                            onClick={() => window.location.href = '/'}
                            className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-3 px-6 rounded-xl font-medium hover:from-red-700 hover:to-red-800 transition-all duration-300"
                        >
                            Go to Homepage
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default MobileTest;
