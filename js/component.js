const component = {};

component.registerPage = `
<div class="navbar">
    <div class="logo"><a href="index.html">Coding Language For Beginner</a></div>
    <div class="Btn-Login-SignUp">
        <button class="logIn">Log in</button>
        <button class="signUp">Sign up</button>
    </div>
</div>

<div class="register-container">
    <form id="register-form">
        <div class="register-header">REGISTER</div>
        <div class="register-form">
            <div class="input-wrapper form-group">
                <input type="text" class="form-control" placeholder="Username" name="userName" />
                <div class="error" id="user-name-error"></div>
            </div>
            <div class="input-wrapper form-group">
                <input type="email" class="form-control" placeholder="Email" name="email" />
                <div class="error" id="email-error"></div>
            </div>
            <div class="input-wrapper form-group">
                <input type="password" class="form-control" placeholder="Password" name="password" />
                <div class="error" id="password-error"></div>
            </div>
            <div class="input-wrapper form-group">
                <input type="password" class="form-control" placeholder="Confirm Password" name="confirmPassword" />
                <div class="error" id="confirm-password-error"></div>
            </div>
            <div class="form-action input-wrapper">
                <button class="btn btn-primary btn-register cursor-pointer" type="submit">Register</button>
                <div class="redirect">Already have an account?
                    <span id="redirect-to-login" class="cursor-pointer">Login</span>
                </div>
            </div>
        </div>
    </form>
</div>
`;

component.loginPage = `
<div class="navbar">
    <div class="logo"><a href="index.html">Coding Language For Beginner</a></div>
    <div class="Btn-Login-SignUp">
        <button class="signUp">Log in</button>
        <button class="logIn">Sign up</button>
    </div>
</div>

<div class="login-container">
    <form id="login-form">
        <div class="login-header">LOGIN</div>
        <div class="login-from">
            <div class="input-wrapper form-group">
                <input type="email" class="form-control" placeholder="Email" name="email" />
                <div class="error" id="email-error"></div>
            </div>
            <div class="input-wrapper form-group">
                <input type="password" class="form-control" placeholder="Password" name="password" />
                <div class="error" id="password-error"></div>
            </div>
            <div class="forgetPassword" id="myBtn">Forget Password?</div>
            <div id="myModal" class="modal">
                <div class="modal-content">
                    <div class="modal-header">
                        <span class="close">&times;</span>
                        <h2>Forget Password</h2>
                    </div>
                    <div class="modal-body">
                        <input type="text" placeholder="Enter your email" id="reset-password-email">
                        <button class="submit" type="button" id="btnResetPassword">Submit</button>
                    </div>
                </div>
            </div>
            <div class="form-action input-wrapper">
                <button class="btn btn-primary btn-login cursor-pointer" type="submit">Log in</button>
                <div class="login-by-social-account">
                    <div class="text"><span>Or login with</span></div>
                    <div class="btn-social-acc">
                        <button id="btn_google"><i class="fab fa-google"></i> Google </button>
                        <button id="btn_facebook"><i class="fab fa-facebook-square"></i> Facebook </button>
                    </div>
                </div>
                <div class="redirect">Don't have an account?
                    <span id="redirect-to-register" class="cursor-pointer">Register</span>
                </div>
            </div>
        </div>
    </form>
</div>
`;

component.homePage = `
<div class="navbar">
    <div class="logo"><a href="index.html">Coding Language For Beginner</a></div>
    <div class="Btn-Login-SignUp">
        <button class="logIn">Log in</button>
        <button class="signUp">Sign up</button>
    </div>
</div>

<div class="main">
    <div class="text">
        <h1>Become your most <br> unstoppable self</h1>
        <h3>Master any subject, one success at a time.</h5>
        <button class="signUp1">Get Started</button><br>
    </div>
    <div class="slides-show">
        <div class="slide-show" id="slide-form">
            <div class="mySlides fade">
                <img src="./img/Slide1.PNG">
                <div class="text">"High-level programming language."</div>
            </div>
            <div class="mySlides fade">
                <img src="./img/Slide2.PNG">
                <div class="text">"JavaScript is high-level, often just-in-time compiled, and multi-paradigm."</div>
            </div>
            <div class="mySlides fade">
                <img src="./img/Slide3.PNG">
                <div class="text">"Multi-paradigm programming language encompassing strong typing."</div>
            </div>
            <div class="mySlides fade">
                <img src="./img/Slide4.PNG">
                <div class="text">"C++ is a general-purpose programming language created by Bjarne Stroustrup"</div>
            </div>
            <div class="mySlides fade">
                <img src="./img/Slide5.PNG">
                <div class="text">"Java is a class-based, object-oriented programming language"</div>
            </div>
        </div>
        <div style="text-align:center">
            <span class="dot" onclick="currentSlide(1)"></span>
            <span class="dot" onclick="currentSlide(2)"></span>
            <span class="dot" onclick="currentSlide(3)"></span>
            <span class="dot" onclick="currentSlide(4)"></span>
            <span class="dot" onclick="currentSlide(5)"></span>
        </div>
    </div>
</div>
`

