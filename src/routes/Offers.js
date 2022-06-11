const express = require("express");
const router = express.Router();

const { GetOffers, GetOffer, InsertOffer, UpdateOffer, DeleteOffer } = require("../controllers/Offers");

router.get('/', GetOffers);

router.get('/:id', GetOffer);

router.post('/', InsertOffer);

router.put('/:id', UpdateOffer);

router.delete('/:id', DeleteOffer);

module.exports = router;
