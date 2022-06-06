const OrdersModel = require("../models/Orders");

// Insert into Orders Collection
const InsertIntoOrders = async (cart, userDetails, deliveryDetails) => {
  const order = new OrdersModel({
    Cart: cart,

    FirstName: userDetails.firstName,
    LastName: userDetails.lastName,
    Email: userDetails.email,
    Address: userDetails.address,
    City: userDetails.city,
    PhoneNumber: userDetails.phoneNo,

    DeliveryTime: deliveryDetails.deliveryTime,
    DeliveryWay: deliveryDetails.deliveryWay,
    Status: 'New'
  });

  try {
    await order.save();
  } catch (err) {
    console.log(err);
  }
};

// Get data from Orders Colletion by email
const GetFromOrders = async (email) => {
  try {
    const carts = await OrdersModel.find(
      { Email: email },
      { Cart: 1 },
      (err, result) => {
        return result;
      }
    );
    return carts;
  } catch (err) {
    console.log(err);
  }
};

// Get particular order by id
const GetFromOrdersById = async (id) => {
  try {
    const order = await OrdersModel.find({ _id: id }, (err, result) => {
      return result;
    });
    return order;
  } catch (err) {
    console.log(err);
  }
};

// Get all available orders for Admin Page
const GetFromOrdersAdmin = async () => {
  try {
    const orders = await OrdersModel.find({}, (err, result) => {
      return result;
    });
    return orders;
  } catch (err) {
    console.log(err);
  }
};

// Update order
const UpdateOrders = async (id, newOrder) => {
  try {
    await OrdersModel.findById(id, (err, updatedOrder) => {
      updatedOrder.Cart = newOrder.cart;
      updatedOrder.FirstName = newOrder.firstName;
      updatedOrder.LastName = newOrder.lastName;
      updatedOrder.Email = newOrder.email;
      updatedOrder.Address = newOrder.address;
      updatedOrder.City = newOrder.city;
      updatedOrder.PhoneNumber = parseFloat(newOrder.phoneNumber);
      updatedOrder.DeliveryTime = newOrder.deliveryTime;
      updatedOrder.DeliveryWay = newOrder.deliveryWay;
      updatedOrder.Status = newOrder.status;
      updatedOrder.save();
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = { InsertIntoOrders, GetFromOrders, GetFromOrdersById, GetFromOrdersAdmin, UpdateOrders };
