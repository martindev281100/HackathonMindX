const controller = {};

controller.register = (data) => {
    view.setErrorMessage("user-name-error", data.userName.trim() === "" ? "Please input your username" : "");
    view.setErrorMessage("email-error", data.email.trim() === "" ? "Please input your email" : "");
    view.setErrorMessage("password-error", data.password.trim() === "" ? "Please input your password" : "");
    if (data.confirmPassword.trim() === "") {
        view.setErrorMessage("confirm-password-error", "Please confirm your password");
    } else if (data.confirmPassword !== data.password) {
        view.setErrorMessage("confirm-password-error", "Password does not match");
    } else {
        view.setErrorMessage("confirm-password-error", "");
    }
    fetch(`https://api.zerobounce.net/v1/validatewithip?apikey=ae86bb6100d340c589b6ddc204b282f0&email=${data.email}&ipAddress=156.124.12.145`)
        .then(response => response.json()).then(function (response) {
            if (response.status !== "Valid") {
                view.setErrorMessage("email-error", "Please input your email correctly");
            } else if (
                data.userName.trim() !== "" &&
                data.email.trim() !== "" &&
                data.password.trim() !== "" &&
                data.password === data.confirmPassword
            ) {
                model.register(data);
            }
        })
};

controller.login = ({
    email,
    password
}) => {
    view.setErrorMessage("email-error", email.trim() === "" ? "Please enter your email" : "");
    view.setErrorMessage("password-error", password.trim() === "" ? "Please enter your password" : "");
    if (email.trim() != "" && password.trim() != "") {
        model.login({
            email,
            password,
        });
    }
};

controller.selectQuestion = (category) => {
    for (let i = 0; i < model.currentQuestionSet.length; i++) {
        if (model.currentQuestionSet[i].category != category) {
            model.currentQuestionSet.splice(i, 1);
            i--;
        }
    }
    console.log(model.currentQuestionSet)
}