const mongoose = require("mongoose");

// Mongo pluralizes the name of the collection. This is the command to stop it
mongoose.pluralize(null);

const OrdersSchema = new mongoose.Schema({
  Cart: {
    type: Array,
    required: true,
  },
  FirstName: {
    type: String,
    required: true,
  },
  LastName: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
  },
  Address: {
    type: String,
    required: true,
  },
  City: {
    type: String,
    required: true,
  },
  PhoneNumber: {
    type: Number,
    required: true,
  },
  DeliveryTime: {
    type: String,
    required: true,
  },
  DeliveryWay: {
    type: String,
    required: true,
  },
  Status: {
    type: String,
    required: true,
    enum: ['New', 'In Progress', 'Delivery', 'Delivered'],
    default: 'New',
  },
});

const orders = mongoose.model("orders", OrdersSchema);
module.exports = orders;
