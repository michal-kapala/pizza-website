import Axios from "axios";
import { useState } from "react";

// Products states
const useProductsStates = () => {
  const [productsStates, setProductsStates] = useState({
    name: "",
    price: 0,
    quantity: 1, // Set quantity to 1 because that's how this restaurant sells
    description: "",
    category: "",
    imageUrl: "",
    extra1: {
      name: "",
      emoji: "",
      price: 0
    },
    extra2: {
      name: "",
      emoji: "",
      price: 0
    },
    extra3: {
      name: "",
      emoji: "",
      price: 0
    },
  });

  return { productsStates, setProductsStates };
};

// Insert
const useAddToProducts = () => {
  const addToProducts = async (
    productsStates,
    productsList,
    setProductsList
  ) => {
    try {
      await Axios.post(`${process.env.REACT_APP_ENDPOINT}/insertIntoProducts`, {
        product: productsStates,
      });
      // This below is to show real time updates to list, because the request for products is only done at initial rendering.
      // Modify to my needs
      setProductsList([
        ...productsList,
        {
          Name: productsStates.name,
          Price: productsStates.price,
          Quantity: productsStates.quantity,
        },
      ]);
    } catch (err) {
      console.log(err);
    }
  };

  return { addToProducts };
};

export { useAddToProducts, useProductsStates };
