const validateShelf = (bookshelf) => bookshelf !== '';
const validateColumn = (column) => column !== '';
const validateCompartment = (compartment) => compartment !== '';

export default function validateShelfSelection(selection) {
  return (
    validateShelf(selection.bookshelf) &&
    validateColumn(selection.column) &&
    validateCompartment(selection.compartment)
  );
}
