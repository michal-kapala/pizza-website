const { SendEmailViaMailjet } = require("../service/Mailjet");

const SendEmail = (req, res) => {
  const email = req.body.Email;

  SendEmailViaMailjet(email);

  return res.status(200).send(`Email has been sent to ${email}`);
};

module.exports = { SendEmail };
