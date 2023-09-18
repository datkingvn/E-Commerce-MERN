const router = require('express').Router();
const CouponController = require('../controllers/couponController.js');
const {isValidAccessToken, isAdmin} = require('../middlewares/isValidToken');

router.get('/', [isValidAccessToken, isAdmin], CouponController.getAllCoupons);
router.post('/', [isValidAccessToken, isAdmin], CouponController.createCoupon);
router.put('/:cid', [isValidAccessToken, isAdmin], CouponController.updateCoupon);
router.delete('/:cid', [isValidAccessToken, isAdmin], CouponController.deleteCoupon);

module.exports = router
