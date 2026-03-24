import { Login } from "./login_Class.js";

Login.prototype.Auth = async function (username = "ahtalbi", password = "AhmedTalbi@@2007@@") {
    let res = await fetch("https://learn.zone01oujda.ma/api/auth/signin", {
        method: "POST",
        headers: { Authorization: `Basic ${btoa(username + ":" + password) }` },
    });
    if (!res.ok) return null;
    return await res.json();
};