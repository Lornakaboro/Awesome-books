
// declare an empty array to store book list
let bookList = [];

//generating bookobject

function bookObj(bookTitle, authorName) {
  const books = {
    title: bookTitle,
    author: authorName,
  };

  bookList.push(books);
}

//Add books to local storage

function addToLocalStorage() {
  const bookArr = JSON.stringify(bookList);
  localStorage.setItem('storedBooks', bookArr);
}

// to remove books

function booksFilter(index) {
    bookList = bookList.filter((book) => book !== bookList[index]);
}

//UI to display books

function displayBook() {
  const addedBooks = document.getElementById('books');
  addedBooks.innerHTML = '';
  for (let i = 0; i < bookList.length; i += 1) {
    const container = document.createElement('div');
    container.classList.add('book');
    addedBooks.appendChild(container);

    const bookTitle = document.createElement('p');
    bookTitle.classList.add('title');
    bookTitle.textContent = bookList[i].title;
    container.appendChild(bookTitle);

    const bookAuthor = document.createElement('p');
    bookAuthor.classList.add('author');
    bookAuthor.textContent = bookList[i].author;
    container.appendChild(bookAuthor);

    const removeButton = document.createElement('button');
    removeButton.classList.add('remove');
    removeButton.textContent = 'remove';

    removeButton.onclick = () => {
      booksFilter(i);
      addToLocalStorage();
      displayBook();
    };

    container.appendChild(removeButton);

    const line = document.createElement('hr');
    container.appendChild(line);
  }
}

//get item form local storage

function getFromLocalStorage() {
  const bookArr = localStorage.getItem('storedBooks');
  bookList = JSON.parse(bookArr);
  displayBook();
}

if (localStorage.getItem('storedBooks') == null) {
  addToLocalStorage();
} else {
  getFromLocalStorage();
}


