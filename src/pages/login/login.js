import { Login } from "./src/pages/login/utils/login_Class.js";
import "./src/pages/login/utils/login_auth.js";
import "./src/pages/login/utils/login_toggleEye.js";

const loginPage = new Login();
await loginPage.init();