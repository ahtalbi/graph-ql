import { GlobalEvent } from "../packages/GlobalEvent.js";
import { Loader } from "../packages/Loader.js";

const app = document.getElementById("app");
const PageLoader = new Loader(app);
const Global_Event = new GlobalEvent();

if (localStorage.getItem("jwt")) {
    app.textContent = "authenticated"
} else {
    PageLoader.LoadPage("login");
}

export { Global_Event };