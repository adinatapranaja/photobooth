<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Photo Booth Pro</title>
    <!-- Favicon -->
    <link rel="icon" type="image/x-icon" href="/favicon.ico">
    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <!-- Styles -->
    <link rel="stylesheet" href="styles.css">
</head>
<body data-theme="light">
    <!-- 3D Background Canvas -->
    <canvas id="backgroundCanvas" class="background-canvas"></canvas>

    <!-- Background Animation Controls -->
    <div class="bg-controls">
        <button id="particlesBtn" class="bg-btn active" data-animation="particles" title="Floating Particles">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="3"/><circle cx="12" cy="3" r="1"/><circle cx="21" cy="12" r="1"/>
                <circle cx="12" cy="21" r="1"/><circle cx="3" cy="12" r="1"/>
            </svg>
        </button>
        <button id="wavesBtn" class="bg-btn" data-animation="waves" title="Gradient Waves">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M2 12c2-4 4-4 6 0s4 4 6 0 4-4 6 0"/>
                <path d="M2 18c2-4 4-4 6 0s4 4 6 0 4-4 6 0"/>
            </svg>
        </button>
        <button id="cubesBtn" class="bg-btn" data-animation="cubes" title="Rotating Cubes">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="3" width="6" height="6"/><rect x="15" y="15" width="6" height="6"/>
                <rect x="9" y="9" width="6" height="6"/>
            </svg>
        </button>
    </div>

    <!-- Dark Mode Toggle -->
    <div class="theme-toggle">
        <button id="themeToggle" class="theme-btn" title="Toggle Dark Mode">
            <svg class="sun-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="5"/>
                <line x1="12" y1="1" x2="12" y2="3"/>
                <line x1="12" y1="21" x2="12" y2="23"/>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                <line x1="1" y1="12" x2="3" y2="12"/>
                <line x1="21" y1="12" x2="23" y2="12"/>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
            </svg>
            <svg class="moon-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
            </svg>
        </button>
    </div>

    <div class="container">
        <!-- Header -->
        <header class="header">
            <div class="header-content">
                <div class="logo">
                    <svg class="logo-icon" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                        <circle cx="12" cy="13" r="4"/>
                        <path d="m9 13 2 2 4-4"/>
                    </svg>
                    <span class="logo-text">Photo Booth Pro</span>
                </div>
                <p class="subtitle">Professional photo experiences with modern technology</p>

                <!-- Feature highlights -->
                <div class="feature-badges">
                    <div class="badge">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                        </svg>
                        3D Animations
                    </div>
                    <div class="badge">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                            <circle cx="8.5" cy="8.5" r="1.5"/>
                            <polyline points="21,15 16,10 5,21"/>
                        </svg>
                        HD Quality
                    </div>
                    <div class="badge">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                            <path d="M2 17l10 5 10-5"/>
                            <path d="M2 12l10 5 10-5"/>
                        </svg>
                        Multiple Layouts
                    </div>
                    <div class="badge">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                            <line x1="8" y1="21" x2="16" y2="21"/>
                            <line x1="12" y1="17" x2="12" y2="21"/>
                        </svg>
                        Mobile Ready
                    </div>
                </div>
            </div>
        </header>

        <!-- Camera Setup Screen -->
        <div id="setupScreen" class="screen active">
            <!-- Welcome Section -->
            <div class="welcome-section">
                <div class="welcome-card glass-card">
                    <div class="welcome-header">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M9 12l2 2 4-4"/>
                            <path d="M21 12c-1 0-3-1-3-3s2-3 3-3 3 1 3 3-2 3-3 3"/>
                            <path d="M3 12c1 0 3-1 3-3s-2-3-3-3-3 1-3 3 2 3 3 3"/>
                        </svg>
                        <h2>Welcome to Photo Booth Pro</h2>
                    </div>
                    <div class="welcome-content">
                        <div class="instruction-steps">
                            <div class="step">
                                <div class="step-icon">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <circle cx="12" cy="12" r="3"/>
                                        <path d="M12 1v6M12 17v6M4.22 4.22l4.24 4.24M15.54 15.54l4.24 4.24M1 12h6M17 12h6M4.22 19.78l4.24-4.24M15.54 8.46l4.24-4.24"/>
                                    </svg>
                                </div>
                                <div class="step-content">
                                    <h3>1. Setup</h3>
                                    <p>Allow camera access and choose photo count</p>
                                </div>
                            </div>
                            <div class="step">
                                <div class="step-icon">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                                        <circle cx="12" cy="13" r="4"/>
                                    </svg>
                                </div>
                                <div class="step-content">
                                    <h3>2. Capture</h3>
                                    <p>Take amazing photos with countdown timer</p>
                                </div>
                            </div>
                            <div class="step">
                                <div class="step-icon">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <rect x="3" y="3" width="7" height="7"/>
                                        <rect x="14" y="3" width="7" height="7"/>
                                        <rect x="14" y="14" width="7" height="7"/>
                                        <rect x="3" y="14" width="7" height="7"/>
                                    </svg>
                                </div>
                                <div class="step-content">
                                    <h3>3. Customize</h3>
                                    <p>Choose layouts and apply fun frames</p>
                                </div>
                            </div>
                            <div class="step">
                                <div class="step-icon">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                                        <polyline points="7,10 12,15 17,10"/>
                                        <line x1="12" y1="15" x2="12" y2="3"/>
                                    </svg>
                                </div>
                                <div class="step-content">
                                    <h3>4. Share</h3>
                                    <p>Download, save, or print your creation</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="camera-container">
                <div class="video-wrapper">
                    <video id="video" autoplay muted></video>
                    <div class="video-overlay"></div>
                    <div class="camera-status">
                        <svg class="camera-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                            <circle cx="12" cy="13" r="4"/>
                        </svg>
                        <span class="status-text">Camera Ready</span>
                    </div>
                </div>
                <div id="countdown" class="countdown hidden">
                    <div class="countdown-circle">
                        <span class="countdown-number">3</span>
                    </div>
                    <div class="countdown-text">Get Ready!</div>
                </div>
            </div>

            <div class="controls">
                <div class="control-card">
                    <div class="photo-count-selector">
                        <label class="control-label">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                                <circle cx="8.5" cy="8.5" r="1.5"/>
                                <polyline points="21,15 16,10 5,21"/>
                            </svg>
                            Number of photos:
                        </label>
                        <div class="count-buttons">
                            <button class="count-btn glass-card active" data-count="1">
                                <span class="count-number">1</span>
                                <span class="count-label">Single</span>
                            </button>
                            <button class="count-btn glass-card" data-count="2">
                                <span class="count-number">2</span>
                                <span class="count-label">Duo</span>
                            </button>
                            <button class="count-btn glass-card" data-count="3">
                                <span class="count-number">3</span>
                                <span class="count-label">Triple</span>
                            </button>
                            <button class="count-btn glass-card" data-count="4">
                                <span class="count-number">4</span>
                                <span class="count-label">Quad</span>
                            </button>
                        </div>
                    </div>
                </div>

                <div class="action-buttons">
                    <button id="startSession" class="btn btn-primary btn-glow">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polygon points="5,3 19,12 5,21"/>
                        </svg>
                        Start Photo Session
                    </button>
                    <button id="snapPhoto" class="btn btn-secondary btn-glow hidden">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="12" cy="12" r="10"/>
                            <circle cx="12" cy="12" r="3"/>
                        </svg>
                        Capture Photo
                    </button>
                </div>
            </div>
        </div>

        <!-- Template Selection Screen -->
        <div id="templateScreen" class="screen">
            <div class="screen-header">
                <h2 class="screen-title">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <rect x="3" y="3" width="7" height="7"/>
                        <rect x="14" y="3" width="7" height="7"/>
                        <rect x="14" y="14" width="7" height="7"/>
                        <rect x="3" y="14" width="7" height="7"/>
                    </svg>
                    Choose Your Style
                </h2>
                <p class="screen-subtitle">Select layout and frame to make it perfect</p>
            </div>

            <div class="selection-container">
                <div class="layout-selection">
                    <h3 class="section-title">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                            <line x1="9" y1="9" x2="15" y2="15"/>
                            <line x1="15" y1="9" x2="9" y2="15"/>
                        </svg>
                        Layout Options
                    </h3>
                    <div class="layout-grid">
                        <div class="layout-option glass-card active" data-layout="1x1">
                            <div class="layout-preview grid-1x1">
                                <div class="photo-slot"></div>
                            </div>
                            <div class="layout-info">
                                <span class="layout-name">Single</span>
                                <span class="layout-desc">Classic portrait</span>
                            </div>
                        </div>
                        <div class="layout-option glass-card" data-layout="2x1">
                            <div class="layout-preview grid-2x1">
                                <div class="photo-slot"></div>
                                <div class="photo-slot"></div>
                            </div>
                            <div class="layout-info">
                                <span class="layout-name">Side by Side</span>
                                <span class="layout-desc">Perfect pair</span>
                            </div>
                        </div>
                        <div class="layout-option glass-card" data-layout="2x2">
                            <div class="layout-preview grid-2x2">
                                <div class="photo-slot"></div>
                                <div class="photo-slot"></div>
                                <div class="photo-slot"></div>
                                <div class="photo-slot"></div>
                            </div>
                            <div class="layout-info">
                                <span class="layout-name">Quad Grid</span>
                                <span class="layout-desc">Story sequence</span>
                            </div>
                        </div>
                        <div class="layout-option glass-card" data-layout="strip">
                            <div class="layout-preview grid-strip">
                                <div class="photo-slot"></div>
                                <div class="photo-slot"></div>
                                <div class="photo-slot"></div>
                            </div>
                            <div class="layout-info">
                                <span class="layout-name">Photo Strip</span>
                                <span class="layout-desc">Classic booth style</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="frame-selection">
                    <h3 class="section-title">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"/>
                            <line x1="7" y1="2" x2="7" y2="22"/>
                            <line x1="17" y1="2" x2="17" y2="22"/>
                            <line x1="2" y1="12" x2="22" y2="12"/>
                            <line x1="2" y1="7" x2="7" y2="7"/>
                            <line x1="2" y1="17" x2="7" y2="17"/>
                            <line x1="17" y1="17" x2="22" y2="17"/>
                            <line x1="17" y1="7" x2="22" y2="7"/>
                        </svg>
                        Frame Collection
                    </h3>
                    <div class="frame-grid">
                        <div class="frame-option glass-card active" data-frame="none">
                            <div class="frame-preview no-frame">
                                <svg class="frame-icon" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                                    <circle cx="8.5" cy="8.5" r="1.5"/>
                                    <polyline points="21,15 16,10 5,21"/>
                                </svg>
                            </div>
                            <div class="frame-info">
                                <span class="frame-name">Clean</span>
                                <span class="frame-desc">No frame</span>
                            </div>
                        </div>
                        <div class="frame-option glass-card" data-frame="frame1">
                            <div class="frame-preview frame1">
                                <svg class="frame-icon" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <rect x="2" y="2" width="20" height="20" rx="2" ry="2"/>
                                    <path d="M16 8l-8 8M8 8l8 8"/>
                                </svg>
                            </div>
                            <div class="frame-info">
                                <span class="frame-name">Rainbow</span>
                                <span class="frame-desc">Colorful gradient border</span>
                            </div>
                        </div>
                        <div class="frame-option glass-card" data-frame="frame2">
                            <div class="frame-preview frame2">
                                <svg class="frame-icon" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                                </svg>
                            </div>
                            <div class="frame-info">
                                <span class="frame-name">Dreamscape</span>
                                <span class="frame-desc">Purple pink gradient</span>
                            </div>
                        </div>
                        <div class="frame-option glass-card" data-frame="frame3">
                            <div class="frame-preview frame3">
                                <svg class="frame-icon" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                                </svg>
                            </div>
                            <div class="frame-info">
                                <span class="frame-name">Golden</span>
                                <span class="frame-desc">Gold & navy stripes</span>
                            </div>
                        </div>
                        <div class="frame-option glass-card" data-frame="frame4">
                            <div class="frame-preview frame4">
                                <svg class="frame-icon" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M12 2a3 3 0 0 0-3 3c0 1.5-1.5 3-3 3s-3 1.5-3 3 1.5 3 3 3c1.5 0 3 1.5 3 3s1.5 3 3 3 3-1.5 3-3c0-1.5 1.5-3 3-3s3-1.5 3-3-1.5-3-3-3c-1.5 0-3-1.5-3-3a3 3 0 0 0-3-3"/>
                                </svg>
                            </div>
                            <div class="frame-info">
                                <span class="frame-name">Nature</span>
                                <span class="frame-desc">Fresh green & yellow</span>
                            </div>
                        </div>
                        <div class="frame-option glass-card" data-frame="frame5">
                            <div class="frame-preview frame5">
                                <svg class="frame-icon" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M5.8 11.3L2 22l10.7-3.79"/>
                                    <path d="L10.06 2.93 2 22l10.7-3.79"/>
                                    <path d="M15.8 8.5a2.5 2.5 0 1 1 0 5"/>
                                    <path d="M19.5 12.5a2.5 2.5 0 1 1-5 0"/>
                                </svg>
                            </div>
                            <div class="frame-info">
                                <span class="frame-name">Sweet</span>
                                <span class="frame-desc">Pink cotton candy</span>
                            </div>
                        </div>
                        <div class="frame-option glass-card" data-frame="frame6">
                            <div class="frame-preview frame6">
                                <svg class="frame-icon" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                                </svg>
                            </div>
                            <div class="frame-info">
                                <span class="frame-name">Aqua Dream</span>
                                <span class="frame-desc">Teal & pink blend</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="generate-section">
                <button id="generateCollage" class="btn btn-primary btn-glow btn-large">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="16,18 22,12 16,6"/>
                        <path d="M8,6 L22,6"/>
                    </svg>
                    Create Your Masterpiece
                </button>
                <div id="loadingSpinner" class="loading-spinner hidden">
                    <div class="spinner-3d">
                        <div class="cube">
                            <div class="face front"></div>
                            <div class="face back"></div>
                            <div class="face right"></div>
                            <div class="face left"></div>
                            <div class="face top"></div>
                            <div class="face bottom"></div>
                        </div>
                    </div>
                    <p class="loading-text">Creating your collage...</p>
                </div>
            </div>
        </div>

        <!-- Final Preview Screen -->
        <div id="previewScreen" class="screen">
            <div class="screen-header">
                <h2 class="screen-title">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"/>
                        <circle cx="8" cy="8" r="2"/>
                        <path d="m9 9 C17,21 19,19 21,7"/>
                    </svg>
                    Your Masterpiece
                </h2>
                <p class="screen-subtitle">Perfect! Ready to share your creation</p>
            </div>

            <div class="final-preview">
                <div class="polaroid-frame">
                    <div class="polaroid-image">
                        <canvas id="finalCanvas"></canvas>
                    </div>
                    <div class="polaroid-caption">
                        <span id="photoDate"></span>
                        <span class="polaroid-brand">Photo Booth Pro ✨</span>
                    </div>
                </div>
            </div>

            <div class="final-controls">
                <div class="control-group">
                    <button id="downloadPhoto" class="btn btn-success btn-glow">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                            <polyline points="7,10 12,15 17,10"/>
                            <line x1="12" y1="15" x2="12" y2="3"/>
                        </svg>
                        Download
                    </button>
                    <button id="saveToServer" class="btn btn-primary btn-glow">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                            <polyline points="14,2 14,8 20,8"/>
                            <line x1="16" y1="13" x2="8" y2="13"/>
                            <line x1="16" y1="17" x2="8" y2="17"/>
                            <polyline points="10,9 9,9 8,9"/>
                        </svg>
                        Save to Server
                    </button>
                </div>
                <div class="control-group">
                    <button id="printPhoto" class="btn btn-secondary btn-glow">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="6,9 6,2 18,2 18,9"/>
                            <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/>
                            <rect x="6" y="14" width="12" height="8"/>
                        </svg>
                        Print
                    </button>
                    <button id="startOver" class="btn btn-outline btn-glow">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="23,4 23,10 17,10"/>
                            <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
                        </svg>
                        New Session
                    </button>
                </div>
            </div>

            <div id="saveStatus" class="save-status glass-card hidden"></div>
        </div>

        <!-- Hidden canvases for photo processing -->
        <canvas id="captureCanvas" style="display: none;"></canvas>
    </div>

    <!-- Scripts -->
    <script src="assets/libs/three-loader.js"></script>
    <script src="background.js"></script>
    <script src="capture.js"></script>
</body>
</html>