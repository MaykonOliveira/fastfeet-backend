import * as Yup from 'yup';
import Recipient from '../models/Recipient';

class RecipientController {
  async index(req, res) {
    const recipients = await Recipient.findAll();
    return res.json(recipients);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      street: Yup.string().required(),
      number: Yup.number()
        .integer()
        .required(),
      complement: Yup.string(),
      state: Yup.string().required(),
      city: Yup.string().required(),
      zip_code: Yup.string()
        .length(8)
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    req.body.name = req.body.name.toUpperCase();
    const recipientExist = await Recipient.findOne({
      where: { name: req.body.name },
    });

    if (recipientExist) {
      return res.status(400).json({ error: 'Recipient already exists.' });
    }

    const recipient = await Recipient.create(req.body);
    return res.json(recipient);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      street: Yup.string(),
      number: Yup.number().integer(),
      complement: Yup.string(),
      state: Yup.string(),
      city: Yup.string(),
      zip_code: Yup.string().length(8),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const { id } = req.params;
    let { name } = req.body;

    const recipient = await Recipient.findByPk(id);

    if (name) {
      name = name.toUpperCase();
      if (name !== recipient.name) {
        const recipientExist = await Recipient.findOne({
          where: { name },
        });

        if (recipientExist) {
          return res.status(400).json({ error: 'Recipient already exists.' });
        }
      }
    }

    const recipientUpdated = await recipient.update(req.body);
    return res.json(recipientUpdated);
  }
}

export default new RecipientController();
