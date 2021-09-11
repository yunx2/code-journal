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
  // only respond to clicks on the save button
  if (e.target.id !== 'save') {
    return;
  }
  const entry = $entryTextarea.value;
  const title = $titleInput.value;
  const url = $photoUrlInput.value;
  const inputData = {
    journalEntry: entry,
    photoUrl: url,
    title: title
  };
  // if data.editing has a value, do editing thigns
  if (data.editing) {
    inputData.entryId = data.editing;
    // replace entry with edited version in  and set array with editied entires to data.entrioes
    // make changes in data
    data.entries = data.entries.map(current => {
      // eslint-disable-next-line eqeqeq
      if (current.entryId == inputData.entryId) {
        return inputData;
      }
      return current;
    });
    // change DOMto match data
    const $updated = createEntryElement(inputData);
    // get old entry and replace with new
    const $previous = document.querySelector(`[data-entry-id='${data.editing}']`);
    $previous.replaceWith($updated);
    // clean up
    data.editing = null;
    $delete.style.visibility = 'hidden';
  } else { // else do submit things
    inputData.entryId = data.nextEntryId;
    // console.log('entry just created:', inputData);
    data.nextEntryId++;
    data.entries.unshift(inputData);
    createAndAdd(inputData);
  }
  // for both submit and edit do these thins
  const placeholderUrl = './images/placeholder-image-square.jpg';
  $photoPreview.setAttribute('src', placeholderUrl);
  $entryForm.reset();
  swapView('entries');
}

// attach event handlers
$entryForm.addEventListener('click', e => handleSubmit(e));
$photoUrlInput.addEventListener('input', e => handleUrlInput(e));

// click handlers for view-swapping
const $entriesButton = document.getElementById('btn-entries');
$entriesButton.addEventListener('click', () => {
  swapView('entries');
});

const $newButton = document.getElementById('btn-new');
$newButton.addEventListener('click', () => {
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
  swapView('entry-form');
  data.editing = id;
  $delete.style.visibility = 'visible';
}

$entriesList.addEventListener('click', e => handleEdit(e));
// feature 4: delete handler
function handleDelete() {
  for (let i = 0; i < data.entries.length; i++) {
    const current = data.entries[i];
    // eslint-disable-next-line eqeqeq
    if (current.entryId == data.editing) {
      data.entries.splice(i, 1);
      break;
    }
  }
  const $deletedEntry = document.querySelector(`[data-entry-id='${data.editing}']`);
  data.editing = null;
  $deletedEntry.remove();
  $confirm.close();
  swapView('entries');
  $entryForm.reset();
}

const $dialogBtnContainer = document.querySelector('.buttons-dialog');

$dialogBtnContainer.addEventListener('click', e => {
  if (e.target.id === 'confirm') {
    handleDelete();
  }
  if (e.target.id === 'cancel') {
    $confirm.close();
  }
});

$delete.addEventListener('click', e => $confirm.showModal());
