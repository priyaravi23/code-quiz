document.addEventListener('readystatechange', () => {
    if (document.readyState === 'interactive') {
        init();
    }
});

let arrayOfHighscores = localStorage.getItem("saveUserScoreLocal");

function init() {
    let goBackBtn = document.getElementById("goBack");
    let clearHighScoreBtn = document.getElementById("clearHighScore");
    let ul = document.getElementById("highScoreList");

    // Go back to coding quiz challenge
    goBackBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = './index.html';

    });

    // clear the local storage and the list of high scores

    clearHighScoreBtn.addEventListener('click', () => {
        localStorage.clear();

        while (ul.firstChild) {
            ul.removeChild(ul.firstChild);
        }
    });

    // Create a list item display the details for each submitted score
    arrayOfHighscores = JSON.parse(arrayOfHighscores);

    for (let i = 0; i < arrayOfHighscores.length; i++) {
        let highscoreLine = arrayOfHighscores[i];
        let li = document.createElement('li');
        li.textContent = `${highscoreLine.name} - ${highscoreLine.score}`;
        ul.appendChild(li);
    }
}

let submitButton = document.querySelector("#submitButton");

let quizQuestionHeader = document.querySelector("#quizQuestionHeader");
let choice1 = document.getElementById("one");
let choice2 = document.getElementById("two");
let choice3 = document.getElementById("three");
let choice4 = document.getElementById("four");
let answerResponse = document.querySelector("#answerResponse");

let finalScoreIs = document.querySelector("#finalScoreIs");
let quizQuestionsPage = document.querySelector("#quizQuestionsPage");

let quizChallengePage = document.querySelector(".quizChallengePage");
let finalScorePage = document.querySelector(".finalScorePage");

// List of quiz questions
let quizQuestions = [
    {
        "quizQuestionHeader": "Commonly used Data Types do NOT Include:",
        "one": "1. strings",
        "two": "2. booleans",
        "three": "3. alerts",
        "four": "4. numbers",
        "correct": "3. alerts",
    }, {
        "quizQuestionHeader": "The condition in an if / else statement is enclosed within ________.",
        "one": "1. quotes",
        "two": "2. curly brackets",
        "three": "3. parenthesis",
        "four": "4. square brackets",
        "correct": "3. parenthesis",
    }, {
        "quizQuestionHeader": "Arrays in JavaScript can be used to store ________.",
        "one": "1. numbers and strings",
        "two": "2. other arrays",
        "three": "3. booleans",
        "four": "4. all of the above",
        "correct": "4. all of the above",
    }, {
        "quizQuestionHeader": "String values must be enclosed within ________ when being assigned to variables",
        "one": "1. commas",
        "two": "2. curly brackets",
        "three": "3. quotes",
        "four": "4. parenthesis",
        "correct": "3. quotes",
    }, {
        "quizQuestionHeader": "A very useful tool used for developing and debugging for printing content to the debugger is:",
        "one": "1. JavaScript",
        "two": "2. terminal / bash",
        "three": "3. for loops",
        "four": "4. console.log",
        "correct": "4. console.log",
    },
];

quizQuestionsPage.style.display = "none";
finalScorePage.style.display = "none";

submitButton.addEventListener("click", startQuiz);

let secondsLeft = 80;
let startScore = 0;
let timer = document.getElementById("timer");

// holder text in nav bar
timer.textContent = `Time: ${startScore}`;

function startQuiz() {
    finalScorePage.style.display = "none";
    quizChallengePage.style.display = "none";
    quizQuestionsPage.style.display = "block";

    var timerInterval = setInterval(function () {
        secondsLeft--;
        timer.textContent = `Time: ${secondsLeft}`;

        if (secondsLeft === 0 || (quizQuestions.length === (questionIndex + 1))) {
            clearInterval(timerInterval);
            showFinalScore();
        }
    }, 1000);
}

let questionIndex = 0;

function showQuestions() {
    var q = quizQuestions[questionIndex];

    quizQuestionHeader.innerHTML = q.quizQuestionHeader;
    choice1.innerHTML = q.one;
    choice1.setAttribute("data-answer", q.one);
    choice2.innerHTML = q.two;
    choice2.setAttribute("data-answer", q.two);
    choice3.innerHTML = q.three;
    choice3.setAttribute("data-answer", q.three);
    choice4.innerHTML = q.four;
    choice4.setAttribute("data-answer", q.four);
}

showQuestions();
choice1.addEventListener("click", function (event) {
    checkAnswer(event);
});

choice2.addEventListener("click", function (event) {
    checkAnswer(event);
});

choice3.addEventListener("click", function (event) {
    checkAnswer(event);
});

choice4.addEventListener("click", function (event) {
    checkAnswer(event);
});

function checkAnswer(event) {
    event.preventDefault();

    let answer = event.currentTarget.dataset.answer;
    let correctAnswer = null;

    if (quizQuestions[questionIndex].correct === answer) {
        correctAnswer = answer;
    }

    if (answer === correctAnswer) {
        answerResponse.textContent = "Correct!";
    } else {
        answerResponse.textContent = "Wrong!";
        secondsLeft -= 10;

        if (secondsLeft < 0) {
            secondsLeft = 0;
        }
    }

    if (quizQuestions.length === questionIndex + 1) {
        showFinalScore();
        return;
    }

    questionIndex++;
    showQuestions();
}

function showFinalScore() {
    quizChallengePage.style.display = "none";
    quizQuestionsPage.style.display = "none";
    answerResponse.style.display = "none";
    finalScorePage.style.display = "block";

    if (startScore === 0 || quizQuestions.length - 1) {
        finalScoreIs.textContent = `Your final score is ${secondsLeft}`;
    }
}

let initialButton = document.querySelector("#initialButton");
let initials = document.querySelector("#initials");
let initialInput = document.querySelector("#initialInput");
let getInitials;

initialButton.textContent = "Submit";
initials.textContent = "Enter Your Initials: ";

initialButton.addEventListener("click", function () {
    getInitials = initialInput.value;

    localStorage.setItem("initials", getInitials);
    localStorage.setItem("secondsLeft", secondsLeft);

    var userScore = {
        name: `${getInitials}`,
        score: `${secondsLeft}`
    };

    arrayOfHighscores.push(userScore);
    localStorage.setItem("saveUserScoreLocal", JSON.stringify(arrayOfHighscores));
});

if (!arrayOfHighscores) {
    arrayOfHighscores = [];
} else {
    arrayOfHighscores = JSON.parse(arrayOfHighscores);
}

