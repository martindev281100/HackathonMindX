const model = {}

model.currentUser = undefined;
model.detailUserProfile = undefined;
model.register = async (data) => {
    try {
        const response = await firebase.auth().createUserWithEmailAndPassword(data.email, data.password);
        firebase.auth().currentUser.updateProfile({
            displayName: data.userName,
        });
        await firebase.auth().currentUser.sendEmailVerification();
        const dataToAdd = {
            user: data.userName,
            email: data.email,
            study_set: [{
                category: "",
                question_set: []
            }]
        }
        console.log(dataToAdd)
        await firebase.firestore().collection("users").doc(response.user.uid).set(dataToAdd).then(function () {
            console.log('ran')
        }).catch(function (error) {
            console.log(error.message)
        })
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
    firebase.auth().sendPasswordResetEmail(email).then(function () {
        alert('Please check your email!')
    }).catch(function (error) {
        alert(error)
    })
}
model.changeProfile = async (userName, email, currentPassword) => {
    let user = firebase.auth().currentUser
    if (model.detailUserProfile.providerId !== "password") {
        await user.updateProfile({
            displayName: userName
        }).then(function () {
            alert('Profile has been changed!')
        }).catch(function (error) {
            alert(error)
        });
        return
    }
    await model.reauthenticate(currentPassword)
    await user.updateEmail(email).then(function () {}).catch(function (error) {
        alert(error)
    });
    await user.updateProfile({
        displayName: userName
    }).then(function () {
        alert('Profile has been changed!')
    }).catch(function (error) {
        alert(error)
    });
}
model.changePassword = async (newPassword, currentPassword) => {
    let user = firebase.auth().currentUser
    await model.reauthenticate(currentPassword);
    await user.updatePassword(newPassword).then(function () {
        alert('Password has been changed!')
    }).catch(function (error) {
        alert(error)
    })
}
model.reauthenticate = async (currentPassword) => {
    let user = firebase.auth().currentUser
    const credential = firebase.auth.EmailAuthProvider.credential(
        user.email,
        currentPassword
    );
    await user.reauthenticateWithCredential(credential);
}
model.getDetailProfile = async () => {
    let user = await firebase.auth().currentUser;
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

model.addNewBlog = async (data) => {
    await firebase.firestore().collection('blogs').add(data)
}

model.getBlogs = async () => {
    const response = await firebase.firestore().collection('blogs').get();
    const data = getManyDocument(response)
    for (item of data) {
        view.addBlog(item.blogText)
    }
}

model.getImage = async () => {
    const storage = firebase.storage();
    const storageRef = storage.ref();
    const imagesRef = storageRef.child('images')
    const spaceRef = storageRef.child('images/pexels-lumn-406014.jpg')
    console.log(document.querySelectorAll('.main-blog .article .img-article img'))
    await storageRef.child('images/pexels-lumn-406014.jpg').getDownloadURL().then(function (url) {
        document.querySelector('.main-blog .article .img-article img').src = url
    })
}
