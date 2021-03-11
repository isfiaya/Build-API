const bodyParser = require('body-parser');
const sauce = require('../models/Sauces');


exports.getAllSauces = async (req, res) => {
  try {
    const sauces = await sauce.find();
    res.status(200).json(sauces);
  } catch (err) {
    res.status(400).json({ message: err });
  }
}

exports.getOneSauce = async (req, res) => {
  try {
    const oneSauce = await sauce.findById(req.params.id);
    res.status(200).json(oneSauce);
  } catch (err) {
    res.status(404).json({ message: err });
  }
}

exports.deleteSauce = async (req, res) => {
  try {
    const removeSauce = await sauce.remove({ _id: req.params.id });
    res.status(200).json('Deleted!');
  } catch (err) {
    res.status(400).json({ message: err });
  };
}

exports.updateSauce = async (req, res) => {
  const hotSauce = new sauce({
    _id: req.params.id,
    name: req.body.name,
    manufacturer: req.body.manufacturer,
    description: req.body.description,
    mainPepper: req.body.mainPepper,
    imageUrl: req.body.imageUrl,
    heat: req.body.heat,
  });
  try {
    const updateSauce = await sauce.updateOne({ _id: req.params.id }, hotSauce);
    res.status(201).json({ message: 'Sauce updated successfully!' });
  } catch (err) {
    res.status(400).json({ message: err });
  }
}

exports.submitSauce = async (req, res) => {
  const url = req.protocol + '://' + req.get('host');
  // req.body.sauce = json.parse(req.body.sauce);
  // Creat New Sauce
  const hotSauce = new sauce({
    userID: req.body.userID,
    name: req.body.name,
    manufacturer: req.body.manufacturer,
    description: req.body.description,
    mainPepper: req.body.mainPepper,
    imageUrl: url + '/images/' + req.file,
    heat: req.body.heat,
    likes: 0,
    dislikes: 0,
    usersLiked: [],
    usersDislikde: []
  })
  try {
    const savedhotSauce = await hotSauce.save();
    res.json({ message: 'Post saved successfully!' });
  } catch (err) {
    res.status(400).json({ error: err });
  }
}

exports.likeSauce = async (req, res) => {
  try {
    const oneSauce = await sauce.findById(req.params.id);
    if (req.body.like === 1) {
      oneSauce.usersLiked.push(req.body.userId);
      oneSauce.likes += 1;
    }
    else if (req.body.like === 0 && oneSauce.usersLiked.includes(req.body.userId)) {
      oneSauce.usersLiked.remove(req.body.userId);
      oneSauce.likes += -1;
    }
    else if (req.body.like === -1) {
      oneSauce.usersDisliked.push(req.body.userId);
      oneSauce.dislikes += 1;
    }
    else if (req.body.like === 0 && oneSauce.usersDisliked.includes(req.body.userId)) {
      oneSauce.usersDisliked.remove(req.body.userId);
      oneSauce.dislikes += -1;
    }
    oneSauce.save()
    res.status(201).json({ message: "Preference sended to the system." })
  } catch (err) {
    res.status(404).json({ message: err });
  }
}