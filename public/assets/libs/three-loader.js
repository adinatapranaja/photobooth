/**
 * Three.js Loader for Photo Booth Pro
 * Fallback loader for when Three.js is not available locally
 */

// Check if Three.js is already loaded
if (typeof THREE === 'undefined') {
    console.log('Three.js not found locally, loading from CDN...');

    // Create script element to load Three.js from CDN
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/three@0.155.0/build/three.min.js';
    script.async = true;

    script.onload = () => {
        console.log('Three.js loaded successfully from CDN');
        // Trigger background animation initialization if it's waiting
        if (typeof window.backgroundAnimator === 'undefined' && typeof BackgroundAnimator !== 'undefined') {
            const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            if (!prefersReducedMotion) {
                window.backgroundAnimator = new BackgroundAnimator();
            }
        }
    };

    script.onerror = () => {
        console.warn('Failed to load Three.js from CDN');
        // Hide animation controls if Three.js fails to load
        const bgControls = document.querySelector('.bg-controls');
        if (bgControls) {
            bgControls.style.display = 'none';
        }

        // Add CSS fallback class
        document.body.classList.add('css-animations');
    };

    // Add script to head
    document.head.appendChild(script);
} else {
    console.log('Three.js is already available');
}