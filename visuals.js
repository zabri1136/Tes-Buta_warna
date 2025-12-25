/**
 * This script runs once on the homepage to generate decorative
 * canvas patterns, simulating "Ishihara Plates" without needing external image assets.
 */

document.addEventListener('DOMContentLoaded', () => {
    // Generate Hero Plates
    generateDecoPlate('hero-plate-1', { hue: [0, 30], bgHue: [100, 150] }); // Red/Green
    generateDecoPlate('hero-plate-2', { hue: [200, 240], bgHue: [0, 40] }, 0.6); // Blue/Red small

    // Generate Gallery Plates
    generateDecoPlate('gallery-plate-1', { hue: [0, 20], bgHue: [90, 140] }); // Classic Red/Green
    generateDecoPlate('gallery-plate-2', { hue: [50, 80], bgHue: [200, 260] }); // Yellow/Blue
    generateDecoPlate('gallery-plate-3', { hue: [260, 300], bgHue: [120, 160] }); // Purple/Green
    generateDecoPlate('gallery-plate-4', { hue: [0, 0], bgHue: [0, 0], grayscale: true }); // Monochromacy simulation
});

function generateDecoPlate(canvasId, options, scale = 1.0) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const radius = width / 2;
    const centerX = width / 2;
    const centerY = height / 2;

    ctx.clearRect(0, 0, width, height);

    // Circle Clip
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.clip();


    const dots = [];
    const count = 300;

    for (let i = 0; i < count; i++) {
        // Random pos inside circle
        const angle = Math.random() * Math.PI * 2;
        const r = Math.sqrt(Math.random()) * (radius - 5);
        const x = centerX + r * Math.cos(angle);
        const y = centerY + r * Math.sin(angle);
        const dotR = (2 + Math.random() * 6) * scale; // Dot size

        // Simple overlap check
        let overlap = false;
        for (let d of dots) {
            const dx = d.x - x;
            const dy = d.y - y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < d.r + dotR + 1) {
                overlap = true;
                break;
            }
        }
        if (overlap) continue;

        // Color Logic
        let h, s, l;

        if (options.grayscale) {
            h = 0; s = 0;
            l = 20 + Math.random() * 60;
        } else {
            // Randomly pick "foreground" or "background" palette to simulate a hidden pattern
            // For decorative purposes, we just mix them randomly 50/50 without forming a shape
            const group = Math.random() > 0.4 ? 'fg' : 'bg'; // Bias slightly

            if (group === 'fg') {
                h = options.hue[0] + Math.random() * (options.hue[1] - options.hue[0]);
            } else {
                h = options.bgHue[0] + Math.random() * (options.bgHue[1] - options.bgHue[0]);
            }
            s = 40 + Math.random() * 40;
            l = 40 + Math.random() * 40;
        }

        dots.push({ x, y, r: dotR, color: `hsl(${h},${s}%,${l}%)` });
    }

    // Draw
    dots.forEach(d => {
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = d.color;
        ctx.fill();
    });
}
