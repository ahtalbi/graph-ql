import { Loader } from "../packages/Loader.js";

const app = document.getElementById("app");
const PageLoader = new Loader(app);

let auth = false;
if (auth) {
    app.textContent = "authenticated"
} else {
    PageLoader.LoadPage("login");
}