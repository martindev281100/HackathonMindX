const view = {}

view.setActiveScreen = async (screenName) => {
    switch (screenName) {
        case "registerPage":
            document.getElementById('app').innerHTML = component.registerPage;
            const registerForm = document.getElementById("register-form");
            registerForm.addEventListener("submit", function (e) {
                e.preventDefault();
                const data = {
                    userName: registerForm.userName.value,
                    email: registerForm.email.value,
                    password: registerForm.password.value,
                    confirmPassword: registerForm.confirmPassword.value,
                };
                controller.register(data);
            });
            document.getElementById("redirect-to-login").addEventListener("click", function () {
                view.setActiveScreen("loginPage");
            });
            document.querySelector('.logIn').addEventListener('click', () => {
                view.setActiveScreen("loginPage");
            })
            break;

        case "loginPage":
            document.getElementById("app").innerHTML = component.loginPage;
            const loginForm = document.getElementById("login-form");
            loginForm.addEventListener("submit", function (e) {
                e.preventDefault();
                const data = {
                    email: loginForm.email.value,
                    password: loginForm.password.value,
                };
                controller.login(data);
            });
            document.getElementById('btn_google').addEventListener('click', function () {
                model.logInWithGoogle();
            })
            document.getElementById('btn_facebook').addEventListener('click', function () {
                model.logInWithFacebook();
            })
            document.getElementById("redirect-to-register").addEventListener("click", function () {
                view.setActiveScreen("registerPage");
            });
            document.querySelector('.logIn').addEventListener('click', () => {
                view.setActiveScreen("registerPage");
            })

            // Get the modal
            let modal = document.getElementById("myModal");

            // Get the button that opens the modal
            let btn = document.getElementById("myBtn");

            // Get the <span> element that closes the modal
            let span = document.getElementsByClassName("close")[0];
            // When the user clicks on the button, open the modal
            btn.onclick = function () {
                modal.style.display = "block";
            }

            // When the user clicks on <span> (x), close the modal
            span.onclick = function () {
                modal.style.display = "none";
            }

            // When the user clicks anywhere outside of the modal, close it
            window.onclick = function (event) {
                if (event.target == modal) {
                    modal.style.display = "none";
                }
            }
            document.getElementById('btnResetPassword').addEventListener('click', () => {
                const resetPasswordEmail = document.getElementById('reset-password-email').value
                model.sendPasswordResetEmail(resetPasswordEmail)
            })

            break;
        case "homePage":
            document.getElementById("app").innerHTML = component.homePage;
            view.showSlides(slideIndex);
            document.querySelector(".logIn").addEventListener('click', () => {
                view.setActiveScreen("loginPage")
            })
            document.querySelector(".signUp").addEventListener('click', () => {
                view.setActiveScreen("registerPage")
            })
            document.querySelector(".signUp1").addEventListener('click', () => {
                view.setActiveScreen("registerPage")
            })
    }
}
view.setErrorMessage = (elementId, content) => {
    document.getElementById(elementId).innerText = content;
};



let slideIndex = 1;
// Thumbnail image controls
function currentSlide(n) {
    view.showSlides(slideIndex = n);
}
view.showSlides = (n) => {
    const slides = document.getElementsByClassName("mySlides");
    const dots = document.getElementsByClassName("dot");
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (let i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace("active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}