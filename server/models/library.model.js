import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const library = new Schema({
  id: String,
  etag: String,
  kind: String,
  rating: Number,
  volumeInfo: {
    authors: [String],
    averageRating: Number,
    categories: [String],
    description: String,
    imageLinks: { smallThumbnail: String, thumbnail: String },
    industryIdentifiers: [{}],
    infoLink: String,
    language: String,
    maturityRating: String,
    pageCount: Number,
    previewLink: String,
    printType: String,
    publishedDate: String,
    publisher: String,
    raitingsCount: Number,
    title: String,
    subtitle: String,
  },
  addToLibraryDate: String,
  shelfLocation: {
    bookshelfId: String,
    columnId: String,
    compartmentId: String,
  },
});

export default library;
