const express = require('express');
const router = express.Router();
const {
  userGet,
  sameOrgUserGet,
  sixPersonsGet,
  answerWriteAll,
  answer1Write,
  answer2Write,
  answer3Write,
  answer4Write,
  answer5Write,
} = require('../controllers/usersController');

router.get('/oneuser/:id', userGet);
router.get('/org/:org_code', sameOrgUserGet);
router.get('/demo', sixPersonsGet);
router.put('/ans_all/:id', answerWriteAll);
// router.put('/ans1/:id', answer1Write);
// router.put('/ans2/:id', answer2Write);
// router.put('/ans3/:id', answer3Write);
// router.put('/ans4/:id', answer4Write);
// router.put('/ans5/:id', answer5Write);

module.exports = router;
