function getNewPrice(offer) {
  const products = offer.Products;
  const discount = offer.DiscountFlat;
  switch (offer.Type) {
    case 'priceOff':
      // Should only be a single product!
      // Small sizes only!
      if(Array.isArray(products[0].Price))
        return products[0].Price[0] - discount;
      else
        return products[0].Price - discount;
    case 'bundle':
      return getOldPrice(offer) - discount;
    case 'oneFree':
      // Returns the old price, the amount is increased by 1 instead
      if(Array.isArray(products[0].Price))
        return getOldPrice(offer) - offer.Products[0].Price[0];
      else
        return getOldPrice(offer) - offer.Products[0].Price;
    default:
      // Returns the old price
      return getOldPrice(offer);
  }
};

function getOldPrice(offer) {
  const products = offer.Products;
  var oldPrice = 0;

  switch (offer.Type) {
    case 'oneFree':
      for (let p of products) {
        if(Array.isArray(p.Price))
          oldPrice += p.Price[0]
        else
          oldPrice += p.Price;
      }
      return (offer.Amount + 1) * oldPrice;
    default:
      for (let p of products) {
        if(Array.isArray(p.Price))
          oldPrice += p.Price[0]
        else
          oldPrice += p.Price;
      }
      return oldPrice;
  }
};

function getProductNames(products) {
  var names = "";
  for (let p of products) {
    names += p.Name + ", ";
  }
  return names.substring(0, names.length - 2);
}

export { getNewPrice, getOldPrice, getProductNames };