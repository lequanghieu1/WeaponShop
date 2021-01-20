const jwt = require("jsonwebtoken");
const Manager = require('../Models/Manager');
const bcrypt = require('bcryptjs');
const { SECRECT_KEY, EXPIRE } = process.env
exports.login = async (req, res) => {
  var username = String(req.body.user_name).toLowerCase();
  var pass = req.body.password;
  try {
    let del = await Manager.findOne({ user_name: username })
    if (!del) { return res.status(404).json({ err: 'username or password invalid ' }) }
    let password = await bcrypt.compare(pass, del.password)
    if (!password) { return res.status(205).json({ mes: 'username or password invalid' }) }
    if (del.is_login) {
      return res.status(200).json({
        mes: 'you are logged in'
      })
    }
    const token = jwt.sign({
      uid: del._id
    }, SECRECT_KEY, { expiresIn: EXPIRE });
    await Manager.updateOne({ _id: del.id }, { 'is_login': true })

    return res.status(200).json({
      status: 200,
      accessToken: token,
      messenger: "login successfully"

    });
  } catch (error) {
    res.status(500).json({ status: 500, error: error })
  }

}
