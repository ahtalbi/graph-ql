import { GraphQl } from "../../../../packages/GraphQl.js";

export class Home {
    async init() {
        try {
            const logoutBtn = document.querySelector("#logoutBtn");
            if (logoutBtn) {
                logoutBtn.addEventListener("click", () => {
                    localStorage.removeItem("jwt");
                    window.location.reload();
                });
            }

            const res = await GraphQl.SendReq(`
            query {
                user {
                    login
                    labels {
                        labelName
                    }
                    attrs
                }
            }`);

            const user = res?.user?.[0] || {};
            const attrs = user?.attrs || {};
            const cohort = attrs?.cohort || user?.labels?.[0]?.labelName || "-";

            const infosCon = document.querySelector("#InfosCon");
            if (!infosCon) return;

            infosCon.innerHTML = `
                <div class="homeInfos">
                    ${attrs.avatarUrl ? `<img src="${attrs.avatarUrl}" alt="Avatar" class="homeAvatar">` : ""}
                    <div class="homeDetails">
                        <h2 class="homeTitle">Informations</h2>
                        <p class="homeInfoLine"><strong>First Name:</strong> ${attrs.firstName || "-"}</p>
                        <p class="homeInfoLine"><strong>Last Name:</strong> ${attrs.lastName || "-"}</p>
                        <p class="homeInfoLine"><strong>Cohort:</strong> ${cohort}</p>
                        <p class="homeInfoLine"><strong>Date of Birth:</strong> ${attrs.dateOfBirth ? String(attrs.dateOfBirth).split("T")[0] : "-"}</p>
                        <p class="homeInfoLine"><strong>Email:</strong> ${attrs.email || "-"}</p>
                        <p class="homeInfoLine"><strong>City:</strong> ${attrs.addressCity || "-"}</p>
                        <p class="homeInfoLine"><strong>Gender:</strong> ${attrs.gender || "-"}</p>
                    </div>
                </div>
            `;
        } catch (_) {

        }
    }
}
