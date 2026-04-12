import { Home } from "./src/pages/home/utils/home_Class.js";
import "./src/pages/home/utils/home_progress.js";
import "./src/pages/home/utils/home_audits.js";
import "./src/pages/home/utils/home_skills.js";

const homePage = new Home();
await homePage.init();
await homePage.initProgress();
await homePage.initAudits();
await homePage.initSkills();