/* global data */
/* exported data */

const $entryForm = document.getElementById('entry-form');

const $photoUrlInput = $entryForm.elements[1];


function handleUrlInput(e) {
  $photoUrlInput.setAttribute('src', e.target.value);
}

$photoUrlInput.addEventListener('input', e => handleUrlInput(e));


function handleSubmit(e) {
  e.preventDefault();
  const entry = $entryForm.elements[2].value;
  const title = $entryForm.elements[0].value;
  const url = $entryForm.elements[1].value;
  const inputData = {
    entryId: data.nextEntryId,
    journalEntry: entry,
    photoUrl: url,
    title: title
  };
  data.nextEntryId++;
  data.entries.unshift(inputData);
  $entryForm.reset();
  const placeholderUrl = './images/placeholder-image-square.jpg';
  $photoUrlInput.setAttribute('src', placeholderUrl);
}

$entryForm.addEventListener('submit', e => handleSubmit(e));

function handleUnload() {
  localStorage.setItem('prevEntriesJSON', JSON.stringify(data.entries));
  console.log('localStorage.prevEntriesJSON:', localStorage.prevEntriesJSON);
}

window.addEventListener('beforeunload', handleUnload);
