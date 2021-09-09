/* exported data */

// all entries go into data.entries; this entire data object should be stored in local storage
// because all the data in it needs to persist
// entry being edited goes at data.entry
// data.nextEntryId gets incremented

// this file gets loaded first and main.js second. so functions in main.js can use the functions
// and variables defined in this file

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

let entries = [];
let idCount = 1;
let view = 'entry-form';

const $entriesList = document.getElementById('entries-ul');

function swapView() {
  const viewNodeList = document.querySelectorAll('.view');
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

// handle load and unload
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
    // entries is already in reverse chronologiccal order, so just append
    // in the same order as array
    entries.forEach(current => {
      const $current = createEntryElement(current);
      $entriesList.append($current);
    });
  }
}
// attach event listeners
window.addEventListener('beforeunload', handleUnload);
document.addEventListener('DOMContentLoaded', handlePageLoad);

function clearData() {
  localStorage.clear();
  entries = [];
  idCount = 1;
  view = 'entry-form';
  window.location.reload();
}
