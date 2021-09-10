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
  if (e.target.className === 'delete' || e.target.tagName !== 'BUTTON') {
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
    console.log('nextid (currentid) before increment:', data.nextEntryId);
    inputData.entryId = data.nextEntryId;
    console.log('entry just created:', inputData);
    data.nextEntryId++;
    console.log('nextid after increment:', data.nextEntryId);
    data.entries.unshift(inputData);
    // data.view = 'entries';
    createAndAdd(inputData);
  }
  // for both submit and edit do these thins
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
function handleDelete() {
  // access data.editing get entry id, then search through data.entries for
  // matching entry then remove from entries
  // change dom to match the data
  // change data.editing to null, close modal, swap view to 'entries
  // const entriesCopy = data.entries.slice();
  // while entryID property of the entry doesn't dqual the value of data.editing as a string
  // let entryIndex;
  // const id = data.editing + '';
  console.log('num entries before delete', data.entries.length);
  for (let i = 0; i < data.entries.length; i++) {
    const current = data.entries[i];
    console.log('deleted entry:', current);
    // eslint-disable-next-line eqeqeq
    if (current.entryId == data.editing) {
      console.log('data.editing:', data.editing, 'current entryId:', current.entryId);
      data.entries.splice(i, 1);
      console.log('num entries after delete', data.entries.length);
      break;
    }
  }
  // data.editing = null;
  const $deletedEntry = document.querySelector(`[data-entry-id='${data.editing}']`);
  $deletedEntry.remove();
  $confirm.close();
  swapView('entries');

}
const $dialogBtnContainer = document.querySelector('.buttons-dialog');

$dialogBtnContainer.addEventListener('click', e => {
  // console.log('target id', e.target.id)
  if (e.target.id === 'confirm') {
    // console.log('clicked confirm');
    handleDelete();
  }
  if (e.target.id === 'cancel') {
    $confirm.close();
  }
});

$delete.addEventListener('click', e => $confirm.showModal());
