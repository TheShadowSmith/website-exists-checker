const express = require('express')
const router = express.Router()
const domainPing = require('domain-ping')


router.get('/url/:url', (req, res) => {

  const url = req.params.url;

  domainPing(url)
    .then(response => {
      res.send(response)
    })
    .catch(error => {
      res.send(error)
    })

})

module.exports = router;