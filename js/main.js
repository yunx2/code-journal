/* global data */
/* exported data */
let entries = [];
let idCount = 1;
let view = 'entry-form';
const $entryForm = document.getElementById('entry-form');
const $photoUrlInput = $entryForm.elements[1];
const $photoPreview = document.getElementById('photo-preview');

function handleUnload() {
  data.entries = entries;
  data.nextEntryId = idCount;
  data.view = view;
  const dataJSON = JSON.stringify(data);
  localStorage.setItem('dataJSON', dataJSON);
}

function createEntryElement(entry) {
  const { entryId, journalEntry, photoUrl, title } = entry;
  // first create container elements
  const $entriesListItem = document.createElement('li'); // outermost element
  const $article = document.createElement('article');
  $article.classList.add('row');
  $article.setAttribute('data-entryId', entryId);
  // children of $article
  const $colHalfImg = document.createElement('div');
  $colHalfImg.classList.add('column-half');
  const $colHalfEntry = document.createElement('div');
  $colHalfEntry.classList.add('column-half');
  // elements that use data from entry object
  const $photo = document.createElement('img');
  $photo.classList.add('entry-img');
  $photo.setAttribute('src', photoUrl);
  $colHalfImg.append($photo);
  const $title = document.createElement('h3');
  $title.classList.add('entry-title');
  $title.textContent = title;
  const $entryPara = document.createElement('p');
  $entryPara.textContent = journalEntry;
  $colHalfEntry.append($title, $entryPara);
  $article.append($colHalfImg, $colHalfEntry);
  // append article to outermost element
  $entriesListItem.appendChild($article);
  // return outermost element
  return $entriesListItem;
}

function createAndAdd(entry) {
  // create DOM element from entry object
  const $el = createEntryElement(entry);
  // hide 'no-entries' object
  document.getElementById('no-entries-recorded').classList.add('hidden');
  const $firstListItem = document.querySelector('li:first-child');
  $firstListItem.prepend($el);
}

const viewNodeList = document.querySelectorAll('.view');

function swapView() {
  viewNodeList.forEach(node => {
    const data = node.getAttribute('data-view');
    if (data === view) {
      node.classList.remove('hidden');
      node.scrollIntoView();
    } else {
      node.classList.add('hidden');
    }
  });
}

const $entriesList = document.getElementById('entries-ul');

function handlePageLoad() {
  // access localstorage at key 'dataJSON' and parse value back into JS
  const storedData = JSON.parse(localStorage.getItem('dataJSON'));
  // intialized entries, idCount, and view variables with data from stored object
  entries = storedData.entries;
  idCount = storedData.nextEntryId;
  view = storedData.view;
  swapView();
  // check that the entries array exists and has at least on eentry in it
  if (entries && (entries.length > 0)) {
    // hide 'no entries' message
    const $message = document.getElementById('no-entries-recorded');
    $message.classList.add('hidden');
    // iterate through storedEntries, create a <li> element from each entry object;
    // attach created elements to DOM
    // entries is already in reverse chronologiccal order, so just append
    // in the same order as array
    entries.forEach(current => {
      const $current = createEntryElement(current);
      $entriesList.append($current);
    });
  }
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
    entryId: data.nextEntryId,
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

window.addEventListener('beforeunload', handleUnload);
document.addEventListener('DOMContentLoaded', handlePageLoad);

// click handlers for view-swapping
// handlers change the value of view variable and add 'hidden' class to all other views
// all 'active' to selected view

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

// function clearData() {
//   localStorage.clear();
//   entries = [];
//   idCount = 1;
//   view = 'entry-form';
//   window.location.reload();
// }
