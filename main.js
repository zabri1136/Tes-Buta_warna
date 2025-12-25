const app = {
    state: {
        score: 0,
        currentTest: null,
        currentDifficulty: 'medium', // easy, medium, hard
        questionIndex: 0,
        results: {},
        testConfig: null
    },

    elements: {
        views: document.querySelectorAll('.view'),
        testTitle: document.getElementById('test-title-run'),
        difficultyBadge: document.getElementById('difficulty-badge'),
        progressBar: document.getElementById('progress'),
        gameArea: document.getElementById('game-area'),
        controls: document.getElementById('controls'),
        canvas: document.getElementById('test-canvas'),
        scoreValue: document.getElementById('score-value'),
        resultText: document.getElementById('result-text')
    },

    init() {
        console.log('App initialized');
    },

    switchView(viewId) {
        this.elements.views.forEach(view => {
            view.classList.remove('active');
            view.style.display = 'none';
        });
        const target = document.getElementById(viewId);
        target.style.display = 'block';
        setTimeout(() => target.classList.add('active'), 50);
        window.scrollTo(0, 0);
    },

    // Step 1: User clicks on Card -> Show Levels
    showLevels(testType) {
        this.state.currentTest = testType;
        // Update Title logic in Level view if needed, but generic is fine
        this.switchView('level-selection');
    },

    // Step 2: User selects Level -> Start Test
    selectLevel(difficulty) {
        this.state.currentDifficulty = difficulty;
        this.startTest(this.state.currentTest, difficulty);
    },

    startTest(testType, difficulty) {
        this.state.score = 0;
        this.state.questionIndex = 0;

        // Update UI
        this.switchView('test-runner');
        this.elements.difficultyBadge.innerText = difficulty.charAt(0).toUpperCase() + difficulty.slice(1);

        // Reset Canvas
        const ctx = this.elements.canvas.getContext('2d');
        ctx.clearRect(0, 0, this.elements.canvas.width, this.elements.canvas.height);
        this.elements.controls.innerHTML = '';

        let testName = '';
        if (testType === 'ishihara') {
            testName = 'Tes Ishihara';
            Tests.ishihara.start(difficulty);
        } else if (testType === 'cambridge') {
            testName = 'Cambridge Colour Test';
            Tests.cambridge.start(difficulty);
        } else if (testType === 'reaction') {
            testName = 'Tes Reaksi Warna';
            Tests.reaction.start(difficulty);
        }
        this.elements.testTitle.innerText = testName;
    },

    finishTest(finalScore, maxScore, analysis) {
        const percentage = Math.round((finalScore / maxScore) * 100);
        this.elements.scoreValue.innerText = `${percentage}%`;

        let feedback = "";
        if (percentage >= 90) {
            feedback = "Penglihatan warna Anda kemungkinan besar normal. Hasil yang sangat baik!";
        } else if (percentage >= 60) {
            feedback = "Terindikasi adanya kesulitan. Anda mungkin mengalami defisiensi warna ringan atau gangguan konsentrasi.";
        } else {
            feedback = "Hasil menunjukkan kemungkinan buta warna. Jangan panik, ini hal yang umum. Disarankan ke dokter mata.";
        }

        if (analysis) feedback += ` <br><br><strong>Analisa:</strong> ${analysis}`;

        this.elements.resultText.innerHTML = feedback;
        this.switchView('results');
    },

    retryTest() {
        // Retry with same settings
        this.startTest(this.state.currentTest, this.state.currentDifficulty);
    },

    goHome() {
        if (Tests.cambridge.active) Tests.cambridge.stop();
        if (Tests.reaction.active) Tests.reaction.stop();
        this.switchView('home');
    },

    updateProgress(current, total) {
        const percent = ((current) / total) * 100;
        this.elements.progressBar.style.width = `${percent}%`;
    }
};

const Tests = {
    ishihara: {},
    cambridge: {},
    reaction: {}
};

function scrollToSection(id) {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}

document.addEventListener('DOMContentLoaded', () => {
    app.init();
});
