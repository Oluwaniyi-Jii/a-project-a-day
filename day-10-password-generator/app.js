const resultEl = document.querySelector('#result')
const lengthEl = document.querySelector('#length')
const uppercaseEl = document.querySelector('#uppercase')
const lowercaseEl = document.querySelector('#lowercase')
const numbersEl = document.querySelector('#numbers')
const symbolsEl = document.querySelector('#symbols')
const generateEl = document.querySelector('#generate')
const clipboardEl = document.querySelector('#clipboard')
const toast = document.querySelector('.toast-notification')

const notify = (message = null) => {
    const notif = document.createElement(`div`)
    notif.classList.add(`toast`)
    notif.innerHTML = message ? message : `There Seems To Be An Error Somewhere`
    toast.appendChild(notif)
    setTimeout(()=>{
        notif.remove()
    }, 1500)
}

/**
 * It takes in 4 boolean values and a length value, and returns a string of random characters of the
 * length specified.
 * 
 * The function is broken down into 3 parts:
 * 
 * 1. Declare a variable to store the generated password and a variable to store the number of types of
 * characters to include in the password.
 * 2. Loop over the length, and call a function that generates a random character for each type of
 * character to include in the password.
 * 3. Return the final password.
 * 
 * Let's go over each part in detail.
 * @param upper - boolean, if true, the password will include uppercase letters
 * @param lower - boolean, if true, the password will include lowercase letters
 * @param number - boolean, if true, the password will include numbers
 * @param symbol - boolean, if true, the password will include symbols
 * @param length - The length of the password.
 * @returns a string of random characters.
 */
const generatePassword = (upper, lower, number, symbol, length) => {
    let generatedPassword = ``
    const typesCount = lower + upper + number + symbol
    const typesArray = [{lower}, {upper}, {number}, {symbol}].filter(item => Object.values(item)[0])
    
    if(typesCount === 0) {
        return ``
    }

    for(let i = 0; i < length; i += typesCount) {
        typesArray.forEach(type => {
            const funcName = Object.keys(type)[0]
            generatedPassword += randomFunc[funcName]()
        })
    }

    const finalPassword = generatedPassword.slice(0, length)

    return finalPassword
}

clipboardEl.addEventListener('click', () => {
    const textarea = document.createElement('textarea')
    const password = resultEl.innerText

    if (!password) { return }

    textarea.value = password
    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand('copy')
    textarea.remove()
    notify(`Your Password Has Been Copied <br> To Your Clipboard`)
})

const getRandomLower = () => {
    return String.fromCharCode(Math.floor((Math.random() * 26) + 97))
}

const getRandomUpper = () => {
    return String.fromCharCode(Math.floor((Math.random() * 26) + 65))
}

const getRandomNumber = () => {
    return String.fromCharCode(Math.floor((Math.random() * 10) + 48))
}

const getRandomSymbol = () => {
    const symbols = `!@#$%^&*(){}[]+<>/`
    return symbols[Math.floor(Math.random() * symbols.length)]
}

generateEl.addEventListener(`click`, () => {
    const length = +lengthEl.value
    const hasUpper = uppercaseEl.checked
    const hasLower = lowercaseEl.checked
    const hasNumber = numbersEl.checked
    const hasSymbol = symbolsEl.checked
    resultEl.innerText = generatePassword(hasUpper, hasLower, hasNumber, hasSymbol, length);
})

const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol,
}
