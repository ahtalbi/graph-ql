import { GraphQl } from "../../../../packages/GraphQl.js";

export class HomeProgress {
    async init() {
        try {
            const res = await GraphQl.SendReq(`
            query {
                transaction(
                    where: {
                        _and: [
                            { type: { _eq: "xp" } }
                            { event: { object: { name: { _eq: "Module" } } } }
                        ]
                    }
                    order_by: { createdAt: asc }
                ) {
                    amount
                    createdAt
                }
            }`);

            const transactions = res?.transaction || [];
            if (transactions.length === 0) return;

            let currentXp = 0;
            const data = transactions.map((t, index) => {
                currentXp += t.amount;
                return { index, xp: currentXp };
            });

            this.buildChart(data);

        } catch (error) {
            console.error("Error loading progress:", error);
        }
    }

    buildChart(data) {
        const container = document.querySelector(".s1");
        if (!container) return;

        const maxXP = data[data.length - 1].xp;
        const maxI = data.length - 1 || 1;

        // Step 1: Canvas size and padding
        const W = 1000, H = 450;
        const PAD = { top: 30, right: 30, bottom: 40, left: 70 };
        const innerW = W - PAD.left - PAD.right;
        const innerH = H - PAD.top - PAD.bottom;

        // Step 2: Converters
        const px = i  => PAD.left + (i / maxI) * innerW;   // index -> X pixel
        const py = xp => PAD.top + innerH - (xp / maxXP) * innerH; // xp -> Y pixel

        // Step 3: Draw grid lines and labels
        let gridLines = '';
        const gridCount = 4;
        for (let i = 1; i <= gridCount; i++) {
            const val = (maxXP * i / gridCount);
            const label = Math.round(val / 1000) + "k";
            const y = py(val);
            
            gridLines += `
                <line x1="${PAD.left}" y1="${y}" x2="${W - PAD.right}" y2="${y}" class="chartGrid"></line>
                <text x="${PAD.left - 10}" y="${y + 4}" class="chartLabel">${label}</text>
            `;
        }
        
        // Zero label
        gridLines += `<text x="${PAD.left - 10}" y="${py(0) + 4}" class="chartLabel">0k</text>`;

        // Step 4: Draw polyline
        const points = data.map(d => `${px(d.index)},${py(d.xp)}`).join(" ");
        const polyline = `<polyline points="${points}" class="chartLine" />`;

        // Step 5: Draw hover dots
        const circles = data.map(d => `
            <circle cx="${px(d.index)}" cy="${py(d.xp)}" r="4" class="chartDot">
                <title>XP: ${d.xp}</title>
            </circle>
        `).join("");

        // Build container HTML
        container.innerHTML = `
            <div class="chartCard">
                <div class="chartHeader">
                    <h2 class="chartTitle">XP Progress</h2>
                </div>
                <svg viewBox="0 0 ${W} ${H}" class="chartSvg">
                    <!-- X & Y Axes -->
                    <line x1="${PAD.left}" y1="${PAD.top}" x2="${PAD.left}" y2="${H - PAD.bottom}" class="chartAxis"></line>
                    <line x1="${PAD.left}" y1="${H - PAD.bottom}" x2="${W - PAD.right}" y2="${H - PAD.bottom}" class="chartAxis"></line>
                    
                    ${gridLines}
                    ${polyline}
                    ${circles}
                </svg>
            </div>
        `;
    }
}
