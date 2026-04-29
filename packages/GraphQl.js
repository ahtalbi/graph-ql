import { API_GRAPHQL } from "../src/config/config.js";

export class GraphQl {
    static async SendReq(query) {
        const jwt = localStorage.getItem("jwt");

        let res;
        try {
            res = await fetch(API_GRAPHQL, {
                method: "POST",
                headers: { "Authorization": `Bearer ${jwt}` },
                body: JSON.stringify({ query })
            });
        } catch (e) {
            throw new Error("NETWORK_ERROR");
        }

        if (res.status === 401 || res.status === 403) {
            throw new Error("AUTH_ERROR");
        }

        const json = await res.json();
        if (json.errors) {
            const msg = json.errors[0].message.toLowerCase();
            if (msg.includes("could not verify jwt")) {
                throw new Error("AUTH_ERROR");
            }
            throw new Error(json.errors[0].message);
        }

        return json.data;
    };
}
