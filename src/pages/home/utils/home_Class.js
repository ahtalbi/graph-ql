import { GraphQl } from "../../../../packages/GraphQl.js";
import { AppRouter } from "../../../app.js";

export class Home {
    async init() {
        try {
            let res = await GraphQl.SendReq(`
            query {
              user {
                login
                email
                firstName
                lastName
                avatarUrl    
              }
            }`);

            const userData = res?.user?.[0];
            const infosCon = document.querySelector("#InfosCon");

            if (infosCon && userData) {
                infosCon.innerHTML = `
                    <div style="display: flex; align-items: center; gap: 20px; font-family: sans-serif; color: white;">
                        ${userData.avatarUrl ? `<img src="${userData.avatarUrl}" alt="Avatar" style="width: 100px; height: 100px; border-radius: 50%; border: 3px solid #fff;">` : ''}
                        <div>
                            <h2 style="margin: 0 0 10px 0; font-size: 1.8rem;">${userData.firstName} ${userData.lastName || ''}</h2>
                            <p style="margin: 5px 0;"><strong>Username:</strong> ${userData.login}</p>
                            <p style="margin: 5px 0;"><strong>Email:</strong> ${userData.email}</p>
                        </div>
                    </div>
                `;
            }
        } catch (_) {
            
        }
    }
}
