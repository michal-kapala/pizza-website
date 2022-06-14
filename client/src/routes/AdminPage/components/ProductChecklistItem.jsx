import { useState } from "react";
import { Form } from "react-bootstrap";

export default function ProductChecklistItem(props) {
  const { product, newOffer, setNewOffer, selected, setSelected, check } = props;
  
  // Checkbox state
  const [checked, setChecked] = useState(check);
  
  return(
    <>
      <Form.Check 
        type='checkbox'
        id='product-checkbox'
        label={`${product.Name} - ${product.Price} PLN`}
        checked={checked}
        onChange={(event) => {
          // Validation rules
          if(newOffer.type == "oneFree" && event.target.checked && selected.length == 1)
            return;
          setChecked(event.target.checked);
          var newSelected = selected;
          // Add new id on check
          if(event.target.checked) {
            newSelected.push(product);
          // Filter id out on uncheck
          } else {
            newSelected = newSelected.filter((p) => {
              return p._id != product._id;
            });
          }
          setSelected(newSelected);
          // set newOffer product ids
          var selectedIds = [];
          newSelected.forEach((p) => {
            selectedIds.push(p._id);
          });
          setNewOffer({
            ...newOffer,
            products: selectedIds
          });
        }}
      />
    </>
  );
};
  