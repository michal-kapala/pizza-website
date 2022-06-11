import { Col } from "react-bootstrap";
import ExtrasRow from "./ExtrasRow";

export default function Extras(props) {
  // Names and unit prices of the available extras
  const { extrasList, totalPrice, setTotalPrice } = props;

  return(
    <Col>
      {extrasList.map((e) => {
        return <List name={e.name} emoji={e.emoji} price={e.price} totalPrice={totalPrice} setTotalPrice={setTotalPrice}/>
      })}
    </Col>
  );
};

function List(props) {
    const { name, emoji, price, totalPrice, setTotalPrice } = props;
    const bRender = name !== undefined && name !== "" && price !== undefined && price !== 0;

    return (
      <>
        {bRender ? (<ExtrasRow name={name} emoji={emoji} price={price} totalPrice={totalPrice} setTotalPrice={setTotalPrice}/>) : null}
      </>
    );
};
