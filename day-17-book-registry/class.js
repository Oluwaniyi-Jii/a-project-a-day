class Book {
    constructor(title, author) {
        this.title = title;
        this.author = author;
    }
}

class UI {
    /**
     * The function is called when the DOM is loaded. It gets the books from local storage and loops
     * through them, adding each one to the list
     */
    static displayBooks() {
        let storedBooks = Store.getBooks();
        storedBooks.forEach(function(book) {
            UI.addBookToList(book);
        })
    }
    /**
     * We're creating a new table row element, setting its innerHTML to a template literal, and then
     * appending it to the table body
     * @param book - This is the book object that we're passing in.
     */
    static addBookToList(book) {
        let tbody = document.getElementById('book-list');
        let element = document.createElement('tr');
        let template = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td><a href="#" class="btn btn-danger btn-sm">X</a></td>
        `;
        element.innerHTML = template;
        tbody.appendChild(element);
    }
    /**
     * It creates a div element, adds a class to it, adds a text node to it, and then appends it to the
     * alert div
     * @param message - The message to be displayed.
     * @param type - The type of alert to show. This can be either success, error, or info.
     */
    static showAlert(message, type) {
        let div = document.createElement('div');
        div.className = `alert alert-${type}`;
        div.appendChild(document.createTextNode(message));
        document.getElementById('alert').appendChild(div);
        setTimeout(function() {
            document.getElementById('alert').textContent = '';
        }, 1000)
    }
}

/* Store is a class that has three static methods: getBooks, addBook, and removeBook */
class Store {
    /**
     * If there are no books in local storage, return an empty array. Otherwise, return the books from
     * local storage
     * @returns An array of objects.
     */
    static getBooks() {
        let books;
        if (localStorage.getItem('books') === null) {
            books = [];
        }
        else {
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }
    /**
     * It takes a book object as an argument, gets the books from local storage, pushes the book object
     * into the books array, and then sets the books array back into local storage
     * @param book - The book object that we want to add to the local storage.
     */
    static addBook(book) {
        let books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));

    }
    /**
     * It takes a book name as an argument, gets the books from local storage, loops through them, and
     * if the book name matches the book name passed in, it removes that book from the array
     * @param bookName - The name of the book to be removed.
     */
    static removeBook(bookName) {
        let books = Store.getBooks();
        books.forEach(function(book, index){
            if(book.title == bookName) {
                books.splice(index, 1)
            }
        });
        localStorage.setItem('books', JSON.stringify(books));

    }
}


/* Listening for the DOM to load, and then it will display the books. */
document.addEventListener('DOMContentLoaded', UI.displayBooks);

/* Adding an event listener to the form. When the form is submitted, it will prevent the default action
of the form, which is to refresh the page. It will then get the values of the book name and author
from the form. If the book name or author is blank, it will show an alert. If the book name and
author are not blank, it will create a new book object, add it to the store, add it to the list,
show an alert, and reset the form. */
document.getElementById('book-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const bookName = document.getElementById('title').value;
    const bookAuthor = document.getElementById('author').value;

    if (bookName == '' || bookAuthor == '') {
        UI.showAlert('Fields can\'t be blank', 'danger');
        document.getElementById('book-form').reset();
    }
    else {
        const newBook = new Book(bookName, bookAuthor);
        Store.addBook(newBook);
        UI.addBookToList(newBook);
        UI.showAlert('Book Added', 'success')
        document.getElementById('book-form').reset();
    }
});

/* Listening for a click event on the book list. If the click event is on the delete button, it will
remove the book from the list and from local storage. */
document.getElementById('book-list').addEventListener('click', function(e) {
    if(e.target.classList.contains('btn-danger')) {
        Store.removeBook(e.target.parentElement.parentElement.firstElementChild.textContent);
        e.target.parentElement.parentElement.remove();
        UI.showAlert('Book Removed', 'success')
    }
})