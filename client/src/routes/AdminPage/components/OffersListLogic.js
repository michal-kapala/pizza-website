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
    Axios.put(`${process.env.REACT_APP_ENDPOINT}/offers?id=${id}`, {
      id: id,
      offer: offer,
    });
  };
  return { updateOffers, newOffer, setNewOffer };
};

// Return product ids from an offer
function getCheckedProducts(offer) {
  var checked = [];
  offer.products.forEach(id => {
    checked.push(id);
  });
  return checked;
};

function useDeleteOffers() {
  function deleteOffer(id) {
      Axios.delete(`${process.env.REACT_APP_ENDPOINT}/offers?id=${id}`);
  }
  return { deleteOffer };
}

export { useFilteredOffersList, useUpdateOffers, useDeleteOffers, getCheckedProducts };
