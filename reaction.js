:root {
    --primary: #2563eb;
    --primary-dark: #1e40af;
    --secondary: #64748b;
    --accent: #0ea5e9;
    --bg-color: #ffffff;
    --surface-color: #f8fafc;
    --text-primary: #1e293b;
    --text-secondary: #475569;
    --success: #10b981;
    --error: #ef4444;
    --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    --font-heading: 'Outfit', sans-serif;
    --radius: 16px;
}

* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

body {
    font-family: var(--font-heading);
    background-color: var(--bg-color);
    color: var(--text-primary);
    line-height: 1.6;
    font-size: 18px;
    /* Large base size */
}

/* Utilities */
.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 24px;
}

.view {
    display: none;
    opacity: 0;
    transition: opacity 0.3s ease;
    padding-top: 80px;
    /* Navbar height */
    min-height: 100vh;
}

.view.active {
    display: block;
    opacity: 1;
}

.hidden {
    display: none !important;
}

/* Navbar */
.navbar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 80px;
    background: rgba(255, 255, 255, 0.9);
    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(10px);
    z-index: 1000;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #e2e8f0;
}

.logo {
    font-size: 1.8rem;
    font-weight: 800;
    color: var(--text-primary);
}

.highlight {
    color: var(--primary);
}

/* Hero */
.hero-layout {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    align-items: center;
    padding: 4rem 0;
}

.hero-text h2 {
    font-size: 3.5rem;
    line-height: 1.1;
    margin-bottom: 1.5rem;
    letter-spacing: -0.02em;
}

.hero-text .lead {
    font-size: 1.25rem;
    color: var(--text-secondary);
    margin-bottom: 2rem;
}

.hero-image {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    /* Changed from original to support overlays */
}

.floating-img {
    max-width: 100%;
    border-radius: var(--radius);
    box-shadow: var(--shadow-lg);
    animation: float 6s ease-in-out infinite;
}

@keyframes float {
    0% {
        transform: translateY(0px);
    }

    50% {
        transform: translateY(-20px);
    }

    100% {
        transform: translateY(0px);
    }
}

/* Info Badges */
.info-badges {
    display: flex;
    gap: 1rem;
    margin-top: 2rem;
    flex-wrap: wrap;
}

.badge {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: var(--surface-color);
    padding: 0.5rem 1rem;
    border-radius: 99px;
    font-size: 0.9rem;
    font-weight: 600;
    color: var(--text-secondary);
    border: 1px solid #e2e8f0;
}

/* Info Section */
.info-section {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    padding: 4rem 0;
}

.info-card {
    background: var(--surface-color);
    padding: 2rem;
    border-radius: var(--radius);
    border: 1px solid #e2e8f0;
}

.info-card.warning {
    background: #fff1f2;
    border-color: #fecdd3;
    color: #9f1239;
}

.info-card h3 {
    margin-bottom: 1rem;
    font-size: 1.5rem;
}

/* Test Selection */
.test-selection {
    padding: 4rem 0;
}

.section-title {
    text-align: center;
    font-size: 2.5rem;
    margin-bottom: 3rem;
}

.cards-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
}

.card {
    background: white;
    padding: 2.5rem;
    border-radius: var(--radius);
    box-shadow: var(--shadow-md);
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;
    border: 1px solid #e2e8f0;
    position: relative;
    overflow: hidden;
}

.card:hover {
    transform: translateY(-8px);
    box-shadow: var(--shadow-lg);
    border-color: var(--primary);
}

.card-icon {
    font-size: 3rem;
    margin-bottom: 1.5rem;
}

.card h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
}

.card p {
    color: var(--text-secondary);
    margin-bottom: 2rem;
}

.tag {
    position: absolute;
    top: 1.5rem;
    right: 1.5rem;
    background: var(--surface-color);
    padding: 0.25rem 0.75rem;
    border-radius: 99px;
    font-size: 0.8rem;
    font-weight: bold;
    color: var(--primary);
}

/* Buttons */
.btn {
    -webkit-appearance: none;
    appearance: none;
    border: none;
    cursor: pointer;
    font-family: inherit;
    font-weight: 600;
    border-radius: 99px;
    transition: all 0.2s;
    display: inline-flex;
    align-items: center;
    justify-content: center;
}

.btn-primary {
    background: var(--primary);
    color: white;
    padding: 0.75rem 2rem;
}

.btn-primary:hover {
    background: var(--primary-dark);
    transform: scale(1.05);
}

.btn-lg {
    font-size: 1.2rem;
    padding: 1rem 2.5rem;
}

.btn-secondary {
    background: var(--surface-color);
    color: var(--text-primary);
    padding: 0.5rem 1.5rem;
}

.btn-secondary:hover {
    background: #e2e8f0;
}

