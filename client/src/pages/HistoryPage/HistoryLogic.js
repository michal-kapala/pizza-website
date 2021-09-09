import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import Axios from "axios";

const useHistoryData = () => {
  const [historyProductList, setHistoryProductList] = useState([]);
  const [idOfHistoryProductList, setIdOfHistoryProductList] = useState([]);
  const [timeOfOrder, setTimeOfOrder] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const { user } = useAuth0();
  useEffect(() => {
    Axios.get(
      `https://pizza-website2021.herokuapp.com/read/${user.email}`
    ).then((response) => {
      // To get data from request
      var data = response.data;

      // To get the orders from data (using .reverse() to get most curent order at the top)
      var orders = data
        .map((e) => {
          return e.Cart;
        })
        .reverse();

      // To get times for orders from data (using .reverse() to get most curent time order at the top)
      var times = data
        .map((e) => {
          var dateOfOrder = new Date(
            parseInt(e._id.substring(0, 8), 16) * 1000
          );
          return dateOfOrder;
        })
        .reverse();

      // To get id for orders from data
      var ids = data
        .map((e) => {
          return e._id;
        })
        .reverse();

      // Set the cart to historyProductList
      setHistoryProductList(orders);
      // Set the ids to historyProductList
      setIdOfHistoryProductList(ids);
      // Set the time to timeOfOrder
      setTimeOfOrder(times);
      // Confirm data is loaded
      setLoaded((prevValue) => !prevValue);
    });
  }, []);

  return {
    historyProductList,
    timeOfOrder,
    loaded,
    idOfHistoryProductList,
  };
};

export { useHistoryData };