const progress = document.getElementById('progress')
const prev = document.getElementById('prev')
const next = document.getElementById('next')
const circles = document.querySelectorAll('.circle')

let currentActive = 1

/* This is adding an event listener to the next button. When the button is clicked, the current active
is increased by 1. If the current active is greater than the length of the circles, the current
active is set to the length of the circles. Then the update function is called. */
next.addEventListener('click', () => {
    currentActive++

    if(currentActive > circles.length) {
        currentActive = circles.length
    }

    update()
})

/* Adding an event listener to the previous button. When the button is clicked, the current active is
decreased by 1. If the current active is less than 1, the current active is set to 1. Then the
update function is called. */
prev.addEventListener('click', () => {
    currentActive--

    if(currentActive < 1) {
        currentActive = 1
    }

    update()
})

function update() {
    /* Adding the class active to the circles that are less than the current active. */
    circles.forEach((circle, idx) => {
        if(idx < currentActive) {
            circle.classList.add('active')
        } else {
            circle.classList.remove('active')
        }
    })

    const actives = document.querySelectorAll('.active')

    progress.style.width = (actives.length - 1) / (circles.length - 1) * 100 + '%'

    /* Disabling the previous button when the current active is 1 and disabling the next button when
    the current active is the same as the length of the circles. */
    if(currentActive === 1) {
        prev.disabled = true
    } else if(currentActive === circles.length) {
        next.disabled = true
    } else {
        prev.disabled = false
        next.disabled = false
    }
}