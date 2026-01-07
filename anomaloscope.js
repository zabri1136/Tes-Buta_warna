Tests.anomaloscope = {
    targetR: 255, targetG: 215, targetB: 0, // A reference "Sodium Yellow"
    userMix: 50, // 0 = Pure Red, 100 = Pure Green (Ratio)

    start(difficulty) {
        // Difficulty could reduce the tolerance scope
        // Render Interface
        app.elements.gameArea.innerHTML = `
            <div style="display:flex; flex-direction:column; align-items:center; gap:20px; width:100%;">
                <div style="display:flex; width:100%; max-width:600px; height:200px; border-radius:12px; overflow:hidden; box-shadow:0 4px 6px rgba(0,0,0,0.1);">
                    <!-- Reference Field (Top half usually, or Side by side) -->
                    <!-- Simulating Rayleigh Match: Top = R+G mix, Bottom = Pure Yellow brightness adjusted -->
                    
                    <!-- We will do Side by Side for web simplicity -->
                    <div id="reference-field" style="flex:1; background: rgb(255, 200, 0); display:flex; justify-content:center; align-items:center;">
                        <span style="background:rgba(0,0,0,0.5); color:white; padding:5px; border-radius:4px;">Target</span>
                    </div>
                    <div id="test-field" style="flex:1; background: rgb(255, 0, 0);">
                        <span style="background:rgba(0,0,0,0.5); color:white; padding:5px; border-radius:4px;">Campuran Anda</span>
                    </div>
                </div>

                <div class="controls-panel" style="width:100%; max-width:500px; padding:20px; background:white; border-radius:12px; border:1px solid #e2e8f0;">
                    <label>Rasio Merah - Hijau</label>
                    <input type="range" id="rg-slider" min="0" max="100" value="0" style="width:100%; margin: 15px 0;">
                    <div style="display:flex; justify-content:space-between; font-size:0.8rem; color:#64748b;">
                        <span>Merah Murni</span>
                        <span>Hijau Murni</span>
                    </div>

                    <br>
                    <label>Kecerahan (Brightness)</label>
                    <input type="range" id="bri-slider" min="0" max="100" value="50" style="width:100%; margin: 15px 0;">
                </div>
            </div>
        `;

        app.elements.controls.innerHTML = `
             <button class="btn btn-primary" onclick="Tests.anomaloscope.submit()">Cocokkan!</button>
        `;

        // Listeners
        const slider = document.getElementById('rg-slider');
        const briSlider = document.getElementById('bri-slider');

        const updateColor = () => {
            const ratio = parseInt(slider.value); // 0 (Red) to 100 (Green)
            const bri = parseInt(briSlider.value) / 100;

            // Simple mixing model:
            // Red = (100 - ratio) * brightness
            // Green = ratio * brightness
            // Blue = 0

            // We normalize to 255
            const r = Math.min(255, Math.floor(((100 - ratio) / 50) * 255 * bri));
            const g = Math.min(255, Math.floor((ratio / 50) * 255 * bri));

            document.getElementById('test-field').style.background = `rgb(${r}, ${g}, 0)`;
        };

        slider.oninput = updateColor;
        briSlider.oninput = updateColor;
        updateColor();
    },

    submit() {
        // Correct Rayleigh match is usually roughly 50/50 mix to match Yellow,
        // but since screen RGB is additive, Red(255)+Green(255) = Yellow.
        // So a slider at 50% (Red 255, Green 255) is the goal?
        // Actually, CSS 'yellow' is 255, 255, 0.
        // My simple model: Ratio 50 => R=(50/50)*255=255, G=(50/50)*255=255. Yellow.

        const val = parseInt(document.getElementById('rg-slider').value);
        const bri = parseInt(document.getElementById('bri-slider').value); // Target bri is approx 50-80% ?

        // Target is Ratio ~50 (+/- 5)
        const diff = Math.abs(val - 53); // 53 is arbitrary "perfect" match point for this simulation

        const score = Math.max(0, 100 - (diff * 4));

        let analysis = "";
        if (val < 40) analysis = "Anda cenderung menambahkan terlalu banyak Merah (Protanomaly).";
        else if (val > 65) analysis = "Anda cenderung menambahkan terlalu banyak Hijau (Deuteranomaly).";
        else analysis = "Pencocokan warna sangat akurat (Normal Trichromat).";

        app.finishTest(score, 100, analysis);
    }
};
