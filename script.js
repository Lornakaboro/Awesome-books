
// declare an empty array to store book list
let bookList = [];

//generating bookobject

function bookObject(bookTitle, authorName) {
  const books = {
    title: bookTitle,
    author: authorName,
  };

  bookList.push(books);
}

//Add books to local storage

function addBook() {
  const bookArr = JSON.stringify(bookList);
  localStorage.setItem('storedBooks', bookArr);
}

//sort input by index

function booksFilter(index) {
    bookList = bookList.filter((book) => book !== bookList[index]);
}

//UI to display books

function displayBooks() {
  const getBooks = document.getElementById('books');
  getBooks.innerHTML = '';
  for (let i = 0; i < bookList.length; i += 1) {
    const bookContainer = document.createElement('div');
    bookContainer.classList.add('book-item');
    getBooks.appendChild(bookContainer);

    const bookTitle = document.createElement('p');
    bookTitle.classList.add('title');
    bookTitle.textContent = bookList[i].title;
    bookContainer.appendChild(bookTitle);

    const bookAuthor = document.createElement('p');
    bookAuthor.classList.add('author');
    bookAuthor.textContent = bookList[i].author;
    bookContainer.appendChild(bookAuthor);

    const removeButton = document.createElement('button');
    removeButton.classList.add('remove');
    removeButton.textContent = 'remove';

    removeButton.onclick = () => {
      booksFilter(i);
      addBook();
      displayBooks();
    };

    bookContainer.appendChild(removeButton);

    const line = document.createElement('hr');
    bookContainer.appendChild(line);
  }
}

//get item form local storage

function getBookFromLocalStorage() {
  const bookArr = localStorage.getItem('storedBooks');
  bookList = JSON.parse(bookArr);
  displayBooks();
}

if (localStorage.getItem('storedBooks') == null) {
  addBook();
} else {
  getBookFromLocalStorage();
}

//Add event listener to add button

const addBtn = document.getElementById('addButton');
addBtn.addEventListener('click', () => {
  const title = document.getElementById('title');
  const author = document.getElementById('author');
  bookObject(title.value, author.value);
  addBook();
  displayBooks();
});
