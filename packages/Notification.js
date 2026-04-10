export class Notification {
    static show(message, bgColor = "#ef4444") {
        const container = document.createElement("div");
        container.classList.add("custom-notification");
        container.textContent = message;
        container.style.backgroundColor = bgColor;
        
        document.body.appendChild(container);

        setTimeout(() => {
            container.remove();
        }, 3000);
    }
}
