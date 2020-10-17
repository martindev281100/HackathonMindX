const view = {}
view.setActiveScreen = async (screenName) => {
    console.log(screenName)

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
            break;

        case "userHomePage":
            document.getElementById("app").innerHTML = component.userHomePage;
            document.getElementById("display_username").innerText = model.currentUser.displayName
            if (model.detailUserProfile.photoURL === null) {
                document.getElementById("display_icon").src = "./img/logo-icon.png"
            } else {
                document.getElementById("display_icon").src = model.detailUserProfile.photoURL
            }
            document.getElementById("sign-out-button").addEventListener("click", function () {
                firebase.auth().signOut();
            })
            document.getElementById("quiz-button").addEventListener("click", function () {
                view.setActiveScreen("userHomePage")
            })
            model.getQuizzes();
            document.querySelector(".blog").addEventListener('click', () => {
                view.setActiveScreen("blogPage")
            })
            model.getDetailProfile();
            document.querySelector(' .navbar .account').addEventListener('click', () => {
                view.setActiveScreen("profilePage")
            })
            break;

        case "quizPage":
            document.getElementById("app").innerHTML = component.quizPage;
            model.getQuizzes();
            document.querySelector(".blog").addEventListener('click', () => {
                view.setActiveScreen("blogPage")
            })
            document.querySelector(".logOut").addEventListener('click', () => {
                firebase.auth().signOut();
            })
            await model.getQuizzes();
            view.showQuizzes();
            break;
        case "blogPage":
            document.getElementById("app").innerHTML = component.blogPage;
            document.querySelector(".logOut").addEventListener('click', () => {
                firebase.auth().signOut();
            })
            document.getElementById("quiz-button").addEventListener("click", function () {
                view.setActiveScreen("userHomePage")
            })

            break;
        case "profilePage":
            document.getElementById("app").innerHTML = component.profilePage;
            let email = document.getElementById("profile-email")
            let userName = document.getElementById("profile-username")
            email.value = model.detailUserProfile.email
            userName.value = model.detailUserProfile.displayName
            document.getElementById('btn_changePassword').addEventListener('click', () => {
                document.getElementById("app").innerHTML = component.changePassword;
                document.getElementById("btn_submitChangePass").addEventListener('click', () => {
                    model.changePassword(document.getElementById("change-password").value)
                })
            })
            console.log(model.detailUserProfile)
            break;
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

let count = 0;
view.showQuizzes = () => {
    let rand;
    do {
        rand = Math.floor(Math.random() * controller.quizzes.length);
    } while (controller.quizzes[rand].shown)
    controller.quizzes[rand].shown = true;
    document.getElementById("question").innerHTML = controller.quizzes[rand].question;
    let answers = [
        controller.quizzes[rand]["correct_answer"],
        controller.quizzes[rand]["incorrect_answers"][0],
        controller.quizzes[rand]["incorrect_answers"][1],
        controller.quizzes[rand]["incorrect_answers"][2]
    ];
    for (let i = 0; i < 4; i++) {
        let rand = Math.floor(Math.random() * answers.length);
        document.getElementById("answer" + i).innerHTML = answers[rand];
        answers.splice(rand, 1);
    }
    document.querySelectorAll(".answer").forEach(answer => {
        answer.addEventListener("click", checkAnswer);

        function checkAnswer() {
            if (answer.innerHTML == controller.quizzes[rand]["correct_answer"]) alert("Correct");
            else alert("Incorrect");
            count++;
            if (count == controller.quizzes.length) {
                view.setActiveScreen(component.userHomePage);
                for (let i = 0; i < controller.quizzes.length; i++) controller.quizzes[i].shown = false;
                count = 0;
            } else {
                view.setActiveScreen("quizPage");
            }
        }
    })
}