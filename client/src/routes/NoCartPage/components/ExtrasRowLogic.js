// State of a single ordered extra 
function useOrderExtra(idx) {

  function decrementQuantity(orderExtra, setOrderExtra) {
    if (orderExtra.quantity <= 0) return;
    setOrderExtra({
      ...orderExtra,
      quantity: orderExtra.quantity - 1
    });
  }

  function incrementQuantity(orderExtra, setOrderExtra) {
    if (orderExtra.quantity >= 3) return;
    setOrderExtra({
      ...orderExtra,
      quantity: orderExtra.quantity + 1
    });
  }

  // Set corresponding property of parent order extras object
  function setExtras(orderExtra, orderExtras, setOrderExtras) {
    switch(idx) {
      case 0:
        setOrderExtras({
          ...orderExtras,
          extra1: orderExtra
        });
        break;
      case 1:
        setOrderExtras({
          ...orderExtras,
          extra2: orderExtra
        });
        break;
      case 2:
        setOrderExtras({
          ...orderExtras,
          extra3: orderExtra
        });
        break;
      default: break;
    };
  };

  return { decrementQuantity, incrementQuantity, setExtras };
};

export { useOrderExtra };
