Tests.cambridge = {
    active: false,
    score: 0,
    round: 0,
    maxRounds: 5,
    difficulty: 'medium',
    gapDirection: 'top',

    start(difficulty) {
        this.active = true;
        this.score = 0;
        this.round = 0;
        this.difficulty = difficulty;

        if (difficulty === 'easy') this.maxRounds = 5;
        else if (difficulty === 'medium') this.maxRounds = 10;
        else this.maxRounds = 15;

        this.runRound();

        // Setup Controls
        const controls = app.elements.controls;
        controls.innerHTML = `
            <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px; width: 200px;">
                <div></div>
                <button class="btn btn-secondary" onclick="Tests.cambridge.check('top')">⬆️</button>
                <div></div>
                <button class="btn btn-secondary" onclick="Tests.cambridge.check('left')">⬅️</button>
                <div style="text-align:center; padding-top:10px; font-weight:bold; color:#cbd5e1;">C</div>
                <button class="btn btn-secondary" onclick="Tests.cambridge.check('right')">➡️</button>
                <div></div>
                <button class="btn btn-secondary" onclick="Tests.cambridge.check('bottom')">⬇️</button>
                <div></div>
            </div>
            <p style="width: 100%; text-align: center; margin-top: 1rem; color: #64748b;">Arah mana celah pada huruf C menghadap?</p>
        `;
    },

    runRound() {
        if (this.round >= this.maxRounds) {
            app.finishTest(this.score, this.maxRounds, "Cambridge Test selesai.");
            this.active = false;
            return;
        }

        app.updateProgress(this.round, this.maxRounds);

        const dirs = ['top', 'bottom', 'left', 'right'];
        this.gapDirection = dirs[Math.floor(Math.random() * dirs.length)];

        // Difficulty Logic: Hue Difference
        // Easy: Starts high contrast, lowers slowly
        // Hard: Starts lower contrast, lowers quickly
        let startDiff = 50;
        if (this.difficulty === 'medium') startDiff = 40;
        if (this.difficulty === 'hard') startDiff = 30;

        // Decrease contrast as rounds progress to make it harder at the end of each level
        // But clamp minimum so it's not impossible
        const step = (this.difficulty === 'hard') ? 2 : 3;
        let hueDiff = startDiff - (this.round * step);
        if (hueDiff < 8) hueDiff = 8; // Limit minimum visibility

        this.drawC(this.gapDirection, hueDiff);
    },

    check(dir) {
        if (!this.active) return;
        if (dir === this.gapDirection) {
            this.score++;
        }
        this.round++;
        this.runRound();
    },

    stop() {
        this.active = false;
    },

    drawC(direction, hueDiff) {
        // ... (Same drawing logic as before)
        const canvas = app.elements.canvas;
        const ctx = canvas.getContext('2d');
        const size = Math.min(window.innerWidth * 0.8, 400);
        canvas.width = size;
        canvas.height = size;
        const center = size / 2;

        const maskCanvas = document.createElement('canvas');
        maskCanvas.width = size;
        maskCanvas.height = size;
        const mCtx = maskCanvas.getContext('2d');

        mCtx.fillStyle = '#000';
        mCtx.fillRect(0, 0, size, size);

        // Stroke width variations could also be a difficulty factor, keeping constant for now
        mCtx.lineWidth = size * 0.15;
        mCtx.strokeStyle = '#FFF';
        mCtx.lineCap = 'butt';

        let startAngle = 0;
        let endAngle = Math.PI * 2;
        const gapSize = Math.PI / 4.5; // Slightly smaller gap for C

        if (direction === 'top') {
            startAngle = -Math.PI / 2 + gapSize;
            endAngle = -Math.PI / 2 - gapSize;
        } else if (direction === 'right') {
            startAngle = 0 + gapSize;
            endAngle = 0 - gapSize;
        } else if (direction === 'bottom') {
            startAngle = Math.PI / 2 + gapSize;
            endAngle = Math.PI / 2 - gapSize;
        } else if (direction === 'left') {
            startAngle = Math.PI + gapSize;
            endAngle = Math.PI - gapSize;
        }

        mCtx.beginPath();
        mCtx.arc(center, center, size * 0.25, startAngle, endAngle);
        mCtx.stroke();

        ctx.fillStyle = '#f1f5f9';
        ctx.fillRect(0, 0, size, size);

        // Random Base Hue
        const baseHue = Math.random() * 360;
        // Direction of shift (plus or minus) to avoid predictable patterns
        const shiftDir = Math.random() > 0.5 ? 1 : -1;
        const targetHue = (baseHue + (hueDiff * shiftDir)) % 360;

        const dotCount = 1800; // Increased density
        for (let i = 0; i < dotCount; i++) {
            const x = Math.random() * size;
            const y = Math.random() * size;
            const r = 2 + Math.random() * 4;

            const pixel = mCtx.getImageData(x, y, 1, 1).data;
            const isShape = pixel[0] > 100;

            const h = isShape ? targetHue : baseHue;
            // High saturation variation helps mask the shape in luminance
            const s = 40 + Math.random() * 40;
            const l = 40 + Math.random() * 30;

            ctx.beginPath();
            ctx.arc(x, y, r, 0, Math.PI * 2);
            ctx.fillStyle = `hsl(${h}, ${s}%, ${l}%)`;
            ctx.fill();
        }
    }
};
