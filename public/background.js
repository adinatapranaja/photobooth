/**
 * 3D Sky Theme Background Animation System
 * Beautiful sky scene with animated clouds, flying sun, and sky gradient
 */

class BackgroundAnimator {
    constructor() {
        this.canvas = document.getElementById('backgroundCanvas');
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.animationFrame = null;
        this.clock = null;

        // Sky animation objects
        this.clouds = [];
        this.sun = null;
        this.skyGradient = null;
        this.birds = [];
        this.lightRays = [];

        // Performance settings
        this.isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        this.cloudCount = this.isReducedMotion ? 8 : 15;
        this.birdCount = this.isReducedMotion ? 3 : 8;

        this.init();
        this.setupThemeHandling();
    }

    init() {
        if (!window.THREE) {
            console.warn('Three.js not loaded, falling back to CSS sky animations');
            this.initFallbackSkyAnimations();
            return;
        }

        // Setup Three.js scene
        this.scene = new THREE.Scene();
        this.clock = new THREE.Clock();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            alpha: true,
            antialias: !this.isReducedMotion
        });

        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.camera.position.set(0, 0, 10);

        // Setup resize handler
        window.addEventListener('resize', () => this.onWindowResize());

        // Create sky scene
        this.createSkyGradient();
        this.createSun();
        this.createClouds();
        this.createBirds();
        this.createLightRays();

        // Start animation
        this.animate();
    }

    createSkyGradient() {
        // Create sky gradient background
        const skyGeometry = new THREE.SphereGeometry(50, 32, 32);
        const skyMaterial = new THREE.ShaderMaterial({
            uniforms: {
                time: { value: 0 },
                topColor: { value: new THREE.Color(0x87CEEB) },    // Sky Blue
                bottomColor: { value: new THREE.Color(0xB0E0E6) }, // Powder Blue
                offset: { value: 33 },
                exponent: { value: 0.6 }
            },
            vertexShader: `
                varying vec3 vWorldPosition;
                void main() {
                    vec4 worldPosition = modelMatrix * vec4(position, 1.0);
                    vWorldPosition = worldPosition.xyz;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                uniform vec3 topColor;
                uniform vec3 bottomColor;
                uniform float offset;
                uniform float exponent;
                uniform float time;
                varying vec3 vWorldPosition;
                void main() {
                    float h = normalize(vWorldPosition + offset).y;
                    float mixRatio = clamp(pow(max(h, 0.0), exponent), 0.0, 1.0);

                    // Add some subtle time-based color variation
                    vec3 dynamicTop = topColor + 0.1 * sin(time * 0.5) * vec3(0.1, 0.1, 0.2);
                    vec3 dynamicBottom = bottomColor + 0.05 * cos(time * 0.3) * vec3(0.1, 0.15, 0.1);

                    gl_FragColor = vec4(mix(dynamicBottom, dynamicTop, mixRatio), 1.0);
                }
            `,
            side: THREE.BackSide
        });

        this.skyGradient = new THREE.Mesh(skyGeometry, skyMaterial);
        this.scene.add(this.skyGradient);
    }

    createSun() {
        // Create animated sun
        const sunGeometry = new THREE.SphereGeometry(1.5, 16, 16);
        const sunMaterial = new THREE.ShaderMaterial({
            uniforms: {
                time: { value: 0 },
                color: { value: new THREE.Color(0xFFFD00) }
            },
            vertexShader: `
                uniform float time;
                varying vec2 vUv;
                varying vec3 vPosition;
                void main() {
                    vUv = uv;
                    vPosition = position;

                    // Add subtle pulsing animation
                    vec3 pos = position;
                    pos *= 1.0 + 0.1 * sin(time * 2.0 + position.x * 5.0);

                    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
                }
            `,
            fragmentShader: `
                uniform float time;
                uniform vec3 color;
                varying vec2 vUv;
                varying vec3 vPosition;
                void main() {
                    vec2 center = vec2(0.5, 0.5);
                    float dist = distance(vUv, center);

                    // Create sun rays effect
                    float rays = 0.5 + 0.5 * sin(time * 3.0 + dist * 20.0);
                    float brightness = 1.0 - smoothstep(0.0, 0.5, dist);
                    brightness *= rays;

                    // Add corona effect
                    float corona = 1.0 - smoothstep(0.3, 0.7, dist);
                    corona *= 0.5 + 0.5 * sin(time * 4.0);

                    vec3 finalColor = color * (brightness + corona * 0.5);
                    gl_FragColor = vec4(finalColor, brightness * 0.8);
                }
            `,
            transparent: true
        });

        this.sun = new THREE.Mesh(sunGeometry, sunMaterial);
        this.sun.position.set(8, 6, -10);
        this.scene.add(this.sun);

        // Add sun glow
        const glowGeometry = new THREE.SphereGeometry(2.5, 16, 16);
        const glowMaterial = new THREE.ShaderMaterial({
            uniforms: {
                time: { value: 0 },
                color: { value: new THREE.Color(0xFFE55C) }
            },
            vertexShader: `
                void main() {
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                uniform float time;
                uniform vec3 color;
                void main() {
                    float alpha = 0.3 + 0.2 * sin(time * 2.0);
                    gl_FragColor = vec4(color, alpha);
                }
            `,
            transparent: true,
            blending: THREE.AdditiveBlending
        });

        const sunGlow = new THREE.Mesh(glowGeometry, glowMaterial);
        sunGlow.position.copy(this.sun.position);
        this.scene.add(sunGlow);
        this.sun.userData.glow = sunGlow;
    }

    createClouds() {
        for (let i = 0; i < this.cloudCount; i++) {
            const cloud = this.createSingleCloud();

            // Random positioning
            cloud.position.set(
                (Math.random() - 0.5) * 40,
                Math.random() * 8 - 2,
                (Math.random() - 0.5) * 30
            );

            // Random rotation
            cloud.rotation.y = Math.random() * Math.PI * 2;

            // Random scale
            const scale = 0.5 + Math.random() * 1.5;
            cloud.scale.setScalar(scale);

            // Random movement speed
            cloud.userData.speed = 0.01 + Math.random() * 0.02;
            cloud.userData.verticalSpeed = (Math.random() - 0.5) * 0.005;
            cloud.userData.rotationSpeed = (Math.random() - 0.5) * 0.01;

            this.clouds.push(cloud);
            this.scene.add(cloud);
        }
    }

    createSingleCloud() {
        const cloudGroup = new THREE.Group();

        // Create multiple spheres for cloud effect
        const sphereCount = 5 + Math.floor(Math.random() * 8);

        for (let i = 0; i < sphereCount; i++) {
            const geometry = new THREE.SphereGeometry(
                0.5 + Math.random() * 1.5,
                8,
                6
            );

            const material = new THREE.MeshBasicMaterial({
                color: 0xFFFFFF,
                transparent: true,
                opacity: 0.7 + Math.random() * 0.3
            });

            const sphere = new THREE.Mesh(geometry, material);

            // Position spheres to form cloud shape
            sphere.position.set(
                (Math.random() - 0.5) * 4,
                (Math.random() - 0.5) * 2,
                (Math.random() - 0.5) * 4
            );

            cloudGroup.add(sphere);
        }

        return cloudGroup;
    }

    createBirds() {
        for (let i = 0; i < this.birdCount; i++) {
            const bird = this.createSingleBird();

            // Random positioning
            bird.position.set(
                (Math.random() - 0.5) * 30,
                2 + Math.random() * 6,
                (Math.random() - 0.5) * 20
            );

            // Random flight path
            bird.userData.angle = Math.random() * Math.PI * 2;
            bird.userData.radius = 3 + Math.random() * 5;
            bird.userData.speed = 0.02 + Math.random() * 0.02;
            bird.userData.centerX = bird.position.x;
            bird.userData.centerZ = bird.position.z;

            this.birds.push(bird);
            this.scene.add(bird);
        }
    }

    createSingleBird() {
        const birdGroup = new THREE.Group();

        // Simple bird shape using small spheres
        const bodyGeometry = new THREE.SphereGeometry(0.1, 6, 4);
        const bodyMaterial = new THREE.MeshBasicMaterial({ color: 0x333333 });
        const body = new THREE.Mesh(bodyGeometry, bodyMaterial);

        const wingGeometry = new THREE.SphereGeometry(0.05, 4, 3);
        const wingMaterial = new THREE.MeshBasicMaterial({ color: 0x555555 });

        const leftWing = new THREE.Mesh(wingGeometry, wingMaterial);
        leftWing.position.set(-0.1, 0, 0);
        leftWing.scale.set(2, 0.5, 1);

        const rightWing = new THREE.Mesh(wingGeometry, wingMaterial);
        rightWing.position.set(0.1, 0, 0);
        rightWing.scale.set(2, 0.5, 1);

        birdGroup.add(body);
        birdGroup.add(leftWing);
        birdGroup.add(rightWing);

        birdGroup.userData.leftWing = leftWing;
        birdGroup.userData.rightWing = rightWing;

        return birdGroup;
    }

    createLightRays() {
        if (this.isReducedMotion) return;

        for (let i = 0; i < 6; i++) {
            const rayGeometry = new THREE.CylinderGeometry(0.02, 0.02, 15, 6);
            const rayMaterial = new THREE.MeshBasicMaterial({
                color: 0xFFE55C,
                transparent: true,
                opacity: 0.1
            });

            const ray = new THREE.Mesh(rayGeometry, rayMaterial);
            ray.position.copy(this.sun.position);
            ray.rotation.z = (i / 6) * Math.PI * 2;
            ray.userData.baseRotation = ray.rotation.z;

            this.lightRays.push(ray);
            this.scene.add(ray);
        }
    }

    animate() {
        if (!this.scene) return;

        this.animationFrame = cancelAnimationFrame(this.animationFrame) || requestAnimationFrame(() => this.animate());

        const elapsedTime = this.clock.getElapsedTime();

        // Update sky gradient
        if (this.skyGradient) {
            this.skyGradient.material.uniforms.time.value = elapsedTime;
        }

        // Update sun
        if (this.sun) {
            this.sun.material.uniforms.time.value = elapsedTime;
            this.sun.rotation.y += 0.01;

            // Gentle sun movement
            this.sun.position.y = 6 + Math.sin(elapsedTime * 0.5) * 0.5;

            if (this.sun.userData.glow) {
                this.sun.userData.glow.material.uniforms.time.value = elapsedTime;
                this.sun.userData.glow.position.copy(this.sun.position);
            }
        }

        // Update clouds
        this.clouds.forEach(cloud => {
            cloud.position.x += cloud.userData.speed;
            cloud.position.y += cloud.userData.verticalSpeed;
            cloud.rotation.y += cloud.userData.rotationSpeed;

            // Reset cloud position when it goes off screen
            if (cloud.position.x > 25) {
                cloud.position.x = -25;
            }
        });

        // Update birds
        this.birds.forEach(bird => {
            bird.userData.angle += bird.userData.speed;
            bird.position.x = bird.userData.centerX + Math.cos(bird.userData.angle) * bird.userData.radius;
            bird.position.z = bird.userData.centerZ + Math.sin(bird.userData.angle) * bird.userData.radius;
            bird.position.y += Math.sin(elapsedTime * 3 + bird.userData.angle) * 0.005;

            // Wing flapping animation
            const flapSpeed = 8;
            const flapAngle = Math.sin(elapsedTime * flapSpeed) * 0.5;
            bird.userData.leftWing.rotation.z = flapAngle;
            bird.userData.rightWing.rotation.z = -flapAngle;

            // Bird direction
            bird.lookAt(
                bird.userData.centerX + Math.cos(bird.userData.angle + 0.1) * bird.userData.radius,
                bird.position.y,
                bird.userData.centerZ + Math.sin(bird.userData.angle + 0.1) * bird.userData.radius
            );
        });

        // Update light rays
        this.lightRays.forEach((ray, index) => {
            ray.rotation.z = ray.userData.baseRotation + elapsedTime * 0.1;
            ray.material.opacity = 0.05 + 0.05 * Math.sin(elapsedTime * 2 + index);
        });

        this.renderer.render(this.scene, this.camera);
    }

    onWindowResize() {
        if (!this.camera || !this.renderer) return;

        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    setupThemeHandling() {
        // Update canvas background to sky blue
        document.documentElement.style.setProperty('--canvas-bg', 'linear-gradient(to bottom, #87CEEB 0%, #B0E0E6 100%)');

        // Apply sky theme to document
        document.body.style.backgroundColor = '#87CEEB';
        if (this.canvas) {
            this.canvas.style.background = 'linear-gradient(to bottom, #87CEEB 0%, #B0E0E6 100%)';
        }
    }

    initFallbackSkyAnimations() {
        // CSS fallback for sky animations
        if (!this.canvas) return;

        this.canvas.style.background = `
            linear-gradient(to bottom, #87CEEB 0%, #B0E0E6 100%)
        `;

        // Add floating cloud elements with CSS
        for (let i = 0; i < 5; i++) {
            const cloud = document.createElement('div');
            cloud.className = 'css-cloud';
            cloud.style.cssText = `
                position: absolute;
                width: ${60 + Math.random() * 40}px;
                height: ${30 + Math.random() * 20}px;
                background: rgba(255, 255, 255, 0.8);
                border-radius: 50px;
                top: ${20 + Math.random() * 40}%;
                left: ${Math.random() * 100}%;
                animation: cloudFloat ${15 + Math.random() * 10}s infinite linear;
                z-index: 1;
            `;

            // Add cloud animation if not exists
            if (!document.getElementById('cloud-animations')) {
                const style = document.createElement('style');
                style.id = 'cloud-animations';
                style.textContent = `
                    @keyframes cloudFloat {
                        from { transform: translateX(-100px); }
                        to { transform: translateX(calc(100vw + 100px)); }
                    }
                `;
                document.head.appendChild(style);
            }

            this.canvas.parentElement.appendChild(cloud);

            // Remove cloud after animation
            setTimeout(() => {
                if (cloud.parentElement) {
                    cloud.parentElement.removeChild(cloud);
                }
            }, (15 + Math.random() * 10) * 1000);
        }
    }

    destroy() {
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
        }

        if (this.renderer) {
            this.renderer.dispose();
        }

        // Clean up CSS clouds
        document.querySelectorAll('.css-cloud').forEach(cloud => {
            if (cloud.parentElement) {
                cloud.parentElement.removeChild(cloud);
            }
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.backgroundAnimator = new BackgroundAnimator();
});

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    if (window.backgroundAnimator) {
        if (document.hidden) {
            window.backgroundAnimator.destroy();
        } else {
            window.backgroundAnimator = new BackgroundAnimator();
        }
    }
});
