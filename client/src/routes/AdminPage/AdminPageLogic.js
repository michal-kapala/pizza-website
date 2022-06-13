import { useEffect, useState } from "react";
import Axios from "axios";

// Read from Products Collection
const useProductsList = () => {
  const [productsList, setProductsList] = useState([]);

  useEffect(() => {
    Axios.get(`${process.env.REACT_APP_ENDPOINT}/getFromProducts`).then(
      (response) => {
        setProductsList(response.data.reverse());
      }
    );
  }, []);

  return { productsList, setProductsList };
};

// Read from Orders Collection
const useOrdersList = () => {
  const [ordersList, setOrdersList] = useState([]);

  useEffect(() => {
    Axios.get(`${process.env.REACT_APP_ENDPOINT}/readFromOrdersAdmin`).then(
      (response) => {
        setOrdersList(response.data.reverse());
      }
    );
  }, []);

  return { ordersList, setOrdersList };
};

// Read from Offers Collection
const useOffersList = () => {
  const [offersList, setOffersList] = useState([]);

  useEffect(() => {
    Axios.get(`${process.env.REACT_APP_ENDPOINT}/offers`).then(
      (response) => {
        setOffersList(response.data.reverse());
      }
    );
  }, []);

  return { offersList, setOffersList };
};

export { useProductsList, useOrdersList, useOffersList };
