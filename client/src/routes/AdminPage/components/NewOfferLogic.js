import Axios from "axios";

// Insert offer
function useAddToOffers() {
  async function addToOffers(newOffer, offersList, setOffersList) {
    var offer = newOffer;
    // Validate amount by type
    switch(offer.type) {
      case "priceOff":
        // Discount applies to every single product
        offer.amount = 1;
        break;
      case "bundle":
        // Discount applies only to an entire set of products
        offer.amount = offer.products.length;
        break;
      case "oneFree":
        // Validated by input
        break;
    }
    try {
      await Axios.post(`${process.env.REACT_APP_ENDPOINT}/offers`, {
        offer: offer,
      });
      // If you need real-time updates set the offers list here, because the request for offers is only done at initial rendering.
      // setOffersList([
      //   ...offersList,
      //   newOffer
      // ]);
    } catch (err) {
      console.error(err);
    }
  };

  return { addToOffers };
};

export { useAddToOffers };
