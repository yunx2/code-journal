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
