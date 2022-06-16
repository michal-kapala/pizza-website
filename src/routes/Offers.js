const express = require("express");
const router = express.Router();

const { GetOffers, GetOffer, GetRegularOffers, InsertOffer, UpdateOffer, DeleteOffer } = require("../controllers/Offers");

router.get('/regular', GetRegularOffers);

router.get('/:code', GetOffer);

router.get('/', GetOffers);

router.post('/', InsertOffer);

router.put('/:id', UpdateOffer);

router.delete('/:id', DeleteOffer);

module.exports = router;
