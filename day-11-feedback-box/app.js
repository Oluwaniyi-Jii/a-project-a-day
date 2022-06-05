const ratings = document.querySelectorAll('.rating')
const ratingsContainer = document.querySelector('.ratings-container')
const sendBtn = document.querySelector('#send')
const panel = document.querySelector('#panel')
let selectedRating = 'Satisfied'

/* Adding an event listener to the ratingsContainer. */
ratingsContainer.addEventListener('click', (e) => {
    /* Checking if the parentNode of the element clicked has a class of rating and if the
    nextElementSibling exists. If it does, it removes the active class from all the ratings and adds
    the active class to the parentNode of the element clicked. It also sets the selectedRating to
    the nextElementSibling's innerHTML. If the parentNode of the element clicked has a class of
    rating and the previousSibling exists and the previousElementSibling's nodeName is an image, it
    removes the active class from all the ratings and adds the active class to the parentNode of the
    element clicked. It also sets the selectedRating to the innerHTML of the element clicked. */
    if (e.target.parentNode.classList.contains('rating') && e.target.nextElementSibling) {
        removeActive()
        e.target.parentNode.classList.add('active')
        selectedRating = e.target.nextElementSibling.innerHTML
    } else if (
        e.target.parentNode.classList.contains('rating') &&
        e.target.previousSibling &&
        e.target.previousElementSibling.nodeName === 'IMG'
    ) {
        removeActive()
        e.target.parentNode.classList.add('active')
        selectedRating = e.target.innerHTML
    }

})

sendBtn.addEventListener('click', (e) => {
    panel.innerHTML = `
        <i class="fas fa-heart"></i>
        <strong>Thank You!</strong>
        <br>
        <strong>Feedback: ${selectedRating}</strong>
        <p>We'll use your feedback to improve our customer support</p>
    `
})

function removeActive() {
    for (let i = 0; i < ratings.length; i++) {
        ratings[i].classList.remove('active')
    }
}