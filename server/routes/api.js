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
/* TODO: GET (READ) hotels (future work) */
router.get('/hotels', function(req, res, next) {

  res.status(404).json({
    data: null,
    error: true,
    message: 'Informația solicitată nu există!'
  });

});

/* GET (READ) hotel information */
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

      if (!err && hotel) {

        res.status(200).json({

          data: {
            judet: hotel.judet,
            localitate: hotel.localitate,
            strada: hotel.strada,
            numar: hotel.numar,
            codPostal: hotel.codPostal,
            telefon: hotel.telefon,
            fax: hotel.fax,
            email: hotel.email,
            website: hotel.website,
          },
          error: false,
          message: 'ok'

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
  const value = req.body.value.toString() || '---';

  if (!isNaN(hotelId) && !isNaN(attributeId) && value) {

    let attribute;

    switch (attributeId) {

      case 3: {
        attribute = 'Judet';
        break;
      }

      case 4: {
        attribute = 'Localitate';
        break;
      }

      case 5: {
        attribute = 'Strada';
        break;
      }

      case 6: {
        attribute = 'Numar';
        break;
      }

      case 7: {
        attribute = 'CodPostal';
        break;
      }

      case 8: {
        attribute = 'Telefon';
        break;
      }

      case 9: {
        attribute = 'Fax';
        break;
      }

      case 10: {
        attribute = 'Email';
        break;
      }

      case 11: {
        attribute = 'Website';
        break;
      }

      default: {
        res.status(404).json({
          data: null,
          error: true,
          message: 'Eroare: actualizare nereușită!'
        });
        return;
      }

    }

    const updateHotelInformation = db.prepare(`
      UPDATE Unitati
      SET ${attribute} = ?
      WHERE ID = ${hotelId}`);

    let info, err;

    try {

      info = updateHotelInformation.run(value);

    } catch (error) {

      err = error;

    } finally {

      if (!err) {

        res.status(200).json({
          data: null,
          error: false,
          message: 'Actualizat!'
        });

      } else {

        res.status(404).json({
          data: null,
          error: true,
          message: 'Eroare: actualizare nereușită!'
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

/* POST (CREATE) room types */
router.post('/hotels/:id/room-types', function(req, res, next) {

  const hotelId = Number(req.params.id);

  let { id, roomCategory, numberOfBeds, bedType, confortType, roomType } = req.body;

  const isValid = !isNaN(Number(id)) && !!Number(id) && !!roomCategory && !!numberOfBeds && !!bedType && !!confortType && !!roomType;

  if (!isNaN(hotelId) && isValid) {

    const selectRoomOptions = db.prepare(`
    SELECT ID AS roomOptionId, Denumire AS roomOptionValue
    FROM Module
    ORDER BY ID ASC`);

    const selectBedOptions = db.prepare(`
      SELECT ID AS bedOptionId, Denumire AS bedOptionValue, Locuri AS bedOptionCapacity
      FROM Paturi
      ORDER BY ID ASC`);

    const selectConfortOptions = db.prepare(`
      SELECT ID AS confortOptionId, Denumire AS confortOptionValue
      FROM Confort
      ORDER BY ID ASC`);

    const insertRoomType = db.prepare(`
      INSERT INTO TipuriModul(ID, ModulID, Paturi, PatID, ConfortID, Denumire)
      VALUES(?, ?, ?, ?, ?, ?)`);

    let info, roomOptionsRows, roomOptions = {}, bedOptionsRows, bedOptions = {}, confortOptionsRows, confortOptions = {}, err;

    try {

      roomOptionsRows = selectRoomOptions.all();

      for (let i = 0; i < roomOptionsRows.length; i++) {

        roomOptions[`${roomOptionsRows[i].roomOptionValue}`] =  roomOptionsRows[i].roomOptionId;

      }

      roomCategory = Number(roomOptions[roomCategory]);

      bedOptionsRows = selectBedOptions.all();

      for (let i = 0; i < bedOptionsRows.length; i++) {

        bedOptions[`${bedOptionsRows[i].bedOptionValue}`] = bedOptionsRows[i].bedOptionId;

      }

      bedType = Number(bedOptions[bedType]);

      confortOptionsRows = selectConfortOptions.all();

      for (let i = 0; i < confortOptionsRows.length; i++) {

        confortOptions[`${confortOptionsRows[i].confortOptionValue}`] = confortOptionsRows[i].confortOptionId;

      }

      confortType = Number(confortOptions[confortType]);

      info = insertRoomType.run(
        Number(id),
        roomCategory,
        Number(numberOfBeds),
        bedType,
        confortType,
        roomType.toString()
      );

    } catch (error) {

      err = error;

    } finally {

      if (!err) {

        res.status(200).json({
          data: null,
          error: false,
          message: 'Adăugat!'
        });

      } else {

        res.status(404).json({
          data: null,
          error: true,
          message: 'Eroare: adăugare nereușită!'
        });

      }

    }

  } else {

    res.status(404).json({
      data: null,
      error: true,
      message: 'Eroare: adăugare nereușită!'
    });

  }

});

/* GET (READ) room types */
router.get('/hotels/:id/room-types', function(req, res, next) {

  const hotelId = Number(req.params.id);

  if (!isNaN(hotelId)) {

    const selectRoomOptions = db.prepare(`
      SELECT ID AS roomOptionId, Denumire AS roomOptionValue
      FROM Module
      ORDER BY ID ASC`);

    const selectBedOptions = db.prepare(`
      SELECT ID AS bedOptionId, Denumire AS bedOptionValue, Locuri AS bedOptionCapacity
      FROM Paturi
      ORDER BY ID ASC`);

    const selectConfortOptions = db.prepare(`
      SELECT ID AS confortOptionId, Denumire AS confortOptionValue
      FROM Confort
      ORDER BY ID ASC`);

    const selectRoomTypes = db.prepare(`
      SELECT TipuriModul.ID AS id, Module.Denumire AS roomCategory, TipuriModul.Paturi AS numberOfBeds, Paturi.Denumire AS bedType, Confort.Denumire AS confortType, TipuriModul.Denumire AS roomType
      FROM TipuriModul
      INNER JOIN Module ON TipuriModul.ModulID = Module.ID
      INNER JOIN Paturi ON TipuriModul.PatID = Paturi.ID
      INNER JOIN Confort ON TipuriModul.ConfortID = Confort.ID`);

    let roomOptionsRows, roomOptions = [], bedOptionsRows, bedOptions = [], confortOptionsRows, confortOptions = [], roomTypes, err;

    try {

      roomOptionsRows = selectRoomOptions.all();
      bedOptionsRows = selectBedOptions.all();
      confortOptionsRows = selectConfortOptions.all();
      roomTypes = selectRoomTypes.all();

      for (let i = 0; i < roomOptionsRows.length; i++) {

        roomOptions.push(roomOptionsRows[i].roomOptionValue);

      }

      for (let i = 0; i < bedOptionsRows.length; i++) {

        bedOptions.push(bedOptionsRows[i].bedOptionValue);

      }

      for (let i = 0; i < confortOptionsRows.length; i++) {

        confortOptions.push(confortOptionsRows[i].confortOptionValue);

      }

    } catch (error) {

      err = error;

    } finally {

      if (!err) {



        res.status(200).json({

          data: {
            roomOptions: roomOptions,
            bedOptions: bedOptions,
            confortOptions: confortOptions,
            roomTypes: roomTypes,
          },
          error: false,
          message: 'ok'

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

/* PUT (UPDATE) room types */
router.put('/hotels/:id/room-types/:roomTypeId', function(req, res, next) {

  const hotelId = Number(req.params.id);
  const roomTypeId = Number(req.params.roomTypeId);
  const field = req.body.field.toString();
  let value = req.body.value.toString();

  if (!isNaN(hotelId) && !isNaN(roomTypeId) && !!field && !!value) {

    let attribute;
    
    switch (field) {

      case 'roomCategory': {
        attribute = 'ModulID';
        break;
      }

      case 'numberOfBeds': {
        attribute = 'Paturi';
        break;
      }

      case 'bedType': {
        attribute = 'PatID';
        break;
      }

      case 'confortType': {
        attribute = 'ConfortID';
        break;
      }

      case 'roomType': {
        attribute = 'Denumire';
        break;
      }

      default: {
        res.status(404).json({
          data: null,
          error: true,
          message: 'Eroare: actualizare nereușită!'
        });
        return;
      }

    }

    const selectRoomOptions = db.prepare(`
    SELECT ID AS roomOptionId, Denumire AS roomOptionValue
    FROM Module
    ORDER BY ID ASC`);

    const selectBedOptions = db.prepare(`
      SELECT ID AS bedOptionId, Denumire AS bedOptionValue, Locuri AS bedOptionCapacity
      FROM Paturi
      ORDER BY ID ASC`);

    const selectConfortOptions = db.prepare(`
      SELECT ID AS confortOptionId, Denumire AS confortOptionValue
      FROM Confort
      ORDER BY ID ASC`);

    const updateRoomTypes = db.prepare(`
      UPDATE TipuriModul
      SET ${attribute} = ?
      WHERE ID = ${roomTypeId}`);

    let info, roomOptionsRows, roomOptions = {}, bedOptionsRows, bedOptions = {}, confortOptionsRows, confortOptions = {}, err;

    try {

      switch (field) {

        case 'roomCategory': {

          roomOptionsRows = selectRoomOptions.all();

          for (let i = 0; i < roomOptionsRows.length; i++) {

            roomOptions[`${roomOptionsRows[i].roomOptionValue}`] =  roomOptionsRows[i].roomOptionId;
    
          }

          value = Number(roomOptions[value]);

          break;

        }

        case 'bedType': {

          bedOptionsRows = selectBedOptions.all();

          for (let i = 0; i < bedOptionsRows.length; i++) {

            bedOptions[`${bedOptionsRows[i].bedOptionValue}`] = bedOptionsRows[i].bedOptionId;
    
          }

          value = Number(bedOptions[value]);

          break;

        }
        
        case 'confortType': {

          confortOptionsRows = selectConfortOptions.all();

          for (let i = 0; i < confortOptionsRows.length; i++) {

            confortOptions[`${confortOptionsRows[i].confortOptionValue}`] = confortOptionsRows[i].confortOptionId;
    
          }

          value = Number(confortOptions[value]);

          break;

        }

        default: { break; }
      }
      
      info = updateRoomTypes.run(value);

    } catch (error) {

      err = error;

    } finally {

      if (!err) {

        res.status(200).json({
          data: null,
          error: false,
          message: 'Actualizat!'
        });

      } else {

        res.status(404).json({
          data: null,
          error: true,
          message: 'Eroare: actualizare nereușită!'
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

/* DELETE room types */
router.delete('/hotels/:id/room-types', function(req, res, next){

  const hotelId = Number(req.params.id);
  const { ids } = req.body;
  const isValid = ids.every(id => id > 0);

  if (!isNaN(hotelId) && !!ids && ids.length > 0 && isValid) {

    const deleteRoomType = db.prepare(`
      DELETE FROM TipuriModul
      WHERE ID = ?`);
    
    const deleteRoomTypes = db.transaction( (ids) => {

      for (const id of ids) {

        deleteRoomType.run(
            Number(id)
        );

      }

    });

    let err;

    try {

      deleteRoomTypes(ids);

    } catch (error) {

      err = error;

    } finally {

      if (!err) {

        res.status(200).json({
          data: null,
          error: false,
          message: 'Șters(e)!'
        });

      } else {

        res.status(404).json({
          data: null,
          error: true,
          message: 'Eroare: ștergere nereușită!'
        });

      }

    }

  } else {

    res.status(404).json({
      data: null,
      error: true,
      message: 'Eroare: ștergere nereușită!'
    });

  }

});

/* GET (READ) rooms */
router.get('/hotels/:id/rooms', function(req, res, next) {

  const roomStatuses = {

    '-1': 'curățenie',
    '0': 'liber',
    '1': 'rezervat',
    '2': 'ocupat'
      
  }

  const hotelId = Number(req.params.id);

  if (!isNaN(hotelId)) {

    const selectFloorOptions = db.prepare(`
    SELECT Denumire AS floorOptionValue
    FROM Etaje
    ORDER BY ID ASC`);

    const selectRoomTypeOptions = db.prepare(`
      SELECT Denumire AS roomTypeOptionValue
      FROM TipuriModul
      ORDER BY ID ASC`);

    const selectRooms = db.prepare(`
      SELECT Spatii.ID AS id, Etaje.Denumire AS floor, Spatii.Numar AS number, TipuriModul.Denumire AS roomType, Status AS status
      FROM Spatii
      INNER JOIN Etaje ON Spatii.EtajID = Etaje.ID
      INNER JOIN TipuriModul ON Spatii.TipModulID = TipuriModul.ID`);

    let floorOptionsRows, floorOptions = [], roomTypeOptionsRows, roomTypeOptions = [], rooms, err;

    try {

      floorOptionsRows = selectFloorOptions.all();
      roomTypeOptionsRows = selectRoomTypeOptions.all();
      rooms = selectRooms.all();

      for (let i = 0; i < floorOptionsRows.length; i++) {

        floorOptions.push(floorOptionsRows[i].floorOptionValue);

      }

      for (let i = 0; i < roomTypeOptionsRows.length; i++) {

        roomTypeOptions.push(roomTypeOptionsRows[i].roomTypeOptionValue);

      }

      for (let i = 0; i < rooms.length; i++) {

        rooms[i].status = roomStatuses[`${rooms[i].status}`];

      }

    } catch (error) {

      err = error;console.log(err)

    } finally {

      if (!err) {

        res.status(200).json({

          data: {
            floorOptions: floorOptions,
            roomTypeOptions: roomTypeOptions,
            rooms: rooms,
          },
          error: false,
          message: 'ok'

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

/* PUT (UPDATE) rooms */
router.put('/hotels/:id/rooms/:roomId', function(req, res, next) {

  const hotelId = Number(req.params.id);
  const roomId = Number(req.params.roomId);
  const field = req.body.field.toString();
  let value = req.body.value.toString();

  if (!isNaN(hotelId) && !isNaN(roomId) && !!field && !!value) {

    let attribute;
    
    switch (field) {

      case 'floor': {
        attribute = 'EtajID';
        break;
      }

      case 'number': {
        attribute = 'Numar';
        break;
      }

      case 'roomType': {
        attribute = 'TipModulID';
        break;
      }

      default: {
        res.status(404).json({
          data: null,
          error: true,
          message: 'Eroare: actualizare nereușită!'
        });
        return;
      }

    }

    const selectFloorOptions = db.prepare(`
      SELECT ID AS floorOptionId, Denumire AS floorOptionValue
      FROM Etaje
      ORDER BY ID ASC`);

    const selectRoomTypeOptions = db.prepare(`
    SELECT ID AS roomTypeOptionId, Denumire AS roomTypeOptionValue
    FROM Module
    ORDER BY ID ASC`);

    const updateRooms = db.prepare(`
      UPDATE Spatii
      SET ${attribute} = ?
      WHERE ID = ${roomId}`);

    let info, floorOptionsRows, floorOptions = {}, roomTypeOptionsRows, roomTypeOptions = {}, err;

    try {

      switch (field) {

        case 'floor': {

          floorOptionsRows = selectFloorOptions.all();

          for (let i = 0; i < floorOptionsRows.length; i++) {

            floorOptions[`${floorOptionsRows[i].floorOptionValue}`] =  floorOptionsRows[i].floorOptionId;
    
          }

          value = Number(floorOptions[value]);

          break;

        }

        case 'roomType': {

          roomTypeOptionsRows = selectRoomTypeOptions.all();

          for (let i = 0; i < roomTypeOptionsRows.length; i++) {

            roomTypeOptions[`${roomTypeOptionsRows[i].roomTypeOptionValue}`] =  roomTypeOptionsRows[i].roomTypeOptionId;
    
          }

          value = Number(roomTypeOptions[value]);

          break;

        }

        default: { break; }
      }
      
      info = updateRooms.run(value);

    } catch (error) {

      err = error;

    } finally {

      if (!err) {

        res.status(200).json({
          data: null,
          error: false,
          message: 'Actualizat!'
        });

      } else {

        res.status(404).json({
          data: null,
          error: true,
          message: 'Eroare: actualizare nereușită!'
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

/* POST (CREATE) rooms */
router.post('/hotels/:id/rooms', function(req, res, next) {

  const roomStatuses = {

    'curățenie': '-1',
    'liber': '0',
    'rezervat': '1', 
    'ocupat': '2'
      
  };

  const hotelId = Number(req.params.id);

  let { id, floor, number, roomType, status } = req.body;

  const isValid = !isNaN(Number(id)) && !!Number(id) && !!floor && !!number && !!roomType && !!status;

  if (!isNaN(hotelId) && isValid) {

    const selectFloorOptions = db.prepare(`
      SELECT ID AS floorOptionId, Denumire AS floorOptionValue
      FROM Etaje
      ORDER BY ID ASC`);

    const selectRoomTypeOptions = db.prepare(`
    SELECT ID AS roomTypeOptionId, Denumire AS roomTypeOptionValue
    FROM TipuriModul
    ORDER BY ID ASC`);

    const insertRoom= db.prepare(`
      INSERT INTO Spatii(ID, EtajID, Numar, TipModulID, Status)
      VALUES(?, ?, ?, ?, ?)`);

    let info, floorOptionsRows, floorOptions = {}, roomTypeOptionsRows, roomTypeOptions = {}, err;

    try {

      floorOptionsRows = selectFloorOptions.all();

      for (let i = 0; i < floorOptionsRows.length; i++) {

        floorOptions[`${floorOptionsRows[i].floorOptionValue}`] =  floorOptionsRows[i].floorOptionId;

      }

      floor = Number(floorOptions[`${floor}`]);

      roomTypeOptionsRows = selectRoomTypeOptions.all();

      for (let i = 0; i < roomTypeOptionsRows.length; i++) {

        roomTypeOptions[`${roomTypeOptionsRows[i].roomTypeOptionValue}`] =  roomTypeOptionsRows[i].roomTypeOptionId;

      }

      roomType = Number(roomTypeOptions[`${roomType}`]);

      status = Number(roomStatuses[`${status}`]);

      info = insertRoom.run(
        Number(id),
        floor,
        number.toString(),
        roomType,
        status
      );

    } catch (error) {

      err = error;console.log(err)

    } finally {

      if (!err) {

        res.status(200).json({
          data: null,
          error: false,
          message: 'Adăugat!'
        });

      } else {

        res.status(404).json({
          data: null,
          error: true,
          message: 'Eroare: adăugare nereușită!'
        });

      }

    }

  } else {

    res.status(404).json({
      data: null,
      error: true,
      message: 'Eroare: adăugare nereușită!'
    });

  }

});

/* DELETE rooms */
router.delete('/hotels/:id/rooms', function(req, res, next){

  const hotelId = Number(req.params.id);
  const { ids } = req.body;
  const isValid = ids.every(id => id > 0);

  if (!isNaN(hotelId) && !!ids && ids.length > 0 && isValid) {

    const deleteRoom = db.prepare(`
      DELETE FROM Spatii
      WHERE ID = ?`);
    
    const deleteRooms = db.transaction( (ids) => {

      for (const id of ids) {

        deleteRoom.run(
            Number(id)
        );

      }

    });

    let err;

    try {

      deleteRooms(ids);

    } catch (error) {

      err = error;

    } finally {

      if (!err) {

        res.status(200).json({
          data: null,
          error: false,
          message: 'Șters(e)!'
        });

      } else {

        res.status(404).json({
          data: null,
          error: true,
          message: 'Eroare: ștergere nereușită!'
        });

      }

    }

  } else {

    res.status(404).json({
      data: null,
      error: true,
      message: 'Eroare: ștergere nereușită!'
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
