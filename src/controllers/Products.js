const {
  GetFromProducts,
  InsertIntoProducts,
  UpdateProducts,
  DeleteProducts,
} = require("../service/Products");

const GetProducts = async (req, res) => {
  const products = await GetFromProducts();
  return res.send(products);
};

const InsertProduct = (req, res) => {
  const product = req.body.product;
  InsertIntoProducts(product);
  return res.sendStatus(201);
};

const UpdateProduct = (req, res) => {
  const newProduct = req.body.newProduct;
  const id = req.body.id;
  UpdateProducts(id, newProduct);
  return res.sendStatus(200);
};

const DeleteProduct = (req, res) => {
  const id = req.params.id;
  DeleteProducts(id);
  return res.sendStatus(204);
};

module.exports = { GetProducts, InsertProduct, UpdateProduct, DeleteProduct };
