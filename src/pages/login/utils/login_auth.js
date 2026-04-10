import { API_AUTH } from "../../../config/config.js";
import { Login } from "./login_Class.js";

Login.prototype.Auth = async function (username = "", password = "") {
    let res = await fetch(API_AUTH, {
        method: "POST",
        headers: { Authorization: `Basic ${btoa(username + ":" + password) }` },
    });
    if (!res.ok) return null;
    return await res.json();
};
