const mongoose = require("mongoose");
// Mongo pluralizes the name of the collection. This is the command to stop it
mongoose.pluralize(null);

const OffersSchema = new mongoose.Schema({
  Products: {
    type: Array,
    required: true,
  },
  Type: {
    type: String,
    required: true,
    enum: ['priceOff', 'bundle', 'oneFree'],
  },
  ValidThrough: {
    type: Date,
    required: true,
  },
  Code: {
    type: String,
    required: true,
    default: 'nocode',
  },
  Description: {
    type: String,
    required: true,
  },
  DiscountFlat: {
    type: Number,
    required: true,
  },
  Homogenous: {
    type: Boolean,
    required: true,
  },
});

const offers = mongoose.model("offers", OffersSchema);
module.exports = offers;
