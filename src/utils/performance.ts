// Performance optimization utilities for Ayam Gepuk Artisan
// Implements lazy loading, image optimization, caching, and performance monitoring

import React from 'react';

export interface PerformanceMetrics {
    loadTime: number;
    firstContentfulPaint: number;
    largestContentfulPaint: number;
    firstInputDelay: number;
    cumulativeLayoutShift: number;
    timeToInteractive: number;
}

export interface PerformanceMemory {
    usedJSHeapSize: number;
    totalJSHeapSize: number;
    jsHeapSizeLimit: number;
}

export interface PerformanceReport {
    timestamp: string;
    metrics: PerformanceMetrics | null;
    memory: PerformanceMemory | null;
    userAgent: string;
    connection: string;
    viewport: {
        width: number;
        height: number;
    };
}

export interface ImageOptimizationConfig {
    quality: number;
    format: 'webp' | 'jpeg' | 'png' | 'auto';
    lazy: boolean;
    placeholder: boolean;
    responsive: boolean;
}

class PerformanceManager {
    private metrics: PerformanceMetrics | null = null;
    private observers: PerformanceObserver[] = [];
    private imageCache = new Map<string, string>();

    constructor() {
        this.initializePerformanceMonitoring();
    }

    // Initialize performance monitoring
    private initializePerformanceMonitoring() {
        if (typeof window === 'undefined') return;

        // Monitor Core Web Vitals
        this.observeCoreWebVitals();

        // Monitor resource loading
        this.observeResourceLoading();

        // Monitor navigation timing
        this.observeNavigationTiming();
    }

