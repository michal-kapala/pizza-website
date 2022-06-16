const OffersModel = require('../models/Offers');
const productSvc = require('../service/Products');

// Get all available offers (admin page)
async function GetOffersSvc() {
  try {
    const offers = await OffersModel.find({}, (err, result) => {
      return result;
    });
    // Enrich offers with full product information
    var fullOffers = [];

    for (let offer of offers) {
      // Swap the array of ids to an array of objects
      var products = await productSvc.GetFromProductsIds(offer.Products);
      offer.Products = products;
      fullOffers.push(offer);
    }
    return fullOffers;
  }
  catch (err) {
    console.error(err);
    return [];
  }
};

// Get from offers by code
async function GetOfferSvc(code) {
  try {
    const offer = await OffersModel.findOne({Code: code}, (err, result) => {
        return result;
    });
    // Swap the array of ids to an array of objects
    if(offer != null) {
      var products = await productSvc.GetFromProductsIds(offer.Products);
      offer.Products = products;
    }
    return offer;
  }
  catch (err) {
    console.error(err);
  }
};

// Get all nocode offers (offers page)
async function GetRegularOffersSvc() {
  try {
    const offers = await OffersModel.find({Code: 'nocode'}, (err, result) => {
      return result;
    });
    
    // Enrich offers with full product information
    var fullOffers = [];

    for (let offer of offers) {
      // Swap the array of ids to an array of objects
      var products = await productSvc.GetFromProductsIds(offer.Products);
      offer.Products = products;
      fullOffers.push(offer);
    }
    return fullOffers;
  }
  catch (err) {
    console.error(err);
    return [];
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
    Amount: offer.amount,
    DiscountFlat: offer.discountFlat,
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
      updatedOffer.Amount = offer.amount;
      updatedOffer.DiscountFlat = offer.discountFlat;
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

module.exports = { GetOffersSvc, GetOfferSvc, GetRegularOffersSvc, InsertOfferSvc, UpdateOfferSvc, DeleteOfferSvc };
