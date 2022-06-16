import { useState } from "react";

// Custom hook to handle the quantity of offers
const useQuantitySelector = () => {
  const [offerQuantity, setOfferQuantity] = useState(1);

  const incrementItem = () => {
    setOfferQuantity((currClicks) => currClicks + 1);
  };
  const decreaseItem = () => {
    if (offerQuantity <= 1) return;
    setOfferQuantity((currClicks) => currClicks - 1);
  };

  return { offerQuantity, incrementItem, decreaseItem };
};

// Add the offer products to the cart State Array
const useAddToCart = () => {

  // Helper function, generates uuid for a cart item
  function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
  };

  const addToCart = (
    cart,
    setCart,
    content,
    offerQuantity,
    price,
    sizeName,
    specifics,
    extras,
  ) => {
    // Add offer object to cart
      let offerName = content.Description;

      // For specifics
      if (specifics) offerName += ` - (${specifics})`;

      // Set the sizes of all pizzas to small
      if (sizeName === "") sizeName = "small";

      var newProducts = [];
      for (let product of content.Products) {
        if (product.Category === "pizza") {
          product.Name += ` (${sizeName})`;
        }
        newProducts.push(product);
      }
      content.Products = newProducts;

      // Check if offer is already in cart
      let filteredProduct = cart.filter((value) => {return value.Name === offerName });

      // If offer is not in cart, add it
      if (filteredProduct.length === 0) {
        // Offer's cart item model
        setCart((prevState) => [
          ...prevState,
          {
            ID: generateUUID(),
            Name: offerName,
            Quantity: offerQuantity,
            Price: price,
            Offer: content
          },
        ]);
      }
      // If offer is in cart, add the number of offers to previous number for that particular offer
      else {
        var newArr = cart.map((offer) => {
          if (offer.Name === offerName) {
            offer.Quantity += offerQuantity;
          }
          return offer;
        });
        setCart(newArr);
      }
  };

  return { addToCart };
};

const useHandleSubmit = () => {
  const { addToCart } = useAddToCart();
  const handleSubmit = (
    onClose,
    cart,
    setCart,
    content,
    quantity,
    price,
    sizeName,
    specifics,
    extras
  ) => {
    // Close modal
    onClose();
    // Add offer to cart
    addToCart(cart, setCart, content, quantity, price, sizeName, specifics, extras);
  };
  return { handleSubmit };
};

// Return the number of products for each offer type
function getProductQuantity(offer, selectedQuantity) {
  switch(offer.Type) {
    case "priceOff":
      return selectedQuantity;
    // 1 copy of every product in a bundle
    case "bundle":
      return selectedQuantity;
    case "oneFree":
      return (offer.Amount + 1) * selectedQuantity;
  }
};

export { useQuantitySelector, useAddToCart, useHandleSubmit, getProductQuantity };
