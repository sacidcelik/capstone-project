import styled from 'styled-components';
import Library from '../components/Library';

export default function MyBooks({ library, onRenderBookDetails }) {
  return (
    <main>
      <PageHeadline>My Books</PageHeadline>
      <Library library={library} onRenderBookDetails={onRenderBookDetails} />
    </main>
  );
}
const PageHeadline = styled.h2`
  text-align: center;
`;
