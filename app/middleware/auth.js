module.exports = (req, res, next) => {
  var authPath = req.path.indexOf('auth') !== -1;
  var authed = req.user !== undefined;
  if (!authed && !authPath)
    return res.status(401).end();
  next();
};