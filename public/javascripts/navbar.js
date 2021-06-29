document.addEventListener("DOMContentLoaded", async () => {
    // Sign Up
    const signupNavBtn = document.querySelector(".api-signup");
    const signupCancelBtn = document.querySelector(".signup-cancel");

    const modalSignup = document.querySelector(".modal-sign-up")
    // console.log("modal Sign Up:", modalSignup)
    if(signupNavBtn) {
        signupNavBtn.addEventListener('click', (e) => {
            e.preventDefault();
            modalSignup.style.display = "block";
        })
    }

    if(signupCancelBtn) {
        signupCancelBtn.addEventListener('click', (e) => {
            e.preventDefault();
            modalSignup.style.display = "none"
        })
    }

    //Login

    const loginNavBtn = document.querySelector(".api-login");
    const loginCancelBtn = document.querySelector(".login-cancel");
    const demoLoginBtn = document.querySelector("#user-login-demo-btn");
    const demoSignupBtn = document.querySelector("#user-signup-demo-btn");

    const modalLogin = document.querySelector(".modal-log-in");
    // console.log("modal Login:", modalLogin)

    if(loginNavBtn) {
        loginNavBtn.addEventListener('click', (e) => {
            e.preventDefault();
            modalLogin.style.display = "block"
        })
    }

    if(loginCancelBtn) {
        loginCancelBtn.addEventListener('click', (e) => {
            e.preventDefault();
            modalLogin.style.display = "none"
        })
    }

    if (demoLoginBtn) {
        demoLoginBtn.addEventListener('click', (e) => {
            e.preventDefault()
            window.location.href = "/users/demo-login"
        })
    }

    if (demoSignupBtn) {
        demoSignupBtn.addEventListener('click', (e) => {
            e.preventDefault()
            window.location.href = "/users/demo-login"
        })
    }

})
