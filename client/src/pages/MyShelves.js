import ShelfCreator from '../components/ShelfCreator';

export default function MyShelves({ onSaveShelf }) {
  return (
    <main>
      <h2>My Shelves</h2>
      <ShelfCreator onSaveShelf={onSaveShelf} />
    </main>
  );
}
