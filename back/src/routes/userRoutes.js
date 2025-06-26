const express = require('express');
const router = express.Router();
const { userGet, sameOrgUserGet } = require('../controllers/usersController');

router.get('/oneuser/:id', userGet);
router.get('/org/:org_code', sameOrgUserGet);

module.exports = router;
