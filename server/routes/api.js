const express = require('express');
const router = express.Router();

const { db, err } = require('../db');

router.all('/*', function(req, res, next) {

  if (db && !err) {

    next();

  } else {

    res.status(500).json({
      data: null,
      error: true,
      message: 'Eroare a bazei de date!'
    });

  }

});

/* API requests */
/**
 * 
 */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.all('/*', function(req, res, next) {
  
  res.status(404).json({
    data: null,
    error: true,
    message: 'Informația solicitată nu există!'
  });

});

module.exports = router;
