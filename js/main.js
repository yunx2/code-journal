/* global data */
/* exported data */

const $entryForm = document.getElementById('entry-form');
const formELements = $entryForm.elements;
const $titleInput = formELements['entry-title'];
const $photoUrlInput = formELements['entry-url'];
const $entryTextarea = formELements['entry-notes'];
const $photoPreview = document.getElementById('photo-preview');

function createAndAdd(entry) {
  // create DOM element from entry object
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
    // entryId: idCount,
    journalEntry: entry,
    photoUrl: url,
    title: title
  };
  if (editing) {
    inputData.entryId = editing;
    // search entries array for entry with matchingid and replace wiht updated entry
    // set value of entries to new array
    entries = entries.map(current => {
      if (current.entryId === inputData.id) {
        return inputData;
      }
      return current;
    });
    // change value of editing when finished
    editing = null;
  } else {
    inputData.entryId = idCount;
    idCount++;
    entries.unshift(inputData);
    view = 'entries';
    $entryForm.reset();
    const placeholderUrl = './images/placeholder-image-square.jpg';
    $photoPreview.setAttribute('src', placeholderUrl);
    createAndAdd(inputData);
  }
  // always witch to entries view on submit
  view = 'entries';
  swapView();
}

// attach event handlers
$entryForm.addEventListener('submit', e => handleSubmit(e));
$photoUrlInput.addEventListener('input', e => handleUrlInput(e));

// click handlers for view-swapping
const $entriesButton = document.getElementById('btn-entries');
$entriesButton.addEventListener('click', () => {
  view = 'entries';
  swapView();
});

const $newButton = document.getElementById('btn-new');
$newButton.addEventListener('click', () => {
  view = 'entry-form';
  swapView();
});

function prepopulateForm(entry) {
  const { title, photoUrl, journalEntry } = entry;
  // console.log('formElements', formElements);
  $photoUrlInput.value = photoUrl;
  $titleInput.value = title;
  $entryTextarea.value = journalEntry;
}

function handleEdit({ target }) {
  // console.log('target tagname:', e.target.tagName);
  if (!(target.tagName === 'I')) {
    return;
  }
  // console.log('target tagname:', target.tagName);
  // gets closest item matching the selector in argument
  const $entry = target.closest('article');
  // console.log('closest:', $entry);
  const id = Number.parseInt($entry.getAttribute('data-entry-id'));
  // console.log('id:', entryId);
  // get entry from entries array using id
  // const entry = entries.find(e => e.entryId === id);
  // console.log('entry match:', entry, 'id', id);
  // view = 'entry-form';
  // swapView();
  // prepopulateForm(entry);
  editing = id; // id is number!!!
  // console.log('data.editing:', editing);
}

$entriesList.addEventListener('click', e => handleEdit(e));
