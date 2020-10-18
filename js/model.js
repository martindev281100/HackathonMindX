const model = {}

model.currentUser = undefined;
model.detailUserProfile = undefined;
model.imageURL = undefined;
model.currentBlog = undefined;
model.users = undefined;
model.currentQuestionSet = undefined;

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
        await firebase.firestore().collection("users").doc(response.user.uid).set(dataToAdd)
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
            } else {
                const dataToAdd = {
                    user: data.userName,
                    email: data.email,
                    study_set: [{
                        category: "",
                        question_set: []
                    }]
                }
                firebase.firestore().collection('users').doc(result.user.uid).set(dataToAdd)
            }
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
            } else {
                const dataToAdd = {
                    user: data.userName,
                    email: data.email,
                    study_set: [{
                        category: "",
                        question_set: []
                    }]
                }
                firebase.firestore().collection('users').doc(result.user.uid).set(dataToAdd)
            }
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
            model.currentUser.displayName = userName
            view.setActiveScreen('profilePage')
        }).catch(function (error) {
            alert(error)
        });
        return
    }
    if (email !== firebase.auth().currentUser.email) {
        await model.reauthenticate(currentPassword)
    }
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
    await user.reauthenticateWithCredential(credential).catch(function (error) {
        alert(error.message)
    });
}

model.getDetailProfile = async () => {
    let user = await firebase.auth().currentUser;
    if (user !== null) {
        user.providerData.forEach(function (profile) {
            model.detailUserProfile = profile
        })
    }
}

model.addNewBlog = async (data, file) => {
    await firebase.firestore().collection('blogs').add(data).then(async function (docRef) {
        await model.uploadImage(file, docRef.id)
    })
}

model.getBlogs = async () => {
    const response = await firebase.firestore().collection('blogs').get();
    const data = getManyDocument(response)
    console.log(data)
    for (item of data) {
        await model.getImage(item.id)
        view.addBlog(item.blogText, item.id, model.imageURL)
    }
}
model.getBlogsTitle = async () => {
    const response = await firebase.firestore().collection('blogs').where('owner', '==', model.currentUser.email).get();
    const data = await getManyDocument(response)
    for (item of data) {
        await model.getImage(item.id)
        view.addToList(item.blogText, item.id)
    }
}
model.getCurrentBlog = async (id) => {
    const response = await firebase.firestore().collection('blogs').doc(id).get()
    const result = await getOneDocument(response)
    model.currentBlog = result;
}

model.getImage = async (id) => {
    if (id === null || id === '') {
        return
    } else {
        const storage = firebase.storage();
        const storageRef = storage.ref();
        await storageRef.child(id).getDownloadURL().then(function (url) {
            model.imageURL = url
        }).catch(function (error) {
            console.log(error.message)
        })
    }
}

model.uploadImage = async (file, id) => {
    const storage = firebase.storage();
    const storageRef = storage.ref();
    const imagesRef = storageRef.child(id)
    await imagesRef.put(file).then(function (snapshot) {})
}





model.addNewStudySet = async () => {
    const title = document.getElementById("study-set-title").value;
    const description = document.getElementById("study-set-description").value;
    const questions = Array.from(document.querySelectorAll(".input-question"));
    const correctAnswers = Array.from(
        document.querySelectorAll(".input-correct-answer")
    );
    const incorrectAnswers0 = Array.from(
        document.querySelectorAll(".input-incorrect-answer-0")
    );
    const incorrectAnswers1 = Array.from(
        document.querySelectorAll(".input-incorrect-answer-1")
    );
    const incorrectAnswers2 = Array.from(
        document.querySelectorAll(".input-incorrect-answer-2")
    );
    let study_set = {
        title: title,
        description: description,
        question_set: [],
    };
    for (let i = 0; i < questions.length; i++) {
        study_set["question_set"].push({
            question: questions[i].value,
            correct_answer: correctAnswers[i].value,
            incorrect_answers: [
                incorrectAnswers0[i].value,
                incorrectAnswers1[i].value,
                incorrectAnswers2[i].value
            ]
        })
    }
    dataToUpdate = {
        study_sets: firebase.firestore.FieldValue.arrayUnion(study_set)
    }
    await firebase.firestore().collection('users').doc(model.currentUser.uid).update(dataToUpdate)
};

model.getUsers = async () => {
    const response = await firebase.firestore().collection('users').get()
    model.users = getManyDocument(response)
}
model.deleteBlog = async (id) => {
    await firebase.firestore().collection('blogs').doc(id).delete().then(function () {}).catch(function (error) {
        console.log(error.message)
    })
    const storage = firebase.storage();
    const storageRef = storage.ref();
    await storageRef.child(id).delete().then(function () {
        alert('successful')
    }).catch(function (error) {
        alert(error.message)
    })
}
model.getQuizzes = async () => {
    const response = await firebase.firestore().collection('quizzes').get();
    model.currentQuestionSet = getManyDocument(response);
    for (let i = 0; i < model.currentQuestionSet.length; i++) model.currentQuestionSet[i].shown = false;
}
model.updateStudySet = async (studySet) => {
    await firebase.firestore().collection('users').doc(model.currentUser.uid).update({
        study_sets: firebase.firestore.FieldValue.arrayRemove(studySet)
    });
    model.addNewStudySet();
}