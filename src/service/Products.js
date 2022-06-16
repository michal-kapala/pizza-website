const ProductsModel = require("../models/Products");

async function GetFromProducts() {
  try {
    const products = await ProductsModel.find({}, (err, result) => {
      return result;
    });
    return products;
  } catch (err) {
    console.log(err);
    return [];
  }
};

// Get products from id array
async function GetFromProductsIds(ids) {
  var products = [];
  try {
    for (let id of ids) {
      const product = await ProductsModel.findOne({_id: id}, (err, result) => {
        return result;
      });
      if(product != null)
        products.push(product);
    }
    return products;
  }
  catch (err) {
    console.error(err);
    return products;
  }
};

const InsertIntoProducts = async (product) => {
  var extras = [];

  // 'name' and 'price' are required, 'emoji' is optional
  if("name" in product.extra1 && "price" in product.extra1) {
    product.extra1.price = parseFloat(product.extra1.price);
    extras.push(product.extra1);
  }
  else
    extras.push({name: "", emoji: "", price: 0})
    
  if("name" in product.extra2 && "price" in product.extra2) {
    product.extra2.price = parseFloat(product.extra2.price);
    extras.push(product.extra2);
  }
  else
    extras.push({name: "", emoji: "", price: 0})
    
  if("name" in product.extra3 && "price" in product.extra3) {
    product.extra3.price = parseFloat(product.extra3.price);
    extras.push(product.extra3);
  }
  else
    extras.push({name: "", emoji: "", price: 0})

  const products = new ProductsModel({
    Name: product.name,
    Price: parseFloat(product.price),
    Extras: extras,
    Quantity: product.quantity,
    Description: product.description,
    Image: product.imageUrl,
    Category: product.category,
  });

  try {
    await products.save();
  } catch (err) {
    console.log(err);
  }
};

const UpdateProducts = async (id, newProduct) => {
  // Firstly it is checked how many options the product has and makes the sizes in the priceArray
  if (
    newProduct.price !== 0 &&
    newProduct.price2 !== 0 &&
    newProduct.price3 !== 0
  ) {
    var priceArray = new Array(
      parseFloat(newProduct.price),
      parseFloat(newProduct.price2),
      parseFloat(newProduct.price3)
    );
  } else if (newProduct.price !== 0 && newProduct.price2 !== 0) {
    var priceArray = new Array(
      parseFloat(newProduct.price),
      parseFloat(newProduct.price2)
    );
  } else if (newProduct.price !== 0)
    var priceArray = new Array(parseFloat(newProduct.price));

  // Verify extras
  var extras = [];

  // 'name' and 'price' are required, 'emoji' is optional
  if("name" in newProduct.extra1 && "price" in newProduct.extra1) {
    newProduct.extra1.price = parseFloat(newProduct.extra1.price);
    extras.push(newProduct.extra1);
  }
    
  if("name" in newProduct.extra2 && "price" in newProduct.extra2) {
    newProduct.extra2.price = parseFloat(newProduct.extra2.price);
    extras.push(newProduct.extra2);
  }
    
  if("name" in newProduct.extra3 && "price" in newProduct.extra3) {
    newProduct.extra3.price = parseFloat(newProduct.extra3.price);
    extras.push(newProduct.extra3);
  }  

  try {
    await ProductsModel.findById(id, (err, updatedProduct) => {
      updatedProduct.Name = newProduct.name;
      updatedProduct.Price = priceArray;
      updatedProduct.Extras = extras;
      updatedProduct.Quantity = newProduct.quantity;
      updatedProduct.Description = newProduct.description;
      updatedProduct.Image = newProduct.imageUrl;
      updatedProduct.Category = newProduct.category;
      updatedProduct.save();
    });
  } catch (err) {
    console.log(err);
  }
};

const DeleteProducts = async (id) => {
  try {
    await ProductsModel.findByIdAndRemove(id).exec();
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  GetFromProducts,
  InsertIntoProducts,
  UpdateProducts,
  DeleteProducts,
  GetFromProductsIds,
};
