import { Home } from "./src/pages/home/utils/home_Class.js";
import { HomeProgress } from "./src/pages/home/utils/home_progress.js";

const homePage = new Home();
await homePage.init();

const homeProgress = new HomeProgress();
await homeProgress.init();