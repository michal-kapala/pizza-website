import { useState } from "react";

// Quantity state
export default function useQuantitySelector() {
  const [quantity, setQuantity] = useState(0);

  function decrementQuantity(price, setTotalPrice) {
    if (quantity <= 0) return;
    setQuantity(quantity - 1);
    setTotalPrice(price);
  }

  function incrementQuantity(price, setTotalPrice) {
    if (quantity >= 3) return;
    setQuantity(quantity + 1);
    setTotalPrice(price);
  }
  return { quantity, decrementQuantity, incrementQuantity };
}
