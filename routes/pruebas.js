
const{ Router } = require('express');
const { pruebasPost, validateUser, validateRoom, validateLogin, obtenerSalas, singGoogle ,createUser, createSala, updateSala } = require('../controllers/pruebas.controller');

const router = new Router();

  router.post('/', pruebasPost);

  router.get('/api/user/:user', validateUser);

  router.get('/api/loadroom/:room', validateRoom);

  router.get('/api/obtenerSalas', obtenerSalas);

  router.post('/api/validateUser', validateLogin);

  router.post('/api/googleSing', singGoogle);

  router.post('/api/createUser', createUser);

  router.post('/api/createSala', createSala);

  router.put('/api/updateSala', updateSala);

  module.exports = router;