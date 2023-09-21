
const{ Router } = require('express');
const { pruebasPost } = require('../controllers/pruebas.controller');

const router = new Router();

  router.post('/', pruebasPost);

  module.exports = router;