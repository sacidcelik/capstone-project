import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const shelves = new Schema({
  name: String,
  color: String,
  storedBooks: Number,
  columns: [
    {
      column: Number,
      width: Number,
      height: Number,
      compartments: [
        {
          compartment: Number,
          storedBooks: [String],
        },
      ],
    },
  ],
});

export default shelves;
