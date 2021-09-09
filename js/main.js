/* global data */
/* exported data */

const $entryForm = document.getElementById('entry-form');
const $photoUrlInput = $entryForm.elements[1];
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
  const entry = $entryForm.elements[2].value;
  const title = $entryForm.elements[0].value;
  const url = $entryForm.elements[1].value;
  const inputData = {
    entryId: idCount,
    journalEntry: entry,
    photoUrl: url,
    title: title
  };
  idCount++;
  entries.unshift(inputData);
  view = 'entries';
  $entryForm.reset();
  const placeholderUrl = './images/placeholder-image-square.jpg';
  $photoPreview.setAttribute('src', placeholderUrl);
  createAndAdd(inputData);
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
  const entry = entries.find(e => e.entryId === id);
  console.log('entry match:', entry, 'id', id);
//   view = 'entry-form';
//   swapView();
}

$entriesList.addEventListener('click', e => handleEdit(e));
