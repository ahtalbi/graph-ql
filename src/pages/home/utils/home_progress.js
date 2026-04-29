import { GraphQl } from "../../../../packages/GraphQl.js";
import { Home } from "./home_Class.js";

Home.prototype.initProgress = async function() {
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

Home.prototype.buildChart = function(data) {
    const svg = document.querySelector("#progressChartSvg");
    if (!svg) return;

    const maxXP = data[data.length - 1].xp;
    const maxI = data.length - 1 || 1;

    const W = 1000, H = 450;
    const PAD = { top: 30, right: 30, bottom: 40, left: 70 };
    const innerW = W - PAD.left - PAD.right;
    const innerH = H - PAD.top - PAD.bottom;

    // functions which desides the place of the dots in the svg 
    const px = i  => PAD.left + (i / maxI) * innerW;
    const py = xp => PAD.top + innerH - (xp / maxXP) * innerH;

    const createSVGElement = (tag, attrs) => {
        const el = document.createElementNS("http://www.w3.org/2000/svg", tag);
        for (const [key, val] of Object.entries(attrs)) {
            el.setAttribute(key, val);
        }
        return el;
    };

    svg.replaceChildren();

    // the vertical line
    svg.appendChild(createSVGElement("line", {
        x1: PAD.left, y1: PAD.top, 
        x2: PAD.left, y2: H - PAD.bottom, 
        class: "chartAxis"
    }));

    // the horizontal line
    svg.appendChild(createSVGElement("line", {
        x1: PAD.left, y1: H - PAD.bottom, 
        x2: W - PAD.right, y2: H - PAD.bottom, 
        class: "chartAxis"
    }));

    const gridCount = 4;
    for (let i = 1; i <= gridCount; i++) {
        const val = (maxXP * i / gridCount);
        const label = Math.round(val / 1000) + "k";
        const y = py(val);
        
        svg.appendChild(createSVGElement("line", {
            x1: PAD.left, y1: y, 
            x2: W - PAD.right, y2: y, 
            class: "chartGrid"
        }));

        const text = createSVGElement("text", {
            x: PAD.left - 10, y: y + 4, 
            class: "chartLabel"
        });
        text.textContent = label;
        svg.appendChild(text);
    }

    const text0 = createSVGElement("text", {
        x: PAD.left - 10, y: py(0) + 4, 
        class: "chartLabel"
    });
    text0.textContent = "0k";
    svg.appendChild(text0);

    const points = data.map(d => `${px(d.index)},${py(d.xp)}`).join(" ");
    svg.appendChild(createSVGElement("polyline", {
        points: points, 
        class: "chartLine"
    }));

    for (const d of data) {
        const circle = createSVGElement("circle", {
            cx: px(d.index), cy: py(d.xp), 
            r: "4", class: "chartDot"
        });
        const title = createSVGElement("title", {});
        title.textContent = `XP: ${d.xp}`;
        circle.appendChild(title);
        svg.appendChild(circle);
    }
};
