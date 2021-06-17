export default function getShelfBorders(element) {
  const shelfBorders = {
    white: '3px ridge lightgrey',
    black: '3px ridge black',
    wood: '3px ridge #CD8500',
    default: '3px dotted red',
  };

  return shelfBorders[element]
    ? shelfBorders[element]
    : shelfBorders['default'];
}
