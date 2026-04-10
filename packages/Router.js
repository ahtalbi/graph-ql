export class Router {
    #Routes = Object.create(null);

    on(path, handler) {
        this.#Routes[path] = handler;
        return this;
    }

    navigate(path, { history = "push"} = {}) {
        path = path.startsWith("/") ? path : "/" + path;
        return navigation.navigate(path, { history });
    }

    listen(onError404) {
        navigation.addEventListener("navigate", (event) => {
            let url = new URL(event.destination.url);

            event.intercept({
                handler: async () => {
                    let fn = this.#Routes[url.pathname];
                    if (!fn) {
                        onError404();
                        return;
                    }
                    await fn({ url });
                }
            });
        });

        return this;
    }
}