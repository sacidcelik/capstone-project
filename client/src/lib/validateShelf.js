const validateName = (name) => name.length >= 2;
const validateColumns = (columns) => columns.length >= 1;
const validateColor = (color) => color !== '';

export default function validateShelf(shelf) {
  return (
    validateName(shelf.name) &&
    validateColumns(shelf.columns) &&
    validateColor(shelf.color)
  );
}
