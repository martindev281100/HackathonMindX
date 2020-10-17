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
            break;

        case "quizPage":
            document.getElementById("app").innerHTML = component.quizPage;
            displayIconName()
            document.getElementById("sign-out-button").addEventListener("click", function () {
                firebase.auth().signOut();
            })
            document.getElementById("quiz-button").addEventListener("click", function () {
                view.setActiveScreen("quizPage")
            })
            await model.getUsers();
            model.getQuizzes();
            view.showUserQuizzes();
            model.getDetailProfile();
            document.querySelector(' .navbar .account').addEventListener('click', () => {
                view.setActiveScreen("profilePage")
            })
            document.querySelectorAll(".fixed-test").forEach(test => {
                test.addEventListener("click", function () {
                    view.setActiveScreen("playQuizPage")
                })
            })
            document.querySelector(".create").addEventListener("click", () => {
                view.setActiveScreen("addQuizzPage")
            })

            break;

        case "playQuizPage":
            document.getElementById("app").innerHTML = component.playQuizPage;
            displayIconName()
            document.querySelector(".blog").addEventListener('click', () => {
                view.setActiveScreen("blogPage")
            })
            document.querySelector(".logOut").addEventListener('click', () => {
                firebase.auth().signOut();
            })
            document.querySelector(".create").addEventListener("click", () => {
                view.setActiveScreen("addQuizzPage")
            })
            view.showQuizzes();
            break;
        case "blogPage":
            document.getElementById("app").innerHTML = component.blogPage;
            displayIconName()
            document.querySelector(".logOut").addEventListener('click', () => {
                firebase.auth().signOut();
            })
            document.getElementById("quiz-button").addEventListener("click", function () {
                view.setActiveScreen("quizPage")
            })
            document.querySelector(".create").addEventListener("click", () => {
                view.setActiveScreen("addQuizzPage")
            })
            document.querySelector(".blog").addEventListener('click', () => {
                view.setActiveScreen("createBlogPage")
            })
            await model.getBlogs();
            const btnView = document.querySelectorAll('.article .content .view')
            btnView.forEach(btn => {
                btn.addEventListener('click', async function (e) {
                    await model.getCurrentBlog(e.target.id)
                    view.setActiveScreen('detailBlogPage')
                })
            })
            break;
        case "createBlogPage":
            document.getElementById("app").innerHTML = component.createBlogPage;
            displayIconName()

            document.getElementById('btnCreateBlog').addEventListener('click', async () => {
                const title = document.getElementById("blogTitle").value
                const description = document.getElementById("blogDescription").value
                const content = document.getElementById("blogContent").value
                const createdAt = new Date().toISOString()
                const data = {
                    blogText: {
                        title: title,
                        description: description,
                        content: content,
                    },
                    createdAt: createdAt,
                    owner: model.currentUser.email,
                }
                const file = document.getElementById("inputImage").files[0]
                console.log(file)
                await model.addNewBlog(data, file)
                view.setActiveScreen('blogPage')
            })
            break;
        case "profilePage":
            document.getElementById("app").innerHTML = component.profilePage;
            if (model.detailUserProfile.providerId !== "password") {
                document.getElementById("profile-current-password").hidden = true;
                document.getElementById("profile-email").readOnly = true;
                document.getElementById("btn_changePassword").hidden = true;
            }
            let email = document.getElementById("profile-email")
            let userName = document.getElementById("profile-username")
            email.value = model.detailUserProfile.email
            userName.value = model.currentUser.displayName
            document.getElementById('btn-update-profile').addEventListener('click', () => {
                const currentPassword = document.getElementById('current-password')
                if (currentPassword === '' || currentPassword === null) {
                    alert('Enter current password');
                    return
                } else {
                    model.changeProfile(document.getElementById('profile-username').value, document.getElementById('profile-email').value, document.getElementById('current-password').value)
                }
            })
            document.getElementById('btn_changePassword').addEventListener('click', () => {
                document.querySelector(".edit-form").style.display = "none"
                document.querySelector("#change-password-container").style.display = "block"
            })

            document.querySelector(".editAccountBtn").addEventListener('click', () => {
                document.querySelector(".edit-form").style.display = "block"
                document.querySelector(".list-blog-form").style.display = "none"
            })
            document.getElementById("btn-close").addEventListener('click', () => {
                document.querySelector(".edit-form").style.display = "none"
                document.querySelector("#change-password-container").style.display = "none"
            })

            document.querySelector(".listBlogBtn").addEventListener('click', () => {
                document.querySelector(".list-blog-form").style.display = "block"
                document.querySelector(".edit-form").style.display = "none"
                document.querySelector("#change-password-container").style.display = "none"
            })
            document.querySelector(".logOut").addEventListener('click', () => {
                firebase.auth().signOut();
            })
            break;
        case "addQuizzPage":
            document.getElementById("app").innerHTML = component.addQuizzPage;
            displayIconName()
            document.querySelector(".addBtn").addEventListener('click', () => {
                view.addNewQuizz();
            })
            document.getElementById("create-button").addEventListener("click", function () {
                model.addNewStudySet();
                view.setActiveScreen("blogPage");
            });
            break;
        case "detailBlogPage":
            document.getElementById("app").innerHTML = component.detailBlogPage;
            displayIconName()
            document.querySelector('.main-blog-detail .title-blog-detail').innerText = model.currentBlog.blogText.title
            document.querySelector('.main-blog-detail .description-blog-detail').innerText = model.currentBlog.blogText.description
            document.querySelector('.main-blog-detail .content-blog-detail').innerText = model.currentBlog.blogText.content
            convertISOString(model.currentBlog.createdAt)
        case "learnPage":
            document.getElementById("app").innerHTML = component.learnPage;
    }
}

