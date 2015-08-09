var db = require('../models');
var Users = {
  getOrCreateByEmail: email => {
    var createUser = () => {
      return new Promise((resolve, reject) => {
        var u;
        db.sequelize.transaction(t => {
          return db.User.create({}, { transaction: t })
            .then(user => {
              u = user;
              return db.Email
                .create({ 
                  email: email, 
                  UserId: u.id 
                }, {
                  transaction: t
                });
            })
            .then(email => {
              return db.Stats
                .create({
                  UserId: u.id
                }, {
                  transaction: t
                });
            });
        }).then(() => {
          resolve(u);
        }).catch(reject);
      });
    };

    var getUser = emailObj => {
      if (emailObj) return emailObj.getUser();
      else return createUser();
    };

    return db.Email
      .find({
        where: { email: email }
      })
      .then(getUser);
  }
};

module.exports = Users;