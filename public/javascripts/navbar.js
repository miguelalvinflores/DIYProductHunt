document.addEventListener("DOMContentLoaded", async () => {
    // Sign Up
    const signupNavBtn = document.querySelector(".api-signup");
    const signupCancelBtn = document.querySelector(".signup-cancel")

    modalSignup = document.querySelector(".modal-signUp")

    if(signupNavBtn) {
        signupNavBtn.addEventListener('click', (e) => {
            e.preventDefault();
            modalSignup.style.display = "block";
        })
    }

    if(signupCancelBtn) [
        signupCancelBtn.addEventListener('click', (e) => {
            e.preventDefault();
            modalSignup.style.display = "none;"
        })
    ]
})
