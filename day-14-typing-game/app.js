// VARIABLES
let words = ['magic', 'journey', 'travel', 'explore', 'life',
    'experience', 'happiness', 'gratitude', 'discipline', 'exercise',
    'workout', 'friendship', 'practice', 'routine', 'morning', 'reading',
    'books', 'education', 'amour', 'delibrate', 'protein', 'partner',
    'empathy', 'concert', 'patience', 'humor', 'resilience', 'confidence',
    'consistency', 'appreciation', 'literature', 'meaning', 'humble',
    'province', 'flight', 'alchemy', 'intense', 'adorable', 'swoon', 'stunning',
    'sensational', 'provocative', 'apocalypse', 'compliance', 'meticulous',
    'replicate', 'relentless', 'pursuit', 'proactive', 'astounding',
    'delightful', 'legitimate', 'mesmerizing', 'polarizing', 'validate'];

const levels = {
    easy: 5,
    medium: 3,
    hard: 2
};
let currentLevel = levels.easy;
let timeCount = currentLevel + 1, scoreCount = 0, isPlaying, wordDisplayed;

let currentWord = document.querySelector('#current-word'),
    inputWord = document.querySelector('#input-word'),
    time = document.querySelector('#seconds'),
    timeLeft = document.querySelector('#time-left'),
    score = document.querySelector('#score'),
    message = document.querySelector('#message'),
    difficultyLevel = document.querySelector('#difficulty');


// EVENT LISTENERS
window.addEventListener('load', init);
inputWord.addEventListener('input', startMatch);
difficultyLevel.addEventListener('change', changeLevel);


// FUCNTIONS
function init() {
    time.textContent = currentLevel;
    showWord();
    // call the countdown function every second
    setInterval(countdown, 1000);
    // cheking the game status every 0.1s
    setInterval(checkStatus, 100);
/**
 * It generates a random word from the array and displays it on the screen.
 */
}
function showWord() {
    let randomIndex = Math.floor(Math.random() * words.length);
    wordDisplayed = words[randomIndex];
    currentWord.textContent = wordDisplayed;
}
/**
 * If the timeCount is greater than 0, then subtract 1 from timeCount and display the new timeCount in
 * the timeLeft div. If the timeCount is equal to 0, then set isPlaying to false.
 */
function countdown() {
    if (timeCount > 0) {
        timeCount--;
        timeLeft.textContent = timeCount;
    } else if (timeCount === 0) {
        isPlaying = false;
    }
}
/**
 * If the game is not playing and the time is up, then display a message and reset the score.
 */
function checkStatus() {
    if (!isPlaying && timeCount === 0) {
        message.textContent = 'Time Up!!';
        scoreCount = 0
        message.className = 'mt-3 text-danger';
    }
}
/**
 * If the value of the input field is equal to the word displayed, then the game is playing, the
 * message is correct, the input field is cleared, the score is incremented, the time is reset, and a
 * new word is displayed.
 */
function startMatch() {
    if (this.value === wordDisplayed) {
        isPlaying = true;
        message.textContent = 'Correct!!'
        message.className = 'mt-3 text-success'
        this.value = ''
        scoreCount++;
        score.textContent = scoreCount;
        timeCount = currentLevel + 1;
        showWord();
    }
}
/**
 * If the user selects the medium level, the game will start with the medium level settings. If the
 * user selects the hard level, the game will start with the hard level settings.
 */
function changeLevel() {
    let level = this.options[this.selectedIndex].value;
    if (level === 'Medium') {
        inputWord.focus();
        scoreCount = 0;
        message.textContent = '';
        isPlaying = true;
        currentLevel = levels.medium;
        time.textContent = currentLevel;
        timeCount = currentLevel + 1;
        startMatch();
    }
    if (level === 'Hard') {
        inputWord.focus();
        scoreCount = 0;
        message.textContent = '';
        isPlaying = true;
        currentLevel = levels.hard;
        time.textContent = currentLevel;
        timeCount = currentLevel + 1;
        startMatch();
    }
}