const OffersModel = require('../models/Offers');
const productSvc = require('../service/Products');

// Get all available offers
async function GetOffersSvc() {
  try {
    const offers = await OffersModel.find({}, (err, result) => {
      return result;
    });

    // Enrich offers with full product information
    var fullOffers = [];
    offers.forEach(async (offer) => {
      // Swap the array of ids to an array of objects
      var products = await productSvc.GetFromProductsIds(offer.Products);
      offer.products = products;
      fullOffers.push(offer);
    });

    return fullOffers;
  } catch (err) {
    console.error(err);
  }
};

// Get from offers by id
async function GetOfferSvc(id) {
  try {
    const offer = await OffersModel.find(id, (err, result) => {
        return result;
    });
    // Swap the array of ids to an array of objects
    var products = await productSvc.GetFromProductsIds(offer.products);
    offer.products = products;

    return offer;
  } catch (err) {
    console.error(err);
  }
};

// Add to offers collection
async function InsertOfferSvc(offer) {
  const newOffer = new OffersModel({
    Products: offer.products,
    Type: offer.type,
    ValidThrough: offer.validThrough,
    Code: offer.code,
    Description: offer.description,
    DiscountFlat: offer.discountFlat,
    Homogenous: offer.homogenous,
  });
  
  try {
    await newOffer.save();
  } catch (err) {
    console.error(err);
  }
};

// Update offer
async function UpdateOfferSvc(id, offer) {
  try {
    await OffersModel.findById(id, (err, updatedOffer) => {
      updatedOffer.Products = offer.products;
      updatedOffer.Type = offer.type;
      updatedOffer.ValidThrough = offer.validThrough;
      updatedOffer.Code = offer.code;
      updatedOffer.Description = offer.description;
      updatedOffer.DiscountFlat = offer.discountFlat;
      updatedOffer.Homogenous = offer.homogenous;
      updatedOffer.save();
    });
  } catch (err) {
    console.error(err);
  }
};

// Delete offer
async function DeleteOfferSvc(id) {
  try {
    await OffersModel.findByIdAndRemove(id).exec();
  } catch(err) {
    console.error(err);
  }
}

module.exports = { GetOffersSvc, GetOfferSvc, InsertOfferSvc, UpdateOfferSvc, DeleteOfferSvc };
