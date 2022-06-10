const form = document.querySelector('#form')
const inputNumber = document.querySelector('#userInput')
const info = document.querySelector('#info')
const submit = document.querySelector('#submit')

let attempts = 3;

form.addEventListener('submit', startGame);

let generatedNumber = Math.floor(Math.random() * 10);
console.log(generatedNumber);

/**
 * The function starts the game by taking the user's input and passing it to the gameLogic function.
 * @param e - the event object
 */
function startGame(e) {
    e.preventDefault();
    let userNumber = inputNumber.value;
    if (userNumber != '') {
        attempts--;
        inputNumber.value = '';
        gameLogic(userNumber);
    }
    else {
        alert('Enter a Number: ');
        inputNumber.focus();
    }
}

/**
 * If the user's number is equal to the generated number and the attempts are greater than or equal to
 * 0, then the user's number is correct. 
 * If the user's number is not equal to the generated number and the attempts are greater than or equal
 * to 0, then the user's number is not correct and the user has a certain amount of guesses left. 
 * If the attempts are equal to 0, then the game ends.
 * @param userNumber - the number the user inputs
 */
function gameLogic(userNumber) {
    if (userNumber == generatedNumber && attempts >= 0) {
        let str = `${userNumber} is correct`;
        info.style.color = 'green';
        info.innerHTML = str;
        attempts = 3;
        generatedNumber = Math.floor(Math.random() * 10);
    }
    else {
        if (userNumber < generatedNumber) {
            info.innerHTML = `Your guess is less than the number, you have ${attempts} guesses left`
            info.style.color = 'red';
        } else if (userNumber > generatedNumber) {
            info.innerHTML = `Your guess is greater than the number, you have ${attempts} guesses left`
            info.style.color = 'red';
        }
        if (attempts == 0) {
            endGame();
        }
    }
}

/**
 * If the user's guess is equal to the generated number, the user wins, if not, the user loses.
 */
function endGame() {
    submit.disabled = true;
    let str = `Game Over, The correct answer was ${generatedNumber} <br> To replay, reload the page`;
    info.style.color = 'red';
    info.innerHTML = str;
}