component.quizPage = `
<div class="navbar">
<div class="logo"><a href="index.html">Coding Language For Beginner</a></div>
<div class="blog"><a href="#">Blog<i class="far fa-newspaper"></i></a></div>
<div class="quizz" id="quiz-button"><a href="#">Quizzes<i class="fas fa-file-alt"></i></a></div>
<div id="create-quiz-button" class="create"><a href="#">Create Quizz<i class="fas fa-folder-plus"></i></a></div>
<div class="dropdown">
            <button onclick="" class="dropbtn"></button>
            <div id="myDropdown" class="dropdown-content">
                <a href="#" id="view-study-sets-button">View study sets</a>
                <a href="#" id="editProfile">Edit Profile</a>
                
                <a href="#" id="btnLogOut">Log out</a>
            </div>
        </div>
</div>

<div class="main-quizz-option">
<h1 class="title-option">Type Of Programming Language</h1>
<div class="list-option">
    <button class="optionJs">
        <i class="fab fa-js-square"></i>
        <div class="learn fixed-learn" id="learnJS">Learn</div>
        <div class="test fixed-test" id="testJs">Test</div>
    </button>
    <button class="optionJava">
        <i class="fab fa-java"></i>
        <div class="learn fixed-learn" id="learnJava">Learn</div>
        <div class="test fixed-test" id="testJava">Test</div>
    </button>
    <button class="optionPython">
        <i class="fab fa-python"></i>
        <div class="learn fixed-learn" id="learnPython">Learn</div>
        <div class="test fixed-test" id="testPython">Test</div>
    </button>
    <button class="optionCsharp">
        <i class="fas fa-copyright"></i>
        <div class="learn fixed-learn" id="learnCsharp">Learn</div>
        <div class="test fixed-test" id="testCsharp">Test</div>
    </button>
</div>

<h1 class="title-option">Quizzes From Our Users</h1>
<div class="main-quizz-option-user">
    <div id="user-quizzes-container" class="list-option-user">
        <button>
            <h1>Topic 1</h1>
            <h2>Created by<span> User1</span></h2>
            <div class="btn">
                <div class="learn user-learn">Learn</div>
                <div class="test user-test">Test</div>
            </div>
        </button>
        <button>
            <h1 id="quiz-title">Topic 2</h1>
            <h2>Created by<span id="user"> User2</span></h2>
            <div class="btn">
                <div class="learn user-learn">Learn</div>
                <div class="test user-test">Test</div>
            </div>
        </button>
        <button>
            <h1 id="quiz-title">Topic 3</h1>
            <h2>Created by<span id="user"> User2</span></h2>
            <div class="btn">
                <div class="learn user-learn">Learn</div>
                <div class="test user-test">Test</div>
            </div>
        </button>
        <button>
            <h1 id="quiz-title">Topic 4</h1>
            <h2>Created by<span id="user"> User2</span></h2>
            <div class="btn">
                <div class="learn user-learn">Learn</div>
                <div class="test user-test">Test</div>
            </div>
        </button>
    </div>
</div>
</div>
`;

component.playQuizPage = `
<div class="navbar">
  <div class="logo"><a href="index.html">Coding Language For Beginner</a></div>
  <div class="blog"><a href="#">Blog<i class="far fa-newspaper"></i></a></div>
  <div class="quizz" id="quiz-button"><a href="#">Quizzes<i class="fas fa-file-alt"></i></a></div>
  <div class="dropdown">
            <button onclick="" class="dropbtn"></button>
            <div id="myDropdown" class="dropdown-content">
                <a href="#" id="view-study-sets-button">View study sets</a>
                <a href="#" id="editProfile">Edit Profile</a>
                
                <a href="#" id="btnLogOut">Log out</a>
            </div>
        </div>
</div>
<div class="main-quizz">
<div id="question"></div>
<div class="answer-list">
    <button id="answer0" class="answer"></button>
    <button id="answer1" class="answer"></button>
    <button id="answer2" class="answer"></button>
    <button id="answer3" class="answer"></button>
</div>
<div id="check-answer" style="display: none">hdfug</div>
</div>
`

