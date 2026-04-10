const passwordInput = document.getElementById("password");
const togglePasswordButton = document.getElementById("togglePassword");
const togglePasswordIcon = document.getElementById("togglePasswordIcon");

if (passwordInput && togglePasswordButton && togglePasswordIcon) {
    togglePasswordButton.addEventListener("click", () => {
        const isPasswordHidden = passwordInput.type === "password";

        passwordInput.type = isPasswordHidden ? "text" : "password";
        togglePasswordIcon.src = isPasswordHidden ? "./assets/images/svgs/eye-closed-svgrepo-com.svg" : "./assets/images/svgs/eye-svgrepo-com.svg";
    });
}
