import { Col } from "react-bootstrap";
import ExtrasRow from "./ExtrasRow";

export default function Extras(props) {
  // Names and unit prices of the available extras, order's state
  const { extrasList, totalPrice, setTotalPrice, orderExtras, setOrderExtras } = props;

  return(
    <Col>
      {extrasList.map((e, idx) => {
        return <List 
          idx={idx}
          extra={e}
          totalPrice={totalPrice}
          setTotalPrice={setTotalPrice}
          orderExtras={orderExtras}
          setOrderExtras={setOrderExtras}/>
      })}
    </Col>
  );
};

function List(props) {
    const { idx, extra, totalPrice, setTotalPrice, orderExtras, setOrderExtras } = props;
    const bRender = extra.name !== undefined && extra.name !== "" && extra.price !== undefined && extra.price !== 0;

    return (
      <>
        {bRender 
          ? (<ExtrasRow
          idx={idx}
          extra={extra}
          totalPrice={totalPrice}
          setTotalPrice={setTotalPrice}
          orderExtras={orderExtras}
          setOrderExtras={setOrderExtras}/>)
          : null}
      </>
    );
};
