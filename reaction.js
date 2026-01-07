Tests.reaction = {
    active: false,
    rounds: 0,
    totalTime: 0,
    maxRounds: 3,
    state: 'waiting',
    startTime: 0,
    timeoutId: null,
    difficulty: 'medium',

    start(difficulty) {
        this.active = true;
        this.rounds = 0;
        this.totalTime = 0;
        this.difficulty = difficulty;

        // Rounds count based on difficulty
        if (difficulty === 'easy') this.maxRounds = 3;
        if (difficulty === 'medium') this.maxRounds = 5;
        if (difficulty === 'hard') this.maxRounds = 8;

        this.runRound();

        const controls = app.elements.controls;
        controls.innerHTML = `
            <p class="lead" style="text-align:center;">Instruksi: Klik layar SEGERA saat kotak berubah menjadi <strong>HIJAU</strong>.</p>
        `;
    },

    runRound() {
        if (this.rounds >= this.maxRounds) {
            const avg = Math.round(this.totalTime / this.maxRounds);
            let analysis = `Rata-rata waktu reaksi Anda: ${avg}ms.`;

            // Grading logic
            let rating = "Normal";
            if (avg < 200) rating = "Sangat Cepat";
            else if (avg > 400) rating = "Lambat";

            analysis += ` (${rating})`;

            app.finishTest(this.maxRounds, this.maxRounds, analysis);
            this.active = false;
            return;
        }

        app.updateProgress(this.rounds, this.maxRounds);

        const canvas = app.elements.canvas;
        const ctx = canvas.getContext('2d');
        const width = canvas.width = Math.min(window.innerWidth * 0.8, 400);
        const height = canvas.height = 300;

        // Red (Stop)
        ctx.fillStyle = '#ef4444';
        ctx.fillRect(0, 0, width, height);

        ctx.fillStyle = 'white';
        ctx.font = 'bold 24px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Tunggu Hijau...', width / 2, height / 2);

        this.state = 'waiting';

        // Difficulty Logic: Random Delay variation
        // Hard mode might have very short or very separate delays to throw you off
        let minDelay = 1000, maxDelay = 3000;
        if (this.difficulty === 'hard') {
            minDelay = 500;
            maxDelay = 4000; // Unpredictable range
        }

        const delay = minDelay + Math.random() * (maxDelay - minDelay);

        if (this.timeoutId) clearTimeout(this.timeoutId);

        this.timeoutId = setTimeout(() => {
            if (!this.active) return;
            this.state = 'ready';
            this.startTime = Date.now();

            ctx.fillStyle = '#10b981'; // Green (Go)
            ctx.fillRect(0, 0, width, height);
            ctx.fillStyle = 'white';
            ctx.fillText('KLIK / TAP!', width / 2, height / 2);
        }, delay);

        canvas.onmousedown = () => this.handleClick();
        canvas.ontouchstart = (e) => {
            e.preventDefault();
            this.handleClick();
        };
    },

    handleClick() {
        if (!this.active) return;

        if (this.state === 'waiting') {
            // Penalty for early click?
            const canvas = app.elements.canvas;
            const ctx = canvas.getContext('2d');
            ctx.fillStyle = '#f97316'; // Orange warning
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = 'white';
            ctx.font = 'bold 20px Arial';
            ctx.fillText('Terlalu Cepat!', canvas.width / 2, canvas.height / 2);

            this.state = 'penalty';
            if (this.timeoutId) clearTimeout(this.timeoutId);
            setTimeout(() => this.runRound(), 800);

        } else if (this.state === 'ready') {
            const time = Date.now() - this.startTime;
            this.totalTime += time;
            this.rounds++;

            const canvas = app.elements.canvas;
            const ctx = canvas.getContext('2d');
            ctx.fillStyle = '#3b82f6'; // Blue (Done)
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = 'white';
            ctx.font = 'bold 28px Arial';
            ctx.fillText(`${time} ms`, canvas.width / 2, canvas.height / 2);

            this.state = 'done';
            setTimeout(() => this.runRound(), 1000);
        }
    },

    stop() {
        this.active = false;
        if (this.timeoutId) clearTimeout(this.timeoutId);
        app.elements.canvas.onmousedown = null;
        app.elements.canvas.ontouchstart = null;
    }
};
