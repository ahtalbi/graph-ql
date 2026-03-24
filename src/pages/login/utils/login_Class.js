export class Login {
    constructor() {
        (async () => {
            let jwt = await this.Auth();
            localStorage.setItem("jwt", jwt)
        })();
    }
}