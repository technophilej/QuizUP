const questions = [
    { question: "What is the capital of France?", answers: ["Paris", "Berlin", "Rome", "Madrid"], correct: "Paris" },
    { question: "How many continents are there?", answers: ["5", "6", "7", "8"], correct: "7" },
    { question: "Which planet is known as the Red Planet?", answers: ["Earth", "Mars", "Jupiter", "Saturn"], correct: "Mars" },
    { question: "What is the largest ocean on Earth?", answers: ["Atlantic", "Indian", "Arctic", "Pacific"], correct: "Pacific" },
    { question: "Which country hosted the 2016 Olympics?", answers: ["China", "Brazil", "Japan", "Canada"], correct: "Brazil" }
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
