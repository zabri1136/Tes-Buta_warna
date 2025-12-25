Tests.ishihara = {
    currentLevel: 0,
    score: 0,
    currentQuestions: [],

    // Pool of questions
    pool: [
        { text: '12', type: 'demo', colors: { bg: [180, 220], fg: [0, 40] } }, // Easy
        { text: '8', type: 'easy', colors: { bg: [180, 220], fg: [0, 40] } },
        { text: '6', type: 'easy', colors: { bg: [180, 220], fg: [0, 40] } },
        { text: '29', type: 'medium', colors: { bg: [80, 160], fg: [30, 90] } },
        { text: '57', type: 'medium', colors: { bg: [80, 160], fg: [30, 90] } },
        { text: '5', type: 'medium', colors: { bg: [40, 100], fg: [10, 60] } },
        { text: '3', type: 'medium', colors: { bg: [40, 100], fg: [10, 60] } },
        { text: '15', type: 'hard', colors: { bg: [160, 200], fg: [340, 360] } },
        { text: '74', type: 'hard', colors: { bg: [160, 200], fg: [340, 360] } },
        { text: '97', type: 'hard', colors: { bg: [160, 200], fg: [340, 360] } },
        { text: '45', type: 'hard', colors: { bg: [50, 90], fg: [10, 40] } }, // Low contrast
        { text: '5', type: 'hard', colors: { bg: [50, 90], fg: [10, 40] } },
        { text: '7', type: 'medium', colors: { bg: [180, 220], fg: [0, 40] } },
        { text: '16', type: 'easy', colors: { bg: [180, 220], fg: [0, 40] } },
        { text: '73', type: 'hard', colors: { bg: [80, 160], fg: [30, 90] } }
        // Logic: Harder means colors are closer in Hue (Red/Green confusion zones)
    ],

    start(difficulty) {
        this.currentLevel = 0;
        this.score = 0;

        // Select Questions based on Difficulty
        let count = 5;
        if (difficulty === 'medium') count = 10;
        if (difficulty === 'hard') count = 15;

        // Simple Shuffle
        const shuffled = this.pool.sort(() => 0.5 - Math.random());

        // If hard, try to prioritize hard questions, else mix
        // For simplicity now, we just take top N from shuffle, but in real app we'd filter
        this.currentQuestions = shuffled.slice(0, count);

        this.runLevel();
    },

    runLevel() {
        if (this.currentLevel >= this.currentQuestions.length) {
            app.finishTest(this.score, this.currentQuestions.length, "Analisa Ishihara selesai.");
            return;
        }

        const q = this.currentQuestions[this.currentLevel];
        app.updateProgress(this.currentLevel, this.currentQuestions.length);

        const controls = app.elements.controls;
        controls.innerHTML = `
            <input type="number" id="ishihara-input" placeholder="Angka?" class="option-btn" style="cursor:text; width: 150px;">
            <button class="btn btn-primary" id="submit-ishihara">Jawab</button>
            <button class="btn btn-secondary" id="skip-ishihara">Tidak Tahu</button>
        `;

        document.getElementById('submit-ishihara').onclick = () => this.checkAnswer();
        document.getElementById('skip-ishihara').onclick = () => {
            this.currentLevel++;
            this.runLevel();
        };
        // Allow Enter key
        const inputField = document.getElementById('ishihara-input');
        inputField.onkeydown = (e) => {
            if (e.key === 'Enter') this.checkAnswer();
        };

        // Slight delay to ensure focus works after DOM update
        setTimeout(() => inputField.focus(), 50);

        this.generatePlate(q.text, q.colors);
    },

    checkAnswer() {
        const input = document.getElementById('ishihara-input').value;
        const correct = this.currentQuestions[this.currentLevel].text;
        if (input === correct) {
            this.score++;
        }
        this.currentLevel++;
        this.runLevel();
    },

    generatePlate(number, colorRange) {
        // ... (Generation Logic remains the same, reusing from previous file)
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
        mCtx.font = `bold ${size * 0.55}px Arial`; // Slightly smaller font to fit double digits better
        mCtx.textAlign = 'center';
        mCtx.textBaseline = 'middle';
        mCtx.fillText(number, size / 2, size / 2);

        // 2. Generate Dots
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, size, size); // Clear

        // Draw main circle boundary
        ctx.beginPath();
        ctx.arc(size / 2, size / 2, size / 2 - 10, 0, Math.PI * 2);
        ctx.fillStyle = '#f8fafc';
        ctx.fill();

        const dots = [];
        const dotCount = 2500; // Increased count for better density
        const center = size / 2;
        const radius = size / 2 - 20;

        for (let i = 0; i < dotCount; i++) {
            const r = Math.random() * radius * 0.98;
            const theta = Math.random() * Math.PI * 2;
            const x = center + r * Math.cos(theta);
            const y = center + r * Math.sin(theta);
            const dotRadius = 3 + Math.random() * 5;

            let overlapping = false;
            for (let d of dots) {
                const dx = d.x - x;
                const dy = d.y - y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < d.r + dotRadius + 1) {
                    overlapping = true;
                    break;
                }
            }
            if (overlapping) continue;

            const maskData = mCtx.getImageData(x, y, 1, 1).data;
            const isFigure = maskData[0] < 128;

            let h, s, l;
            if (isFigure) {
                const hueMin = colorRange.fg[0];
                const hueMax = colorRange.fg[1];
                h = hueMin + Math.random() * (hueMax - hueMin);
                s = 50 + Math.random() * 30;
                l = 40 + Math.random() * 20;
            } else {
                const hueMin = colorRange.bg[0];
                const hueMax = colorRange.bg[1];
                h = hueMin + Math.random() * (hueMax - hueMin);
                s = 30 + Math.random() * 30;
                l = 50 + Math.random() * 30;
            }

            dots.push({ x, y, r: dotRadius, color: `hsl(${h}, ${s}%, ${l}%)` });
        }

        dots.forEach(d => {
            ctx.beginPath();
            ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
            ctx.fillStyle = d.color;
            ctx.fill();
        });
    }
};
