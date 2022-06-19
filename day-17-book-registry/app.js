//  VARIABLES
let form = document.querySelector('#book-form'),
    title = document.querySelector('#title'),
    author = document.querySelector('#author'),
    tableBody = document.querySelector('#book-list');

let error = true; // initially both the fields are blank


title.addEventListener('blur', validation);
author.addEventListener('blur', validation);
form.addEventListener('submit', addBookToList);
tableBody.addEventListener('click', removeBook);
document.addEventListener('DOMContentLoaded', init);


/**
 * If the input field is empty, it will add the class 'is-invalid' to the input field and add the class
 * 'invalid-feedback' to the next element sibling of the input field.
 */
function validation() {
    if (this.value != '') {
        this.className = 'form-control is-valid';
        error = false;
    }
    else {
        this.className = 'form-control is-invalid';
        error = true;
        this.nextElementSibling.className = 'invalid-feedback';
        this.nextElementSibling.textContent = 'Field can\'t be left blank';
    }
}

/**
 * It takes the values of the title and author inputs, creates a new table row, adds the values to the
 * table row, appends the table row to the table body, resets the form, removes the error class from
 * the inputs, and adds the values to local storage.
 * @param e - the event object
 */
function addBookToList(e) {
    e.preventDefault();
    if (error == false) {
        let bookName = title.value,
            bookAuthor = author.value;

        let tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${bookName}</td>
            <td>${bookAuthor}</td>
            <td><a href="#" class="btn btn-danger btn-sm">X</a></td>
        `
        tableBody.appendChild(tr);

        form.reset();
        title.className = 'form-control';
        author.className = 'form-control';

        addToLocalStorage(bookName, bookAuthor);
    }
}

/**
 * If the target of the event contains the class btn-danger, then remove the book from local storage
 * and remove the book from the DOM.
 * @param e - the event object
 */
function removeBook(e) {
    if (e.target.classList.contains('btn-danger')) {
        removeBookFromLocalStorage(e.target.parentElement.parentElement.firstElementChild.textContent);
        e.target.parentElement.parentElement.remove();
    }
}

/**
 * It takes a book name as an argument, parses the books from local storage, loops through the books,
 * and if the book name matches the book name passed in, it removes that book from the array.
 * @param name - The name of the book you want to remove.
 */
function removeBookFromLocalStorage(name) {
    let books = JSON.parse(localStorage.getItem('books'));
    books.forEach(function (book, index) {
        if (book.book === name) {
            books.splice(index, 1)
        }
    })
    localStorage.setItem('books', JSON.stringify(books));
}

/**
 * If there's no books in local storage, create an empty array and return it. If there are books in
 * local storage, return them.
 * @returns An array of objects.
 */
function getFromLocalStorage() {
    if (localStorage.getItem('books') == null) {
        localStorage.setItem('books', '[]');
        return JSON.parse(localStorage.getItem('books'));
    }
    else {
        return JSON.parse(localStorage.getItem('books'));
    }
}

/**
 * It takes two parameters, bookName and authorName, and creates an object with those two properties,
 * then pushes that object into the array that is returned from getFromLocalStorage(), and then sets
 * the localStorage item 'books' to the stringified version of that array.
 * @param bookName - The name of the book
 * @param authorName - "John Doe"
 */
function addToLocalStorage(bookName, authorName) {
    let obj = {
        book: bookName,
        author: authorName
    }
    let ls = getFromLocalStorage();
    ls.push(obj);
    localStorage.setItem('books', JSON.stringify(ls));
}

/**
 * If there are books in local storage, then for each book, create a table row, and append it to the
 * table body.
 */
function init() {
    let books = getFromLocalStorage();
    books.forEach(function (book) {
        let tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${book.book}</td>
            <td>${book.author}</td>
            <td><a href="#" class="btn btn-danger btn-sm">X</a></td>
        `
        tableBody.appendChild(tr);
    })
}