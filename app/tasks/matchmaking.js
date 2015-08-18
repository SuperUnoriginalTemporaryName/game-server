var db = require('../models');
var matchmaking = {
  search: (user) => {
    return new Promise((resolve, reject) => {
      db.sequelize.transaction(t => {
        return db.Matchmaking.findOne({
          matched: false,
          cancelled: false
        }, {
          transaction: t
        }).then(matchmaking => {
          if (!matchmaking) {
            return db.Matchmaking.create({
              userOne: user.id
            });
          } else {
            
          }
        });
      });
    });
  }
};