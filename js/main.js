/* global data */
/* exported data */
const entries = [];
let idCount = 1;
const $entryForm = document.getElementById('entry-form');
const $photoUrlInput = $entryForm.elements[1];
const $photoPreview = document.getElementById('photo-preview');

function handleUnload() {
  data.entries = entries;
  data.nextEntryId = idCount;
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

function displayEntries() {
  // access localstorage at key 'dataJSON' and parse value back into JS
  const storedData = JSON.parse(localStorage.getItem('dataJSON'));
  // access 'entries' property of parsed data object
  const storedEntries = storedData.entries;
  // check that the entries array exists and has at least on eentry in it
  if (storedEntries && (storedEntries.length > 0)) {
    // hide 'no entries' message
    const $message = document.getElementById('no-entries-recorded');
    $message.classList.add('hidden');
    // iterate through storedEntries, create a <li> element from each entry object;
    // attach created elements to DOM
    for (let i = 0; i < storedEntries.length; i++) {
      const entry = storedEntries[i];
      createAndAdd(entry);
    }
  }
}

// 'DOMContentLoaded' event fires after HTML document has been loaded; doesn't wait for stylesheets/images/etc
// 'load' event does wait for the page and all resources to completely load before firing

function handleUrlInput(e) {
  $photoPreview.setAttribute('src', e.target.value);
}
$photoUrlInput.addEventListener('input', e => handleUrlInput(e));

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
  // console.log('entries after submit:', entries);
  // console.log('data.entries:', data.entries
  $entryForm.reset();
  const placeholderUrl = './images/placeholder-image-square.jpg';
  $photoPreview.setAttribute('src', placeholderUrl);
  createAndAdd(inputData);
  // $entryForm.classList.add('hidden');
}

$entryForm.addEventListener('submit', e => handleSubmit(e));

document.addEventListener('load', e => {
  $entryForm.classList.remove('hidden');
});
window.addEventListener('beforeunload', handleUnload);
document.addEventListener('DOMContentLoaded', displayEntries);
