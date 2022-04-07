const express = require('express');
const router = express.Router();
const orgsController = require('../controllers/orgs');

router.get('/', orgsController.list);
router.get('/:id', orgsController.view);

module.exports = router;