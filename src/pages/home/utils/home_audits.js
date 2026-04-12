import { GraphQl } from "../../../../packages/GraphQl.js";
import { Home } from "./home_Class.js";

Home.prototype.initAudits = async function() {
    try {
        const res = await GraphQl.SendReq(`
        query {
            user {
                succeeded: audits_aggregate(where: {closureType: {_eq: succeeded}}) {
                    aggregate {
                        count
                    }
                }
                failed: audits_aggregate(where: {closureType: {_eq: failed}}) {
                    aggregate {
                        count
                    }
                }
            }
        }`);

        const userObj = res?.user?.[0];
        if (!userObj) return;

        const succeeded = userObj.succeeded?.aggregate?.count || 0;
        const failed = userObj.failed?.aggregate?.count || 0;

        this.buildAuditChart(succeeded, failed);
    } catch (error) {
        console.error("Error loading audits:", error);
    }
};

Home.prototype.buildAuditChart = function(succeeded, failed) {
    const svg = document.querySelector("#auditRatioSvg");
    if (!svg) return;

    const total = succeeded + failed;
    if (total === 0) return;

    const sucRatio = (succeeded / total) * 100;

    const createSVGElement = (tag, attrs) => {
        const el = document.createElementNS("http://www.w3.org/2000/svg", tag);
        for (const [key, val] of Object.entries(attrs)) {
            el.setAttribute(key, val);
        }
        return el;
    };

    svg.replaceChildren();

    // r = 100 / (2 * PI) to make circumference exactly 100
    const r = 15.915494309189533;
    const center = 21;

    // Draw Fail (Red background)
    svg.appendChild(createSVGElement("circle", {
        cx: center, cy: center, r: r,
        fill: "transparent",
        stroke: "#ef4444", // Red
        "stroke-width": 4
    }));

    // Draw Success (Green foreground)
    const successCircle = createSVGElement("circle", {
        cx: center, cy: center, r: r,
        fill: "transparent",
        stroke: "#22c55e", // Green
        "stroke-width": 4,
        "stroke-dasharray": `${sucRatio} ${100 - sucRatio}`,
        "stroke-dashoffset": 25 // Start at top
    });
    
    // Add tooltip using title
    const sucTitle = createSVGElement("title", {});
    sucTitle.textContent = `Success: ${Math.round(sucRatio)}%`;
    successCircle.appendChild(sucTitle);

    svg.appendChild(successCircle);

    // Update legend
    const legend = document.querySelector("#auditLegend");
    if (legend) {
        legend.replaceChildren();

        const sDiv = document.createElement("div");
        sDiv.className = "auditLegendItem";
        sDiv.style.color = "#22c55e";
        sDiv.textContent = `Succeeded: ${succeeded}`;
        
        const fDiv = document.createElement("div");
        fDiv.className = "auditLegendItem";
        fDiv.style.color = "#ef4444";
        fDiv.textContent = `Failed: ${failed}`;

        legend.appendChild(sDiv);
        legend.appendChild(fDiv);
    }
};
