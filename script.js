let library = [];

// Book object constructor function
function Book(title, author, pages, readStatus) {
  (this.title = title),
    (this.author = author),
    (this.pages = pages),
    (this.readStatus = readStatus),
    // A method to change book's read status property
    (this.changeReadStatus = function () {
      if (this.readStatus === "Yes") {
        this.readStatus = "No";
      } else if (this.readStatus === "No") {
        this.readStatus = "Yes";
      }
    });
}

// A function to a add a book to the library
function addToLibrary(title, author, pages, readStatus) {
  let bookObj = new Book(title, author, pages, readStatus);
  library.push(bookObj);
}

addToLibrary("s", "s", "23", "Yes");
addToLibrary("ps", "3s", "223", "No");
addToLibrary("dps", "s", "23", "Yes");
addToLibrary("mdps", "3s", "223", "No");

function displayBooks() {
  for (let i = 0; i < library.length; i++) {
    const book = document.createElement("div");
    book.className = "book";
    book.dataset.id = i;
    document.querySelector(".content").appendChild(book);

    const info = document.createElement("div");
    info.className = "info";
    book.appendChild(info);

    const title = document.createElement("p");
    title.classList = "title";
    title.textContent = `Title: ${library.at(i).title}`;
    info.appendChild(title);

    const author = document.createElement("p");
    author.classList = "author";
    author.textContent = `Author: ${library.at(i).author}`;
    info.appendChild(author);

    const pages = document.createElement("p");
    pages.classList = "pages";
    pages.textContent = `Pages: ${library.at(i).pages}`;
    info.appendChild(pages);

    const readStatus = document.createElement("p");
    readStatus.classList = "readStatus";
    readStatus.textContent = `Read: ${library.at(i).readStatus}`;
    info.appendChild(readStatus);

    const buttons = document.createElement("div");
    buttons.className = "book-buttons";
    buttons.style.cssText = " display: flex; gap: 8px; ";
    book.appendChild(buttons);

    const toggle = document.createElement("button");
    toggle.className = "toggle-read-status";
    toggle.textContent = "Toggle read status";
    buttons.appendChild(toggle);

    const remove = document.createElement("button");
    remove.className = "remove";
    remove.textContent = "Remove";
    buttons.appendChild(remove);

    toggle.addEventListener("click", () => {
      library[book.dataset.id].changeReadStatus();
      readStatus.textContent = `Read: ${
        library[book.dataset.id].readStatus
      }`;
      console.log(library[book.dataset.id]);
    });

    remove.addEventListener("click", () => {
      library.splice(book.dataset.id, 1);
      book.remove();
      let books = document.querySelectorAll(".book");
      for (let prop in books) {
        books[prop].dataset.id = prop;
      }
    });
  }
}
displayBooks();

// Add event listener to "Add a book" button
document.querySelector(".add-book").addEventListener("click", () => {
  // Open form modal
  document.querySelector("dialog").showModal();

  // Clear form input fields
  document.querySelector("#title").value = "";
  document.querySelector("#author").value = "";
  document.querySelector("#pages").value = "";
  document.querySelector("#status").value = "Yes";
});

// Add event listener to "Cancel" button in form modal
document.querySelector(".cancel").addEventListener("click", () => {
  // Close form modal
  document.querySelector("dialog").close();
});

// Add event listener to "Submit" button in form modal
document.querySelector(".submit").addEventListener("click", (event) => {
  // Prevent submit button default behavior
  event.preventDefault();

  // collect book info from form input
  let title = document.querySelector("#title").value;
  let author = document.querySelector("#author").value;
  let pages = document.querySelector("#pages").value;
  let readStatus = document.querySelector("#status").value;

  // add the book to the library
  addToLibrary(title, author, pages, readStatus);

  console.log(library);

  // close form modal
  document.querySelector("dialog").close();

  displayBook();
});

// function displayBooks() {
//   for (let i = 0; i < library.length; i++) {
//     const book = document.createElement("div");
//     book.className = "book";
//     document.querySelector('.content').appendChild(book);

//     const info = document.createElement("div");
//     info.className = "info";
//     book.appendChild(info);

//     const title = document.createElement("p");
//     title.classList = "title";
//     title.textContent = `Title: ${library.at(i).title}`;
//     info.appendChild(title);

//     const author = document.createElement("p");
//     author.classList = "author";
//     author.textContent = `Author: ${library.at(i).author}`;
//     info.appendChild(author);

//     const pages = document.createElement("p");
//     pages.classList = "pages";
//     pages.textContent = `Pages: ${library.at(i).pages}`;
//     info.appendChild(pages);

//     const readStatus = document.createElement("p");
//     readStatus.classList = "readStatus";
//     readStatus.textContent = `Read: ${library.at(i).readStatus}`;
//     info.appendChild(readStatus);

//   }
// }
