const newGame = document.querySelector('.new-game')
const rollDice = document.querySelector('.middle__buttonRoll')
const holdScore = document.querySelector('.middle__buttonHold')
let playerOneTotalScore = document.querySelector('#globalScoreFirst')
let playerTwoTotalScore = document.querySelector('#globalScoreSecond')
let playerOneCurrentScore = document.querySelector('#currentFirst')
let playerTwoCurrentScore = document.querySelector('#currentSecond')
const diceImage = document.querySelector('.middle__diceImg')
const playerOneDiv = document.querySelector('#playerOne')
const playerTwoDiv = document.querySelector('#playerTwo')

//keep track of current player 
let currentPlayer = 1

//initialize local score 
let score = 0

//when new game button is pressed refresh the page 
newGame.addEventListener('click', function refresh() {
    window.location.reload("Refresh")
})

// check if any winner
const checkWinner = () => {
    // check if one is a winner
    if (playerOneTotalScore.textContent >= 100) {
        document.querySelector('#nameFirst').textContent = "Winner"
        playerOneDiv.classList.add('player--win')
    }
    // check if two is a winner
    else if (playerTwoTotalScore.textContent >= 100) {
        document.querySelector('#nameSecond').textContent = "Winner"
        playerTwoDiv.classList.add('player--win')
    }
    if (playerOneTotalScore.textContent >= 100 || playerTwoTotalScore.textContent >= 100) {
        diceImage.style.transform = "scale(0)"
        diceImage.style.animation = "popWinEmoji 2.5s linear 0s infinite"
        diceImage.src = './images/win.png'
        diceImage.style.filter = 'unset'
        document.body.style.backgroundColor = '#2c6161';
        document.querySelector('main').classList.add('main--win')
        return true
    }
    return false
}
//function change player
const changePlayer = (to) => {
    if (to == 1) {
        // add local score in global score and make local score zero 
        playerTwoTotalScore.textContent = Number(playerTwoTotalScore.textContent) + score
        score = 0
        playerTwoCurrentScore.textContent = 0

        if (!checkWinner()) {
            // make style changes in UI
            currentPlayer = to
            playerTwoDiv.classList.remove('player--active')
            playerOneDiv.classList.add('player--active')
        }
    }
    else {
        // add local score in global score and make local score zero 
        playerOneTotalScore.textContent = Number(playerOneTotalScore.textContent) + score
        score = 0
        playerOneCurrentScore.textContent = 0

        if (!checkWinner()) {
            currentPlayer = to
            playerOneDiv.classList.remove('player--active')
            playerTwoDiv.classList.add('player--active')
        }
    }
}

//when roll dice is clicked change dice image and update score 
rollDice.addEventListener('click', function () {
    if (!checkWinner()) {
        // create random number and update UI and score
        let randomNum = Math.floor(Math.random() * 6 + 1)
        diceImage.src = `./images/dice-${randomNum}.png`
        score = score + randomNum

        // change local score of active player in UI
        if (currentPlayer === 1)
            playerOneCurrentScore.textContent = score
        else playerTwoCurrentScore.textContent = score

        //if random number one occurs clear score and change player   
        if (randomNum === 1) {
            score = 0
            changePlayer(currentPlayer == 1 ? 2 : 1)
        }
    }
})
//when hold is clicked save current score in global score and zero current score
holdScore.addEventListener('click', function () {
    changePlayer(currentPlayer == 1 ? 2 : 1)
})