    // Monitor Core Web Vitals
    private observeCoreWebVitals() {
        // Largest Contentful Paint (LCP)
        if ('PerformanceObserver' in window) {
            const lcpObserver = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                const lastEntry = entries[entries.length - 1];
                this.metrics = {
                    ...this.metrics,
                    largestContentfulPaint: lastEntry.startTime
                } as PerformanceMetrics;
            });
            lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
            this.observers.push(lcpObserver);
        }

        // First Input Delay (FID)
        if ('PerformanceObserver' in window) {
            const fidObserver = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                entries.forEach((entry: PerformanceEntry) => {
                    const fidEntry = entry as PerformanceEventTiming;
                    this.metrics = {
                        ...this.metrics,
                        firstInputDelay: fidEntry.processingStart - fidEntry.startTime
                    } as PerformanceMetrics;
                });
            });
            fidObserver.observe({ entryTypes: ['first-input'] });
            this.observers.push(fidObserver);
        }

        // Cumulative Layout Shift (CLS)
        if ('PerformanceObserver' in window) {
            let clsValue = 0;
            const clsObserver = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                entries.forEach((entry: PerformanceEntry) => {
                    const clsEntry = entry as PerformanceEntry & { hadRecentInput?: boolean; value: number };
                    if (!clsEntry.hadRecentInput) {
                        clsValue += clsEntry.value;
                    }
                });
                this.metrics = {
                    ...this.metrics,
                    cumulativeLayoutShift: clsValue
                } as PerformanceMetrics;
            });
            clsObserver.observe({ entryTypes: ['layout-shift'] });
            this.observers.push(clsObserver);
        }
    }

    // Monitor resource loading
    private observeResourceLoading() {
        if ('PerformanceObserver' in window) {
            const resourceObserver = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                entries.forEach((entry: PerformanceEntry) => {
                    const resourceEntry = entry as PerformanceResourceTiming;
                    // Filter out failed connections and development server polling
                    const isFailedConnection = resourceEntry.transferSize === 0 && resourceEntry.duration > 1000;
                    const isDevServerPolling = resourceEntry.name.includes('localhost:5175') && resourceEntry.transferSize === 0;
                    const isConnectionRefused = resourceEntry.name.includes('ERR_CONNECTION_REFUSED');

                    // Only log actual slow resources, not failed connections
                    if (resourceEntry.duration > 1000 && !isFailedConnection && !isDevServerPolling && !isConnectionRefused) {
                        console.warn('Slow resource detected:', {
                            name: resourceEntry.name,
                            duration: resourceEntry.duration,
                            size: resourceEntry.transferSize
                        });
                    }
                });
            });
            resourceObserver.observe({ entryTypes: ['resource'] });
            this.observers.push(resourceObserver);
        }
    }

    // Monitor navigation timing
    private observeNavigationTiming() {
        if ('PerformanceObserver' in window) {
            const navObserver = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                entries.forEach((entry: PerformanceEntry) => {
                    const navEntry = entry as PerformanceNavigationTiming;
                    this.metrics = {
                        ...this.metrics,
                        loadTime: navEntry.loadEventEnd - navEntry.loadEventStart,
                        firstContentfulPaint: navEntry.responseEnd - navEntry.requestStart,
                        timeToInteractive: navEntry.domInteractive - navEntry.fetchStart
                    } as PerformanceMetrics;
                });
            });
            navObserver.observe({ entryTypes: ['navigation'] });
            this.observers.push(navObserver);
        }
    }

    // Get current performance metrics
    getMetrics(): PerformanceMetrics | null {
        return this.metrics;
    }

    // Optimize images
    optimizeImage(
        src: string,
        config: Partial<ImageOptimizationConfig> = {}
    ): string {
        const defaultConfig: ImageOptimizationConfig = {
            quality: 80,
            format: 'auto',
            lazy: true,
            placeholder: true,
            responsive: true
        };

        const finalConfig = { ...defaultConfig, ...config };

        // Check cache first
        const cacheKey = `${src}_${JSON.stringify(finalConfig)}`;
        const cachedResult = this.imageCache.get(cacheKey);
        if (cachedResult) {
            return cachedResult;
        }

        // Generate optimized URL (this would integrate with your image service)
        let optimizedSrc = src;

        // Add quality parameter
        if (finalConfig.quality !== 80) {
            optimizedSrc += `?q=${finalConfig.quality}`;
        }

        // Add format parameter
        if (finalConfig.format !== 'auto') {
            optimizedSrc += `&f=${finalConfig.format}`;
        }

        // Add responsive parameters
        if (finalConfig.responsive) {
            optimizedSrc += `&w=auto&h=auto&fit=cover`;
        }

        // Cache the result
        this.imageCache.set(cacheKey, optimizedSrc);

        return optimizedSrc;
    }

    // Lazy load images
    lazyLoadImage(element: HTMLImageElement, src: string): void {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const img = entry.target as HTMLImageElement;
                    img.src = src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });

        observer.observe(element);
    }

    // Preload critical resources
    preloadResource(href: string, as: string): void {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = href;
        link.as = as;
        document.head.appendChild(link);
    }

    // Prefetch resources
    prefetchResource(href: string): void {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = href;
        document.head.appendChild(link);
    }

    // Defer non-critical JavaScript
    deferScript(src: string): Promise<void> {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = src;
            script.async = true;
            script.defer = true;
            script.onload = () => resolve();
            script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
            document.head.appendChild(script);
        });
    }

    // Optimize CSS delivery
    optimizeCSS(href: string, media?: string): void {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = href;
        if (media) link.media = media;
        link.onload = () => {
            // CSS loaded successfully
        };
        document.head.appendChild(link);
    }

    // Implement service worker for caching
    async registerServiceWorker(): Promise<void> {
        if ('serviceWorker' in navigator) {
            try {
                const registration = await navigator.serviceWorker.register('/sw.js');
                console.log('Service Worker registered:', registration);
            } catch (error) {
                console.error('Service Worker registration failed:', error);
            }
        }
    }

    // Cache API responses
    async cacheResponse(url: string, response: Response): Promise<void> {
        if ('caches' in window) {
            const cache = await caches.open('api-cache-v1');
            await cache.put(url, response);
        }
    }

    // Get cached response
    async getCachedResponse(url: string): Promise<Response | undefined> {
        if ('caches' in window) {
            const cache = await caches.open('api-cache-v1');
            return await cache.match(url);
        }
        return undefined;
    }

    // Optimize bundle size
    analyzeBundleSize(): void {
        if (process.env.NODE_ENV === 'development') {
            // This would integrate with webpack-bundle-analyzer
            console.log('Bundle analysis would be available in development mode');
        }
    }

    // Implement code splitting
    async loadComponent(componentPath: string): Promise<unknown> {
        try {
            const module = await import(/* @vite-ignore */ `../${componentPath}`);
            return module.default;
        } catch (error) {
            console.error('Failed to load component:', error);
            throw error;
        }
    }

    // Optimize database queries
    optimizeQuery(query: string): string {
        // This would integrate with your database optimization
        // For now, just return the query
        return query;
    }

    // Implement request debouncing
    debounce<T extends (...args: unknown[]) => unknown>(
        func: T,
        wait: number
    ): (...args: Parameters<T>) => void {
        let timeout: ReturnType<typeof setTimeout>;
        return (...args: Parameters<T>) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => func(...args), wait);
        };
    }

    // Implement request throttling
    throttle<T extends (...args: unknown[]) => unknown>(
        func: T,
        limit: number
    ): (...args: Parameters<T>) => void {
        let inThrottle: boolean;
        return (...args: Parameters<T>) => {
            if (!inThrottle) {
                func(...args);
                inThrottle = true;
                setTimeout(() => (inThrottle = false), limit);
            }
        };
    }

    // Monitor memory usage
    getMemoryUsage(): PerformanceMemory | null {
        if ('memory' in performance) {
            return (performance as Performance & { memory: PerformanceMemory }).memory;
        }
        return null;
    }

    // Cleanup observers
    cleanup(): void {
        this.observers.forEach(observer => observer.disconnect());
        this.observers = [];
    }

    // Generate performance report
    generateReport(): PerformanceReport {
        const metrics = this.getMetrics();
        const memory = this.getMemoryUsage();

        return {
            timestamp: new Date().toISOString(),
            metrics,
            memory,
            userAgent: navigator.userAgent,
            connection: (navigator as Navigator & { connection?: { effectiveType?: string } }).connection?.effectiveType || 'unknown',
            viewport: {
                width: window.innerWidth,
                height: window.innerHeight
            }
        };
    }
}

// Export singleton instance
export const performanceManager = new PerformanceManager();

// Performance hooks for React components
export const usePerformanceOptimization = () => {
    const optimizeImage = (src: string, config?: Partial<ImageOptimizationConfig>) => {
        return performanceManager.optimizeImage(src, config);
    };

    const lazyLoadImage = (element: HTMLImageElement, src: string) => {
        performanceManager.lazyLoadImage(element, src);
    };

    const preloadResource = (href: string, as: string) => {
        performanceManager.preloadResource(href, as);
    };

    const prefetchResource = (href: string) => {
        performanceManager.prefetchResource(href);
    };

    return {
        optimizeImage,
        lazyLoadImage,
        preloadResource,
        prefetchResource
    };
};

// Performance monitoring component
export const PerformanceMonitor: React.FC = () => {
    React.useEffect(() => {
        const report = performanceManager.generateReport();
        console.log('Performance Report:', report);

        // Send to analytics service in production
        if (process.env.NODE_ENV === 'production') {
            // Send to your analytics service
            console.log('Sending performance data to analytics...');
        }
    }, []);

    return null;
};

export default PerformanceManager;
