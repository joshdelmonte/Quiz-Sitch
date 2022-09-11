const question = document.querySelector('#pergunta');
const choices = Array.from(document.querySelectorAll('.textus-arbitrium'));
const progressText = document.querySelector('.progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {};
let acceptedAnser = true;
let score = 0;
let questionCounter = 0
let availableQuestions = []
// setting questions to cycle through
let questions = [
    {
        question: "This thing all things devours. Birds, beasts, trees, flowers. Gnaws Iron bites steal, and grinds hard stones to meal. What am I?",
        choice1: "light",
        choice2: "water",
        choice3: "time",
        choice4: "darkness",
        answer: "time", 
    },
    {
        question: "What does a 'Window' interface do?",
        choice1: "Allows us to look through it",
        choice2: "Look pretty",
        choice3: "Access the interior API",
        choice4: "Represents a window containing a DOM document",
        answer: "Access the interior API"
    },
    {
        question: "What type of value is a true/false statement?",
        choice1: "string",
        choice2: "integer",
        choice3: "crime",
        choice4: "boolean",
        answer: "boolean", 
    },
    {
        question: "Ceci n'est pas une pipe?",
        choice1: "Oui",
        choice2: "Non",
        choice3: "Oui",
        choice4: "Non",
        answer: "Non", 
    },
    
]

const TALLIED_SCORE = 100;
const PERGUNTA_MAX = 4;

commenceGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    novaPergunta();
}
// accessing local storage
getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter > PERGUNTA_MAX) {
        localStorage.setItem('mostRecentScore', score);

        return window.location.assign('/end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${PERGUNTA_MAX}`;
    progressBarFull.style.width = `${(questionCounter/PERGUNTA_MAX) * 100}%`;

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions(questionsIndex) ;
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number] ;
    }) 

    availableQuestions.splice(questionsIndex, 1);

    acceptedAnser = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptedAnser) return;

        acceptedAnser = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset('number');

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct': 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS);
        }

        selectedAnswer.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion()
            
        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

commenceGame()