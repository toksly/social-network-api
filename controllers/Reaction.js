// remove thought id 
return User.findOneAndUpdate(
    { thoughts: req.params.thoughtId },
    { pull: { thoughts: req.params.thoughtId } },
    { new: true }
  );
})
.then((dbUserData) => {
  if (!dbUserData) {
    return res.status(404).json({ message: 'Thought created, no user with id!' });
  }
  res.json({ message: 'Thought deleted!' });
})
.catch((err) => {
  console.log(err);
  res.status(400).json(err);
});
},

// add reaction 
exports.addReaction = (req, res) => {
Thought.findOneAndUpdate(
{ _id: req.params.thoughtId },
{ addToSet: { reactions: req.body } },
{ runValidators: true, new: true }
)
.then((dbThoughtData) => {
  if (!dbThoughtData) {
    return res.status(404).json({ message: 'No thought with this id!' });
  }
  res.json(dbThoughtData);
})
.catch((err) => {
  console.log(err);
  res.status(500).json(err);
});
},
// remove reaction 
exports.removeReaction = (req, res) => {
Thought.findOneAndUpdate(
{ _id: req.params.thoughtId },
{ pull: { reactions: { reactionId: req.params.reactionId } } },
{ runValidators: true, new: true }
)
.then((dbThoughtData) => {
  if (!dbThoughtData) {
    return res.status(404).json({ message: 'No thought with this id!' });
  }
  res.json(dbThoughtData);
})
.catch((err) => {
  console.log(err);
  res.status(500).json(err);
});
},
};