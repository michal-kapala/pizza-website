import { Button, Form, Col, Row } from "react-bootstrap";
import useQuantitySelector from "./ExtrasRowLogic"

export default function ExtrasRow(props) {
    const { name, emoji, price, totalPrice, setTotalPrice } = props;

    // Quantity state
    const { quantity, decrementQuantity, incrementQuantity } = useQuantitySelector();

    return (
        <Row className="mb-1">
          <Row>
            <Form.Label>
              {emoji} {name}
            </Form.Label>
          </Row>
          <Col>
            <Button
              onClick={() => decrementQuantity(totalPrice - price, setTotalPrice)}
              variant="outline-dark"
              className="fontSize"
            >
              -
            </Button>
            <Button disabled variant="outline-dark" className="fontSize">
              {quantity}
            </Button>
            
            <Button
              onClick={() => incrementQuantity(totalPrice + price, setTotalPrice)}
              variant="outline-dark"
              className="fontSize"
            >
              +
            </Button>
          </Col>
          
          {/* Additional extra price*/}
          {quantity > 0 
            ? (
              <Form.Text>
               +{(quantity * price).toFixed(2).replace('.', ',')} PLN
              </Form.Text>
            )
            : null
          }
        </Row>
    );
};
