// quiz.js

const quizContainer = document.querySelector(".quiz-container");
let currentQuestionIndex = 0;
let score = 0;

// The myQuiz array from your original file goes here.
// I've moved it to questions.js as you had it.

function startQuiz() {
    quizContainer.innerHTML = '';
    currentQuestionIndex = 0;
    score = 0;
    displayCurrentQuestion();
}

function displayCurrentQuestion() {
    // Clear previous question before showing the new one
    quizContainer.innerHTML = ''; 

    if (currentQuestionIndex < myQuiz.length) {
        const questionObj = myQuiz[currentQuestionIndex];
        // The createQuestionElement now returns a DOM element, not a string
        const questionElement = createQuestionElement(questionObj, currentQuestionIndex);
        quizContainer.appendChild(questionElement);
        
        questionElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
        showFinalScore();
    }
}

function createQuestionElement(questionObj, questionIndex) {
    // Create elements dynamically instead of using innerHTML for better event handling
    const questionBlock = document.createElement('div');
    questionBlock.className = 'question-block';
    questionBlock.id = `question-${questionIndex}`;

    const questionText = document.createElement('h2');
    questionText.className = 'question-text';
    questionText.textContent = questionObj.question;
    questionBlock.appendChild(questionText);

    const optionsContainer = document.createElement('div');
    optionsContainer.className = 'options-container';

    questionObj.options.forEach((option) => {
        const optionDiv = document.createElement('div');
        optionDiv.className = 'option';
        optionDiv.innerHTML = `<input type="radio" name="q${questionIndex}"><label>${option.text}</label>`;
        
        // Add click listener
        optionDiv.onclick = () => handleQuizChoice(optionDiv, option.text, questionBlock);
        
        optionsContainer.appendChild(optionDiv);
    });

    questionBlock.appendChild(optionsContainer);
    
    const explanationP = document.createElement('p');
    explanationP.className = 'explanation';
    explanationP.id = `explanation-${questionIndex}`;
    explanationP.style.display = 'none';
    questionBlock.appendChild(explanationP);

    return questionBlock;
}

function handleQuizChoice(optionElement, selectedValue, questionBlock) {
    const questionObj = myQuiz[currentQuestionIndex];
    const isCorrect = selectedValue === questionObj.correctAnswer;
    
    if (isCorrect) {
        score++;
        optionElement.style.backgroundColor = '#90EE90'; // Light Green
    } else {
        optionElement.style.backgroundColor = '#FFCCCB'; // Light Red
    }

    // Disable all other options
    const allOptions = questionBlock.querySelectorAll('.option');
    allOptions.forEach(opt => {
        opt.onclick = null; // Remove click listener
        opt.style.cursor = 'default';
        if (myQuiz[currentQuestionIndex].options.find(o => o.text === opt.querySelector('label').textContent).text === questionObj.correctAnswer) {
            // Highlight the correct answer if the user was wrong
            if (!isCorrect) {
                 opt.style.backgroundColor = '#90EE90';
            }
        }
    });

    // Show explanation
    const explanationEl = questionBlock.querySelector('.explanation');
    explanationEl.innerHTML = `<strong>Explanation:</strong> ${questionObj.explanation}`;
    explanationEl.style.display = 'block';

    // Add a "Next Question" button
    const nextButton = document.createElement('button');
    nextButton.textContent = 'Next Question';
    nextButton.className = 'next-button';
    nextButton.onclick = () => {
        currentQuestionIndex++;
        displayCurrentQuestion();
    };
    questionBlock.appendChild(nextButton);
}

function showFinalScore() {
    quizContainer.innerHTML = `
        <div class="question-block result-block">
            <h2>Quiz Complete!</h2>
            <p>Your final score is: <strong>${score} out of ${myQuiz.length}</strong></p>
            <button onclick="startQuiz()" class="next-button">Try Again</button>
        </div>
    `;
    document.querySelector('.result-block').scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// Start the quiz when the script loads
startQuiz();

