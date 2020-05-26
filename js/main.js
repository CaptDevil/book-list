//Book class: to represnt a book
class Book{
    constructor(title,author,isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

//UI class: for the user interface
class UI{
    static displayBooks(){
        const books = Store.getBooks();

        for(let i=0;i<books.length;i++)
            UI.addBookToList(books[i]);
    }
    static addBookToList(book){
        const tableContent = document.querySelector('#table-content');

        const row = document.createElement('tr');

        row.innerHTML = `
            <td class="text-center">${book.title}</td>
            <td class="text-center">${book.author}</td>
            <td class="text-center">${book.isbn}</td>
            <td class="text-center"><a href="#" class="btn btn-danger delete">X</a></td>
        `;

        tableContent.appendChild(row);
    }
    static showAlert(message,className){
        const div = document.createElement('div');
        div.className = `alert alert-${className} text-center`;
        div.appendChild(document.createTextNode(`${message}`));
        document.getElementById('main-alert').appendChild(div);

        setTimeout(() => div.remove(), 3000);
    }
    static clearFields(){
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';
    }
    static deleteBook(a){
        if(a.classList.contains('delete'))
            a.parentElement.parentElement.remove();
    }
}

//Store class: to store a book in local storage
class Store{
    static getBooks(){
        let books;
        if(localStorage.getItem('books') === null)
            books = [];
        else
            books = JSON.parse(localStorage.getItem('books'));
        return books;
    }
    static addBooks(book){
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books',JSON.stringify(books));
    }
    static removeBook(isbn){
        const books = Store.getBooks();

        for(let i = 0; i<books.length ; i++){
            if(books[i].isbn === isbn)
                books.splice(i,1);
        }

        localStorage.setItem('books',JSON.stringify(books));
    }
}

//display event
document.addEventListener('DOMContentLoaded',UI.displayBooks);

//add event
document.querySelector('#main-form').addEventListener('submit',(e) => {
    e.preventDefault();

    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const isbn = document.getElementById('isbn').value;

    if(title === '' && author === '' && isbn === '')
        UI.showAlert('Please Enter All the Fields','danger');
    else{
        const book = new Book(title,author,isbn);

        UI.addBookToList(book);
        Store.addBooks(book);

        UI.clearFields();

        UI.showAlert('Book Added Successfully','success');
    }
})

//delete event
document.getElementById('table-content').addEventListener('click',(e) => {
    UI.deleteBook(e.target);
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

    UI.showAlert('Book Removed Successfully','success');
})
