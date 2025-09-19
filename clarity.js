/**
 * A helper function to make a question visible and then smoothly scroll down to it.
 * @param {string} elementId The ID of the question block to show.
 */

function revealAndScroll(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.hidden = false;
        // This is the key part: it tells the browser to scroll to the element.
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

function handleChoice(step, choice) {
    if (step === 1) {
        // If user chose "apps", jump straight to the direct questions.
        // Otherwise, show the next analogy.
        const nextElementId = (choice === 'apps') ? 'step1' : 'interior-analogy';
        revealAndScroll(nextElementId);
    }

    if (step === 2) {
        // After the second analogy, always go to the direct questions.
        revealAndScroll('step1');
    }

    if (step === 3) {
        // Show the correct follow-up question based on their direct choice.
        if (choice === 'frontend') {
            revealAndScroll('question-frontend');
        } else if (choice === 'backend') {
            revealAndScroll('question-backend');
        } else if (choice === 'mobile') {
            revealAndScroll('question-mobile');
        }
    }

    if (step === 4) {
        // Based on the final choice, show the result.
        if (choice === 'uiux') {
            showResult("Your Path is UI/UX Design", "You love crafting beautiful user experiences. Your journey starts with design tools. Your Starter Pack: <strong>Figma, HTML, and CSS</strong>.");
        } else if (choice === 'frontend-dev') {
            showResult("Your Path is Front-End Development", "You love bringing designs to life with code. Your journey starts with the core languages of the web. Your Starter Pack: <strong>HTML, CSS, and JavaScript</strong>.");
        } else if (choice === 'enterprise') {
            showResult("Your Path is Enterprise Back-End", "You want to build the robust, secure systems that power big businesses. Your journey starts with powerful, established languages. Your Starter Pack: <strong>Java or C#</strong>.");
        } else if (choice === 'modern-backend') {
            showResult("Your Path is Modern Web Back-End", "You want to build fast, flexible APIs and services for modern web apps. Your journey starts with today's most popular web technologies. Your Starter Pack: <strong>Python (with Django) or Node.js</strong>.");
        } else if (choice === 'ios') {
            showResult("Your Path is iOS Development", "You're excited to build apps for the Apple ecosystem. Your journey starts with Apple's modern programming language. Your Starter Pack: <strong>Swift and Xcode</strong>.");
        } else if (choice === 'android') {
            showResult("Your Path is Android Development", "You want to build apps for the most popular mobile platform in the world. Your journey starts with Google's official language. Your Starter Pack: <strong>Kotlin and Android Studio</strong>.");
        } else if (choice === 'cross-platform') {
            showResult("Your Path is Cross-Platform Development", "You want to write code once and have it run on both iPhones and Android phones. Your journey starts with a powerful cross-platform framework. Your Starter Pack: <strong>React Native or Flutter</strong>.");
        }
    }
}

function showResult(title, description) {
    const resultTitle = document.getElementById('result-title');
    const resultDescription = document.getElementById('result-description');
 
    resultTitle.textContent = title;
    resultDescription.innerHTML = description;

    // Use our new helper function to reveal and scroll to the final result.
    revealAndScroll('result-container');
}
