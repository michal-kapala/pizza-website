import { useState } from "react";
import { Form } from "react-bootstrap";

export default function ProductChecklist(props) {
  const { product, newOffer, setNewOffer, selectedProducts, setSelectedProducts } = props;
  // Checkbox state
  const [checked, setChecked] = useState(false);

  return(
    <>
      <Form.Check 
        type='checkbox'
        id='product-checkbox'
        label={`${product.Name} - ${product.Price} PLN`}
        checked={checked}
        onChange={(event) => {
          // Validation rules
          if(newOffer.type == "oneFree" && event.target.checked && selectedProducts.length == 1)
            return;
          setChecked(event.target.checked);
          var newList = [];
          if(event.target.checked) {
            newList = selectedProducts;
            newList.push(product._id);
          } else {
            var newList = selectedProducts.filter((p) => {
              return p != product._id;
            });
          }
          setSelectedProducts(newList);
          setNewOffer({
            ...newOffer,
            products: newList
          });
        }}
      />
    </>
  );
};
  