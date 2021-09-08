/* exported data */

// all entries go into data.entries; this entire data object should be stored in local storage
// because all the data in it needs to persist
// entry being edited goes at data.entry
// data.nextEntryId gets incremented
var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

// const lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosq.';

// const scheme = {
//   entryId: 13,
//   journalEntry: lorem,
//   title: 'Scheme',
//   photoUrl: 'images/dummy-images/scheme.jpg'
// };

// const javascript = {
//   entryId: 8,
//   journalEntry: lorem,
//   title: 'Javascript',
//   photoUrl: './images/dummy-images/javascript.png'
// };

// const node = {
//   entryId: 4,
//   journalEntry: lorem,
//   title: 'Node',
//   photoUrl: '/images/dummy-images/node.png'
// };
