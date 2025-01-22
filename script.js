document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector("#login-form");
    const usernameInput = document.querySelector("#username");
    const passwordInput = document.querySelector("#password");
    const errorMessage = document.querySelector("#error-message");

    loginForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        if (!username || !password) {
            errorMessage.textContent = "Kérjük, töltse ki az összes mezőt!";
            return;
        }

        try {
            const response = await fetch("/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                const data = await response.json();
                if (data.success) {
                    window.location.href = "/dashboard"; // Sikeres login után átirányítás
                }
            } else {
                const errorData = await response.json();
                errorMessage.textContent = errorData.error || "Hibás felhasználónév vagy jelszó!";
            }
        } catch (error) {
            errorMessage.textContent = "Hálózati hiba történt, próbálja újra!";
        }
    });
});
