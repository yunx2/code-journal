/* global data */
/* exported data */

const $entryForm = document.getElementById('entry-form');
const formELements = $entryForm.elements;
const $titleInput = formELements['entry-title'];
const $photoUrlInput = formELements['entry-url'];
const $entryTextarea = formELements['entry-notes'];
const $photoPreview = document.getElementById('photo-preview');
const $delete = document.querySelector('.delete');
const $confirm = document.querySelector('.confirm-dialog');

function createAndAdd(entry) {
  const $el = createEntryElement(entry);
  // hide 'no-entries' object
  document.getElementById('no-entries-recorded').classList.add('hidden');
  const $firstListItem = document.querySelector('li:first-child');
  $firstListItem.prepend($el);
}
// 'DOMContentLoaded' event fires after HTML document has been loaded; doesn't wait for stylesheets/images/etc
// 'load' event does wait for the page and all resources to completely load before firing
function handleUrlInput(e) {
  $photoPreview.setAttribute('src', e.target.value);
}

function handleSubmit(e) {
  e.preventDefault();
  //   console.log('e.target closest button', e.target.closest('button'))
  // console.log('tagName  at handleSubmit', e.target.tagName)
  //  console.log('e.target at handleSubmit', e.target)
  const targetClass = e.target.getAttribute('class');
  // console.log('e.target class', targetClass)
  if (targetClass === 'delete') {
    // console.log('e.target closest button at on submit', e.target.closest('button'))
    return;
  }
  // if (e.target.tagName !== '') {
  const entry = $entryTextarea.value;
  const title = $titleInput.value;
  const url = $photoUrlInput.value;
  const inputData = {
    journalEntry: entry,
    photoUrl: url,
    title: title
  };
  // console.log('edit or submit', data.editing ? 'edit' : 'submit');
  if (data.editing) {
    inputData.entryId = data.editing;
    // search entries array for entry with matchingid and replace wiht updated entry
    // set value of entries to new array
    data.entries = data.entries.map(current => {
      if (current.entryId === inputData.entryId) {
        return inputData;
      }
      return current;
    });

    const $updated = createEntryElement(inputData);
    const $previous = document.querySelector(`[data-entry-id='${data.editing}']`);
    $previous.replaceWith($updated);
    // clean up
    data.editing = null;
    $delete.style.visibility = 'hidden';
  } else {
    inputData.entryId = data.nextEntryId;
    data.nextEntryId = data.nextEntryId++;
    data.entries.unshift(inputData);
    data.view = 'entries';
    createAndAdd(inputData);
  }
  // always switch to entries view on submit and reset form
  const placeholderUrl = './images/placeholder-image-square.jpg';
  $photoPreview.setAttribute('src', placeholderUrl);
  $entryForm.reset();
  // data.view = 'entries';
  swapView('entries');
}

// attach event handlers
$entryForm.addEventListener('click', e => handleSubmit(e));
$photoUrlInput.addEventListener('input', e => handleUrlInput(e));

// click handlers for view-swapping
const $entriesButton = document.getElementById('btn-entries');
$entriesButton.addEventListener('click', () => {
  // data.view = 'entries';
  swapView('entries');
});

const $newButton = document.getElementById('btn-new');
$newButton.addEventListener('click', () => {
  // data.view = 'entry-form';
  swapView('entry-form');
});

function prepopulateForm(entry) {
  const { title, photoUrl, journalEntry } = entry;
  $photoUrlInput.value = photoUrl;
  $titleInput.value = title;
  $entryTextarea.value = journalEntry;
  $photoPreview.setAttribute('src', photoUrl);
}

function handleEdit({ target }) {
  if (!(target.tagName === 'I')) {
    return;
  }
  // gets closest item matching the selector in argument
  const $entry = target.closest('article');
  const id = Number.parseInt($entry.getAttribute('data-entry-id'));
  const entry = data.entries.find(e => e.entryId === id);
  prepopulateForm(entry);
  // data.view = 'entry-form';
  swapView('entry-form');
  data.editing = id;
  $delete.style.visibility = 'visible';
}

$entriesList.addEventListener('click', e => handleEdit(e));
// feature 4: delete handler

function handleDeleteClick(e) {
  e.preventDefault();
  console.log('deletehandler', e.target);
  console.log('tagName on clicking delete', e.target.tagName);

  // e.stopPropagation()
  //  console.log('e.target closest button', e.target.closest('button'))
  // swapView('entry-form');
  $confirm.showModal();
}

$delete.addEventListener('click', e => handleDeleteClick(e));
