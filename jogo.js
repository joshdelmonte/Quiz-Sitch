const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {};
let acceptedAnswer = true;
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
        answer: 3, 
    },
    {
        question: "What does a 'Window' interface do?",
        choice1: "Allows us to look through it",
        choice2: "Look pretty",
        choice3: "Access the interior API",
        choice4: "Represents a windoor",
        answer: 3,
    },
    {
        question: "What type of value is a true/false statement?",
        choice1: "string",
        choice2: "integer",
        choice3: "crime",
        choice4: "boolean",
        answer: 4, 
    },
    {
        question: "Ceci n'est pas une pipe?",
        choice1: "Oui",
        choice2: "Non",
        choice3: "Oui",
        choice4: "Non",
        answer: 2 || 4, 
    },
    
]

const TALLIED_SCORE = 100;
const QUESTION_MAX = 4;

startGame = () => { 
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
}
// accessing local storage
getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > QUESTION_MAX) {
        localStorage.setItem('mostRecentScore', score);

        return window.location.assign('./end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${QUESTION_MAX}`;
    progressBarFull.style.width = `${(questionCounter/QUESTION_MAX) * 100}%`;

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionsIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number] ;
    }) 

    availableQuestions.splice(questionsIndex, 1);

    acceptedAnswer = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptedAnswer) return;

        acceptedAnswer = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct': 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(TALLIED_SCORE);
        }

        selectedChoice.parentElement.classList.add(classToApply);

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

const startTime = 2 ;
let time = startTime * 60;

const count = document.getElementById("countdownTimer")
setInterval(updateTimer, 1000)
function updateTimer(){
    const minutes = Math.floor(time/60)
    let seconds = time % 60;

    seconds = seconds < 10 ? '0' + seconds : seconds;
    count.innerHTML = `${minutes}:${seconds}`
    time--

    if (!acceptedAnswer) {
        time - (seconds * 15)
    }
}

startGame()