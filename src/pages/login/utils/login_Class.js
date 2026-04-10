import { Global_Event, AppRouter } from "../../../app.js";
import { Notification } from "../../../../packages/Notification.js";

export class Login {
    async init() {
        Global_Event.on("submit", "#form-login", async (_, element) => {
            const username = element?.username?.value;
            const password = element?.password?.value;

            const jwt = await this.Auth(username, password);
            if (jwt) {
                localStorage.setItem("jwt", jwt);
                AppRouter.navigate("/", { history: "replace" });
            } else {
                Notification.show("Invalid credentials - try again.", "#ef4444");
            }
        });
    }
}