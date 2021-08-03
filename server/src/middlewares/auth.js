 
const jwt = require('jsonwebtoken');
const { User } = require('../app/models');

module.exports = async (req, res, next) => {
  if (req.header('Authorization')) {
    if(!req.header('Authorization').includes('Bearer ')) {
      return res.status(400).json({
        error: 'Invalid Authorization Header!',
      });
    }

    const token = req.header('Authorization').replace('Bearer ', '');

    let id;
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          error: 'Unauthorized!',
        });
      }
      id = decoded.id;
    });

    try {
      const user = await User.findByPk(id);

      if (!user) {
        return res.status(404).json({ error: 'User does not exists.' });
      }

      req.user = id;
      return next();
    } catch (error) {
      return res.status(500).json({ error: 'Server error.' });
    }
  } else {
    return res.status(400).json({
      error: 'Authorization Header not provided!',
    });
  }
};