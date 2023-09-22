const router = require('express').Router();
const InsertFakeDataController = require('../controllers/insertFakeDataController.js');

router.post('/', InsertFakeDataController.insertProduct);
router.post('/cate', InsertFakeDataController.insertCategory);

module.exports = router