import { GraphQl } from "../../../../packages/GraphQl.js";
import { Home } from "./home_Class.js";

Home.prototype.initSkills = async function() {
    try {
        const res = await GraphQl.SendReq(`
        query {
            user {
                transactions(
                  where: {type: {_like: "%skill%"}}
                  distinct_on: type
                  order_by: [{type: asc}, {amount: desc}]
                ) {
                  skillType: type
                  skillAmount: amount
                }
            }
        }`);

        const transactions = res?.user?.[0]?.transactions || [];
        if (transactions.length === 0) return;

        this.buildSkillsChart(transactions);
    } catch (error) {
        console.error("Error loading skills:", error);
    }
};

Home.prototype.buildSkillsChart = function(data) {
    const container = document.querySelector("#skillsContainer");
    if (!container) return;

    container.replaceChildren();

    const wrapper = document.createElement("div");
    wrapper.className = "skillsWrapper";

    for (const item of data) {
        let name = item.skillType.replace("skill_", "");
        name = name.charAt(0).toUpperCase() + name.slice(1);
        
        const amount = item.skillAmount;

        const row = document.createElement("div");
        row.className = "skillRow";

        const header = document.createElement("div");
        header.className = "skillHeader";
        
        const labelText = document.createElement("span");
        labelText.className = "skillName";
        labelText.textContent = name;
        
        const valueText = document.createElement("span");
        valueText.className = "skillValue";
        valueText.textContent = `${amount}%`;

        header.appendChild(labelText);
        header.appendChild(valueText);

        const background = document.createElement("div");
        background.className = "skillBarBackground";

        const fill = document.createElement("div");
        fill.className = "skillBarFill";
        fill.style.width = `${amount}%`;

        background.appendChild(fill);
        
        row.appendChild(header);
        row.appendChild(background);

        wrapper.appendChild(row);
    }

    container.appendChild(wrapper);
};
