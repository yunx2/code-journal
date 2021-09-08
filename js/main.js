/* global data */
/* exported data */

const $entryForm = document.getElementById('entry-form');
// console.log('#entry-form:', $entryForm)
// console.log('entryForm.elements:', $entryForm.elements)
// console.log('title input value:', $entryForm.elements[0].value)


const $photoUrlInput = $entryForm.elements[1];


function handleUrlInput(e) {
  // const $photoPreview = document.getElementById('photo-preview');
  // console.log('$photoPreview:', $photoPreview);
  // console.log('target.value',  e.target.value);
  $photoUrlInput.setAttribute('src', e.target.value);
  // console.log('$photoPreview:', $photoPreview);
}

$photoUrlInput.addEventListener('input', e => handleUrlInput(e));


// console.log('$photoUrlInput', $entryForm.elements['img-url']);


// console.log('$journalEntryForm', $journalEntryForm);

function handleSubmit(e) {
  e.preventDefault();
  // console.log('e.target', e.target);
  // console.log('e.target.value', e.target.value);
  const entry = $entryForm.elements[2].value;
  // const $entryForm = document.getElementById('entry-form');
  // console.log('$entry.elements', $entry.elements);
  const title = $entryForm.elements[0].value;
  const url = $entryForm.elements[1].value;
  // const url = $entryForm.elements['entry-url'].value;
  const inputData = {
    entryId: data.nextEntryId,
    journalEntry: entry,
    photoUrl: url,
    title: title
  };

  // console.log('inputData: ', inputData);
//    console.log('nextEntryId, before increment: ', data.nextEntryId);
  data.nextEntryId++;
//   console.log('nextEntryId, after increment: ', data.nextEntryId);
  data.entries.unshift(inputData);
  // console.log(data.entries);
  $entryForm.reset();
  const placeholderUrl = './images/placeholder-image-square.jpg';
  $photoUrlInput.setAttribute('src', placeholderUrl);
//   localStorage.setItem('prevEntriesJSON', JSON.stringify(data.entries));
//   console.log('localStorage.prevEntriesJSON:', localStorage.prevEntriesJSON)
}

$entryForm.addEventListener('submit', e => handleSubmit(e));

function handleUnload() {
  localStorage.setItem('prevEntriesJSON', JSON.stringify(data.entries));
  console.log('localStorage.prevEntriesJSON:', localStorage.prevEntriesJSON);
}

window.addEventListener('beforeunload', handleUnload);

// const entries= [];
// const previousEntries = localStorage.getItem('prevEntriesJSON');
// if ()
