/**
 * 3D Background Animation System
 * Multiple animation styles: Floating Particles, Gradient Waves, Rotating Cubes
 */

class BackgroundAnimator {
    constructor() {
        this.canvas = document.getElementById('backgroundCanvas');
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.animationFrame = null;
        this.currentAnimation = 'particles';

        // Animation objects
        this.particles = [];
        this.waves = [];
        this.cubes = [];

        // Performance settings
        this.isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        this.init();
        this.setupControls();
        this.setupThemeHandling();
    }

    init() {
        if (!window.THREE) {
            console.warn('Three.js not loaded, falling back to CSS animations');
            this.initFallbackAnimations();
            return;
        }

        // Setup Three.js scene
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            alpha: true,
            antialias: !this.isReducedMotion
        });

        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.camera.position.z = 5;

        // Setup resize handler
        window.addEventListener('resize', () => this.onWindowResize());

        // Start with particles animation
        this.startAnimation('particles');
    }

    /**
     * Fallback CSS-only animations for when Three.js isn't available
     */
    initFallbackAnimations() {
        this.canvas.style.display = 'none';
        document.body.classList.add('css-animations');

        // Create CSS particle system
        this.createCSSParticles();
    }

    createCSSParticles() {
        const particleContainer = document.createElement('div');
        particleContainer.className = 'css-particles';
        document.body.appendChild(particleContainer);

        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'css-particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 10 + 's';
            particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
            particleContainer.appendChild(particle);
        }
    }

    /**
     * Setup background animation controls
     */
    setupControls() {
        const buttons = document.querySelectorAll('.bg-btn');
        buttons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                // Update active state
                buttons.forEach(b => b.classList.remove('active'));
                e.target.closest('.bg-btn').classList.add('active');

                // Switch animation
                const animation = e.target.closest('.bg-btn').dataset.animation;
                this.startAnimation(animation);
            });
        });
    }

    /**
     * Setup theme change handling
     */
    setupThemeHandling() {
        const themeToggle = document.getElementById('themeToggle');
        themeToggle.addEventListener('click', () => {
            const body = document.body;
            const currentTheme = body.dataset.theme;
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';

            body.dataset.theme = newTheme;

            // Update materials for current theme
            this.updateThemeColors(newTheme);

            // Store theme preference
            localStorage.setItem('photobooth-theme', newTheme);
        });

        // Load saved theme
        const savedTheme = localStorage.getItem('photobooth-theme') || 'light';
        document.body.dataset.theme = savedTheme;
        this.updateThemeColors(savedTheme);
    }

    /**
     * Update animation colors based on theme
     */
    updateThemeColors(theme) {
        if (!this.scene) return;

        const isDark = theme === 'dark';

        // Update particle colors
        this.particles.forEach(particle => {
            if (particle.material) {
                particle.material.color.setHSL(
                    Math.random(),
                    0.5,
                    isDark ? 0.7 : 0.3
                );
            }
        });

        // Update cube colors
        this.cubes.forEach(cube => {
            if (cube.material) {
                cube.material.color.setHSL(
                    Math.random(),
                    0.6,
                    isDark ? 0.6 : 0.4
                );
            }
        });
    }

    /**
     * Start specific animation type
     */
    startAnimation(type) {
        this.currentAnimation = type;
        this.clearScene();

        if (!this.scene) return;

        switch (type) {
            case 'particles':
                this.createFloatingParticles();
                break;
            case 'waves':
                this.createGradientWaves();
                break;
            case 'cubes':
                this.createRotatingCubes();
                break;
        }

        this.animate();
    }

    /**
     * Clear current scene objects
     */
    clearScene() {
        if (!this.scene) return;

        // Cancel existing animation
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
        }

        // Clear arrays
        this.particles = [];
        this.waves = [];
        this.cubes = [];

        // Remove all meshes from scene
        const meshes = [];
        this.scene.traverse((child) => {
            if (child.isMesh) {
                meshes.push(child);
            }
        });
        meshes.forEach(mesh => {
            this.scene.remove(mesh);
            if (mesh.geometry) mesh.geometry.dispose();
            if (mesh.material) mesh.material.dispose();
        });
    }

    /**
     * Create floating particles animation
     */
    createFloatingParticles() {
        const particleCount = this.isReducedMotion ? 30 : 100;
        const geometry = new THREE.SphereGeometry(0.02, 8, 8);

        for (let i = 0; i < particleCount; i++) {
            const material = new THREE.MeshBasicMaterial({
                color: new THREE.Color().setHSL(Math.random(), 0.5, 0.5),
                transparent: true,
                opacity: Math.random() * 0.5 + 0.3
            });

            const particle = new THREE.Mesh(geometry, material);

            // Random position
            particle.position.x = (Math.random() - 0.5) * 20;
            particle.position.y = (Math.random() - 0.5) * 20;
            particle.position.z = (Math.random() - 0.5) * 20;

            // Store original position and movement properties
            particle.userData = {
                originalY: particle.position.y,
                speed: Math.random() * 0.01 + 0.005,
                amplitude: Math.random() * 2 + 1,
                phase: Math.random() * Math.PI * 2
            };

            this.particles.push(particle);
            this.scene.add(particle);
        }
    }

    /**
     * Create gradient waves animation
     */
    createGradientWaves() {
        const waveCount = this.isReducedMotion ? 3 : 8;

        for (let i = 0; i < waveCount; i++) {
            const geometry = new THREE.PlaneGeometry(20, 20, 50, 50);
            const material = new THREE.MeshBasicMaterial({
                color: new THREE.Color().setHSL(i * 0.1, 0.6, 0.4),
                transparent: true,
                opacity: 0.1,
                wireframe: true
            });

            const wave = new THREE.Mesh(geometry, material);
            wave.rotation.x = -Math.PI / 2;
            wave.position.y = i * 0.5 - 2;
            wave.position.z = -5 + i * 0.5;

            wave.userData = {
                originalVertices: geometry.attributes.position.array.slice(),
                time: Math.random() * Math.PI * 2,
                speed: 0.02 + Math.random() * 0.01
            };

            this.waves.push(wave);
            this.scene.add(wave);
        }
    }

    /**
     * Create rotating cubes animation
     */
    createRotatingCubes() {
        const cubeCount = this.isReducedMotion ? 5 : 15;

        for (let i = 0; i < cubeCount; i++) {
            const size = Math.random() * 0.3 + 0.1;
            const geometry = new THREE.BoxGeometry(size, size, size);
            const material = new THREE.MeshBasicMaterial({
                color: new THREE.Color().setHSL(Math.random(), 0.6, 0.4),
                transparent: true,
                opacity: 0.6,
                wireframe: true
            });

            const cube = new THREE.Mesh(geometry, material);

            // Random position
            cube.position.x = (Math.random() - 0.5) * 15;
            cube.position.y = (Math.random() - 0.5) * 15;
            cube.position.z = (Math.random() - 0.5) * 15;

            // Random rotation speed
            cube.userData = {
                rotationSpeed: {
                    x: (Math.random() - 0.5) * 0.02,
                    y: (Math.random() - 0.5) * 0.02,
                    z: (Math.random() - 0.5) * 0.02
                },
                floatSpeed: Math.random() * 0.01 + 0.005,
                floatAmplitude: Math.random() * 2 + 1,
                originalY: cube.position.y,
                phase: Math.random() * Math.PI * 2
            };

            this.cubes.push(cube);
            this.scene.add(cube);
        }
    }

    /**
     * Animation loop
     */
    animate() {
        this.animationFrame = requestAnimationFrame(() => this.animate());

        if (!this.scene) return;

        const time = Date.now() * 0.001;

        // Animate based on current type
        switch (this.currentAnimation) {
            case 'particles':
                this.animateParticles(time);
                break;
            case 'waves':
                this.animateWaves(time);
                break;
            case 'cubes':
                this.animateCubes(time);
                break;
        }

        // Rotate camera slowly
        this.camera.position.x = Math.cos(time * 0.1) * 0.5;
        this.camera.lookAt(0, 0, 0);

        this.renderer.render(this.scene, this.camera);
    }

    /**
     * Animate floating particles
     */
    animateParticles(time) {
        this.particles.forEach(particle => {
            const userData = particle.userData;

            // Float up and down
            particle.position.y = userData.originalY +
                Math.sin(time * userData.speed + userData.phase) * userData.amplitude;

            // Gentle horizontal drift
            particle.position.x += Math.sin(time * userData.speed * 0.5) * 0.001;

            // Pulse opacity
            particle.material.opacity = 0.3 + Math.sin(time * userData.speed * 2) * 0.2;
        });
    }

    /**
     * Animate gradient waves
     */
    animateWaves(time) {
        this.waves.forEach(wave => {
            const userData = wave.userData;
            const positions = wave.geometry.attributes.position.array;
            const originalVertices = userData.originalVertices;

            // Create wave motion
            for (let i = 0; i < positions.length; i += 3) {
                const x = originalVertices[i];
                const z = originalVertices[i + 2];

                positions[i + 1] = originalVertices[i + 1] +
                    Math.sin(x * 0.3 + time * userData.speed * 5) * 0.3 +
                    Math.cos(z * 0.2 + time * userData.speed * 3) * 0.2;
            }

            wave.geometry.attributes.position.needsUpdate = true;

            // Rotate the wave
            wave.rotation.z += userData.speed * 0.5;
        });
    }

    /**
     * Animate rotating cubes
     */
    animateCubes(time) {
        this.cubes.forEach(cube => {
            const userData = cube.userData;

            // Rotate
            cube.rotation.x += userData.rotationSpeed.x;
            cube.rotation.y += userData.rotationSpeed.y;
            cube.rotation.z += userData.rotationSpeed.z;

            // Float
            cube.position.y = userData.originalY +
                Math.sin(time * userData.floatSpeed + userData.phase) * userData.floatAmplitude;
        });
    }

    /**
     * Handle window resize
     */
    onWindowResize() {
        if (!this.camera || !this.renderer) return;

        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    /**
     * Cleanup resources
     */
    destroy() {
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
        }

        this.clearScene();

        if (this.renderer) {
            this.renderer.dispose();
        }
    }
}

// Initialize background animation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Check if reduced motion is preferred
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!prefersReducedMotion) {
        window.backgroundAnimator = new BackgroundAnimator();
    } else {
        // Hide animation controls for reduced motion users
        const bgControls = document.querySelector('.bg-controls');
        if (bgControls) {
            bgControls.style.display = 'none';
        }
    }
});

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    if (window.backgroundAnimator) {
        window.backgroundAnimator.destroy();
    }
});