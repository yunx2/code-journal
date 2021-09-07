/* global data */
/* exported data */

const $entryForm = document.getElementById('entry-form');
const $photoUrlInput = $entryForm.elements['img-url'];


function handleUrlInput(e) {
  const $photoPreview = document.getElementById('photo-preview');
  // console.log('$photoPreview:', $photoPreview);
  // console.log('target.value',  e.target.value);
  $photoPreview.setAttribute('src', e.target.value);
  // console.log('$photoPreview:', $photoPreview);
}

$photoUrlInput.addEventListener('input', e => handleUrlInput(e));

// console.log('#entry-form:', $entryForm)
// console.log('$photoUrlInput', $entryForm.elements['img-url']);

const $journalEntryForm = document.getElementById('entry-text');
// console.log('$journalEntryForm', $journalEntryForm);

function handleSubmit(e) {
  e.preventDefault();
  // console.log('e.target', e.target);
  // console.log('e.target.value', e.target.value);
  const $entry = document.getElementById('entry-text');
  // const $entryForm = document.getElementById('entry-form');
  // console.log('$entry.elements', $entry.elements);
  // const title = $entryForm.elements['entry-title'].value;
  // const entry = $entry.elements[0].value;
  // const url = $entryForm.elements['entry-url'].value;
  // const inputData = {
  //   entryId: data.nextEntryId,
  //   journalEntry: entry,
  //   photoUrl: url,
  //   title: title
  // };

  // console.log('inputData: ', inputData);
//    console.log('nextEntryId, before increment: ', data.nextEntryId);
//   data.nextEntryId++;
//   console.log('nextEntryId, after increment: ', data.nextEntryId);
}

$journalEntryForm.addEventListener('submit', e => handleSubmit(e))
