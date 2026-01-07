/* Standard Ishihara shapes are already handled. HRR uses Shapes (Triangle, Circle, X) but logic is similar */
Tests.hrr = {
    currentLevel: 0,
    score: 0,
    currentQuestions: [],

    // Pool uses shapes instead of text
    // 'T' = Triangle, 'C' = Circle, 'X' = X sign
    pool: [
        { shape: 'O', type: 'demo', colors: { bg: [200, 220], fg: [0, 20] } }, // Blue/Grey background with Orange shape
        { shape: 'X', type: 'easy', colors: { bg: [200, 220], fg: [0, 20] } },
        { shape: 'T', type: 'easy', colors: { bg: [200, 220], fg: [0, 20] } },
        { shape: 'O', type: 'medium', colors: { bg: [200, 230], fg: [40, 60] } }, // Protan/Deutan
        { shape: 'T', type: 'medium', colors: { bg: [200, 230], fg: [40, 60] } },
        { shape: 'X', type: 'medium', colors: { bg: [80, 120], fg: [160, 200] } }, // Tritan check (Green bg, Pink/Purple fg)
        { shape: 'T', type: 'hard', colors: { bg: [85, 115], fg: [165, 195] } },
        { shape: 'O', type: 'hard', colors: { bg: [85, 115], fg: [165, 195] } },
        { shape: 'X', type: 'hard', colors: { bg: [210, 230], fg: [340, 360] } }
    ],

    start(difficulty) {
        this.currentLevel = 0;
        this.score = 0;

        let count = 5;
        if (difficulty === 'medium') count = 8;
        if (difficulty === 'hard') count = 10;

        const shuffled = this.pool.sort(() => 0.5 - Math.random());
        this.currentQuestions = shuffled.slice(0, count);

        this.runLevel();
    },

    runLevel() {
        if (this.currentLevel >= this.currentQuestions.length) {
            app.finishTest(this.score, this.currentQuestions.length, "Analisa HRR (Hardy-Rand-Rittler) selesai. HRR sangat baik untuk mendeteksi Tritanopia (Buta Biru-Kuning).");
            return;
        }

        const q = this.currentQuestions[this.currentLevel];
        app.updateProgress(this.currentLevel, this.currentQuestions.length);

        const controls = app.elements.controls;
        // Shape buttons instead of text input
        controls.innerHTML = `
            <button class="option-btn" onclick="Tests.hrr.answer('O')">Lingkaran ⭕</button>
            <button class="option-btn" onclick="Tests.hrr.answer('X')">Silang ❌</button>
            <button class="option-btn" onclick="Tests.hrr.answer('T')">Segitiga 🔺</button>
            <button class="btn btn-secondary" onclick="Tests.hrr.answer('')">Tidak Ada</button>
        `;

        this.generatePlate(q.shape, q.colors);
    },

    answer(shape) {
        if (shape === this.currentQuestions[this.currentLevel].shape) {
            this.score++;
        }
        this.currentLevel++;
        this.runLevel();
    },

    generatePlate(shape, colorRange) {
        const canvas = app.elements.canvas;
        const ctx = canvas.getContext('2d');
        const size = Math.min(window.innerWidth * 0.8, 400);
        canvas.width = size;
        canvas.height = size;

        // 1. Create Mask
        const maskCanvas = document.createElement('canvas');
        maskCanvas.width = size;
        maskCanvas.height = size;
        const mCtx = maskCanvas.getContext('2d');
        mCtx.fillStyle = '#FFFFFF';
        mCtx.fillRect(0, 0, size, size);
        mCtx.fillStyle = '#000000';

        const cx = size / 2;
        const cy = size / 2;
        const r = size * 0.3;

        mCtx.beginPath();
        if (shape === 'O') {
            mCtx.arc(cx, cy, r, 0, Math.PI * 2);
            mCtx.lineWidth = size * 0.1;
            mCtx.stroke();
        } else if (shape === 'X') {
            mCtx.font = `bold ${size * 0.7}px Arial`;
            mCtx.textAlign = 'center';
            mCtx.textBaseline = 'middle';
            mCtx.fillText('X', cx, cy);
        } else if (shape === 'T') {
            mCtx.moveTo(cx, cy - r);
            mCtx.lineTo(cx + r, cy + r);
            mCtx.lineTo(cx - r, cy + r);
            mCtx.closePath();
            mCtx.lineWidth = size * 0.1; // Fill or Stroke? HRR usually filled shapes or strokes. Let's do filled for visibility
            mCtx.fill();
        }

        // 2. Dots Generation (Similar to Ishihara but specialized colors for HRR)
        // ... Reusing logic or simplified logic
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, size, size);

        const dots = [];
        const dotCount = 2000;

        for (let i = 0; i < dotCount; i++) {
            // ... (similar packing algorithm) ...
            const angle = Math.random() * Math.PI * 2;
            const dist = Math.sqrt(Math.random()) * (size / 2 - 10);
            const x = cx + dist * Math.cos(angle);
            const y = cy + dist * Math.sin(angle);
            const r = 2 + Math.random() * 5;

            // Simple collision check omitted for speed in prototype, assuming density handles it visually

            const pixel = mCtx.getImageData(x, y, 1, 1).data;
            const isShape = pixel[0] < 128; // Black

            let h, s, l;
            if (isShape) {
                // Shape color
                h = colorRange.fg[0] + Math.random() * (colorRange.fg[1] - colorRange.fg[0]);
                s = 50; l = 50;
            } else {
                // Bg color
                h = colorRange.bg[0] + Math.random() * (colorRange.bg[1] - colorRange.bg[0]);
                s = 20; l = 60; // Lower saturation for neutral background
            }

            ctx.beginPath();
            ctx.arc(x, y, r, 0, Math.PI * 2);
            ctx.fillStyle = `hsl(${h}, ${s}%, ${l}%)`;
            ctx.fill();
        }
    }
};
