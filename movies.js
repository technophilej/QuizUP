const questions = [
    { question: "Who directed the movie 'Inception'?", answers: ["Steven Spielberg", "Christopher Nolan", "James Cameron", "Quentin Tarantino"], correct: "Christopher Nolan" },
    { question: "Which movie features the quote, 'I'll be back'?", answers: ["The Terminator", "RoboCop", "Die Hard", "Predator"], correct: "The Terminator" },
    { question: "Who played Jack Dawson in 'Titanic'?", answers: ["Brad Pitt", "Johnny Depp", "Leonardo DiCaprio", "Tom Cruise"], correct: "Leonardo DiCaprio" },
    { question: "In 'The Matrix', does Neo take the blue pill or the red pill?", answers: ["Blue", "Red", "Neither", "Both"], correct: "Red" },
    { question: "Which movie won the first-ever Academy Award for Best Picture?", answers: ["Gone with the Wind", "Wings", "The Jazz Singer", "Citizen Kane"], correct: "Wings" }
];

let currentQuestionIndex = 0;
let score = 0;

const questionContainer = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const scoreContainer = document.getElementById("score-container");
const scoreElement = document.getElementById("score");

function showQuestion(index) {
    resetState();
    let questionObj = questions[index];
    questionElement.innerText = questionObj.question;
    questionObj.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerText = answer;
        button.classList.add("btn");
        if (answer === questionObj.correct) {
            button.dataset.correct = true;
        }
        button.addEventListener("click", selectAnswer);
        answerButtons.appendChild(button);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    if (correct) {
        score++;
        selectedButton.classList.add("correct");
    } else {
        selectedButton.classList.add("wrong");
    }
    Array.from(answerButtons.children).forEach(button => {
        button.disabled = true;
        if (button.dataset.correct) {
            button.classList.add("correct");
        }
    });
    nextButton.style.display = "inline";
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion(currentQuestionIndex);
    } else {
        showScore();
    }
}

function showScore() {
    questionContainer.style.display = "none";
    scoreContainer.style.display = "block";
    scoreElement.innerText = `${score} out of ${questions.length}`;
}

// Start the quiz with the first question
showQuestion(currentQuestionIndex);
