const express = require('express')
const router = express.Router()
const ping = require('ping');


router.get('/url/:url', (req, res) => {

  const url = req.params.url;

  ping.sys.probe(url, (isActive) => {
    res.send(isActive ? true : false);
  })

})

module.exports = router;