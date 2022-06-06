import { useEffect, useState } from "react";
import Axios from "axios";

// Update
export default function useUpdateOrder(val) {
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
        const phone = val.PhoneNumber == undefined ? "0" : val.PhoneNumber;
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
