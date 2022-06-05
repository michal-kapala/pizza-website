const {
  InsertIntoOrders,
  GetFromOrders,
  GetFromOrdersById,
  GetFromOrdersAdmin,
} = require("../service/Orders");

const InsertOrder = (req) => {
  const cart = req.body.Cart;
  const userDetails = req.body.UserDetails;
  const deliveryDetails = req.body.DeliveryDetails;

  InsertIntoOrders(cart, userDetails, deliveryDetails);
};

const GetCarts = async (req, res) => {
  const email = req.params.email;

  const carts = await GetFromOrders(email);

  return res.send(carts);
};

const GetOrder = async (req, res) => {
  const id = req.params.id;

  const order = await GetFromOrdersById(id);

  return res.send(order);
};

const GetOrders = async (req, res) => {
  const orders = await GetFromOrdersAdmin();

  return res.send(orders);
};

module.exports = { InsertOrder, GetCarts, GetOrder, GetOrders };