component.blogPage = `
<div class="navbar">
        <div class="logo"><a href="index.html">Coding Language For Beginner</a></div>
        <div class="blog"><a href="#">Blog<i class="far fa-newspaper"></i></a></div>
        <div class="quizz" id="quiz-button"><a href="#">Quizzes<i class="fas fa-file-alt"></i></a></div>
        <div class="createBlog" id="create-blog-button"><a href="#">Create Blog <i class="far fa-plus-square"></i></a>
        </div>
        <div class="dropdown">
            <button onclick="" class="dropbtn"></button>
            <div id="myDropdown" class="dropdown-content">
                <a href="#" id="view-study-sets-button">View study sets</a>
                <a href="#" id="editProfile">Edit Profile</a>
                
                <a href="#" id="btnLogOut">Log out</a>
            </div>
        </div>
    </div>
    <div class="main-blog" id="blogList"></div>
`
component.profilePage = `
<div class="navbar">
        <div class="logo"><a href="index.html">Coding Language For Beginner</a></div>
    </div>

    <div class="main-info">
        <div class="header">
            <img src="./img/logo-icon.png" alt="" class="avatar">
            <div class="header-info">
                <h1 class="userName"></h1>
                <button class="editAccountBtn">Edit profile <i class="fas fa-user-edit"></i></button>
                <button class="listBlogBtn">Edit list blog <i class="fas fa-clipboard-list"></i></button>
            </div>
        </div> 
        <div class="edit-form">
            <div id="profile-current-password">
                <input type="password" value="" id="current-password">
                <label for="">Current password</label>
            </div>
            <div class="username">
                <input type="text" value="" id="profile-username">
                <label for="">Username</label>
            </div>
            <div class="email">
                <input type="text" value="" id="profile-email">
                <label for="">Email</label>
            </div>

            <button id="btn_changePassword">Change Password</button>
            <button id="btn-update-profile">Update profile</button>
            <button id="btn-close"><i class="fas fa-window-close"></i></button>
        </div>
        <div id="change-password-container">
            <div class="current-password">
                <input type="password" value="" id="cur-password">
                <label for="">Current password: </label>
            </div>
            <div class="new-password">
                <input type="password" value="" id="change-password">
                <label for="">New password: </label>
            </div>

            <button type="click" id="btn_submitChangePass">Submit</button>
        </div>

        <div class="list-blog-form">
          
        </div>
    </div> 
`

component.addQuizzPage = `
      <div class="navbar">
        <div class="logo"><a href="index.html">Coding Language For Beginner</a></div>
        <div class="blog"><a href="#">Blog<i class="far fa-newspaper"></i></a></div>
        <div class="quizz" id="quiz-button"><a href="#">Quizzes<i class="fas fa-file-alt"></i></a></div>
        <div class="dropdown">
            <button onclick="" class="dropbtn"></button>
            <div id="myDropdown" class="dropdown-content">
                <a href="#" id="view-study-sets-button">View study sets</a>
                <a href="#" id="editProfile">Edit Profile</a>
                
                <a href="#" id="btnLogOut">Log out</a>
            </div>
        </div>
      </div>
      <div class="main-add-quizz">
          <h1 class="add-title">Create a new study set</h1>
          <div class="title">
            <input id="study-set-title" type="text" placeholder="Enter title">
            <h5>Title</h5>
          </div>                   
          <div class="description">
            <input id="study-set-description" type="text" placeholder="Enter description">
            <h5>Description</h5>
          </div>
          <hr>
          <div class="list-question">
            <div class="question">
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
            </div>
          </div>
          <div class="addBtn">
            <i class="fas fa-plus-circle"></i>
          </div>
          <button id="create-button" class="createBtn">Create</button>
      </div>
`
component.editQuizPage = `
<div class="navbar">
        <div class="logo"><a href="index.html">Coding Language For Beginner</a></div>
        <div class="blog"><a href="#">Blog<i class="far fa-newspaper"></i></a></div>
        <div class="quizz" id="quiz-button"><a href="#">Quizzes<i class="fas fa-file-alt"></i></a></div>
        <div class="dropdown">
            <button onclick="" class="dropbtn"></button>
            <div id="myDropdown" class="dropdown-content">
                <a href="#" id="view-study-sets-button">View study sets</a>
                <a href="#" id="editProfile">Edit Profile</a>
                
                <a href="#" id="btnLogOut">Log out</a>
            </div>
        </div>
      </div>
      <div class="main-add-quizz">
          <h1 class="add-title">Edit study set</h1>
          <div class="title">
            <input id="study-set-title" type="text" placeholder="Enter title">
            <h5>Title</h5>
          </div>                   
          <div class="description">
            <input id="study-set-description" type="text" placeholder="Enter description">
            <h5>Description</h5>
          </div>
          <hr>
          <div class="list-question">
            <div class="question">
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
            </div>
          </div>
          <div class="addBtn">
            <i class="fas fa-plus-circle"></i>
          </div>
          <button id="edit-button" class="createBtn">Edit</button>
      </div>`

