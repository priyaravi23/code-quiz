const quizChallengePage = document.querySelector(".quizChallengePage");
const startBtn = document.querySelector("#startBtn");

const quizQuestionsPage = document.querySelector("#quizQuestionsPage");
const quizQuestionHeader = document.querySelector("#quizQuestionHeader");
const choice1 = document.getElementById("one");
const choice2 = document.getElementById("two");
const choice3 = document.getElementById("three");
const choice4 = document.getElementById("four");

const answerResponse = document.querySelector("#answerResponse");
const finalScorePage = document.querySelector(".finalScorePage");
const finalScoreIs = document.querySelector("#finalScoreIs");

const hrDiv = document.getElementById('div-hr');
const hrElem = document.createElement('HR');
let arrayOfHighscores = localStorage.getItem("saveUserScoreLocal");

let secondsLeft = 75;
let startScore = 0;
let questionIndex = 0;
let timer = document.getElementById("timer");
let timerInterval;
let timerRunning = true;

const submitBtn = document.querySelector("#submitBtn");
const initials = document.querySelector("#initials");
const initialInput = document.querySelector("#initialInput");

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

document.addEventListener('readystatechange', () => {
    if (document.readyState === 'interactive') {
        init();
    }
});

function init() {
    const goBackBtn = document.getElementById("goBack");
    const ol = document.getElementById('list');
    const clearHighScoreBtn = document.getElementById("clearHighScore");
    const highScoreList = document.getElementById('highScoreList');
    const scoreContainer = document.querySelector('#score-container');

    // Go back to coding quiz challenge page
    goBackBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = './index.html';

    });

    // clear the local storage and the list of high scores
    clearHighScoreBtn.addEventListener('click', () => {
        localStorage.clear();

        while (ol.firstChild) {
            ol.removeChild(ol.firstChild);
        }

        if (!ol.hasChildNodes()) {
            clearHighScoreBtn.disabled = true;
            scoreContainer.removeChild(highScoreList);
        }
    });

    // Create a list item and display the details for each submitted score
    arrayOfHighscores = JSON.parse(arrayOfHighscores);

    for (let i = 0; i < arrayOfHighscores.length; i++) {
        let highscoreLine = arrayOfHighscores[i];
        let li = document.createElement('li');
        li.textContent = `${i + 1}. ${highscoreLine.name} - ${highscoreLine.score}`;
        ol.appendChild(li);
    }
}

quizQuestionsPage.style.display = "none";
finalScorePage.style.display = "none";

// holder text in nav bar
timer.textContent = `Time: ${startScore}`;

function startQuiz() {
    finalScorePage.style.display = "none";
    quizChallengePage.style.display = "none";
    quizQuestionsPage.style.display = "block";

    showQuestions();

    timerInterval = setInterval(function () {
        timer.textContent = `Time: ${secondsLeft}`;
        if (timerRunning === false) {
            clearInterval(timerInterval);
        }
        if (secondsLeft === 0) {
            showFinalScore();
        } else {
            secondsLeft--;
        }
    }, 1000);
}

function showQuestions() {
    let q = quizQuestions[questionIndex];

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

function checkAnswer(event) {
    event.preventDefault();

    let answer = event.currentTarget.dataset.answer;
    let correctAnswer = null;
    hrElem.classList.add('hr-style');
    hrDiv.appendChild(hrElem);

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
    hrDiv.removeChild(hrElem);

    if (startScore === 0 || quizQuestions.length - 1) {
        finalScoreIs.textContent = `Your final score is ${secondsLeft}`;
        timerRunning = false;
    }
}

submitBtn.textContent = "Submit";
initials.textContent = "Enter Your Initials: ";

function saveHighScores() {
    window.location.href = './score.html';
    let getInitials = initialInput.value;
    secondsLeft = secondsLeft + 1;

    localStorage.setItem("initials", getInitials);
    localStorage.setItem("secondsLeft", secondsLeft);

    let userScore = {
        name: `${getInitials}`,
        score: `${secondsLeft}`
    };

    arrayOfHighscores.push(userScore);
    localStorage.setItem("saveUserScoreLocal", JSON.stringify(arrayOfHighscores));
}

function loadHighScores() {
    if (!arrayOfHighscores) {
        arrayOfHighscores = [];
    } else {
        arrayOfHighscores = JSON.parse(arrayOfHighscores);
    }
}

startBtn.addEventListener('click', startQuiz);
submitBtn.addEventListener('click', saveHighScores);
choice1.addEventListener('click', (event) => {
    checkAnswer(event);
});

choice2.addEventListener('click', (event) => {
    checkAnswer(event);
});

choice3.addEventListener('click', (event) => {
    checkAnswer(event);
});

choice4.addEventListener('click', (event) => {
    checkAnswer(event);
});

loadHighScores();
