const questions = [
    { question: "Who built the ark?", answers: ["Moses", "Noah", "Abraham", "Jacob"], correct: "Noah" },
    { question: "What is the first book of the Bible?", answers: ["Genesis", "Exodus", "Leviticus", "Numbers"], correct: "Genesis" },
    { question: "Who was swallowed by a great fish?", answers: ["Moses", "Jonah", "Daniel", "Elijah"], correct: "Jonah" },
    { question: "Who was the mother of Jesus?", answers: ["Mary", "Elizabeth", "Martha", "Ruth"], correct: "Mary" },
    { question: "In which city was Jesus born?", answers: ["Nazareth", "Jerusalem", "Bethlehem", "Capernaum"], correct: "Bethlehem" }
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
