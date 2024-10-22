// An array to store book objects
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

// A function to create a book instance and add it to the library
function addToLibrary(title, author, pages, readStatus) {
  let bookObj = new Book(title, author, pages, readStatus);
  library.push(bookObj);
}

// A function to display the last added book in the library
function displayBook() {
  const book = document.createElement("div");
  book.className = "book";
  book.dataset.id = library.length - 1;
  document.querySelector(".content").appendChild(book);

  const info = document.createElement("div");
  info.className = "info";
  book.appendChild(info);

  const title = document.createElement("p");
  title.classList = "title";
  title.textContent = `Title: ${library.at(-1).title}`;
  info.appendChild(title);

  const author = document.createElement("p");
  author.classList = "author";
  author.textContent = `Author: ${library.at(-1).author}`;
  info.appendChild(author);

  const pages = document.createElement("p");
  pages.classList = "pages";
  pages.textContent = `Pages: ${library.at(-1).pages}`;
  info.appendChild(pages);

  const readStatus = document.createElement("p");
  readStatus.classList = "readStatus";
  readStatus.textContent = `Read: ${library.at(-1).readStatus}`;
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
    readStatus.textContent = `Read: ${library[book.dataset.id].readStatus}`;
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

  // The html structure for every book
  // <div class="book" data-id="">
  //   <div class="info">
  //     <p class="title">Title: </p>
  //     <p class="author">Author: </p>
  //     <p class="pages">Pages: </p>
  //     <p class="readStatus">Read: </p>
  //   </div>
  //   <div class="buttons">
  //     <button type="button" class="toggle-read-status">
  //       Toggle read status
  //     </button>
  //     <button type="button" class="remove">
  //       Remove
  //     </button>
  //   </div>
  // </div>
}

// Add event listener to "Add a book" button
document.querySelector(".add-book").addEventListener("click", () => {
  // Open form modal
  document.querySelector("dialog").showModal();

  // Clear form input fields for new input
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
  // Hide library is empty div
  document.querySelector(".empty-library").style.display = "none";

  // Prevent submit button default behavior
  event.preventDefault();

  // collect book info from the form inputs
  let title = document.querySelector("#title").value;
  let author = document.querySelector("#author").value;
  let pages = document.querySelector("#pages").value;
  let readStatus = document.querySelector("#status").value;

  // add the book to the library
  addToLibrary(title, author, pages, readStatus);

  // close form modal
  document.querySelector("dialog").close();

  // Display the book
  displayBook();
});
