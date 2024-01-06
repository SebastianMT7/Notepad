
let titles = [];
let notes = [];
let deletedNotes = [];
load();

function addNote() {
    let title = document.getElementById('titles');
    let note = document.getElementById('notes');

    if ((title.value.length == 0) || (note.value.length == 0)) {
        alert('Bitte alle Felder ausfüllen!');
    } else {
        titles.push(title.value);
        notes.push(note.value);
    }

    render();
    save();
}

function deleteNote(i) {
    deletedNotes.push({ title: titles[i], note: notes[i] });
    titles.splice(i, 1);
    notes.splice(i, 1);
    render();
    save();
}

function deleteNoteForever(i) {
    deletedNotes.splice(i, 1);
    renderTrash();
    save();
}

function deleteAllForever() {
    deletedNotes.splice(0, deletedNotes.length);
    renderTrash();
    save();
}


function returnNote(i) {
    titles.push(deletedNotes[i].title);
    notes.push(deletedNotes[i].note);
    deletedNotes.splice(i, 1);
    render();
    renderTrash();
    save();

}

function save() { //speichert alle Elemente im localStorage
    let titleSave = JSON.stringify(titles);
    let noteSave = JSON.stringify(notes);
    let deletedNoteSave = JSON.stringify(deletedNotes)
    localStorage.setItem('titles', titleSave);
    localStorage.setItem('notes', noteSave);
    localStorage.setItem('deletedNotes', deletedNoteSave);
}

function load() { //läd alle Elemente aus dem localStorage
    let titleSave = localStorage.getItem('titles');
    let noteSave = localStorage.getItem('notes');
    let deletedNoteSave = localStorage.getItem('deletedNotes');
    if (titleSave && noteSave) {
        titles = JSON.parse(titleSave);
        notes = JSON.parse(noteSave);
    }
    if (deletedNoteSave) {
        deletedNotes = JSON.parse(deletedNoteSave);
    }

}

function render() {
    let content = document.getElementById('content');
    content.innerHTML = '';
    content.innerHTML = ` 
  
    <div class="headPosition">
        <div class="head"> 
                <input id="titles" placeholder="Titel..">
                <textarea id="notes" placeholder="Notiz.."></textarea>
                <button onclick="addNote()">Hinzufügen</button>                
                <button onclick="renderTrash()">Papierkorb</button>
        </div>          
    </div>  
        
    `;

    for (let i = 0; i < titles.length; i++) {
        const title = titles[i];
        const note = notes[i];

        content.innerHTML += `
        <div class="note">   
             <div class="trashIcon">
                <b> <span alt="trashcan" onclick="deleteNote(${i})">X</span></b>
             </div>   
             <div class="noteText">
                <h2> ${title}</h2><br>             
                <span>${note}</span>
             </div>
            
        </div>

        `;

    }

}

function renderTrash() {  //erstellt die Papierkorbseite
    let content = document.getElementById('content');
    content.innerHTML = '';
    content.innerHTML = ` 
  
    <div class="headPosition">
        <div class="head"> 
            <button onclick="render()">Zurück</button><br>
            <button onclick="deleteAllForever()">Alle löschen</button>        
        </div>          
    </div>  
        
    `;

    for (let i = 0; i < deletedNotes.length; i++) {

        content.innerHTML += deletedNotesHTML(i);

    }

}

function deletedNotesHTML(i){
    return `
    <div class="note">   
         <div class="trashCardIcons">
            <b> <img src="./img/return.png" alt="return" class="returnIcon" onclick="returnNote(${i})"></b>
            <b> <span alt="trashcan" onclick="deleteNoteForever(${i})">X</span></b>
         </div>   
         <div class="noteText">
            <h2> ${deletedNotes[i].title}</h2><br>             
            <span> ${deletedNotes[i].note}</span>
         </div>
        
    </div>

    `;
}

