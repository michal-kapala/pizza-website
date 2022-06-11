import { useEffect, useState } from "react";
import Axios from "axios";

// Filter the orderList by status
const useFilteredOrdersList = (ordersList) => {
    // State to hold the value from search field, shows only new orders by default
    const [filter, setFilter] = useState('New');
    // State to hold the filteredProductsList
    const [filteredList, setFilteredList] = useState([]);
  
    // Create new list by filtering the productsList for name
    useEffect(() => {
      let filteredListArray = ordersList.filter((e) => {
        //if filter is empty, match all
        if(filter === 'Any') 
            return true;
        else
            return e.Status === filter;
      });
      setFilteredList(filteredListArray);
    }, [filter, ordersList]);
  
    return { filteredList, filter, setFilter };
};

// Update
function useUpdateOrder(val) {
    // State to update with
    const [newOrder, setNewOrder] = useState({
        cart: [],
        firstName: "",
        lastName: "",
        email: "",
        address: "",
        city: "",
        phoneNumber: "",
        deliveryTime: "",
        deliveryWay: "",
        status: "",
    });

    // Set values to the previous values
    useEffect(() => {
        const phone = val.PhoneNumber === undefined ? "0" : val.PhoneNumber;
        setNewOrder({
            ...newOrder,
            cart: val.Cart,
            firstName: val.FirstName,
            lastName: val.LastName,
            email: val.Email,
            address: val.Address,
            city: val.City,
            phoneNumber: phone,
            deliveryTime: val.DeliveryTime,
            deliveryWay: val.DeliveryWay,
            status: val.Status,
        });
    }, []);

    const updateOrderStatus = (id, newOrder, status) => {
        newOrder.status = status;
        Axios.put(`${process.env.REACT_APP_ENDPOINT}/updateOrders`, {
          id: id,
          newOrder: newOrder,
        });
    };

    return { updateOrderStatus, newOrder, setNewOrder };
};

// Status dropdown button colors
function getStatusVariant(status) {
    switch (status) {
        case 'Any':
            return 'primary';
        case 'New':
            return 'danger';
        case 'In Progress':
            return 'warning';
        case 'Delivery':
            return 'info';
        case 'Delivered':
            return 'success';
        default:
            return 'primary';
    }
};

export { useFilteredOrdersList, useUpdateOrder, getStatusVariant };
