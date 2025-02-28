const { Signup } = require("../Controllers/AuthController");
const {Login} = require("../Controllers/AuthLoginCtrlr");
const { userVerification } = require("../Middlewares/AuthMiddleware");
const router = require("express").Router();
const {InputText} = require("../Controllers/AuthTextController");
const {TextGetApi} = require("../Controllers/AuthGetCtrlr");
const {TextEditApi} = require("../Controllers/AuthTextEditCtlr");
const {TextDeleteApi} = require("../Controllers/AuthTextDelete");

router.post("/signup", Signup);
router.post('/login', Login);
router.post('/',userVerification);
router.post('/saveInput', InputText);
router.get('/getInputValue/:id', TextGetApi);
router.put('/updateInputValue/:id', TextEditApi);
router.delete('/deleteInputValue/:id', TextDeleteApi);

module.exports = router;