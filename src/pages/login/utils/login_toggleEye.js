const passwordInp = document.getElementById("password");
const togglePsButton = document.getElementById("togglePassword");
const togglePsIcon = document.getElementById("togglePasswordIcon");

if (passwordInp && togglePsButton && togglePsIcon) {
    togglePsButton.addEventListener("click", () => {
        const isPasswordHidden = passwordInp.type === "password";
        passwordInp.type = isPasswordHidden ? "text" : "password";
        togglePsIcon.src = isPasswordHidden ? "./assets/images/svgs/eye-closed-svgrepo-com.svg" : "./assets/images/svgs/eye-svgrepo-com.svg";
    });
}
