export class GlobalEvent {
    constructor() {
        this.events = {};
    }

    on(event, id, fn) {
        if (!this.events[event]) {
            this.events[event] = [];
            document.addEventListener(event, (e) => {
                if (event === "submit") e.preventDefault();
                this.events[event].forEach(({id, fn}) => {
                    if(e.target.closest(id)) {
                        fn(e, e.target.closest(id));
                    }
                });
            });
        }

        this.events[event].push({ id, fn });
    }
}