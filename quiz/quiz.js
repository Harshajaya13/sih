// quiz.js

const quizContainer = document.querySelector(".quiz-container");
let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    quizContainer.innerHTML = '';
    currentQuestionIndex = 0;
    score = 0;
    displayCurrentQuestion();
}

function displayCurrentQuestion() {
    if (currentQuestionIndex < myQuiz.length) {
        const questionObj = myQuiz[currentQuestionIndex];
        quizContainer.innerHTML += createQuestionElement(questionObj, currentQuestionIndex);
        
        const newQuestionElement = document.getElementById(`question-${currentQuestionIndex}`);
        newQuestionElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
        showFinalScore();
    }
}

function createQuestionElement(questionObj, questionIndex) {
    let questionHTML = `<div class="question-block" id="question-${questionIndex}">`;
    questionHTML += `<h2 class="question-text">${questionObj.question}</h2>`;
    questionHTML += `<div class="options-container">`;
    questionObj.options.forEach((option) => {
        questionHTML += `
            <div class="option" onclick="handleQuizChoice(this, '${option.text}')">
                <input type="radio" name="q${questionIndex}">
                <label>${option.text}</label>
            </div>
        `;
    });
    questionHTML += `</div><p class="explanation" id="explanation-${questionIndex}" style="display:none;"></p></div>`;
    return questionHTML;
}

function handleQuizChoice(optionElement, selectedValue) {
    const questionObj = myQuiz[currentQuestionIndex];
    const isCorrect = selectedValue === questionObj.correctAnswer;
    
    if (isCorrect) {
        score++;
        optionElement.style.backgroundColor = '#90EE90'; // Light Green
    } else {
        optionElement.style.backgroundColor = '#FFCCCB'; // Light Red
    }

    const explanationEl = document.getElementById(`explanation-${currentQuestionIndex}`);
    explanationEl.innerHTML = `<strong>Explanation:</strong> ${questionObj.explanation}`;
    explanationEl.style.display = 'block';

    const allOptions = document.querySelectorAll(`#question-${currentQuestionIndex} .option`);
    allOptions.forEach(opt => opt.onclick = null);

    setTimeout(() => {
        currentQuestionIndex++;
        displayCurrentQuestion();
    }, 1000);
}

function showFinalScore() {
    quizContainer.innerHTML += `
        <div class="question-block result-block">
            <h2>Quiz Complete!</h2>
            <p>Your final score is: <strong>${score} out of ${myQuiz.length}</strong></p>
        </div>
    `;
    document.querySelector('.result-block').scrollIntoView({ behavior: 'smooth', block: 'center' });
}

startQuiz();