/* Test Runner */
.test-container {
    max-width: 800px;
    display: flex;
    flex-direction: column;
    min-height: 60vh;
}

.test-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
}

.game-area {
    flex-grow: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    background: var(--surface-color);
    border-radius: var(--radius);
    padding: 2rem;
    min-height: 400px;
    position: relative;
}

#test-canvas {
    max-width: 100%;
    max-height: 100%;
    cursor: crosshair;
}

.controls {
    margin-top: 2rem;
    display: flex;
    justify-content: center;
    gap: 1rem;
    flex-wrap: wrap;
}

.option-btn {
    padding: 1rem 2rem;
    font-size: 1.5rem;
    background: white;
    border: 2px solid #e2e8f0;
    border-radius: var(--radius);
    cursor: pointer;
    min-width: 80px;
}

.option-btn:hover {
    border-color: var(--primary);
    background: #f0f9ff;
}

/* Results */
.result-container {
    text-align: center;
    max-width: 600px;
    padding-top: 4rem;
}

.score-display {
    margin: 3rem 0;
}

#score-value {
    font-size: 6rem;
    font-weight: 800;
    color: var(--primary);
    display: block;
    line-height: 1;
}

#score-label {
    font-size: 1.5rem;
    color: var(--text-secondary);
}

.result-details {
    background: var(--surface-color);
    padding: 2rem;
    border-radius: var(--radius);
    margin-bottom: 3rem;
    text-align: left;
}

.suggestion {
    margin-top: 1rem;
    font-weight: 600;
    color: var(--primary);
}

/* Footer */
.footer {
    background: var(--surface-color);
    padding: 3rem 0;
    margin-top: auto;
    font-size: 0.9rem;
    color: var(--text-secondary);
    border-top: 1px solid #e2e8f0;
}

/* Responsive */
@media (max-width: 768px) {
    .hero-layout {
        grid-template-columns: 1fr;
        text-align: center;
        gap: 2rem;
    }

    .hero-text h2 {
        font-size: 2.5rem;
    }

    .info-badges {
        justify-content: center;
    }
}

/* === NEW STYLES Added Below === */

/* Hero Image Enhancements */
.deco-plates-container {
    position: relative;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.main-hero-img {
    max-width: 80%;
    border-radius: var(--radius);
    box-shadow: var(--shadow-lg);
    z-index: 2;
    position: relative;
}

.floating-plate {
    position: absolute;
    border-radius: 50%;
    box-shadow: var(--shadow-md);
    z-index: 1;
    background: white;
}

#hero-plate-1 {
    top: -20px;
    right: 0;
    animation: float 7s ease-in-out infinite reverse;
}

#hero-plate-2 {
    bottom: -30px;
    left: 10px;
    animation: float 5s ease-in-out infinite 1s;
}

.visual-gallery {
    display: flex;
    justify-content: center;
    gap: 20px;
    flex-wrap: wrap;
    margin-top: 1rem;
}

.visual-gallery canvas {
    border-radius: 50%;
    box-shadow: var(--shadow-sm);
    transition: transform 0.3s;
}

.visual-gallery canvas:hover {
    transform: scale(1.1) rotate(10deg);
}


/* Level Selection Styles */
.level-container {
    padding-top: 2rem;
    max-width: 900px;
}

.level-content {
    text-align: center;
    margin-top: 2rem;
}

.level-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
    margin-top: 3rem;
    padding: 1rem;
}

.level-card {
    background: white;
    border: 2px solid #e2e8f0;
    border-radius: var(--radius);
    padding: 2rem;
    cursor: pointer;
    transition: all 0.2s;
    position: relative;
}

.level-card:hover {
    border-color: var(--primary);
    transform: translateY(-5px);
    box-shadow: var(--shadow-md);
    background: #f0f9ff;
}

.level-card.featured {
    border-color: var(--primary);
    box-shadow: var(--shadow-md);
}

.rec-badge {
    position: absolute;
    top: -12px;
    left: 50%;
    transform: translateX(-50%);
    background: var(--primary);
    color: white;
    padding: 0.25rem 1rem;
    border-radius: 99px;
    font-size: 0.8rem;
    font-weight: bold;
}

.level-card h3 {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
}

.level-card p {
    color: var(--text-secondary);
}

#difficulty-badge {
    margin-left: 10px;
    font-size: 0.8rem;
    vertical-align: middle;
}

.action-buttons {
    display: flex;
    gap: 1rem;
    justify-content: center;
    margin-top: 2rem;
}

/* Ensure canvas fits */
@media (max-width: 600px) {
    .level-cards {
        grid-template-columns: 1fr;
    }

    #hero-plate-1,
    #hero-plate-2 {
        display: none;
        /* Hide decorative floating elements on mobile to save space */
    }
}

