const smallCups = document.querySelectorAll('.cup-small')
const liters = document.getElementById('liters')
const percentage = document.getElementById('percentage')
const remained = document.getElementById('remained')

updateBigCup()

smallCups.forEach((cup, idx) => {
    cup.addEventListener('click', () => highlightCups(idx))
})

/**
 * If the cup is full, and the next cup is not full, then highlight the previous cup.
 * @param idx - the index of the cup that was clicked
 */
function highlightCups(idx) {
    if (idx === 7 && smallCups[idx].classList.contains("full")) idx--;
    else if (smallCups[idx].classList.contains('full') && !smallCups[idx].nextElementSibling.classList.contains('full')) {
        idx--
    }

    /* Adding the class 'full' to the cups that are full. */
    smallCups.forEach((cup, idx2) => {
        if (idx2 <= idx) {
            cup.classList.add('full')
        } else {
            cup.classList.remove('full')
        }
    })

    updateBigCup()
}

/**
 * If the number of full cups is 0, hide the percentage and set the height to 0. Otherwise, show the
 * percentage and set the height to the percentage of full cups. If the number of full cups is equal to
 * the total number of cups, hide the remained and set the height to 0. Otherwise, show the remained
 * and set the liters to the number of liters left.
 */
function updateBigCup() {
    const fullCups = document.querySelectorAll('.cup-small.full').length
    const totalCups = smallCups.length

    /* This is a conditional statement. If the number of full cups is 0, then the percentage is hidden
    and the height is set to 0. Otherwise, the percentage is visible and the height is set to the
    percentage of full cups. */
    if (fullCups === 0) {
        percentage.style.visibility = 'hidden'
        percentage.style.height = 0
    } else {
        percentage.style.visibility = 'visible'
        percentage.style.height = `${fullCups / totalCups * 330}px`
        percentage.innerText = `${fullCups / totalCups * 100}%`
    }

    /* This is a conditional statement. If the number of full cups is equal to the total number of
    cups, then the remained is hidden and the height is set to 0. Otherwise, the remained is visible
    and the liters is set to the number of liters left. */
    if (fullCups === totalCups) {
        remained.style.visibility = 'hidden'
        remained.style.height = 0
    } else {
        remained.style.visibility = 'visible'
        liters.innerText = `${2 - (250 * fullCups / 1000)}L`
    }
}