const popup = document.querySelector(".addNote"),
  closeBtn = popup.querySelector(".close"),
  createNote = document.querySelector(".add_note"),
  addNote = document.querySelector(".content button"),
  titleEl = document.querySelector(".content input"),
  descEl = document.querySelector(".content textarea"),
  noteEl = document.querySelector(".notes"),
  noteTitle = popup.querySelector(".title_popup"),
  btnAdded = popup.querySelector("button");

const arrNotes = JSON.parse(localStorage.getItem("notes") || "[]");

let isUpdate = false,
  tempId;

const allMonth = [
  "Janvier",
  "Fevrier",
  "Mars",
  "Avril",
  "Mai",
  "Juin",
  "juillet",
  "Aout",
  "Septembre",
  "Octobre",
  "Novembre",
  "Decembre",
];

createNote.addEventListener("click", () => {
  popup.classList.add("active");
  isUpdate = false;
  noteTitle.innerText = "Add New Note";
  btnAdded.innerText = "Add Note";
  titleEl.value = "";
  descEl.value = "";
});

closeBtn.addEventListener("click", () => {
  popup.classList.remove("active");
});

function showdata() {
  document.querySelectorAll(".new_note").forEach((el) => el.remove());
  arrNotes.forEach((note, index) => {
    const { title, descriptions, eleDate } = note;
    let liTag = `<li class="new_note">
                        <div class="header_info">
                            <h3>${title}</h3>
                            <p>
                                ${descriptions}
                            </p>
                        </div>
                        <div class="setting">
                            <span class="date">${eleDate}</span>
                            <i onclick="showMenu(this)" class="fa-solid fa-ellipsis elips"></i>
                            <div class="menu">
                                <span onclick="editNote(${index}, '${title}', '${descriptions}')" class="edit"><i class="fa-solid fa-pen-to-square"></i> Edit</span>
                                <span onclick="deleteNote(${index})" class="delete"><i class="fa-solid fa-trash"></i> Delete</span>
                            </div>
                        </div>
                    </li> `;

    // console.log(liTag);
    createNote.insertAdjacentHTML("afterend", liTag);
  });
}

showdata();

function showMenu(el) {
  el.parentElement.classList.add("show");
  document.addEventListener("click", (e) => {
    if (e.target.tagName != "I" || e.target != el) {
      el.parentElement.classList.remove("show");
    }
  });
}

function deleteNote(id) {
  let confirmMsg = confirm("Are You Sur To Delete This Note ?");
  if (!confirmMsg) return;
  arrNotes.splice(id, 1);
  localStorage.setItem("notes", JSON.stringify(arrNotes));
  showdata();
}

function editNote(elId, title, desc) {
  createNote.click();
  isUpdate = true;
  tempId = elId;
  noteTitle.innerText = "Update Note";
  btnAdded.innerText = "Update";
  titleEl.value = title;
  descEl.value = desc;
}

addNote.addEventListener("click", () => {
  let titleValue = titleEl.value,
    descValue = descEl.value;

  if (!titleValue || !descValue) return;

  let dateEl = new Date(),
    month = allMonth[dateEl.getMonth()],
    date = dateEl.getDate(),
    year = dateEl.getFullYear();

  const obj = {
    title: titleValue,
    descriptions: descValue,
    eleDate: `${month} ${date}, ${year}`,
  };

  if (!isUpdate) {
    arrNotes.push(obj);
  } else {
    arrNotes[tempId] = obj;
    isUpdate = false;
  }

  localStorage.setItem("notes", JSON.stringify(arrNotes));
  showdata();

  closeBtn.click();
  titleEl.value = "";
  descEl.value = "";
});
