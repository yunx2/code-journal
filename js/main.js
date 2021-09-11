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
const placeholderUrl = './images/placeholder-image-square.jpg';

function resetPlaceholder() {
  const placeholderUrl = './images/placeholder-image-square.jpg';
  $photoPreview.setAttribute('src', placeholderUrl);
}
// 'DOMContentLoaded' event fires after HTML document has been loaded; doesn't wait for stylesheets/images/etc
// 'load' event does wait for the page and all resources to completely load before firing

function handleEdit(formData) {
  // give data the id of edited entry
  formData.entryId = data.editing;
  // update entries array with edited entry
  data.entries = data.entries.map(current => { // array.map returns a new array
    // eslint-disable-next-line eqeqeq
    if (current.entryId == formData.entryId) {
      return formData;
    }
    return current;
  });
  // change DOMto match data
  const $edited = createEntryElement(formData);
  // get old entry and replace with new
  const $original = document.querySelector(`[data-entry-id='${data.editing}']`);
  $original.replaceWith($edited);
  // change data.editing back to null because editing is finished
  data.editing = null;
  // hide delete entry button again, so it won't be there when using the form to
  // add a new entry
  $delete.style.visibility = 'hidden';
}

function handleSubmit(formData) {
  formData.entryId = data.nextEntryId;
  // console.log('entry just created:', inputData);
  data.nextEntryId++;
  data.entries.unshift(formData);
  const $newEntry = createEntryElement(formData);
  // hide 'no-entries' element in case this entry is the first one and it isn't already hidden
  document.getElementById('no-entries-recorded').classList.add('hidden');
  // get first list item in entrylist and prepend
  const $firstListItem = document.querySelector('li:first-child');
  $firstListItem.prepend($newEntry);
}

function handleSave(e) {
  e.preventDefault();
  // only respond to clicks on the save button
  if (e.target.id !== 'save') {
    return;
  }
  // collect form data into an object
  const entry = $entryTextarea.value;
  const title = $titleInput.value;
  const url = $photoUrlInput.value;
  const entryData = {
    journalEntry: entry,
    photoUrl: url,
    title: title
  };
  // if data.editing has a value, do editing thigns
  if (data.editing) {
    handleEdit(entryData);
  } else { // else do submit things
    handleSubmit(entryData);
  }
  // for both submit and edit do these things
  resetPlaceholder();
  $entryForm.reset();
  swapView('entries');
}

// attach event handlers
$entryForm.addEventListener('click', e => handleSave(e));
$photoUrlInput.addEventListener('input', e => {
  $photoPreview.setAttribute('src', e.target.value);
});

// click handlers for view-swapping
const $entriesButton = document.getElementById('btn-entries');
$entriesButton.addEventListener('click', () => {
  $entryForm.reset();
  resetPlaceholder();
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

function showEditView({ target }) {
  if (!(target.tagName === 'I')) {
    return;
  }
  // gets closest item matching the selector in argument
  const $entry = target.closest('article');
  const id = $entry.getAttribute('data-entry-id');
  // find entry with matching id
  // eslint-disable-next-line eqeqeq
  const entry = data.entries.find(e => e.entryId == id);
  const { title, photoUrl, journalEntry } = entry;
  // use entry data to prepopulate form fields
  $photoUrlInput.value = photoUrl;
  $titleInput.value = title;
  $entryTextarea.value = journalEntry;
  $photoPreview.setAttribute('src', photoUrl);
  // show prepopulated form
  swapView('entry-form');
  data.editing = id;
  // 'delete entry' button should be visible because this is edit view
  $delete.style.visibility = 'visible';
}

$entriesList.addEventListener('click', e => showEditView(e));

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
