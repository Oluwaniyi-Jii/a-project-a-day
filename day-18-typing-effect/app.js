const typedTextSpan = document.querySelector('.typed-text');
const cursorSpan = document.querySelector('.cursor');

const textArray = ['lorem', 'ipsum', 'dolor', 'sit', 'amet'];
const typingDelay = 150;
const erasingDelay = 90;
const newTextDelay = 2000;
let textArrayIndex = 0;
let charIndex = 0;

/**
 * If the cursor is not typing, add the typing class to the cursor. If the last letter of the word is
 * not typed, add the next letter to the typed text span and increment the charIndex. If the last
 * letter of the word is typed, remove the typing class from the cursor and call the erase function
 */
function type() {
    if (!(cursorSpan.classList.contains('typing'))) {
        cursorSpan.classList.add('typing');
    }
    // if last letter of a word is not typed
    if (charIndex < textArray[textArrayIndex].length) {
        typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, typingDelay);
    }
    else {
        cursorSpan.classList.remove('typing');
        setTimeout(erase, newTextDelay);
    }
}

/**
 * If the cursor is not already typing, add the typing class to the cursor. If the string is not
 * entirely erased, erase the last character of the string and call the erase function again after a
 * delay. If the string is entirely erased, remove the typing class from the cursor, increment the
 * textArrayIndex, and call the type function after a delay
 */
function erase() {
    if (!(cursorSpan.classList.contains('typing'))) {
        cursorSpan.classList.add('typing');
    }
    // if string is not entirely erased
    if (charIndex > 0) {
        typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, erasingDelay);
    }
    else {
        cursorSpan.classList.remove('typing');
        textArrayIndex++;
        if (textArrayIndex >= textArray.length) {
            textArrayIndex = 0;
        }
        setTimeout(type, typingDelay + 1100);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    if (textArray.length) {
        setTimeout(type, newTextDelay + 250);
    }
})