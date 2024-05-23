var express = require('express');
const sendMail = require('../utils/mail');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { req });
});

router.get("/send-mail", async(req, res) => {
  const info = await sendMail('doanchinhit21@gmail.com', 'Xin chào anh An', 'Đố anh biết em là ai');
  res.json(info);
})

module.exports = router;
