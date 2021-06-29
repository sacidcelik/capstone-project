const path = require('path');

module.exports = {
  ignore: ['**/*.spec.js', '**/components/Shelf.js'],
  styleguideComponents: {
    Wrapper: path.join(__dirname, 'src/StyleGuideWrapper'),
  },
};
