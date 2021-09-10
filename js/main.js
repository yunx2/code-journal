/* global data */
/* exported data */

const $entryForm = document.getElementById('entry-form');
const formELements = $entryForm.elements;
const $titleInput = formELements['entry-title'];
const $photoUrlInput = formELements['entry-url'];
const $entryTextarea = formELements['entry-notes'];
const $photoPreview = document.getElementById('photo-preview');
const $delete = document.querySelector('.delete');

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
  data.view = 'entries';
  swapView();
}

// attach event handlers
$entryForm.addEventListener('submit', e => handleSubmit(e));
$photoUrlInput.addEventListener('input', e => handleUrlInput(e));

// click handlers for view-swapping
const $entriesButton = document.getElementById('btn-entries');
$entriesButton.addEventListener('click', () => {
  data.view = 'entries';
  swapView();
});

const $newButton = document.getElementById('btn-new');
$newButton.addEventListener('click', () => {
  data.view = 'entry-form';
  swapView();
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
  data.view = 'entry-form';
  swapView();
  data.editing = id;
  $delete.style.visibility = 'visible';
}

$entriesList.addEventListener('click', e => handleEdit(e));
