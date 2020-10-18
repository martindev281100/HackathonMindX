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
            let modal = document.getElementById("myModal");
            let btn = document.getElementById("myBtn");
            let span = document.getElementsByClassName("close")[0];
            btn.onclick = function () {
                modal.style.display = "block";
            }
            span.onclick = function () {
                modal.style.display = "none";
            }
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
            await model.getUsers();
            await model.getQuizzes();
            view.showUserQuizzes();
            model.getDetailProfile();
            document.querySelectorAll(".fixed-test").forEach(test => {
                test.addEventListener("click", function () {
                    if (test.id == "testJs") controller.selectQuestion("JavaScript")
                    else if (test.id == "testJava") controller.selectQuestion("Java")
                    else if (test.id == "testPython") controller.selectQuestion("Python")
                    else if (test.id == "testCsharp") controller.selectQuestion("C++")
                    view.setActiveScreen("playQuizPage")
                })
            })
            document.getElementById("create-quiz-button").addEventListener("click", () => {
                view.setActiveScreen("addQuizzPage")
            })
            document.querySelector(".dropbtn").innerText = model.currentUser.displayName;
            logOut()
            redirectBlogPage()
            redirectQuizzPage()
            redirectProfilePage()
            redirectSetStudyPage()
            break;

        case "playQuizPage":
            document.getElementById("app").innerHTML = component.playQuizPage;
            displayIconName()
            document.querySelector(".blog").addEventListener('click', () => {
                view.setActiveScreen("blogPage")
            })
            view.showQuizzes();
            document.querySelector(".dropbtn").innerText = model.currentUser.displayName;
            logOut()
            redirectBlogPage()
            redirectQuizzPage()
            redirectProfilePage()
            redirectSetStudyPage()
            break;
        case "blogPage":
            document.getElementById("app").innerHTML = component.blogPage;
            displayIconName()
            await model.getUsers();
            document.getElementById("quiz-button").addEventListener("click", function () {
                view.setActiveScreen("quizPage")
            })
            document.getElementById("view-study-sets-button").addEventListener("click", function () {
                view.setActiveScreen("studySetPage")
            })
            console.log(document.getElementById("create-blog-button"))
            document.getElementById("create-blog-button").addEventListener('click', () => {
                view.setActiveScreen("createBlogPage")
            })
            await model.getBlogs();
            document.getElementById("editProfile").addEventListener('click', function () {
                view.setActiveScreen("profilePage")
            })
            const btnView = document.querySelectorAll('.article .content .view')
            btnView.forEach(btn => {
                btn.addEventListener('click', async function (e) {
                    await model.getCurrentBlog(e.target.id)
                    view.setActiveScreen('detailBlogPage')
                })
            })
            logOut()
            redirectBlogPage()
            redirectQuizzPage()
            redirectProfilePage()
            redirectSetStudyPage()
            document.querySelector(".dropbtn").innerText = model.currentUser.displayName
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
                await model.addNewBlog(data, file)
                view.setActiveScreen('blogPage')
            })
            document.querySelector(".dropbtn").innerText = model.currentUser.displayName;
            logOut()
            redirectBlogPage()
            redirectQuizzPage()
            redirectProfilePage()
            redirectSetStudyPage()
            break;
        case "profilePage":
            document.getElementById("app").innerHTML = component.profilePage;
            if (model.detailUserProfile.providerId !== "password") {
                document.getElementById("profile-current-password").hidden = true;
                document.getElementById("profile-email").readOnly = true;
                document.getElementById("btn_changePassword").hidden = true;
            }
            document.querySelector('.header-info .userName').innerText = model.currentUser.displayName
            if (model.detailUserProfile.photoURL !== null || model.detailUserProfile.photoURL !== '') {
                document.querySelector('.main-info .header .avatar').src = model.detailUserProfile.photoURL
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
                document.getElementById("btn_submitChangePass").addEventListener('click', async function () {
                    await model.changePassword(document.getElementById('change-password').value, document.getElementById('cur-password').value)
                })
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
            await model.getBlogsTitle();
            document.querySelectorAll(".article .deleteBtn").forEach(btn => {
                btn.addEventListener('click', async function (e) {
                    await model.deleteBlog(e.target.id)
                    e.target.parentNode.remove();
                })
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
            document.querySelector(".dropbtn").innerText = model.currentUser.displayName;
            logOut()
            redirectBlogPage()
            redirectQuizzPage()
            redirectProfilePage()
            redirectSetStudyPage()
            break;
        case "detailBlogPage":
            document.getElementById("app").innerHTML = component.detailBlogPage;
            displayIconName()
            document.querySelector('.main-blog-detail .title-blog-detail').innerText = model.currentBlog.blogText.title
            document.querySelector('.main-blog-detail .description-blog-detail').innerText = model.currentBlog.blogText.description
            document.querySelector('.main-blog-detail .content-blog-detail').innerText = model.currentBlog.blogText.content
            convertISOString(model.currentBlog.createdAt)
            document.querySelector(".dropbtn").innerText = model.currentUser.displayName;
            logOut()
            redirectBlogPage()
            redirectQuizzPage()
            redirectProfilePage()
            redirectSetStudyPage()
            break;
        case "learnPage":
            document.getElementById("app").innerHTML = component.learnPage;
            let question = document.getElementById("question")
            let answer = document.getElementById("answer")
            let length = model.currentQuestionSet.length
            let i = 0;
            let btnPrev = document.getElementById("btnPrev")
            let btnNext = document.getElementById("btnNext")
            question.innerText = model.currentQuestionSet[i].question
            answer.innerText = model.currentQuestionSet[i].correct_answer
            btnNext.addEventListener('click', function () {
                if (i === length - 1) {
                    alert('Out of questions')
                } else {
                    i++;
                    question.innerText = model.currentQuestionSet[i].question
                    answer.innerText = model.currentQuestionSet[i].correct_answer
                }
            })
            btnPrev.addEventListener('click', function () {
                if (i === 0) {
                    alert('Out of questions')
                } else {
                    i--;
                    question.innerText = model.currentQuestionSet[i].question
                    answer.innerText = model.currentQuestionSet[i].correct_answer
                }
            })

            question.addEventListener('click', function () {
                if (question.hidden == true) {
                    question.hidden = false;
                    answer.hidden = true;
                } else {
                    question.hidden = true;
                    answer.hidden = false;
                }
            })
            answer.addEventListener('click', function () {
                if (question.hidden == true) {
                    question.hidden = false;
                    answer.hidden = true;
                } else {
                    question.hidden = true;
                    answer.hidden = false;
                }
            })
            document.querySelector(".dropbtn").innerText = model.currentUser.displayName;
            logOut()
            redirectBlogPage()
            redirectQuizzPage()
            redirectProfilePage()
            redirectSetStudyPage()
            break;

        case "studySetPage":
            document.getElementById("app").innerHTML = component.studySetPage;
            view.showStudySets();
            document.querySelector(".dropbtn").innerText = model.currentUser.displayName;
            logOut()
            redirectBlogPage()
            redirectQuizzPage()
            redirectProfilePage()
            redirectSetStudyPage()
            break;
        case "editStudySet":
            document.getElementById("app").innerHTML = component.editQuizPage;
            break;
    }
}

view.showStudySet = (studySet) => {
    document.getElementById("study-set-title").value = studySet.title
    document.getElementById("study-set-description").value = studySet.description
    const elements = document.querySelector('.list-question')
    elements.innerHTML = ""
    for (let question of studySet["question_set"]) {
        const questionContainer = document.createElement('div')
        questionContainer.classList.add("question")
        questionContainer.innerHTML = `
        <div class="title-question">
            <input class="input-question" type="text" value="${question.question}">
            <h5>question</h5>
        </div>
        <div class="answer">
            <div class="correct-answer">
                <input class="input-correct-answer" type="text" value="${question["correct_answer"]}">
                <h5>correct answer</h5>
            </div>
            <div class="other">
                <input class="input-incorrect-answer-0" type="text" value="${question["incorrect_answers"][0]}">
                <h5>incorrect answer</h5>
            </div>
            <div class="other">
                <input class="input-incorrect-answer-1" type="text" value="${question["incorrect_answers"][1]}">
                <h5>incorrect answer</h5>
            </div>
            <div class="other">
                <input class="input-incorrect-answer-2" type="text" value="${question["incorrect_answers"][2]}">
                <h5>incorrect answer</h5>
            </div>
        </div>
        `
        elements.appendChild(questionContainer)
    }
    document.getElementById("edit-button").addEventListener("click", async function () {
        await model.updateStudySet(studySet)
        view.setActiveScreen("studySetPage")
    })
}

view.showStudySets = () => {
    for (user of model.users) {
        if (user.email == model.currentUser.email) {
            for (let i = 0; i < user["study_sets"].length; i++) {
                element = document.createElement("button");
                element.innerHTML = `${user["study_sets"][i].title}`
                element.addEventListener("click", function () {
                    view.setActiveScreen("editStudySet")
                    view.showStudySet(user["study_sets"][i]);
                })
                document.getElementById("study-set-container").appendChild(element);
            }
        }
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
    // document.querySelector(' .navbar .account').addEventListener('click', () => {
    //     view.setActiveScreen("profilePage")
    // // })
    // document.getElementById("display_username").title = model.currentUser.displayName
    // document.getElementById("display_username").innerText = model.currentUser.displayName
    // if (model.detailUserProfile.photoURL === null) {
    //     document.getElementById("display_icon").src = "./img/logo-icon.png"
    // } else {
    //     document.getElementById("display_icon").src = model.detailUserProfile.photoURL
    // }
}
let slideIndex = 1;

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
let points = 0;
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
        document.getElementById("answer" + i).innerText = answers[rand];
        answers.splice(rand, 1);
    }
    document.querySelectorAll(".answer").forEach(answer => {
        answer.addEventListener("click", function () {
            let check = document.getElementById("check-answer");
            check.style.display = "block";
            if (answer.innerText === model.currentQuestionSet[rand]["correct_answer"]) {
                check.innerHTML = "Correct";
                points++;
            } else {
                check.innerHTML = "Incorrect";
            }
            count++;
            if (count == model.currentQuestionSet.length) {
                setTimeout(function () {
                    alert("You get " + points + " out of " + model.currentQuestionSet.length);
                    view.setActiveScreen("quizPage");
                    for (let i = 0; i < model.currentQuestionSet.length; i++) model.currentQuestionSet[i].shown = false;
                    count = 0;
                    points = 0;
                }, 1000)
            } else {
                setTimeout(function () {
                    check.style.display = "none";
                    view.setActiveScreen("playQuizPage");
                }, 1000)
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
view.addToList = (data, id) => {
    const article = document.createElement('div')
    article.classList.add("article")
    article.innerHTML = `
            <h1 class="title-blog">${data.title}</h1>
            <button class="deleteBtn" id="${id}">Delete</button>`
    document.querySelector('.list-blog-form').appendChild(article)
}

view.showUserQuizzes = () => {
    const userQuizzesContainer = document.getElementById("user-quizzes-container")
    userQuizzesContainer.innerHTML = "";
    model.users.forEach(user => {
        if (user["study_sets"].length) {
            for (let i = 0; i < user["study_sets"].length; i++) {
                let element = document.createElement('button');
                element.innerHTML = `
                <h1>${user["study_sets"][i].title}</h1>
                <h2>Created by <span>${user.user}</span></h2>
                <div class="btn">
                    <div class="learn user-learn" id="learn-${user.id}-${i}">Learn</div>
                    <div class="test user-test" id="test-${user.id}-${i}">Test</div>
                </div>
                `
                userQuizzesContainer.appendChild(element);
                document.getElementById(`learn-${user.id}-${i}`).addEventListener("click", function () {
                    model.currentQuestionSet = user["study_sets"][i]["question_set"]
                    console.log(model.currentQuestionSet)
                    view.setActiveScreen("learnPage");
                });
                document.getElementById(`test-${user.id}-${i}`).addEventListener("click", function () {
                    model.currentQuestionSet = user["study_sets"][i]["question_set"]
                    for (let i = 0; i < model.currentQuestionSet.length; i++) model.currentQuestionSet[i].shown = false;
                    view.setActiveScreen("playQuizPage");
                });
            }
        }
    })
}

let logOut = () => {
    document.getElementById('btnLogOut').addEventListener('click', function () {
        firebase.auth().signOut()
    })
}

let redirectBlogPage = () => {
    document.querySelector('.blog').addEventListener('click', () => {
        view.setActiveScreen('blogPage')
    })
}

let redirectQuizzPage = () => {
    document.querySelector('.quizz').addEventListener('click', () => {
        view.setActiveScreen('quizPage')
    })
}

let redirectProfilePage = () => {
    document.querySelector('#editProfile').addEventListener('click', () => {
        view.setActiveScreen('profilePage')
    })
}

let redirectSetStudyPage = () => {
    document.querySelector('#view-study-sets-button').addEventListener('click', () => {
        view.setActiveScreen('studySetPage')
    })
}

