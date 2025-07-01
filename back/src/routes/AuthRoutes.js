const express = require('express');
const router = express.Router();
const {registerUser, login, logout} = require('./../controllers/authController');

router.get('/',(req,res)=>{
    return res.status(200).send('hello,authRouter');
});
router.post('/register', registerUser);
router.post('/login', login);
router.get('/logout', logout);

module.exports = router;