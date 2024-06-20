const myLibrary = [];

const newBookButton = document.querySelector("#newBookButton");
const dialog = document.querySelector("#bookDialog");
const saveButton = dialog.querySelector(".save");

const title = document.querySelector(".title");
const author = document.querySelector(".author");
const pageNumber = document.querySelector(".pageNumber");
const readingStatus = document.querySelector(".readingStatus");
const bookContainer = document.querySelector("#bookContainer");


function newBook() {
    return {
        title: title.value,
        author: author.value,
        pageNumber: pageNumber.value,
        status: readingStatus.value
    };
}


function addBookToLibrary(book) {
   myLibrary.push(book);   
   console.log(myLibrary); // Log the library to verify the book has been added
}


function clearForm() {
    title.value = '';
    author.value = '';
    pageNumber.value = '';
    readingStatus.value = '';
}


newBookButton.addEventListener('click', () => {
    clearForm();
    dialog.showModal();
});



dialog.querySelector('form').addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent the form from submitting and closing the dialog

    const book = newBook();
    addBookToLibrary(book);
    displayBooks();

    dialog.close(); // Close the dialog after adding the book
});


function displayBooks() {
    bookContainer.innerHTML = ''; // Clear the container

    myLibrary.forEach(book => {
        const bookCard = document.createElement('div');
        bookCard.classList.add('book-card');

        const bookTitle = document.createElement('h3');
        bookTitle.textContent = book.title;
        bookCard.appendChild(bookTitle);

        const bookAuthor = document.createElement('p');
        bookAuthor.textContent = `by ${book.author}`;
        bookCard.appendChild(bookAuthor);

        bookContainer.appendChild(bookCard);

        if (book.status.toLowerCase() === "yes"){
            bookCard.style.backgroundColor = "green";

        } else {
            bookCard.style.backgroundColor = "pink";
        }
    });
}