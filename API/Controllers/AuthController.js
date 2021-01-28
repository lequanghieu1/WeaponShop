const jwt = require("jsonwebtoken");
const Manager = require('../Models/Manager');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const { SECRECT_KEY, EXPIRE } = process.env
exports.login = async (req, res) => {
  var username = String(req.body.user_name).toLowerCase();
  var pass = req.body.password;
  try {
    let del = await Manager.findOne({ user_name: username })
    if (!del) { return res.status(404).json({ err: 'username or password invalid ' }) }
    let password = await bcrypt.compare(pass, del.password)
    if (!password) { return res.status(404).json({ err: 'username or password invalid' }) }
    if (del.is_login) {
      return res.status(400).json({
        err: 'you are logged in'
      })
    }
    const token = jwt.sign({
      uid: del._id
    }, SECRECT_KEY, { expiresIn: EXPIRE });
    // await Manager.updateOne({ _id: del.id }, { 'is_login': true })

    return res.status(200).json({
      status: 200,
      accessToken: token,
      messenger: "login successfully"

    });
  } catch (error) {
    res.status(500).json({ status: 500, error: error })
  }

}
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'n17dccn046@student.ptithcm.edu.vn',
    pass: 'lequanghieu'
  },
})
let otp = Math.floor(Math.random() * 1000000);
exports.forgot = async (req, res) => {
  try {
    let man = await Manager.findOne({ email: req.body.email })
    if (!man) { return res.status(404).json({ status: 205, err: `email ${man.email} is not match any username` }) }
    let mailOptions = {
      from: 'n17dccn046@student.ptithcm.edu.vn',
      to: `${req.body.email}`,
      subject: 'Reset password ',
      html: `Your otp is <h1> ${otp} </h1>`
    };
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log(err);
      }
      else {
        res.json({
          otp,
          _id: man._id
        })
      }
    })
  } catch (error) {
    res.status(500).json({ status: 500, error: error })
  }

}
exports.update = async (req, res, next) => {
  let manager_data = req.body
  const salt = await bcrypt.genSalt(10)
  const passwordHash = await bcrypt.hash(manager_data.password, salt)
  manager_data.password = passwordHash
  try {
      let del = await Manager.findById(manager_data.id)
      if (!del) { return res.status(404).json(manager_data) }
      let edit = { 'password': manager_data.password }
      let result = await Manager.updateOne({ _id: manager_data.id }, { $set: edit })
      return result.ok > 0 ? res.status(200).json({ mes: 'successfully' }) : res.status(304).json({ mes: 'fail' })
  } catch (error) {
      res.status(500).json({ status: 500, error: error })
  }
}


