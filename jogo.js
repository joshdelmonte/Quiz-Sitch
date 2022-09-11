const pergunta = document.querySelector('#pergunta');
const choices = Array.from(document.querySelectorAll('.textus-arbitrium'));
const progressText = document.querySelector('.progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentPergunta = {};
let acceptedAnswer = true;
let score = 0;
let perguntaCounter = 0
let availablePerguntas = []
// setting questions to cycle through
let perguntas = [
    {
        pergunta: "This thing all things devours. Birds, beasts, trees, flowers. Gnaws Iron bites steal, and grinds hard stones to meal. What am I?",
        choice1: "light",
        choice2: "water",
        choice3: "time",
        choice4: "darkness",
        answer: "3", 
    },
    {
        pergunta: "What does a 'Window' interface do?",
        choice1: "Allows us to look through it",
        choice2: "Look pretty",
        choice3: "Access the interior API",
        choice4: "Represents a window containing a DOM document",
        answer: "3"
    },
    {
        pergunta: "What type of value is a true/false statement?",
        choice1: "string",
        choice2: "integer",
        choice3: "crime",
        choice4: "boolean",
        answer: "4", 
    },
    {
        pergunta: "Ceci n'est pas une pipe?",
        choice1: "Oui",
        choice2: "Non",
        choice3: "Oui",
        choice4: "Non",
        answer: "2 || 4", 
    },
    
]

const TALLIED_SCORE = 100;
const PERGUNTA_MAX = 4;

commenceGame = () => {
    perguntaCounter = 0;
    score = 0;
    availablePerguntas = [...perguntas];
    novaPergunta();
}
// accessing local storage
getNewPergunta = () => {
    if (availablePerguntas.length === 0 || perguntaCounter > PERGUNTA_MAX) {
        localStorage.setItem('mostRecentScore', score);

        return window.location.assign('/end.html')
    }

    perguntaCounter++
    progressText.innerText = `Pergunta ${perguntaCounter} of ${PERGUNTA_MAX}`;
    progressBarFull.style.width = `${(perguntaCounter/PERGUNTA_MAX) * 100}%`;

    const perguntasIndex = Math.floor(Math.random() * availablePerguntas.length);
    currentQuestion = availablePerguntas(perguntasIndex) ;
    pergunta.innerText = currentPergunta.pergunta;

    choices.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentPergunta['choice' + number] ;
    }) 

    availablePerguntas.splice(perguntasIndex, 1);

    acceptedAnswer = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptedAnswer) return;

        acceptedAnswer = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset('number');

        let classToApply = selectedAnswer == currentPergunta.answer? 'correct': 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS);
        }

        selectedAnswer.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewPergunta()
            
        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

commenceGame()