import { useEffect, useState } from "react";
import Axios from "axios";

// **** State to read/get order found by _id from MongoDB Orders collection
const useOrderData = (id, setAppState) => {
  const [orderData, setDataOrder] = useState({
    order: [],
    address: [],
    loaded: false,
    status: ""
  });

  useEffect(() => {
    try {
      Axios.get(
        `${process.env.REACT_APP_ENDPOINT}/readFromOrdersById/${id}`
      ).then((response) => {
        // The Cart from response
        var order = response.data.map((e) => {
          return e.Cart;
        });
        // The address
        var address = response.data.map((e) => {
          return e.Address + ", " + e.City;
        });
        // The status
        var status = response.data.map((e) => {
          return e.Status;
        });

        // Set states
        setDataOrder({
          ...orderData,
          order: order,
          address: address,
          status: status,
          loaded: true,
        });
      });
    } catch (err) {
      console.log(err);
      setAppState("error");
    }
  }, []);

  return { orderData };
};

export { useOrderData };
