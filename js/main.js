/* global data */
/* exported data */

const $entryForm = document.getElementById('entry-form');
const $photoUrlInput = $entryForm.elements[1];
const $photoPreview = document.getElementById('photo-preview');

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
  data.nextEntryId++;
  data.entries.unshift(inputData);
  $entryForm.reset();
  const placeholderUrl = './images/placeholder-image-square.jpg';
  $photoPreview.setAttribute('src', placeholderUrl);
}
$entryForm.addEventListener('submit', e => handleSubmit(e));

function handleUnload() {
  localStorage.setItem('prevEntriesJSON', JSON.stringify(data.entries));
}
window.addEventListener('beforeunload', handleUnload);

const lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosq.';

const dummyEntry = {
  entryId: 13,
  journalEntry: lorem,
  title: 'Scheme',
  photoUrl: 'images/dummy-images/scheme.jpg'
};

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

// console.log('$dummy', createEntryElement(dummyEntry));

// console.log('$firstListItem:', $firstListItem);

// const $entriesList = document.getElementById('entries-ul');
// $firstListItem.prepend(createEntryElement(dummyEntry));
// console.log('$entriesList:', $entriesList);
// $entriesList.prepend(createEntryElement(dummyEntry));
// console.log('prepended $entriesList:', $entriesList);
// console.log('$entriesList:', $entriesList);

const previousEntries = data.entries;
previousEntries.push(dummyEntry);
function displayEntries(entries) {
  // const $entriesView = document.getElementById('entries');
  const $firstListItem = document.querySelector('li:first-child');
  for (let i = 0; i < entries.length; i++) {
    const entry = entries[i];
    const $entryElement = createEntryElement(entry);
    $firstListItem.prepend($entryElement);
  }
}

// 'DOMContentLoaded' event fires after HTML document has been loaded; doesn't wait for stylesheets/images/etc
// 'load' event does wait for the page and all resources to completely load before firing
document.addEventListener('DOMContentLoaded', () => { displayEntries(previousEntries); });
// createEntryElement(dummyEntry);
