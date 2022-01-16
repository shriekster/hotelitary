const express = require('express');
const router = express.Router();

const { db, err } = require('../db');

/* Handle the database errors before responding to API requests */
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
router.get('/hotels', function(req, res, next) {

  res.status(404).json({
    data: null,
    error: true,
    message: 'Informația solicitată nu există!'
  });

});

/* GET hotel information */
router.get('/hotels/:id', function(req, res, next) {

  const hotelId = Number(req.params.id);

  if (!isNaN(hotelId)) {

    const selectHotelInformation = db.prepare(`
      SELECT Judet AS judet, Localitate AS localitate,
        Strada AS strada, Numar AS numar, CodPostal AS codPostal,
        Telefon AS telefon, Fax AS fax, Email AS email,
        Website AS website
      FROM Unitati
      WHERE ID = ?`);

    let hotel, err;

    try {

      hotel = selectHotelInformation.get(hotelId);

    } catch (error) {

      err = error;

    } finally {

      if (!err) {

        res.status(200).json({

          judet: hotel.judet,
          localitate: hotel.localitate,
          strada: hotel.strada,
          numar: hotel.numar,
          codPostal: hotel.codPostal,
          telefon: hotel.telefon,
          fax: hotel.fax,
          email: hotel.email,
          website: hotel.website,

        });

      } else {

        res.status(404).json({
          data: null,
          error: true,
          message: 'Informația solicitată nu există!'
        });

      }

    }

  } else {

    res.status(404).json({
      data: null,
      error: true,
      message: 'Informația solicitată nu există!'
    });

  }

});

/* PUT (UPDATE) hotel information */
router.put('/hotels/:id', function(req, res, next) {

  const hotelId = Number(req.params.id);
  const attributeId = Number(req.body.id);
  const value = req.body.value;

  if (!isNaN(hotelId) && !isNaN(attributeId) && value) {

    let attribute;

    switch (id) {

      case 3:
      case 4:

    }

    const updateHotelInformation = db.prepare(`
      UPDATE Unitati
      SET`);

    let hotel, err;

    try {

      hotel = selectHotelInformation.get(hotelId);

    } catch (error) {

      err = error;

    } finally {

      if (!err) {

        res.status(200).json({

          judet: hotel.judet,
          localitate: hotel.localitate,
          strada: hotel.strada,
          numar: hotel.numar,
          codPostal: hotel.codPostal,
          telefon: hotel.telefon,
          fax: hotel.fax,
          email: hotel.email,
          website: hotel.website,

        });

      } else {

        res.status(404).json({
          data: null,
          error: true,
          message: 'Informația solicitată nu există!'
        });

      }

    }

  } else {

    res.status(404).json({
      data: null,
      error: true,
      message: 'Eroare: actualizare nereușită!'
    });

  }

});

/* Final route: handler for all the incorrect / invalid requests */
router.all('*', function(req, res, next) {
  
  res.status(404).json({
    data: null,
    error: true,
    message: 'Informația solicitată nu există!'
  });

});

module.exports = router;
