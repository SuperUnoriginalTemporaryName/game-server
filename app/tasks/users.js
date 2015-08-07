var db = require('../models');
var Users = {

  getUserByEmail: email => {
    var onUserFound = emailObj => {
      if (emailObj) return emailObj.getUser();
      else return createUser();
    };

    db.Email
      .find({
        where: { email: email }
      })
      .then(onUserFound);
  }
};

module.exports = Users;