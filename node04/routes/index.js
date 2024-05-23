var express = require('express');
var router = express.Router();
const queue = require("../core/queue");
const { addJob } = require("../core/queue");
const sendEmailSubscribe  = require("../jobs/sendEmailSubscribe");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get("/send-mail", async(req, res) => {
  // const emails = ["doanchinhit21@gmail.com", "hoangan.web@gmail.com"];
  const email = req.query.email;
  // console.log(req.query);
  await addJob('sendEmailSubscribe', [email]);
  // sendEmailSubscribe(emails);
  res.json({status: "success"});
});

module.exports = router;
