const app = {
    state: {
        score: 0,
        currentTest: null,
        currentDifficulty: 'medium',
        questionIndex: 0,
        results: {},
        testConfig: null
    },

    testData: {
        ishihara: {
            title: "Tes Ishihara",
            icon: "🔢",
            tag: "Standard Red-Green",
            desc: "Dikembangkan oleh Dr. Shinobu Ishihara (1917). Tes ini menggunakan serangkaian piringan berisi titik-titik berwarna yang membentuk angka tersembunyi.",
            mechanism: "Anda harus mengidentifikasi angka yang muncul. Orang dengan penglihatan normal akan melihat angka yang berbeda (atau melihat angka sama sekali) dibandingkan dengan orang buta warna.",
            medical: "Sangat akurat untuk mendeteksi buta warna Merah-Hijau (Protanopia & Deuteranopia). Kurang sensitif untuk buta warna Biru-Kuning."
        },
        cambridge: {
            title: "Cambridge Colour Test",
            icon: "🎯",
            tag: "High Sensitivity",
            desc: "Adaptasi digital modern dari tes standar. Menggunakan konsep yang sama dengan Ishihara tetapi menggunakan bentuk 'C' (Landolt C) pada layar yang dikalibrasi.",
            mechanism: "Tentukan arah celah huruf 'C' (Atas, Bawah, Kiri, Kanan). Warna bentuk berbeda sangat tipis dari latar belakang kromatik noise.",
            medical: "Lebih sensitif daripada Ishihara. Dapat mengukur tingkat keparahan buta warna secara kuantitatif berdasarkan ambang batas kontras warna."
        },
        reaction: {
            title: "Tes Reaksi Warna",
            icon: "⚡",
            tag: "Neurological",
            desc: "Uji kecepatan saraf optik dalam mengirimkan sinyal perubahan warna ke otak.",
            mechanism: "Klik secepat mungkin saat layar berubah warna menjadi Hijau. Penundaan milidetik dihitung sebagai skor.",
            medical: "Membantu mendeteksi gangguan jalur visual saraf optik, namun lebih sering digunakan untuk mengukur kewaspadaan fisiologis."
        },
        hrr: {
            title: "Hardy-Rand-Rittler (HRR)",
            icon: "🔺",
            tag: "Tritan Detection",
            desc: "Tes pseudoisokromatik yang menggunakan simbol geometris (Segitiga, Lingkaran, X) alih-alih angka.",
            mechanism: "Identifikasi simbol yang terbentuk dari titik-titik warna. Tingkat kesulitan warna bervariasi dari sangat jelas hingga hampir tak terlihat.",
            medical: "Satu-satunya tes kartu sederhana yang efektif mendeteksi defek Biru-Kuning (Tritanopia) yang sering terlewat oleh Ishihara."
        },
        farnsworth: {
            title: "Farnsworth Munsell 100",
            icon: "🌈",
            tag: "Hue Discrimination",
            desc: "Tes penyusunan warna klasik yang menguji kemampuan membedakan nuansa warna (hue) yang sangat halus.",
            mechanism: "Urutkan balok warna dari satu ujung spektrum ke ujung lainnya agar membentuk gradasi yang mulus.",
            medical: "Mendeteksi semua jenis buta warna dan tingkat keparahannya. Sangat presisi, sering digunakan untuk tes masuk industri yang mewajibkan akurasi warna tinggi."
        },
        anomaloscope: {
            title: "Anomaloscope",
            icon: "🎛️",
            tag: "Clinical Gold Standard",
            desc: "Standar emas diagnosa klinis buta warna. Menggunakan prinsip persamaan Rayleigh (Rayleigh Match).",
            mechanism: "Anda diminta mencampur cahaya Merah dan Hijau menggunakan slider hingga warnanya sama persis dengan Kuning referensi.",
            medical: "Satu-satunya tes yang dapat membedakan secara pasti antara Dichromacy (Buta total warna tertentu) dan Anomalous Trichromacy (Kelemahan/Pergeseran sensitivitas)."
        }
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
        resultText: document.getElementById('result-text'),

        // Intro Elements
        introTitle: document.getElementById('intro-title'),
        introIcon: document.getElementById('intro-icon'),
        introTag: document.getElementById('intro-tag'),
        introDesc: document.getElementById('intro-desc'),
        introMech: document.getElementById('intro-mechanism'),
        introMed: document.getElementById('intro-medical')
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

    // Step 1: Show Intro View
    showTestDetails(testType) {
        this.state.currentTest = testType;
        const data = this.testData[testType];

        // Populate Intro View
        this.elements.introTitle.innerText = data.title;
        this.elements.introIcon.innerText = data.icon;
        this.elements.introTag.innerText = data.tag;
        this.elements.introDesc.innerText = data.desc;
        this.elements.introMech.innerText = data.mechanism;
        this.elements.introMed.innerText = data.medical;

        this.switchView('test-intro');
    },

    // Step 2: Proceed to Levels
    proceedToLevels() {
        this.switchView('level-selection');
    },

    // Step 3: Select Level -> Start
    selectLevel(difficulty) {
        this.state.currentDifficulty = difficulty;
        this.startTest(this.state.currentTest, difficulty);
    },

    startTest(testType, difficulty) {
        this.state.score = 0;
        this.state.questionIndex = 0;

        this.switchView('test-runner');
        this.elements.difficultyBadge.innerText = difficulty.charAt(0).toUpperCase() + difficulty.slice(1);

        const ctx = this.elements.canvas.getContext('2d');
        ctx.clearRect(0, 0, this.elements.canvas.width, this.elements.canvas.height);
        this.elements.controls.innerHTML = '';

        let testName = this.testData[testType].title;

        if (testType === 'ishihara') Tests.ishihara.start(difficulty);
        else if (testType === 'cambridge') Tests.cambridge.start(difficulty);
        else if (testType === 'reaction') Tests.reaction.start(difficulty);
        else if (testType === 'hrr') Tests.hrr.start(difficulty);
        else if (testType === 'farnsworth') Tests.farnsworth.start(difficulty);
        else if (testType === 'anomaloscope') Tests.anomaloscope.start(difficulty);

        this.elements.testTitle.innerText = testName;
    },

    finishTest(finalScore, maxScore, analysis) {
        // Stop any active tests (e.g. loops)
        if (Tests.cambridge.active) Tests.cambridge.stop();
        if (Tests.reaction.active) Tests.reaction.stop();

        const percentage = Math.round((finalScore / maxScore) * 100);
        this.elements.scoreValue.innerText = `${percentage}%`;

        let feedback = "";
        let colorClass = "text-primary";

        if (percentage >= 90) {
            feedback = "<strong>Hasil Normal.</strong> Penglihatan warna Anda berfungsi dengan sangat baik. Anda dapat membedakan variasi warna dengan akurat.";
        } else if (percentage >= 60) {
            feedback = "<strong>Indikasi Defisiensi Ringan.</strong> Anda mungkin mengalami kesulitan membedakan nuansa warna tertentu, atau kondisi pencahayaan/layar mempengaruhi hasil.";
            colorClass = "text-warning"; // Need to add this class or inline style
        } else {
            feedback = "<strong>Terindikasi Buta Warna (Deficiency).</strong> Hasil menunjukkan adanya kesulitan signifikan dalam membedakan warna. Disarankan konsultasi medis.";
            colorClass = "text-danger";
        }

        if (analysis) feedback += `<br><br><div style="background:#f1f5f9; padding:15px; border-radius:8px; border-left:4px solid #64748b;"><strong>Analisa Detail:</strong><br>${analysis}</div>`;

        this.elements.resultText.innerHTML = feedback;
        this.switchView('results');
    },

    retryTest() {
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
    reaction: {},
    hrr: {},
    farnsworth: {},
    anomaloscope: {}
};

function scrollToSection(id) {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}

document.addEventListener('DOMContentLoaded', () => {
    app.init();
});
