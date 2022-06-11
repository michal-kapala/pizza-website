const {GetOffersSvc, GetOfferSvc, InsertOfferSvc, UpdateOfferSvc, DeleteOfferSvc} = require('../service/Offers');

async function GetOffers(req, res) {
    var offers = await GetOffersSvc();
    return res.send(offers);
};

async function GetOffer(req, res) {
    const id = req.params.id;
    var offer = await GetOfferSvc(id);
    if(offer == null)
        return res.status(404).send('Offer not found');
    return res.send(offer);
};

function InsertOffer(req, res) {
    var offer = req.body.offer;
    InsertOfferSvc(offer);
    return res.sendStatus(201);
};

function UpdateOffer(req, res) {
    var offer = req.body.offer;
    const id = req.params.id;
    UpdateOfferSvc(id, offer);
    return res.sendStatus(200);
};

function DeleteOffer(req, res) {
    const id = req.params.id;
    DeleteOfferSvc(id);
    return res.sendStatus(204);
};

module.exports = { GetOffers, GetOffer, InsertOffer, UpdateOffer, DeleteOffer };
