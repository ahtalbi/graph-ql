import { GlobalEvent } from "../packages/GlobalEvent.js";
import { Loader } from "../packages/Loader.js";
import { Router } from "../packages/Router.js";

const app = document.getElementById("app");
const PageLoader = new Loader(app);
const Global_Event = new GlobalEvent();
const AppRouter = new Router();

AppRouter.on("/", () => {
    if (!localStorage.getItem("jwt")) return AppRouter.navigate("/login", { history: "replace" });
    PageLoader.LoadPage("home");
});

AppRouter.on("/login", () => {
    if (localStorage.getItem("jwt")) return AppRouter.navigate("/", { history: "replace" });
    PageLoader.LoadPage("login");
});

AppRouter.listen(() => PageLoader.LoadPage("error"));

AppRouter.navigate(location.pathname, { history: "replace" });

export { Global_Event, AppRouter };
