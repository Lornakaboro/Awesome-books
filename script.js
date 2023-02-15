// Grab items from html

const title = document.getElementById('title');
const author = document.getElementById('author');
const addBtn = document.getElementById('addButton');
const addedBooks = document.getElementById('books');
const bookHide = document.querySelector('.book-hide');
// create local storage

class Storage {
  static addToStorage () {
    let storage = localStorage.setItem('books', JSON.stringify(bookList));
    return storage;
  }

  static getStorage () {
    let storage = localStorage.getItem('books') === null ? [] : JSON.parse(localStorage.getItem('books'));
    
    return storage;
  }
}

let bookList = Storage.getStorage();

//Add event listener to add button



let id;
addBtn.addEventListener('click', (e) => {
    if(title.value != '' && author.value != 0){
        e.preventDefault();
        id = Math.floor(Math.random()*10000);
        const bookObj = new Book (`"${title.value}" by`, `, ${author.value}`, id);
        bookList = [...bookList, bookObj];
        UI.displayData();
        UI.removeBook ();
        UI.clearValue ();
        
        Storage.addToStorage(bookList);
      
    }
});


// Create Classes

class Book {
  constructor (titleOfBook, authorOfBook, id) {
    this.titleOfBook = titleOfBook;
    this.authorOfBook = authorOfBook;
    this.id = id;
  }
}

class UI {
  static displayData () {
    let displayData = bookList.map((item) => {
      return `
      <div class='individual-book'>
        <p>${item.titleOfBook}</p>
        <p>${item.authorOfBook}</p>
        <button class='rmv-btn'data-id=${item.id}>Remove</button>
        <hr>
    </div>`
    });
    addedBooks.innerHTML = (displayData).join('');
  }
  static clearValue () {
    title.value = '';
    author.value = '';
  }
  static removeBook () {
    addedBooks.addEventListener('click', (e) => {
      if(e.target.classList.contains('rmv-btn')) {
        e.target.parentElement.remove();
      }
      let rmvBtn = e.target.dataset.id;
      UI.removeBookArray(rmvBtn);
      //Storage.addToStorage(bookList);
    });
  }

  static removeBookArray (id) {
    bookList = bookList.filter((item) => item.id !== +id);
    Storage.addToStorage(bookList);
  }
}

window.addEventListener('DOMContentLoaded', () => {
  UI.displayData();
  UI.removeBook();
});