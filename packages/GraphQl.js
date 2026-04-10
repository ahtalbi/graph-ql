import { API_GRAPHQL } from "../src/config/config.js";

export class GraphQl {
    static async SendReq(query) {
        const jwt = localStorage.getItem("jwt");

        let res = await fetch(API_GRAPHQL, {
            method: "POST",
            headers: { "Authorization": `Bearer ${jwt}` },
            body: JSON.stringify({ query })
        })

        res = await res.json();
        if (res.errors) throw new Error(res.errors[0].message);

        return res.data;
    };
}
