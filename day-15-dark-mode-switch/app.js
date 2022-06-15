let html = document.querySelector('html');
let toggleBtn = document.getElementById('switch');


toggleBtn.addEventListener('click', changeTheme);


/**
 * If the toggle button is checked, set the theme to dark, otherwise set the theme to light
 */
function changeTheme() {
    if (toggleBtn.checked === true) {
        html.setAttribute('theme', 'dark');
    }
    else {
        html.setAttribute('theme', 'light');
    }

}