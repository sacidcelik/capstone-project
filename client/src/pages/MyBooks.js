import Library from '../components/Library';

export default function MyBooks({ library }) {
  return (
    <main>
      <h2>My Books</h2>
      <Library library={library} />
    </main>
  );
}
