const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(token == null) return res.sendStatus(401);
    jwt.verify(token, process.env.ACCESS_SECRET_TOKEN, (err, accessTokenPayload) => {
      console.log(accessTokenPayload)
      if(err) return res.sendStatus(403);
      req.accessTokenPayload = accessTokenPayload
      next()
    });
  }

module.exports = authenticateToken