const myQuiz = [
    {
        question: "What is the output of this code? `console.log(typeof null);`",
        options: [
            { text: "null" },
            { text: "undefined" },
            { text: "object" }
        ],
        correctAnswer: "object",
        explanation: "This is a famous, long-standing bug in JavaScript. The data type of `null` is officially `object`, even though it represents the absence of an object."
    },
    {
        question: "What does the `===` operator do?",
        options: [
            { text: "It checks for equality without performing type coercion." },
            { text: "It assigns a value to a variable." },
            { text: "It checks for equality after converting both values to a common type." }
        ],
        correctAnswer: "It checks for equality without performing type coercion.",
        explanation: "The strict equality operator (`===`) checks if two values are of the same type and have the same value. The abstract equality operator (`==`) performs type coercion before comparing[95, 96]."
    },
    {
        question: "Consider `const a = {}; const b = a;`. What is the result of `a === b`?",
        options: [
            { text: "true" },
            { text: "false" },
            { text: "It throws an error." }
        ],
        correctAnswer: "true",
        explanation: "Objects are reference types. When you assign `b = a`, both variables point to the exact same object in memory. Therefore, they are strictly equal."
    },
    {
        question: "What will `console.log(2 + '2');` output?",
        options: [
            { text: "4" },
            { text: "22" },
            { text: "NaN" }
        ],
        correctAnswer: "22",
        explanation: "The `+` operator, when used with a string, performs concatenation, not addition. It converts the number `2` into a string and joins it with the string `'2'`."
    },
    {
        question: "Which of these is NOT a correct way to declare a variable in modern JavaScript (ES6+)?",
        options: [
            { text: "let myVar = 10;" },
            { text: "const myVar = 10;" },
            { text: "variable myVar = 10;" }
        ],
        correctAnswer: "variable myVar = 10;",
        explanation: "In modern JavaScript, variables are declared using `let` (for re-assignable variables), `const` (for constants), and `var` (the older way). `variable` is not a valid keyword."
    },
    {
        question: "What is the output of this code? `for (let i = 0; i < 3; i++) { setTimeout(() => console.log(i), 1); }`",
        options: [
            { text: "0 1 2" },
            { text: "3 3 3" },
            { text: "undefined undefined undefined" }
        ],
        correctAnswer: "0 1 2",
        explanation: "Because `let` is block-scoped, a new `i` is created for each iteration of the loop. Each `setTimeout` callback captures its own unique value of `i`, so it logs 0, 1, and 2."
    },
    {
        question: "What does `!!'hello'` evaluate to?",
        options: [
            { text: "true" },
            { text: "false" },
            { text: "'hello'" }
        ],
        correctAnswer: "true",
        explanation: "The double-negation `!!` is a common way to coerce a value to a boolean. The first `!` converts the truthy string `'hello'` to `false`. The second `!` negates that, resulting in `true`."
    }
];
