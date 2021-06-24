const validateShelf = (bookshelfId) => bookshelfId !== '';
const validateColumn = (columnId) => columnId !== '';
const validateCompartment = (compartmentId) => compartmentId !== '';

export default function validateShelfSelection(selection) {
  return (
    validateShelf(selection.bookshelfId) &&
    validateColumn(selection.columnId) &&
    validateCompartment(selection.compartmentId)
  );
}
