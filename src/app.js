import { GlobalEvent } from "../packages/GlobalEvent.js";
import { GraphQl } from "../packages/GraphQl.js";
import { Loader } from "../packages/Loader.js";
import { Router } from "../packages/Router.js";

const app = document.getElementById("app");
const PageLoader = new Loader(app);
const Global_Event = new GlobalEvent();
const AppRouter = new Router();

AppRouter.on("/", async () => {
    if (!localStorage.getItem("jwt")) return AppRouter.navigate("/login", { history: "replace" });
    try {
        await GraphQl.SendReq("query { user {id}}");
    } catch (err) {
        if (err.message === "AUTH_ERROR") {
            localStorage.removeItem("jwt");
            return AppRouter.navigate("/login", { history: "replace" });
        }
        // Non-auth errors (like network issues) won't trigger a redirect or logout.
        console.warn("Session check skipped:", err.message);
    }
    PageLoader.LoadPage("home");
});

AppRouter.on("/login", () => {
    if (localStorage.getItem("jwt")) return AppRouter.navigate("/", { history: "replace" });
    PageLoader.LoadPage("login");
});

AppRouter.listen(() => PageLoader.LoadPage("error"));

AppRouter.navigate(location.pathname, { history: "replace" });

export { Global_Event, AppRouter };
