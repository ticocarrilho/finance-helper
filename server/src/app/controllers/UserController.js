const { User } = require('../models');
const { Op } = require('sequelize');

module.exports = {
  async index(req, res) {
    try {
      const users = await User.findAll({
        order: [
          ['id', 'ASC'],
        ],
        attributes: ['id', 'name', 'email'],
      });

      return res.json(users);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: [{ msg: 'Server error.' }] });
    }
  },

  async show(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id, {
        attributes: ['id', 'name', 'email']
      });
      
      if(!user) {
        return res.status(404).json({ error: [{ msg: 'User not found.' }] }); 
      }

      return res.json(user);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: [{ msg: 'Server error.' }] });
    }
  },

  async store(req, res) {
    try {
      const { name, email, password } = req.body;

      const emailInUse = await User.findOne({ where: { email } });

      if (emailInUse) {
        return res
          .status(400)
          .json({ error: [{ msg: 'E-mail already in use.', param: 'email' }] });
      }

      const user = await User.create({
        name,
        email, 
        password
      });

      const token = user.generateToken();

      return res.json({
        token
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: [{ msg: 'Server error.' }] });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const { name, email, password } = req.body;

      const user = await User.findByPk(id);
      
      if(!user) {
        return res.status(404).json({ error: [{ msg: 'User not found.' }] }); 
      }

      const emailInUse = await User.findOne({ 
        where: {
          [Op.and]: [{ email }, 
            { id: { [Op.ne]: id }}
          ]
        }
      });

      if (emailInUse) {
        return res
          .status(400)
          .json({ error: [{ msg: 'E-mail already in use.', param: 'email' }] });
      }

      await user.update({
        name,
        email,
        password
      });

      return res.json({
        id: user.id,
        name: user.name,
        email: user.email
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: [{ msg: 'Server error.' }] });
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id);
      
      if(!user) {
        return res.status(404).json({ error: [{ msg: 'User not found.' }] }); 
      }

      await user.destroy();

      return res.status(204).end();
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: [{ msg: 'Server error.' }] });
    }
  },

  async login(req, res) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ where: { email } });

      if (!user) {
        return res
          .status(400)
          .json({ error: [{ msg: 'Wrong E-mail or password.' }] });
      }

      const isPasswordCorrect = await user.checkPassword(password);

      if (!isPasswordCorrect) {
        return res
          .status(400)
          .json({ error: [{ msg: 'Wrong E-mail or password.' }] });
      }

      const token = user.generateToken();

      return res.json({
        token
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: [{ msg: 'Server error.' }] });
    }
  },
};