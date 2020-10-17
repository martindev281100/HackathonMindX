const model = {}

model.currentUser = undefined;
model.detailUserProfile = undefined;
model.register = async (data) => {
    try {
        const response = await firebase.auth().createUserWithEmailAndPassword(data.email, data.password);
        firebase.auth().currentUser.updateProfile({
            displayName: data.userName,
        });
        firebase.auth().currentUser.sendEmailVerification();
        firebase.auth().signOut()
    } catch (err) {
        alert(err.message);
    }
};

model.login = async ({
    email,
    password
}) => {
    firebase.auth().signInWithEmailAndPassword(email, password).catch(error => {
        alert(error.message)
    });
};

model.logInWithGoogle = () => {
    var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    const response = firebase.auth().signInWithPopup(provider).then(function (result) {
        firebase.firestore().collection("users").doc(result.user.uid).get().then(function (doc) {
            if (doc.exists) {
                return
            } else {}
        })
    }).catch(function (error) {
        alert(error.message)
    })
}

model.logInWithFacebook = () => {
    var provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(provider).then(async function (result) {
        if (firebase.auth().currentUser.emailVerified == false) {
            await firebase.auth().currentUser.sendEmailVerification();
            firebase.auth().signOut()
        }
        firebase.firestore().collection("users").doc(result.user.uid).get().then(function (doc) {
            if (doc.exists) {
                return
            } else {}
        })
    }).catch(function (error) {
        alert(error.message)
    });
}

model.sendPasswordResetEmail = (email) => {
    firebase.auth().sendPasswordResetEmail(email).catch(function (error) {
        alert(error)
    })
}

model.changePassword = (password) => {
    firebase.auth().currentUser.updatePassword(password).catch(function (error) {
        alert(error)
    })
}

model.getDetailProfile = () => {
    let user = firebase.auth().currentUser;
    if (user !== null) {
        user.providerData.forEach(function (profile) {
            model.detailUserProfile = profile
        })
    }
}
model.getQuizzes = async () => {
    const response = await firebase.firestore().collection('quizzes').get();
    controller.quizzes = getManyDocument(response);
    for (let i = 0; i < controller.quizzes.length; i++) controller.quizzes[i].shown = false;
}