// Grab items from html

const title = document.getElementById('title');
const author = document.getElementById('author');
const addBtn = document.getElementById('addButton');
const addedBooks = document.getElementById('books');
let bookList;
// Create Classes

class Book {
  constructor(titleOfBook, authorOfBook, id) {
    this.titleOfBook = titleOfBook;
    this.authorOfBook = authorOfBook;
    this.id = id;
  }

  static displayData() {
    const displayData = bookList.map((item) => `
          <div class='individual-book'>
            <p>${item.titleOfBook}</p>
            <p>${item.authorOfBook}</p>
            <button class='rmv-btn'data-id=${item.id}>Remove</button>
            <hr>
        </div>`);
    addedBooks.innerHTML = (displayData).join('');
  }

  static clearValue() {
    title.value = '';
    author.value = '';
  }

  static removeBook() {
    addedBooks.addEventListener('click', (e) => {
      if (e.target.classList.contains('rmv-btn')) {
        e.target.parentElement.remove();
      }
      const rmvBtn = e.target.dataset.id;
      Book.removeBookArray(rmvBtn);
    });
  }

  static removeBookArray(id) {
    bookList = bookList.filter((item) => item.id !== +id);
    Book.addToStorage(bookList);
  }

  static addToStorage() {
    const storage = localStorage.setItem('books', JSON.stringify(bookList));
    return storage;
  }

  static getStorage() {
    const storage = localStorage.getItem('books') === null ? [] : JSON.parse(localStorage.getItem('books'));
    return storage;
  }
}
bookList = Book.getStorage();

// Add event listener to add button

let id;
addBtn.addEventListener('click', (e) => {
  if (title.value !== '' && author.value !== 0) {
    e.preventDefault();
    id = Math.floor(Math.random() * 10000);
    const bookObj = new Book(`"${title.value}" by`, `, ${author.value}`, id);
    bookList = [...bookList, bookObj];
    Book.displayData();
    Book.removeBook();
    Book.clearValue();

    Book.addToStorage(bookList);
  }
});

window.addEventListener('DOMContentLoaded', () => {
  Book.displayData();
  Book.removeBook();
});

// navigation

const formContainer = document.querySelector('.form-container');
const lists = document.querySelector('.lists');
const addNew = document.querySelector('.add-new');
const mainTitle = document.querySelector('.main-title');
const mainTitleHidden = document.querySelector('.main-title-hidden');
const logo = document.querySelector('.logo');
const contact = document.querySelector('.contacts');
const contacts = document.querySelector('.contact-info');

formContainer.style.display = 'none';

logo.addEventListener('click', () => {
  mainTitle.style.display = 'block';
  addedBooks.style.display = 'block';
  formContainer.style.display = 'none';
  mainTitle.textContent = 'All awesome books';
});

lists.addEventListener('click', () => {
  mainTitle.style.display = 'block';
  addedBooks.style.display = 'block';
  formContainer.style.display = 'none';
  mainTitle.textContent = 'All awesome books';
  contacts.style.display = 'none';
});

addNew.addEventListener('click', () => {
  mainTitleHidden.style.display = 'none';
  addedBooks.style.display = 'none';
  formContainer.style.display = 'flex';
  contacts.style.display = 'none';
});

contact.addEventListener('click', () => {
  contacts.style.display = 'block';
  formContainer.style.display = 'none';
  mainTitleHidden.style.display = 'none';
});
