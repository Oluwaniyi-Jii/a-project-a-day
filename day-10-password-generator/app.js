const resultEl = document.querySelector('#result')
const lengthEl = document.querySelector('#length')
const uppercaseEl = document.querySelector('#uppercase')
const lowercaseEl = document.querySelector('#lowercase')
const numbersEl = document.querySelector('#numbers')
const symbolsEl = document.querySelector('#symbols')
const generateEl = document.querySelector('#generate')
const clipboardEl = document.querySelector('#clipboard')


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
    alert('Password copied to clipboard!')
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
