/* global data */
/* exported data */

const $entryForm = document.querySelector('#entry-form');
const $photoUrlInput = $entryForm.elements['img-url'];


function handleUrlInput(e) {
  const $photoPreview = document.querySelector('#photo-preview');
  // console.log('$photoPreview:', $photoPreview);
  console.log('target.value', e.target.value);
  $photoPreview.setAttribute('src', e.target.value);
  console.log('$photoPreview:', $photoPreview);
}

$photoUrlInput.addEventListener('input', e => handleUrlInput(e));

// console.log('#entry-form:', $entryForm)
// console.log('$photoUrlInput', $entryForm.elements['img-url']);
