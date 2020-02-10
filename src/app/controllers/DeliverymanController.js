import * as Yup from 'yup';

import Deliveryman from '../models/Deliveryman';

import AvatarInclude from './includes/AvatarInclude';

class DeliverymanController {
  async index(req, res) {
    const deliverymans = await Deliveryman.findAll({
      attributes: ['id', 'name', 'email'],
      include: [AvatarInclude],
    });

    return res.json(deliverymans);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const { email } = req.body;

    const existEmail = await Deliveryman.findOne({
      where: {
        email,
      },
    });

    if (existEmail) {
      return res.status(401).json({ error: 'The email must be unique.' });
    }

    const deliveryman = await Deliveryman.create(req.body);

    return res.json(deliveryman);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const { email } = req.body;

    const deliveryman = await Deliveryman.findByPk(req.params.id);

    if (email && deliveryman.email !== email) {
      const existEmail = await Deliveryman.findOne({
        where: {
          email,
        },
      });

      if (existEmail) {
        return res.status(401).json({ error: 'The email must be unique.' });
      }
    }

    const { id, name, avatar_id } = await deliveryman.update(req.body);

    return res.json({ id, name, email, avatar_id });
  }

  async destroy(req, res) {
    const deliveryman = await Deliveryman.findByPk(req.params.id);

    if (!deliveryman) {
      return res
        .status(401)
        .json({ error: 'Deliveryman with the given id does not exist.' });
    }

    await deliveryman.destroy();

    return res.json();
  }
}

export default new DeliverymanController();
