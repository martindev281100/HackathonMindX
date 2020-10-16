const quizzes = [
    {
        "category" : "JavaScript",
        "question" : "Inside which HTML element do we put the JavaScript?",
        "correct_answer" : "<script>",
        "incorrect_answers" : [
            "<js>",
            "<scripting>",
            "<javascript>"
        ]
    },
    {
        "category" : "JavaScript",
        "question" : "What is the correct JavaScript syntax to change the content of the HTML element below?<p id=\"demo\">This is a demonstration.</p>",
        "correct_answer" : " document.getElementById(\"demo\").innerHTML = \"Hello World!\";",
        "incorrect_answers" : [
            "document.getElement(\"p\").innerHTML = \"Hello World!\";",
            "document.getElementByName(\"p\").innerHTML = \"Hello World!\";",
            "#demo.innerHTML = \"Hello World!\";"
        ]
    },
    {
        "category" : "JavaScript",
        "question" : "How does a FOR loop start?",
        "correct_answer" : "for (i = 0; i <= 5; i++)",
        "incorrect_answers" : [
            "for (i <= 5; i++)",
            "for (i = 0; i <= 5)",
            "for i = 1 to 5"
        ]
    },
    {
        "category" : "JavaScript",
        "question" : "How do you write \"Hello World\" in an alert box?",
        "correct_answer" : "alert(\"Hello World\");",
        "incorrect_answers" : [
            "msgBox(\"Hello World\");",
            "alertBox(\"Hello World\");",
            "msg(\"Hello World\");"
        ]
    },
    {
        "category" : "JavaScript",
        "question" : "How to write an IF statement in JavaScript?",
        "correct_answer" : "if (i == 5)",
        "incorrect_answers" : [
            "if i = 5",
            "if i = 5 then",
            "if i == 5 then"
        ]
    },
    {
        "category" : "Java",
        "question" : "What is a correct syntax to output \"Hello World\" in Java?",
        "correct_answer" : "System.out.println(\"Hello World\");",
        "incorrect_answers" : [
            "echo(\"Hello World\");",
            "Console.WriteLine(\"Hello World\");",
            "print (\"Hello World\");"
        ]
    },
    {
        "category" : "Java",
        "question" : "Which data type is used to create a variable that should store text?",
        "correct_answer" : "String",
        "incorrect_answers" : [
            "myString",
            "string",
            "Txt"
        ]
    },
    {
        "category" : "Java",
        "question" : "How do you create a variable with the floating number 2.8?",
        "correct_answer" : "float x = 2.8f;",
        "incorrect_answers" : [
            "byte x = 2.8f;",
            "x = 2.8f;",
            "int x = 2.8f;"
        ]
    },
    {
        "category" : "Java",
        "question" : "Which method can be used to find the length of a string?",
        "correct_answer" : "length()",
        "incorrect_answers" : [
            "getLength()",
            "getSize()",
            "len()"
        ]
    },
    {
        "category" : "Java",
        "question" : "Which operator is used to add together two values?",
        "correct_answer" : "The + sign",
        "incorrect_answers" : [
            "The = sign",
            "The - sign",
            "The * sign"
        ]
    },
    {
        "category" : "Python",
        "question" : "What is a correct syntax to output \"Hello World\" in Python?",
        "correct_answer" : "print(\"Hello World\")",
        "incorrect_answers" : [
            "echo(\"Hello World\")",
            "echo \"Hello World\"",
            "p(\"Hello World\")"
        ]
    },
    {
        "category" : "Python",
        "question" : "Which one is NOT a legal variable name?",
        "correct_answer" : "my-var",
        "incorrect_answers" : [
            "Myvar",
            "_myvar",
            "my_var"
        ]
    },
    {
        "category" : "Python",
        "question" : "What is the correct file extension for Python files?",
        "correct_answer" : ".py",
        "incorrect_answers" : [
            ".pyth",
            ".pyt",
            ".pt"
        ]
    },
    {
        "category" : "Python",
        "question" : "What is the correct syntax to output the type of a variable or object in Python?",
        "correct_answer" : "print(type(x))",
        "incorrect_answers" : [
            "print(typeOf(x))",
            "print(typeof(x))",
            "print(typeof x)"
        ]
    },
    {
        "category" : "Python",
        "question" : "Which method can be used to replace parts of a string?",
        "correct_answer" : "replace()",
        "incorrect_answers" : [
            "replaceString()",
            "switch()",
            "repl()"
        ]
    },
    {
        "category" : "C++",
        "question" : "What is a correct syntax to output \"Hello World\" in C++?",
        "correct_answer" : "cout << \"Hello World\";",
        "incorrect_answers" : [
            "Console.WriteLine(\"Hello World\");",
            "print (\"Hello World\");",
            "System.out.println(\"Hello World\");"
        ]
    },
    {
        "category" : "C++",
        "question" : "Which data type is used to create a variable that should store text?",
        "correct_answer" : "string",
        "incorrect_answers" : [
            "myString",
            "String",
            "Txt"
        ]
    },
    {
        "category" : "C++",
        "question" : "Which header file lets us work with input and output objects?",
        "correct_answer" : "#include <iostream>",
        "incorrect_answers" : [
            "#include <stream>",
            "#include <iosstring>",
            "#include <inputstr>"
        ]
    },
    {
        "category" : "C++",
        "question" : "Which operator can be used to compare two values?",
        "correct_answer" : "==",
        "incorrect_answers" : [
            "=",
            "><",
            "<>"
        ]
    },
    {
        "category" : "C++",
        "question" : "How do you create a function in C++?",
        "correct_answer" : "functionName()",
        "incorrect_answers" : [
            "functionName[]",
            "functionName.",
            "(functionName)"
        ]
    },
]