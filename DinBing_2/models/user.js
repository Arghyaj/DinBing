const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const userSchema = mongoose.Schema({
  username: {type: String, default: ''},
  fullname: {type: String, default: ''},
  email: {type: String},
  password: {type: String, default: ''},
  userImage: {type: String, default: 'defaultPic.png'},
  facebook: {type: String, default: ''},
  fbTokens: Array,
  google: {type: String, default: ''},
  sentRequest: [{
      username: {type: String, default: ''}
  }],
  request: [{
      userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
      username: {type: String, default: ''}
  }],
  friendsList: [{
      friendId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
      friendName: {type: String, default: ''}
  }],
  totalRequest: {type: Number, default: 0},
});

//To ecrrypt the password, hassing is done bcrypt.genSaltSync(10)
userSchema.methods.encryptPassword = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};

// compareSync function compare b/w password and this.password and send result
userSchema.methods.validUserPassword = function(password) {
  return bcrypt.compareSync( password, this.password);
};

module.exports = mongoose.model('User', userSchema);
