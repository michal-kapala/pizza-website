import { useState } from "react";

// Quantity state
export default function useQuantitySelector() {
  const [quantity, setQuantity] = useState(0);

  function decrementQuantity() {
    if (quantity <= 0) return;
    setQuantity(quantity - 1);
  }

  function incrementQuantity() {
    if (quantity >= 3) return;
    setQuantity(quantity + 1);
  }
  return { quantity, decrementQuantity, incrementQuantity };
}
