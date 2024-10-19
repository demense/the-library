// !! Problem in toggling read status

let library = [];

// Book object constructor function
function Book(title, author, pages, readStatus) {
  (this.title = title),
    (this.author = author),
    (this.pages = pages),
    (this.readStatus = readStatus);

  // A method to change book's read status property
  // this.changeReadStatus = function (index) {
  //   // const book = this;
  //   if (index.readStatus === "Yes") {
  //     index.readStatus = "No";
  //   } else if (index.readStatus === "No"){
  //     index.readStatus = "Yes";
  //   }
  // };
}

// A function to a add a book to the library
function addToLibrary(title, author, pages, readStatus) {
  let bookObj = new Book(title, author, pages, readStatus);
  library.push(bookObj);
}

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
let submitClicked = false;
document.querySelector(".submit").addEventListener("click", (event) => {

  submitClicked = true;

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

  // display the book
  document.querySelector(".content").insertAdjacentHTML(
    "beforeend",
    `<div class="book" data-index="${library.length - 1}">
				<div class="info">
					<p>Title: ${library.at(-1).title}</p>
					<p>Author: ${library.at(-1).author}</p>
					<p>Pages: ${library.at(-1).pages}</p>
					<p class="readStatus" data-index-read="${library.length - 1}">Read: ${
      library.at(-1).readStatus
    }</p>
				</div>
				<div class="buttons">
					<button type="button" class="toggle-read-status" data-index="${
            library.length - 1
          }">Toggle read status</button>
					<button type="button" class="remove" data-index="${
            library.length - 1
          }">Remove</button>
				</div>
			</div>`
  );

  // close form modal
  document.querySelector("dialog").close();

  // Add event listener to "Remove" button
  document.querySelectorAll(".remove").forEach((button) => {
    button.addEventListener("click", () => {
      let index = button.dataset.index;
      library.splice(index, 1);
      document.querySelector(`[data-index="${index}"]`).remove();
    });
  });

  // Add event listener to "Toggle read status"
  document.querySelectorAll(`.toggle-read-status`).forEach((button) => {
    button.addEventListener("click", () => {
      let index = button.dataset.index;
      console.log("before toggle", library[index]);
      if (library[index].readStatus === "Yes") {
        library[index].readStatus = "No";
      } else if (library[index].readStatus === "No") {
        library[index].readStatus = "Yes";
      }
      console.log("after toggle", library[index]);
    });
  });

});