component.createBlogPage = `
<div class="navbar">
        <div class="logo"><a href="index.html">Coding Language For Beginner</a></div>
        <div class="blog"><a href="#">Blog<i class="far fa-newspaper"></i></a></div>
        <div class="quizz" id="quiz-button"><a href="#">Quizzes<i class="fas fa-file-alt"></i></a></div>
        <div class="dropdown">
            <button onclick="" class="dropbtn"></button>
            <div id="myDropdown" class="dropdown-content">
                <a href="#" id="view-study-sets-button">View study sets</a>
                <a href="#" id="editProfile">Edit Profile</a>
                <a href="#" id="btnLogOut">Log out</a>
            </div>
        </div>
    </div>
    <form id="createBlogForm">
        <div class="info-blog">
            <div class="title-blog">
                <label for="">Title: </label>
                <input type="text" value="" id="blogTitle" placeholder="Enter Title" required>
            </div>
            <div class="description-blog">
                <label for="">Description: </label>
                <input type="text" value="" id="blogDescription" placeholder="Enter Description" required>
            </div>
            <div class="image-blog">
                <label for="">File: </label>
                <input type="file" id="inputImage" required>
            </div>
        </div>
        <div class="content-blog">
            <label for="">Content: </label>
            <textarea id="blogContent" name="blogContent" rows="15" cols="50"></textarea>
        </div>
            <button id="btnCreateBlog" >Publish</button>
    </form>
`

component.detailBlogPage = `
<div class="navbar">
<div class="logo"><a href="index.html">Coding Language For Beginner</a></div>
<div class="blog"><a href="#">Blog<i class="far fa-newspaper"></i></a></div>
<div class="quizz" id="quiz-button"><a href="#">Quizzes<i class="fas fa-file-alt"></i></a></div>
<div class="dropdown">
            <button onclick="" class="dropbtn"></button>
            <div id="myDropdown" class="dropdown-content">
                <a href="#" id="view-study-sets-button">View study sets</a>
                <a href="#" id="editProfile">Edit Profile</a>
                
                <a href="#" id="btnLogOut">Log out</a>
            </div>
        </div>
</div>
<div class="main-blog-detail">
  <h1 class="title-blog-detail"></h1>
  <div class="description-blog-detail"></div>
  <div class="time-to-create"></div>
  <br><hr>
  <div class="content-blog-detail"></div>
</div>
`
component.learnPage = `
<div class="navbar">
        <div class="logo"><a href="index.html">Coding Language For Beginner</a></div>
        <div class="blog"><a href="#">Blog<i class="far fa-newspaper"></i></a></div>
        <div class="quizz" id="quiz-button"><a href="#">Quizzes<i class="fas fa-file-alt"></i></a></div>
        <div class="dropdown">
            <button onclick="" class="dropbtn"></button>
            <div id="myDropdown" class="dropdown-content">
                <a href="#" id="view-study-sets-button">View study sets</a>
                <a href="#" id="editProfile">Edit Profile</a>
                
                <a href="#" id="btnLogOut">Log out</a>
            </div>
        </div>
    </div>
    <div id="listStudySet">
        <div class="" id="flashCard">
            <div id="question"></div>
            <div id="answer" hidden></div>
        </div>
    </div>
    <div class="listBtn">
        <button type="button" id="btnPrev"><i class="fas fa-arrow-left"></i> prev</button>
        <button type="button" id="btnNext">next <i class="fas fa-arrow-right"></i> </button>
    </div>
`
component.studySetPage = `
<div class="navbar">
        <div class="logo"><a href="index.html">Coding Language For Beginner</a></div>
        <div class="blog"><a href="#">Blog<i class="far fa-newspaper"></i></a></div>
        <div class="quizz" id="quiz-button"><a href="#">Quizzes<i class="fas fa-file-alt"></i></a></div>
        <div class="dropdown">
            <button onclick="" class="dropbtn">Dropdown</button>
            <div id="myDropdown" class="dropdown-content">
                <a href="#" id="view-study-sets-button">View study sets</a>
                <a href="#" id="editProfile">Edit Profile</a>
                
                <a href="#" id="btnLogOut">Log out</a>
            </div>
        </div>
    </div>
<div id="study-set-container">
    <h1>Select Quizz</h1>
</div>
`