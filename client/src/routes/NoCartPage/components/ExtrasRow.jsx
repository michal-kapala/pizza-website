import { useState, useEffect } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import { useOrderExtra } from "./ExtrasRowLogic"

export default function ExtrasRow(props) {
    const { idx, extra, totalPrice, setTotalPrice, orderExtras, setOrderExtras } = props;

    // State of a single ordered extra 
    const [orderExtra, setOrderExtra] = useState({
      idx: idx,
      name: extra.name,
      emoji: extra.emoji,
      price: extra.price,
      quantity: 0
    });

    // Parent extras object update
    useEffect(() => {
      setExtras(orderExtra, orderExtras, setOrderExtras);
    }, [orderExtra])
    

    // Extra state management
    const { decrementQuantity, incrementQuantity, setExtras } = useOrderExtra(idx);

    return (
        <Row className="mb-1">
          <Row>
            <Form.Label>
              {orderExtra.emoji} {orderExtra.name}
            </Form.Label>
          </Row>
          <Col>
            <Button
              onClick={() => {
                decrementQuantity(orderExtra, setOrderExtra);
                if (orderExtra.quantity > 0) {
                  setTotalPrice(totalPrice - orderExtra.price);
                }
              }}
              variant="outline-dark"
              className="fontSize"
            >
              -
            </Button>
            <Button disabled variant="outline-dark" className="fontSize">
              {orderExtra.quantity}
            </Button>
            
            <Button
              onClick={() => {
                incrementQuantity(orderExtra, setOrderExtra);
                if (orderExtra.quantity < 3) {
                  setTotalPrice(totalPrice + orderExtra.price);
                }
              }}
              variant="outline-dark"
              className="fontSize"
            >
              +
            </Button>
          </Col>
          
          {/* Additional extra price*/}
          {orderExtra.quantity > 0 
            ? (
              <Form.Text>
               +{(orderExtra.quantity * orderExtra.price).toFixed(2).replace('.', ',')} PLN
              </Form.Text>
            )
            : null
          }
        </Row>
    );
};
