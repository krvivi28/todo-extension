// Get the input fields and note list
const titleInput = document.querySelector('#title');
const noteInput = document.querySelector('#note');
const noteList = document.querySelector('#note-list');

// Get the notes from local storage or set an empty array
let notes = JSON.parse(localStorage.getItem('notes')) || [];

// Render the notes
renderNotes();

// Handle the form submission
document.querySelector('form').addEventListener('submit', function(e) {
  e.preventDefault();
  
  // Get the title and note
  const title = titleInput.value;
  const note = noteInput.value;
  
  // Add the note to the notes array
  notes.push({ title, note });
  
  // Save the notes to local storage
  localStorage.setItem('notes', JSON.stringify(notes));
  
  // Clear the input fields
  titleInput.value = '';
  noteInput.value = '';
  
  // Render the notes
  renderNotes();
});

// Render the notes
function renderNotes() {
  // Clear the note list
  noteList.innerHTML = '';
  
  // Render each note
  notes.forEach((note, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <p class="title">${note.title}</p>
      <p>${note.note}</p>
      <button class="delete" onclick="deleteNote(${index})">Delete</button>
      <button class="copy" onclick="copyToClipboard(${index})">Copy</button>
    `;
    noteList.appendChild(li);
  });
}

// Delete a note
function deleteNote(index) {
  // Remove the note from the notes array
  notes.splice(index, 1);
  
  // Save the notes to local storage
  localStorage.setItem('notes', JSON.stringify(notes));
  
  // Render the notes
  renderNotes();
}

// Copy a note to clipboard
function copyToClipboard(index) {

  
  // Set the value to the note's title and note

  let textToCopy=`${notes[index].note}`;
  navigator.clipboard.writeText(textToCopy);
  console.log(`text copied:${textToCopy}`);
  
  // Alert the user that the note has been copied
  alert('Note copied to clipboard!');
}
