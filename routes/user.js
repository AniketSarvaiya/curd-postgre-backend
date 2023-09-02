const express = require('express')
const userRoutes = require('../controller/userController')

const router = express.Router();


router.post("/add", userRoutes.registerUser)
router.get("/getone", userRoutes.getUser)
router.put('/update/:id', userRoutes.updateUser);
router.delete('/delete/:id', userRoutes.deleteUser);

module.exports = router;