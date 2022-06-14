import { useEffect, useState } from "react";
import Axios from "axios";

// Filter the offersList
function useFilteredOffersList(offersList) {
  // State to hold the value from search field
  const [filter, setFilter] = useState("");
  // State to hold the filteredOffersList
  const [filteredList, setFilteredList] = useState([]);

  // Create new list by filtering the offersList for description
  useEffect(() => {
    let filteredListArray = offersList.filter((e) =>
      e.Description.toLowerCase().match(filter.toLowerCase())
    );
    setFilteredList(filteredListArray);
  }, [filter, offersList]);

  return { filteredList, setFilter };
};

// Update
function useUpdateOffers(val) {
  // State to update with
  const [newOffer, setNewOffer] = useState({
    _id: val._id,
    products: val.Products,
    type: val.Type,
    validThrough: val.ValidThrough,
    code: val.Code,
    description: val.Description,
    amount: val.Amount,
    discountFlat: val.DiscountFlat,
  });

  // Set values to the previous values
  useEffect(() => {
    setNewOffer({
      ...newOffer,
      products: val.Products,
      type: val.Type,
      validThrough: val.ValidThrough,
      code: val.Code,
      description: val.Description,
      amount: val.Amount,
      discountFlat: val.DiscountFlat,
    });
  }, []);

  const updateOffers = (id, offer) => {
    Axios.put(`${process.env.REACT_APP_ENDPOINT}/offers/${id}`, {
      id: id,
      offer: offer,
    });
  };
  return { updateOffers, newOffer, setNewOffer };
};

function useDeleteOffers() {
  function deleteOffer(id) {
      Axios.delete(`${process.env.REACT_APP_ENDPOINT}/offers/${id}`);
  }
  return { deleteOffer };
}

// Filter product list with mirror id list
function getSelectedProducts(ids, products) {
  var result = products.filter((p) => {
    return ids.includes(p._id);
  });
  return result;
};

export { useFilteredOffersList, useUpdateOffers, useDeleteOffers, getSelectedProducts };
