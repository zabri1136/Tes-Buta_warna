Tests.farnsworth = {
    blocks: [],
    targetGradient: { start: 0, end: 360 }, // Hue range
    score: 0,
    startTime: 0,

    start(difficulty) {
        // Setup difficulty: closer hues = harder
        let range = 60; // Spread of hue to sort
        if (difficulty === 'medium') range = 45;
        if (difficulty === 'hard') range = 30;

        // Random start hue
        const startHue = Math.floor(Math.random() * 300);
        this.targetGradient = { start: startHue, end: startHue + range };

        // Generate blocks
        const count = 10; // Number of caps to sort
        this.blocks = [];
        for (let i = 0; i < count; i++) {
            // calculated target hue for this slot
            const trueHue = startHue + (i / (count - 1)) * range;
            this.blocks.push({
                id: i,
                hue: trueHue,
                currentPos: i // initially sorted, we will shuffle
            });
        }

        // Shuffle
        for (let i = this.blocks.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.blocks[i], this.blocks[j]] = [this.blocks[j], this.blocks[i]];
        }

        // Render UI (DOM based, not Canvas)
        app.elements.gameArea.innerHTML = `
            <div id="farnsworth-container" class="f-container">
                <!-- Anchor blocks -->
                <div class="color-block anchor" style="background:hsl(${startHue}, 60%, 50%)">Start</div>
                
                <div id="draggable-area" class="draggable-area">
                    ${this.blocks.map((b, idx) => `
                        <div class="color-block draggable" draggable="true" 
                             data-idx="${idx}" 
                             data-id="${b.id}"
                             style="background:hsl(${b.hue}, 60%, 50%)">
                        </div>
                    `).join('')}
                </div>
                
                <div class="color-block anchor" style="background:hsl(${startHue + range}, 60%, 50%)">End</div>
            </div>
            <p style="margin-top:20px; text-align:center">Susun balok warna agar membentuk gradasi yang halus dari Kiri ke Kanan.</p>
        `;

        app.elements.controls.innerHTML = `
            <button class="btn btn-primary" onclick="Tests.farnsworth.calculateScore()">Selesai & Cek Skor</button>
        `;

        this.addDragListeners();
    },

    addDragListeners() {
        const draggables = document.querySelectorAll('.draggable');
        const container = document.getElementById('draggable-area');

        let draggedItem = null;

        draggables.forEach(item => {
            item.addEventListener('dragstart', () => {
                draggedItem = item;
                item.classList.add('dragging');
            });

            item.addEventListener('dragend', () => {
                draggedItem = null;
                item.classList.remove('dragging');
            });
        });

        container.addEventListener('dragover', e => {
            e.preventDefault();
            const afterElement = getDragAfterElement(container, e.clientX);
            if (afterElement == null) {
                container.appendChild(draggedItem);
            } else {
                container.insertBefore(draggedItem, afterElement);
            }
        });
    },

    calculateScore() {
        // Correct order is id: 0, 1, 2, 3...
        // Error score = sum of difference between neighbor IDs

        const currentOrder = Array.from(document.querySelectorAll('.draggable')).map(el => parseInt(el.dataset.id));
        let errorScore = 0;

        // Classic scoring: sum of abs(diff(current - expected))?
        // Let's use simple inversions/displacement measure

        for (let i = 0; i < currentOrder.length; i++) {
            // Distance of block i from its correct position i
            errorScore += Math.abs(currentOrder[i] - i);
        }

        const maxError = currentOrder.length * (currentOrder.length / 2); // rough max
        const accuracy = Math.max(0, 100 - (errorScore * 5)); // penalty multiplier

        let msg = `Tingkat kesalahan: ${errorScore}.`;
        if (accuracy > 90) msg += " Diskriminasi warna superior.";
        else if (accuracy > 70) msg += " Penglihatan warna rata-rata.";
        else msg += " Diskriminasi warna rendah.";

        app.finishTest(accuracy, 100, msg);
    }
};

function getDragAfterElement(container, x) {
    const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')];

    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        // Check center of box relative to mouse X
        const offset = x - box.left - box.width / 2;
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}
