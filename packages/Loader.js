export class Loader {
    constructor(app) {
        this.app = app;
    }

    async LoadPageStyle(path, page) {
        path += page + "/" + page + ".css";
        try {
            const res = await fetch(path);
            const css = await res.text();
            const style = document.createElement("style");
            style.dataset.style = true;
            style.textContent = css;
            document.querySelectorAll("[data-style]").forEach(e => e.remove());
            document.head.appendChild(style);
        } catch { return null; }
    }

    async LoadPageScript(path, page) {
        path += page + "/" + page + ".js";
        try {
            const res = await fetch(path);
            const js = await res.text();
            const script = document.createElement("script");
            script.type = "module";
            script.dataset.script = true;
            script.textContent = js;
            document.querySelectorAll("[data-script]").forEach(e => e.remove());
            document.body.appendChild(script);
        } catch { return null; }
    }

    async LoadPageHtml(path, page) {
        path += page + "/" + page + ".html";
        try {
            const res = await fetch(path);
            const html = await res.text();
            this.app.innerHTML = html;
            return html;
        } catch { return null; }
    }

    async LoadPage(page, path = "/src/pages/") {
        await this.LoadPageStyle(path, page);
        await this.LoadPageHtml(path, page);
        await this.LoadPageScript(path, page);
    }
}