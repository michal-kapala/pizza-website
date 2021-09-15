import { useEffect, useState } from "react";
import Axios from "axios";

// **** State to read/get order found by _id from MongoDB Orders collection
const useOrderData = (id) => {
  const [orderData, setDataOrder] = useState({
    order: [],
    address: [],
    loaded: false,
  });

  useEffect(() => {
    Axios.get(`${process.env.REACT_APP_ENDPOINT}/readbyid/${id}`).then(
      (response) => {
        // The Cart from response
        var order = response.data.map((e) => {
          return e.Cart;
        });
        // The address
        var address = response.data.map((e) => {
          return e.Address + ", " + e.City;
        });

        // Set states
        setDataOrder({
          ...orderData,
          order: order,
          address: address,
          loaded: true,
        });
      }
    );
  }, []);

  return { orderData };
};

export { useOrderData };
