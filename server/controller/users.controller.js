import User from '../models/user.model.js';

function getUser(req, res) {
  const { userId } = req.params;
  User.findById(userId)
    .then((user) => res.json(user))
    .catch((error) =>
      res.json({ success: false, message: '404: User not found' })
    );
}

function getUsers(req, res) {
  User.find()
    .then((users) => res.json(users))
    .catch((error) =>
      res.json({ success: false, message: 'Could not retrieve users' })
    );
}

function postUser(req, res) {
  const newUser = new User({
    name: req.body.name,
  });
  newUser
    .save()
    .then((savedUser) => res.json(savedUser))
    .catch((error) =>
      res.json({ success: false, message: 'Could not save new user' })
    );
}

function updateShelves(req, res) {
  const { userId } = req.params;
  User.findByIdAndUpdate(
    { _id: userId },
    { $push: { shelves: req.body } },
    (error, doc) => {
      if (error) {
        res.json({
          success: false,
          message: 'Could not update this user with new shelf',
        });
      }
      res.json(doc);
    }
  );
}

function updateLibrary(req, res) {
  const { userId } = req.params;
  User.findByIdAndUpdate(
    { _id: userId },
    { $push: { library: req.body } },
    (error, doc) => {
      if (error) {
        console.error(error);
        res.json({
          success: false,
          message: error.message,
        });
      }
      res.json(doc);
    }
  );
}

export { getUser, getUsers, postUser, updateShelves, updateLibrary };
