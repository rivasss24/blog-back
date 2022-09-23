
const { Router } = require('express');

const { check } = require('express-validator');
const { login, logOut, verificar } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');


const router = Router();

router.post('/' , [
    check('correo', 'El correo es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    validarCampos
] , login );

router.get('/', logOut );

router.get('/verificar', verificar );


module.exports = router;