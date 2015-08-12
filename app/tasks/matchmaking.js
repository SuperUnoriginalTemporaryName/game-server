var db = require('../models');
var matchmaking = {
  search: (user) => {
    return new Promise((resolve, reject) => {
      db.sequelize.transaction(t => {
        return db.Matchmaking.findOne({
          
        }, {
          transaction: t
        }).then(matchmaking => {

        });
      });
    });
  }
};