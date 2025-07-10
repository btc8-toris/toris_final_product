const express = require('express');
const router = express.Router();
const {
  userGet,
  sameOrgUserGet,
  sixPersonsGet,
  answerWriteAll,
  myInfoGet,
} = require('../controllers/usersController');

router.get('/oneuser/:id', userGet);
router.get('/org/:org_code', sameOrgUserGet);
router.get('/demo', sixPersonsGet);
router.put('/ans_all/:id', answerWriteAll);
router.get('/myInfo/:id', myInfoGet);

module.exports = router;
