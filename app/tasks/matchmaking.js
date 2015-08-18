var db = require('../models');
var matchmaking = {
  search: (user) => {
    return new Promise((resolve, reject) => {
      // check to see if there is someone looking
      // for a match.  if there is not, add a db
      // record to start looking for a match. 
      // poll the db at a regular interval to see
      // if that match has been found.
      var matchmaking;
      db.sequelize.transaction(t => {
        return db.Matchmaking
          .findOne({
            matched: false,
            cancelled: false
          }, {
            transaction: t
          })
          .then(m => {
            if (!matchmaking) {
              return db.Matchmaking
                .create({
                  userOne: user.id
                });
            } else {
              return Promise.resolve(m);
            }
          })
          .then(m => {
            matchmaking = m;
            return Promise.resolve(m);
          });
        })
        .then(() => {
          console.log(matchmaking);
        });
      });
  }
};

module.exports = matchmaking;