/* Feature Specific Styles (Farnsworth, Anomaloscope, etc) */

.split-layout {
    display: flex;
    gap: 2rem;
    align-items: center;
}

.split-layout .text-content {
    flex: 1;
}

.split-layout .image-content {
    flex: 1;
    text-align: center;
}

.wide-card {
    grid-column: 1 / -1;
    /* SPAN FULL WIDTH */
    background: white;
    box-shadow: var(--shadow-md);
    padding: 3rem;
    border-top: 5px solid var(--primary);
}

.feature-img {
    width: 100%;
    max-width: 500px;
    border-radius: var(--radius);
    box-shadow: var(--shadow-sm);
}

.styled-list {
    list-style: none;
    padding: 0;
    margin: 1rem 0;
}

.styled-list li {
    padding: 0.5rem 0;
    border-bottom: 1px dashed #e2e8f0;
}

.styled-list li:last-child {
    border-bottom: none;
}

.info-wrapper {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    margin-top: 2rem;
    grid-column: 1 / -1;
}

/* Intro View Styles */
.intro-container {
    max-width: 1000px;
    margin: 0 auto;
    padding-top: 2rem;
}

.intro-content {
    background: white;
    padding: 3rem;
    border-radius: var(--radius);
    box-shadow: var(--shadow-lg);
    margin-top: 2rem;
    text-align: center;
}

.icon-header {
    font-size: 5rem;
    margin-bottom: 1rem;
    display: inline-block;
    -webkit-filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1));
    filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1));
}

.info-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
    margin-top: 2.5rem;
    text-align: left;
}

.info-box {
    background: var(--surface-color);
    padding: 1.5rem;
    border-radius: 12px;
    border: 1px solid #e2e8f0;
    transition: transform 0.2s;
}

.info-box:hover {
    transform: translateY(-3px);
    box-shadow: var(--shadow-sm);
}

.info-box h4 {
    color: var(--primary);
    margin-bottom: 0.8rem;
    font-size: 1.1rem;
}

.info-box p {
    font-size: 0.95rem;
    color: var(--text-secondary);
}

.highlight-box {
    background: #eff6ff;
    border-color: #bfdbfe;
}

.highlight-box h4 {
    color: #1e40af;
}

.highlight-box p {
    color: #1e3a8a;
}

.back-btn {
    float: left;
}

.clearfix {
    clear: both;
}


/* Farnsworth Test Styles */
.f-container {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 20px;
    background: #f8fafc;
    border-radius: var(--radius);
    overflow-x: auto;
    width: 100%;
    justify-content: center;
}

.draggable-area {
    display: flex;
    gap: 5px;
    min-height: 80px;
    align-items: center;
    padding: 5px;
    border: 2px dashed #cbd5e1;
    border-radius: 8px;
}

.color-block {
    width: 50px;
    height: 50px;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.7rem;
    color: white;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    flex-shrink: 0;
}

.draggable {
    cursor: grab;
    transition: transform 0.1s;
}

.draggable:active {
    cursor: grabbing;
    transform: scale(1.1);
    z-index: 10;
}

.draggable.dragging {
    opacity: 0.5;
}

.anchor {
    font-weight: bold;
    border: 3px solid rgba(0, 0, 0, 0.2);
}

/* Anomaloscope Styles */
input[type=range] {
    -webkit-appearance: none;
    appearance: none;
    width: 100%;
    background: transparent;
}

input[type=range]::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    height: 24px;
    width: 24px;
    border-radius: 50%;
    background: var(--primary);
    cursor: pointer;
    margin-top: -10px;
    box-shadow: var(--shadow-sm);
    border: 2px solid white;
}

input[type=range]::-webkit-slider-runnable-track {
    width: 100%;
    height: 6px;
    cursor: pointer;
    background: #e2e8f0;
    border-radius: 3px;
}

input[type=range]::-moz-range-track {
    width: 100%;
    height: 6px;
    cursor: pointer;
    background: #e2e8f0;
    border-radius: 3px;
}

input[type=range]::-moz-range-thumb {
    border: none;
    height: 24px;
    width: 24px;
    border-radius: 50%;
    background: var(--primary);
    cursor: pointer;
    box-shadow: var(--shadow-sm);
    border: 2px solid white;
}

@media (max-width: 900px) {
    .info-grid {
        grid-template-columns: 1fr;
    }
}

@media (max-width: 768px) {
    .split-layout {
        flex-direction: column;
    }

    .info-wrapper {
        grid-template-columns: 1fr;
    }

    .f-container {
        flex-direction: column;
    }

    .draggable-area {
        flex-wrap: wrap;
        justify-content: center;
    }
}
