var express = require('express');
var router = express.Router();

router.get('/', (req, res, next) => {
  req.user.getStats()
    .then(stats => res.status(200).json(stats).end())
    .catch(next);
});

module.exports = router;