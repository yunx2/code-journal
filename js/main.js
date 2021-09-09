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
  // console.log('entries before unload:', entries);
  // console.log('idCount before unload:', idCount);
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
  $entriesListItem.appendChild($article);

  return $entriesListItem;
  // console.log('$entriesListItem:', $entriesListItem);
  // console.log('entryId:', entryId);
  // console.log('title:', title);
  // console.log('entryId:', entryId);
}

// const $entriesList = document.getElementById('entries-ul');
// $firstListItem.prepend(createEntryElement(dummyEntry));
// console.log('$entriesList:', $entriesList);
// $entriesList.prepend(createEntryElement(dummyEntry));
// console.log('prepended $entriesList:', $entriesList);
// console.log('$entriesList:', $entriesList);
// previousEntries.push(dummyEntry);

function createAndAdd(entry) {
  // create DOM element from entry object
  const $el = createEntryElement(entry);
  // hide 'no-entries' object
  document.getElementById('no-entries-recorded').classList.add('hidden');
  const $firstListItem = document.querySelector('li:first-child');
  $firstListItem.prepend($el);
}

const viewNodeList = document.querySelectorAll('.view');
// console.log('viewNodeList:', viewNodeList);

function swapView(view) {
  viewNodeList.forEach(node => {
    const data = node.getAttribute('data-view');
    if (data === view) {
      node.classList.remove('hidden');
    } else {
      node.classList.add('hidden');
    }
  });
}

function handlePageLoad() {
  // access localstorage at key 'dataJSON' and parse value back into JS
  const storedData = JSON.parse(localStorage.getItem('dataJSON'));
  // intialized entries, idCount, and view variables with data from stored object
  entries = storedData.entries;
  idCount = storedData.nextEntryId;
  view = storedData.view;
  // check that the entries array exists and has at least on eentry in it
  if (entries && (entries.length > 0)) {
    // hide 'no entries' message
    const $message = document.getElementById('no-entries-recorded');
    $message.classList.add('hidden');
    // iterate through storedEntries, create a <li> element from each entry object;
    // attach created elements to DOM
    entries.forEach(current => {
      createAndAdd(current);
    });
  }
  // swapView(view);
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
  // console.log('entries after submit:', entries);
  // console.log('data.entries:', data.entries
  $entryForm.reset();
  const placeholderUrl = './images/placeholder-image-square.jpg';
  $photoPreview.setAttribute('src', placeholderUrl);
  createAndAdd(inputData);
  // $entryForm.classList.add('hidden');
}

// attach event handlers
$entryForm.addEventListener('submit', e => handleSubmit(e));
$photoUrlInput.addEventListener('input', e => handleUrlInput(e));
// document.addEventListener('load', e => {
//   $entryForm.classList.remove('hidden');
// });
window.addEventListener('beforeunload', handleUnload);
document.addEventListener('DOMContentLoaded', handlePageLoad);

// click handlers for view-swapping
// handlers change the value of view variable and add 'hidden' class to all other views
// all 'active' to selected view

const $entriesButton = document.getElementById('btn-entries');
$entriesButton.addEventListener('click', () => {
  view = 'entries';
  swapView(view);
  // console.log('viewNodeList:', viewNodeList);
});

const $newButton = document.getElementById('btn-new');
$newButton.addEventListener('click', () => {
  view = 'entry-form';
  swapView(view);
});
