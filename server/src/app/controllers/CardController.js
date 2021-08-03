const { Card, Expense, UserCards, User } = require('../models');

module.exports = {
  async index(req, res) {
    try {
      const cards = await Card.findAll({
        order: [
          ['id', 'ASC'],
        ],
        attributes: ['id', 'name', 'bank', 'limit', 'close_day'],
        include: [{
          model: Expense,
          attributes: ['id', 'name', 'cost', 'subscription', 'cost', 'installments', 'first_installment'],
        }, {
          model: User,
          attributes: [],
          where: { id: req.user }
        }]
      });

      return res.json(cards);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: [{ msg: 'Server error.' }] });
    }
  },

  async show(req, res) {
    try {
      const { id } = req.params;
      const card = await Card.findByPk(id, {
        attributes: ['id', 'name', 'bank', 'limit', 'close_day'],
        include: [{
          model: Expense,
          attributes: ['id', 'name', 'cost', 'subscription', 'cost', 'installments', 'first_installment'],
        }, {
          model: User,
          attributes: [],
          where: { id: req.user }
        }]
      });
      
      if(!card) {
        return res.status(404).json({ error: [{ msg: 'Card not found.' }] }); 
      }

      return res.json(card);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: [{ msg: 'Server error.' }] });
    }
  },

  async store(req, res) {
    try {
      const { name, bank, limit, close_day } = req.body;

      const card = await Card.create({
        name,
        bank, 
        limit,
        close_day
      });

      await card.setUsers(req.user);

      return res.json({
        id: card.id,
        name: card.name,
        bank: card.bank,
        limit: card.limit,
        close_day: card.close_day
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: [{ msg: 'Server error.' }] });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const { name, bank, limit, close_day } = req.body;

      const card = await Card.findByPk(id, {
        include: [{
          model: User,
          where: { id: req.user }
        }]
      });
      
      if(!card) {
        return res.status(404).json({ error: [{ msg: 'Card not found.' }] }); 
      }

      await card.update({
        name,
        bank,
        limit,
        close_day
      });

      return res.json({
        id: card.id,
        name: card.name,
        bank: card.bank,
        limit: card.limit,
        close_day: card.close_day
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: [{ msg: 'Server error.' }] });
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;
      const card = await Card.findByPk(id, {
        include: [{
          model: User,
          where: { id: req.user }
        }]
      });
      
      if(!card) {
        return res.status(404).json({ error: [{ msg: 'Card not found.' }] }); 
      }

      await card.destroy();

      return res.status(204).end();
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: [{ msg: 'Server error.' }] });
    }
  },
};