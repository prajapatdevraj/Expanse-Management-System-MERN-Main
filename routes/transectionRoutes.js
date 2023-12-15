const express = require('express');
const { addTransection, getAllTransection, editTransection, deleteTransection } = require('../controllers/transectionCtrl');


//router object
const router = express.Router()

//routes
//add transection POST method
router.post('/add-transection',addTransection)

//edit transection POST method
router.post('/edit-transection',editTransection)

//get transection POST method
router.post('/get-transection',getAllTransection)

//Delete transection Post method
router.post('/delete-transection',deleteTransection)


module.exports = router;