let convertISOString = (string) => {
    const date = new Date(string)
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const dt = date.getDate()
    document.querySelector('.main-blog-detail .time-to-create').innerText = "Created at: " + year + '-' + month + '-' + dt
}
view.addNewQuizz = () => {
    const elements = document.querySelector('.main-add-quizz .list-question')
    const questionContainer = document.createElement('div')
    questionContainer.classList.add("question")
    questionContainer.innerHTML = `
    <div class="title-question">
        <input class="input-question" type="text" placeholder="Enter question">
        <h5>question</h5>
    </div>
    <div class="answer">
        <div class="correct-answer">
            <input class="input-correct-answer" type="text" placeholder="Enter correct answer">
            <h5>correct answer</h5>
        </div>
        <div class="other">
            <input class="input-incorrect-answer-0" type="text" placeholder="Enter answer">
            <h5>incorrect answer</h5>
        </div>
        <div class="other">
            <input class="input-incorrect-answer-1" type="text" placeholder="Enter answer">
            <h5>incorrect answer</h5>
        </div>
        <div class="other">
            <input class="input-incorrect-answer-2" type="text" placeholder="Enter answer">
            <h5>incorrect answer</h5>
        </div>
    </div>
    `
    elements.appendChild(questionContainer)
}

view.setErrorMessage = (elementId, content) => {
    document.getElementById(elementId).innerText = content;
};
let displayIconName = () => {
    document.querySelector(' .navbar .account').addEventListener('click', () => {
        view.setActiveScreen("profilePage")
    })
    document.getElementById("display_username").title = model.currentUser.displayName
    document.getElementById("display_username").innerText = model.currentUser.displayName
    if (model.detailUserProfile.photoURL === null) {
        document.getElementById("display_icon").src = "./img/logo-icon.png"
    } else {
        document.getElementById("display_icon").src = model.detailUserProfile.photoURL
    }
}
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
        rand = Math.floor(Math.random() * model.currentQuestionSet.length);
    } while (model.currentQuestionSet[rand].shown)
    model.currentQuestionSet[rand].shown = true;
    document.getElementById("question").innerHTML = model.currentQuestionSet[rand].question;
    let answers = [
        model.currentQuestionSet[rand]["correct_answer"],
        model.currentQuestionSet[rand]["incorrect_answers"][0],
        model.currentQuestionSet[rand]["incorrect_answers"][1],
        model.currentQuestionSet[rand]["incorrect_answers"][2]
    ];
    for (let i = 0; i < 4; i++) {
        let rand = Math.floor(Math.random() * answers.length);
        document.getElementById("answer" + i).innerHTML = answers[rand];
        answers.splice(rand, 1);
    }
    document.querySelectorAll(".answer").forEach(answer => {
        answer.addEventListener("click", function () {
            if (answer.innerHTML == model.currentQuestionSet[rand]["correct_answer"]) alert("Correct");
            else alert("Incorrect");
            count++;
            if (count == model.currentQuestionSet.length) {
                view.setActiveScreen("quizPage");
                for (let i = 0; i < model.currentQuestionSet.length; i++) model.currentQuestionSet[i].shown = false;
                count = 0;
            } else {
                view.setActiveScreen("playQuizPage");
            }
        });
    })
}

view.addBlog = (data, id, imgURL) => {
    const article = document.createElement('div')
    article.classList.add("article")
    article.innerHTML = `
            <div class="content">
                <h1 id="blogTitle">${data.title}</h1>
                <p id="blogDescription">${data.description}</p>
                <div class="view" id="${id}">View</div>
            </div>
            <div class="img-article">
                <img src="${imgURL}" alt=""/>
            </div>`
    document.getElementById('blogList').appendChild(article)
}

view.showUserQuizzes = () => {
    const userQuizzesContainer = document.getElementById("user-quizzes-container")
    userQuizzesContainer.innerHTML = "";
    model.users.forEach(user => {
        if (user["study_sets"].length) {
            for (let i = 0; i < user["study_sets"].length; i++) {
                let quizOption = document.createElement('div');
                quizOption.classList.add("list-option");
                quizOption.innerHTML = `
                <button>
                    <h1>${user["study_sets"][i].title}</h2>
                    <h2>by <span>${user.user}</span></h2>
                    <div class="learn" id="learn-${user.id}-${i}">Learn</div>
                    <div class="test" id="test-${user.id}-${i}">Test</div>
                </button>
                `
                userQuizzesContainer.appendChild(quizOption);
                document.getElementById(`learn-${user.id}-${i}`).addEventListener("click", {

                });
                document.getElementById(`test-${user.id}-${i}`).addEventListener("click", function () {
                    model.currentQuestionSet = user["study_sets"][i]["question_set"]
                    for (let i = 0; i < model.currentQuestionSet.length; i++) model.currentQuestionSet[i].shown = false;
                    console.log(model.currentQuestionSet)
                    view.setActiveScreen("playQuizPage");
                });
            }
        }
    })
}