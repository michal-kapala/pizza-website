import { useState } from "react";

// Custom hook to handle the quantity
const useQuantitySelector = () => {
  const [quantity, setQuantity] = useState(1);

  const incrementItem = () => {
    setQuantity((currClicks) => currClicks + 1);
  };
  const decreaseItem = () => {
    if (quantity <= 1) return;
    setQuantity((currClicks) => currClicks - 1);
  };

  return { quantity, incrementItem, decreaseItem };
};

// Add / Update the product to the cart State Array
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
    quantity,
    price,
    sizeName,
    specifics,
    extras,
  ) => {
    // Name of product
    let name = content.Name;

    // For specifics
    if (specifics) name += ` - (${specifics})`;

    if (content.Category === "pizza") {
      // If sizeName is the default, it will not get its id because the event is onChange and nothing changed. In that case, I need to make sure if the sizeName is default, to get its name
      if (sizeName === "") sizeName = "small";
      // If sizeName is specified, add it to the name
      name += ` (${sizeName})`;
    }

    // Check if Product is already in cart
    let filteredProduct = cart.filter((value) => {return value.Name === name && value.Extras === extras});
    // If product is not in cart, add it
    if (filteredProduct.length === 0) {
    // Cart item model
      setCart((prevState) => [
        ...prevState,
        {
          ID: generateUUID(),
          Name: name,
          Quantity: quantity,
          Price: price,
          Extras: extras
        },
      ]);
    }
    // If product is in cart, add number of product to previous number of product for that particular product
    else {
      var newArr = cart.map((value) => {
        if (value.Name === name) {
          value.Quantity += quantity;
        }
        return value;
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
    // Add to cart
    addToCart(cart, setCart, content, quantity, price, sizeName, specifics, extras);
  };
  return { handleSubmit };
};

export { useQuantitySelector, useAddToCart, useHandleSubmit };
