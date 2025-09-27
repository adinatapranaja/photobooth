/**
 * Photo Booth Pro JavaScript
 * Enhanced with smooth animations, transitions, and modern interactions
 */

class PhotoBooth {
    constructor() {
        this.video = document.getElementById('video');
        this.captureCanvas = document.getElementById('captureCanvas');
        this.finalCanvas = document.getElementById('finalCanvas');
        this.captureCtx = this.captureCanvas.getContext('2d');
        this.finalCtx = this.finalCanvas.getContext('2d');

        this.photoCount = 1;
        this.currentPhotoIndex = 0;
        this.capturedPhotos = [];
        this.selectedLayout = '1x1';
        this.selectedFrame = 'none';
        this.isSessionActive = false;

        // Enhanced animation settings
        this.isAnimating = false;
        this.transitionDuration = 500; // ms

        // Base64 beep sound for countdown
        this.beepSound = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmEaCTiS2PLvdjEFZNDg2YdACA==');

        this.init();
    }

    async init() {
        await this.initCamera();
        this.setupEventListeners();
        this.setupFrameImages();
    }

    /**
     * Initialize webcam stream
     */
    async initCamera() {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: {
                    width: { ideal: 640 },
                    height: { ideal: 480 }
                }
            });
            this.video.srcObject = stream;

            this.video.addEventListener('loadedmetadata', () => {
                this.captureCanvas.width = this.video.videoWidth;
                this.captureCanvas.height = this.video.videoHeight;
            });
        } catch (error) {
            console.error('Error accessing camera:', error);
            alert('Could not access camera. Please ensure camera permissions are granted.');
        }
    }

    /**
     * Setup all event listeners for UI interactions
     */
    setupEventListeners() {
        // Photo count selection
        document.querySelectorAll('.count-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.count-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.photoCount = parseInt(e.target.dataset.count);
            });
        });

        // Start photo session
        document.getElementById('startSession').addEventListener('click', () => {
            this.startPhotoSession();
        });

        // Manual snap photo
        document.getElementById('snapPhoto').addEventListener('click', () => {
            this.capturePhoto();
        });

        // Layout selection
        document.querySelectorAll('.layout-option').forEach(option => {
            option.addEventListener('click', (e) => {
                document.querySelectorAll('.layout-option').forEach(o => o.classList.remove('active'));
                e.currentTarget.classList.add('active');
                this.selectedLayout = e.currentTarget.dataset.layout;
            });
        });

        // Frame selection
        document.querySelectorAll('.frame-option').forEach(option => {
            option.addEventListener('click', (e) => {
                document.querySelectorAll('.frame-option').forEach(o => o.classList.remove('active'));
                e.currentTarget.classList.add('active');
                this.selectedFrame = e.currentTarget.dataset.frame;
            });
        });

        // Generate collage with loading animation
        document.getElementById('generateCollage').addEventListener('click', () => {
            this.generateCollageWithLoading();
        });

        // Final screen controls
        document.getElementById('downloadPhoto').addEventListener('click', () => {
            this.downloadPhoto();
        });

        document.getElementById('saveToServer').addEventListener('click', () => {
            this.saveToServer();
        });

        document.getElementById('printPhoto').addEventListener('click', () => {
            this.printPhoto();
        });

        document.getElementById('startOver').addEventListener('click', () => {
            this.startOver();
        });
    }

    /**
     * Setup frame images (CSS-based frames for demo)
     */
    setupFrameImages() {
        // Frame images will be CSS-based for this demo
        // In production, you would load actual PNG files from frames/ folder
        this.frameStyles = {
            'frame1': 'border: 8px solid #8B4513; border-radius: 10px;',
            'frame2': 'border: 8px solid #FF69B4; border-radius: 50px;',
            'frame3': 'border: 8px solid #FFD700; border-radius: 20px;',
            'frame4': 'border: 8px solid #98FB98; border-radius: 30px;',
            'frame5': 'border: 8px solid #FF4500; border-radius: 15px;',
            'frame6': 'border: 8px solid #8A2BE2; border-radius: 25px;'
        };
    }

    /**
     * Start the photo capture session with countdown
     */
    startPhotoSession() {
        this.isSessionActive = true;
        this.currentPhotoIndex = 0;
        this.capturedPhotos = [];

        document.getElementById('startSession').style.display = 'none';
        document.getElementById('snapPhoto').classList.remove('hidden');

        this.startCountdown();
    }

    /**
     * Enhanced countdown with smooth animations and color changes
     */
    startCountdown() {
        const countdownElement = document.getElementById('countdown');
        const countdownNumber = countdownElement.querySelector('.countdown-number');
        const countdownText = countdownElement.querySelector('.countdown-text');

        countdownElement.classList.remove('hidden');

        let count = 3;
        const colors = ['#ff6b6b', '#ffd93d', '#4ecdc4', '#45b7d1'];

        countdownNumber.textContent = count;
        countdownText.textContent = 'Get Ready!';

        // Animate countdown appearance
        countdownElement.style.opacity = '0';
        countdownElement.style.transform = 'translate(-50%, -50%) scale(0.5)';

        requestAnimationFrame(() => {
            countdownElement.style.transition = 'all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
            countdownElement.style.opacity = '1';
            countdownElement.style.transform = 'translate(-50%, -50%) scale(1)';
        });

        const countdownTimer = setInterval(() => {
            // Play beep sound
            this.beepSound.currentTime = 0;
            this.beepSound.play().catch(() => {}); // Ignore audio errors

            // Animate number change
            const circle = countdownElement.querySelector('.countdown-circle');
            circle.style.background = `linear-gradient(135deg, ${colors[count - 1]}, ${colors[count]})`;

            // Scale animation for number change
            countdownNumber.style.transform = 'scale(0.5)';
            setTimeout(() => {
                count--;
                if (count > 0) {
                    countdownNumber.textContent = count;
                    countdownNumber.style.transform = 'scale(1)';
                } else {
                    clearInterval(countdownTimer);
                    countdownNumber.textContent = '📸';
                    countdownText.textContent = 'SMILE!';
                    countdownNumber.style.transform = 'scale(1)';

                    // Flash effect
                    circle.style.background = 'linear-gradient(135deg, #fff, #f0f0f0)';
                    circle.style.boxShadow = '0 0 100px rgba(255, 255, 255, 0.9)';

                    setTimeout(() => {
                        this.capturePhoto();
                        this.hideCountdown();
                    }, 800);
                }
            }, 100);
        }, 1000);
    }

    /**
     * Hide countdown with smooth animation
     */
    hideCountdown() {
        const countdownElement = document.getElementById('countdown');
        countdownElement.style.transition = 'all 0.3s ease-out';
        countdownElement.style.opacity = '0';
        countdownElement.style.transform = 'translate(-50%, -50%) scale(0.8)';

        setTimeout(() => {
            countdownElement.classList.add('hidden');
            countdownElement.style.transform = 'translate(-50%, -50%) scale(1)';
        }, 300);
    }

    /**
     * Capture a photo from the video stream
     */
    capturePhoto() {
        // Draw current video frame to capture canvas
        this.captureCtx.drawImage(this.video, 0, 0, this.captureCanvas.width, this.captureCanvas.height);

        // Store the captured image as data URL
        const photoDataUrl = this.captureCanvas.toDataURL('image/jpeg', 0.9);
        this.capturedPhotos.push(photoDataUrl);

        this.currentPhotoIndex++;

        // Check if we need more photos
        if (this.currentPhotoIndex < this.photoCount) {
            setTimeout(() => {
                this.startCountdown();
            }, 1000);
        } else {
            // All photos captured, proceed to template selection
            this.showTemplateScreen();
        }
    }

    /**
     * Smooth transition to template selection screen
     */
    showTemplateScreen() {
        if (this.isAnimating) return;
        this.isAnimating = true;

        const setupScreen = document.getElementById('setupScreen');
        const templateScreen = document.getElementById('templateScreen');

        // Slide out current screen
        setupScreen.style.transform = 'translateX(-100%)';
        setupScreen.style.opacity = '0';

        setTimeout(() => {
            setupScreen.classList.remove('active');
            templateScreen.classList.add('active');

            // Slide in new screen
            templateScreen.style.transform = 'translateX(100%)';
            templateScreen.style.opacity = '0';

            requestAnimationFrame(() => {
                templateScreen.style.transition = 'all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                templateScreen.style.transform = 'translateX(0)';
                templateScreen.style.opacity = '1';

                setTimeout(() => {
                    this.isAnimating = false;
                    templateScreen.style.transition = '';
                    this.animateTemplateOptions();
                }, 500);
            });

            // Auto-select appropriate layout based on photo count
            const layoutMap = {
                1: '1x1',
                2: '2x1',
                3: 'strip',
                4: '2x2'
            };

            this.selectedLayout = layoutMap[this.photoCount] || '1x1';

            // Update layout selection UI with animation delay
            setTimeout(() => {
                document.querySelectorAll('.layout-option').forEach(option => {
                    option.classList.remove('active');
                    if (option.dataset.layout === this.selectedLayout) {
                        option.classList.add('active');
                    }
                });
            }, 200);
        }, this.transitionDuration);
    }

    /**
     * Animate template options appearance
     */
    animateTemplateOptions() {
        const layoutOptions = document.querySelectorAll('.layout-option');
        const frameOptions = document.querySelectorAll('.frame-option');

        // Stagger animation for layout options
        layoutOptions.forEach((option, index) => {
            option.style.opacity = '0';
            option.style.transform = 'translateY(30px)';

            setTimeout(() => {
                option.style.transition = 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                option.style.opacity = '1';
                option.style.transform = 'translateY(0)';
            }, index * 100);
        });

        // Stagger animation for frame options
        frameOptions.forEach((option, index) => {
            option.style.opacity = '0';
            option.style.transform = 'translateY(30px)';

            setTimeout(() => {
                option.style.transition = 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                option.style.opacity = '1';
                option.style.transform = 'translateY(0)';
            }, 500 + index * 80);
        });
    }

    /**
     * Generate collage with loading animation
     */
    generateCollageWithLoading() {
        if (this.isAnimating) return;

        const generateBtn = document.getElementById('generateCollage');
        const loadingSpinner = document.getElementById('loadingSpinner');

        // Show loading spinner
        generateBtn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            generateBtn.style.display = 'none';
            loadingSpinner.classList.remove('hidden');

            // Animate spinner appearance
            loadingSpinner.style.opacity = '0';
            loadingSpinner.style.transform = 'translateY(20px)';

            requestAnimationFrame(() => {
                loadingSpinner.style.transition = 'all 0.4s ease-out';
                loadingSpinner.style.opacity = '1';
                loadingSpinner.style.transform = 'translateY(0)';
            });

            // Generate collage after short delay for smooth UX
            setTimeout(() => {
                this.generateCollage();
            }, 1000);
        }, 200);
    }

    /**
     * Generate the final collage based on selected layout and frames
     */
    generateCollage() {
        const layouts = {
            '1x1': { width: 400, height: 400, positions: [{x: 0, y: 0, w: 400, h: 400}] },
            '2x1': { width: 800, height: 400, positions: [{x: 0, y: 0, w: 400, h: 400}, {x: 400, y: 0, w: 400, h: 400}] },
            '2x2': { width: 800, height: 800, positions: [{x: 0, y: 0, w: 400, h: 400}, {x: 400, y: 0, w: 400, h: 400}, {x: 0, y: 400, w: 400, h: 400}, {x: 400, y: 400, w: 400, h: 400}] },
            'strip': { width: 400, height: 1200, positions: [{x: 0, y: 0, w: 400, h: 400}, {x: 0, y: 400, w: 400, h: 400}, {x: 0, y: 800, w: 400, h: 400}] }
        };

        const layout = layouts[this.selectedLayout];
        this.finalCanvas.width = layout.width;
        this.finalCanvas.height = layout.height;

        // Clear canvas with white background
        this.finalCtx.fillStyle = '#ffffff';
        this.finalCtx.fillRect(0, 0, layout.width, layout.height);

        // Draw each photo in its position
        this.capturedPhotos.forEach((photoDataUrl, index) => {
            if (index < layout.positions.length) {
                const img = new Image();
                img.onload = () => {
                    const pos = layout.positions[index];
                    this.finalCtx.drawImage(img, pos.x, pos.y, pos.w, pos.h);

                    // Apply frame if selected
                    if (this.selectedFrame !== 'none') {
                        this.applyFrame(pos.x, pos.y, pos.w, pos.h);
                    }

                    // If this is the last photo, show preview screen with delay
                    if (index === this.capturedPhotos.length - 1) {
                        setTimeout(() => {
                            this.showPreviewScreen();
                        }, 500);
                    }
                };
                img.src = photoDataUrl;
            }
        });
    }

    /**
     * Apply frame overlay to a photo position
     */
    applyFrame(x, y, w, h) {
        // Simple frame implementation using canvas drawing
        // In production, you would load and draw actual PNG frame images

        this.finalCtx.strokeStyle = this.getFrameColor();
        this.finalCtx.lineWidth = 12;
        this.finalCtx.strokeRect(x + 6, y + 6, w - 12, h - 12);

        // Add decorative elements based on frame type
        if (this.selectedFrame === 'frame2') { // Hearts
            this.drawHearts(x, y, w, h);
        } else if (this.selectedFrame === 'frame3') { // Stars
            this.drawStars(x, y, w, h);
        }
    }

    /**
     * Get frame color based on selected frame
     */
    getFrameColor() {
        const colors = {
            'frame1': '#8B4513',
            'frame2': '#FF69B4',
            'frame3': '#FFD700',
            'frame4': '#98FB98',
            'frame5': '#FF4500',
            'frame6': '#8A2BE2'
        };
        return colors[this.selectedFrame] || '#000000';
    }

    /**
     * Draw heart decorations for heart frame
     */
    drawHearts(x, y, w, h) {
        this.finalCtx.fillStyle = '#FF69B4';
        // Simple heart shapes at corners
        const heartSize = 20;
        this.finalCtx.fillRect(x + 10, y + 10, heartSize, heartSize);
        this.finalCtx.fillRect(x + w - 30, y + 10, heartSize, heartSize);
        this.finalCtx.fillRect(x + 10, y + h - 30, heartSize, heartSize);
        this.finalCtx.fillRect(x + w - 30, y + h - 30, heartSize, heartSize);
    }

    /**
     * Draw star decorations for star frame
     */
    drawStars(x, y, w, h) {
        this.finalCtx.fillStyle = '#FFD700';
        // Simple star shapes at corners
        const starSize = 15;
        this.finalCtx.fillRect(x + 15, y + 15, starSize, starSize);
        this.finalCtx.fillRect(x + w - 30, y + 15, starSize, starSize);
        this.finalCtx.fillRect(x + 15, y + h - 30, starSize, starSize);
        this.finalCtx.fillRect(x + w - 30, y + h - 30, starSize, starSize);
    }

    /**
     * Smooth transition to final preview screen
     */
    showPreviewScreen() {
        if (this.isAnimating) return;
        this.isAnimating = true;

        const templateScreen = document.getElementById('templateScreen');
        const previewScreen = document.getElementById('previewScreen');

        // Slide out current screen
        templateScreen.style.transform = 'translateX(-100%)';
        templateScreen.style.opacity = '0';

        setTimeout(() => {
            templateScreen.classList.remove('active');
            previewScreen.classList.add('active');

            // Slide in new screen
            previewScreen.style.transform = 'translateX(100%)';
            previewScreen.style.opacity = '0';

            requestAnimationFrame(() => {
                previewScreen.style.transition = 'all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                previewScreen.style.transform = 'translateX(0)';
                previewScreen.style.opacity = '1';

                setTimeout(() => {
                    this.isAnimating = false;
                    previewScreen.style.transition = '';
                    this.animatePreviewElements();
                    this.updatePhotoDate();
                }, 500);
            });
        }, this.transitionDuration);
    }

    /**
     * Animate preview screen elements
     */
    animatePreviewElements() {
        const polaroidFrame = document.querySelector('.polaroid-frame');
        const controlGroups = document.querySelectorAll('.control-group');

        // Animate polaroid frame
        polaroidFrame.style.opacity = '0';
        polaroidFrame.style.transform = 'scale(0.8) rotate(-5deg)';

        setTimeout(() => {
            polaroidFrame.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            polaroidFrame.style.opacity = '1';
            polaroidFrame.style.transform = 'scale(1) rotate(-1deg)';
        }, 200);

        // Animate control buttons
        controlGroups.forEach((group, index) => {
            const buttons = group.querySelectorAll('.btn');
            buttons.forEach((btn, btnIndex) => {
                btn.style.opacity = '0';
                btn.style.transform = 'translateY(30px)';

                setTimeout(() => {
                    btn.style.transition = 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                    btn.style.opacity = '1';
                    btn.style.transform = 'translateY(0)';
                }, 800 + (index * 200) + (btnIndex * 100));
            });
        });
    }

    /**
     * Update photo date in polaroid caption
     */
    updatePhotoDate() {
        const photoDate = document.getElementById('photoDate');
        const now = new Date();
        const dateString = now.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
        photoDate.textContent = dateString;
    }

    /**
     * Download the final collage
     */
    downloadPhoto() {
        const link = document.createElement('a');
        link.download = `photobooth_${Date.now()}.jpg`;
        link.href = this.finalCanvas.toDataURL('image/jpeg', 0.95);
        link.click();
    }

    /**
     * Save photo to server
     */
    async saveToServer() {
        const saveStatus = document.getElementById('saveStatus');
        saveStatus.textContent = 'Saving...';
        saveStatus.className = 'save-status';

        try {
            const imageData = this.finalCanvas.toDataURL('image/jpeg', 0.95);

            const formData = new FormData();
            formData.append('image', imageData);

            const response = await fetch('save.php', {
                method: 'POST',
                body: formData
            });

            const result = await response.json();

            if (result.success) {
                saveStatus.textContent = `Saved! View at: ${window.location.origin}/${result.url}`;
                saveStatus.className = 'save-status success';
            } else {
                saveStatus.textContent = 'Save failed: ' + result.error;
                saveStatus.className = 'save-status error';
            }
        } catch (error) {
            saveStatus.textContent = 'Save failed: ' + error.message;
            saveStatus.className = 'save-status error';
        }
    }

    /**
     * Print the photo
     */
    printPhoto() {
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <html>
                <head><title>Photo Booth Print</title></head>
                <body style="margin: 0; text-align: center;">
                    <img src="${this.finalCanvas.toDataURL('image/jpeg', 0.95)}" style="max-width: 100%; height: auto;">
                </body>
            </html>
        `);
        printWindow.document.close();
        printWindow.print();
    }

    /**
     * Start over with smooth transition - reset everything
     */
    startOver() {
        if (this.isAnimating) return;
        this.isAnimating = true;

        const previewScreen = document.getElementById('previewScreen');
        const setupScreen = document.getElementById('setupScreen');

        // Animate transition back to start
        previewScreen.style.transform = 'translateX(-100%)';
        previewScreen.style.opacity = '0';

        setTimeout(() => {
            // Reset all variables
            this.photoCount = 1;
            this.currentPhotoIndex = 0;
            this.capturedPhotos = [];
            this.selectedLayout = '1x1';
            this.selectedFrame = 'none';
            this.isSessionActive = false;

            // Reset screens
            document.querySelectorAll('.screen').forEach(screen => {
                screen.classList.remove('active');
                screen.style.transform = '';
                screen.style.opacity = '';
                screen.style.transition = '';
            });

            setupScreen.classList.add('active');

            // Slide in setup screen
            setupScreen.style.transform = 'translateX(100%)';
            setupScreen.style.opacity = '0';

            requestAnimationFrame(() => {
                setupScreen.style.transition = 'all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                setupScreen.style.transform = 'translateX(0)';
                setupScreen.style.opacity = '1';

                setTimeout(() => {
                    this.isAnimating = false;
                    setupScreen.style.transition = '';
                    this.resetUIElements();
                }, 500);
            });
        }, this.transitionDuration);
    }

    /**
     * Reset UI elements to default state
     */
    resetUIElements() {
        // Reset buttons
        document.getElementById('startSession').style.display = 'block';
        document.getElementById('snapPhoto').classList.add('hidden');
        document.getElementById('countdown').classList.add('hidden');

        // Reset loading spinner
        const generateBtn = document.getElementById('generateCollage');
        const loadingSpinner = document.getElementById('loadingSpinner');
        generateBtn.style.display = 'block';
        generateBtn.style.transform = '';
        loadingSpinner.classList.add('hidden');

        // Reset selections with animation
        const resetSelections = [
            { selector: '.count-btn', activeValue: '1', dataAttr: 'count' },
            { selector: '.layout-option', activeValue: '1x1', dataAttr: 'layout' },
            { selector: '.frame-option', activeValue: 'none', dataAttr: 'frame' }
        ];

        resetSelections.forEach(({ selector, activeValue, dataAttr }, groupIndex) => {
            document.querySelectorAll(selector).forEach((element, index) => {
                element.classList.remove('active');
                element.style.opacity = '0';
                element.style.transform = 'translateY(20px)';

                setTimeout(() => {
                    if (element.dataset[dataAttr] === activeValue) {
                        element.classList.add('active');
                    }

                    element.style.transition = 'all 0.3s ease-out';
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';

                    // Clear transitions after animation
                    setTimeout(() => {
                        element.style.transition = '';
                    }, 300);
                }, (groupIndex * 200) + (index * 50));
            });
        });

        // Clear save status
        document.getElementById('saveStatus').className = 'save-status glass-card hidden';
    }
}

// Initialize the photo booth when page loads
document.addEventListener('DOMContentLoaded', () => {
    new PhotoBooth();
});