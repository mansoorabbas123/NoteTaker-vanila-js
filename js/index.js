//loader
document.onreadystatechange = function () {
  if (document.readyState !== "complete") {
    document.querySelector("body").style.visibility = "hidden";
    document.querySelector("#loader").style.visibility = "visible";
    console.log("1");
  } else {
    document.querySelector("#loader").style.display = "none";
    console.log("2");
    document.querySelector("body").style.visibility = "visible";
  }
};

var modal = document.querySelector(".modal");
var editModal = document.querySelector(".edit-modal");
var form = document.querySelector("form");
var cardContainer = document.querySelector(".cards-container");
let id;

//show modal
document
  .querySelector(".fa-plus-square")
  .addEventListener("click", function () {
    modal.style.display = "block";
  });

//hide modal
document.querySelector(".hid-modal").addEventListener("click", function () {
  modal.style.display = "none";
});

// hide edit modal
document
  .querySelector(".hide-edit-modal")
  .addEventListener("click", function () {
    editModal.style.display = "none";
  });

//events
form.addEventListener("submit", addNote);
document.addEventListener("DOMContentLoaded", getNotes);
document
  .querySelector(".cards-container")
  .addEventListener("click", editAndDelete);
document.querySelector("#update").addEventListener("click", updateNote);

function updateNote(e) {
  e.preventDefault();
  console.log("update");
  let title = document.querySelector("#edit-title").value;
  let desc = document.querySelector("#edit-desc").value;

  let newData = {
    id: Math.random() * 1000,
    title,
    desc,
  };

  let notes = JSON.parse(localStorage.getItem("notes"));
  notes = Array.from(notes);
  let newNotes = notes.map((el) => (el.id == id ? newData : el));
  localStorage.setItem("notes", JSON.stringify(newNotes));
  getNotes();
  editModal.style.display = "none";
}

//delete note
function editAndDelete(e) {
  if (e.target.parentNode.className === "card-delete") {
    id = e.target.parentNode.id;
    let notes = JSON.parse(localStorage.getItem("notes"));
    notes = Array.from(notes);
    const filteredNotes = notes.filter((el) => el.id != id);
    localStorage.setItem("notes", JSON.stringify(filteredNotes));
    getNotes();
  } else {
    id = e.target.parentNode.id;
    if (e.target.parentNode.className === "card-edit") {
      console.log("clicked");
      let notes = JSON.parse(localStorage.getItem("notes"));
      notes = Array.from(notes);
      let prvsNote = notes.find((el) => el.id == id);
      console.log(prvsNote);
      document.querySelector("#edit-title").value = prvsNote.title;
      document.querySelector("#edit-desc").value = prvsNote.desc;
      editModal.style.display = "block";
    }
  }
}
//get notes from ls
function getNotes() {
  cardContainer.innerHTML = "";
  let notes;
  if (localStorage.getItem("notes") === null) {
    notes = [
      {
        id: Math.random() * 1000,
        title: "Test Note",
        desc: `Welcome to Note Taker`,
      },
    ];
    localStorage.setItem("notes", JSON.stringify(notes));
  } else {
    notes = JSON.parse(localStorage.getItem("notes"));
  }

  //format date
  function join(t, a, s) {
    function format(m) {
      let f = new Intl.DateTimeFormat("en", m);
      return f.format(t);
    }
    return a.map(format).join(s);
  }

  let a = [{ day: "numeric" }, { month: "short" }, { year: "numeric" }];
  let date = join(new Date(), a, "-");

  notes = Array.from(notes);
  notes.forEach(function (note) {
    var newCard = document.createElement("div");
    newCard.setAttribute("class", "card");
    const cardHTML = `
    <div class="card-title">
        <h4>${note.title}</h4>
        <div class="card-icons">
            <div class="card-edit" id="${note.id}" ><i class="far fa-edit"></i></div>
            <div class="card-delete" id="${note.id}">
                <i class="far fa-trash-alt"></i>
            </div>
        </div>
    </div>
    <div class="card-body">
    <p>${note.desc}</p>
    <span>${date}</span>
    </div>
`;
    newCard.innerHTML = cardHTML;
    cardContainer.appendChild(newCard);
  });
}

//add note into DOM and ls
function addNote(e) {
  e.preventDefault();
  var title = document.querySelector("#title").value;
  var desc = document.querySelector("#desc").value;
  let data = {
    id: Math.random() * 1000,
    title,
    desc,
  };

  var notes;
  if (localStorage.getItem("notes") === null) {
    notes = [];
  } else {
    notes = JSON.parse(localStorage.getItem("notes"));
  }

  notes.push(data);

  localStorage.setItem("notes", JSON.stringify(notes));
  document.querySelector("#title").value = "";
  document.querySelector("#desc").value = "";
  getNotes();

  modal.style.display = "none";
}
