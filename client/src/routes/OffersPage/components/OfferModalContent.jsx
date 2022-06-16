import { useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  FormControl,
  Row,
} from "react-bootstrap";
import MyButton from "../../../shared components/MyButton";
import { useQuantitySelector, useHandleSubmit, getProductQuantity } from "./OfferModalContentLogic";
import { getNewPrice, getOldPrice, getProductNames } from "./OffersListLogic"

// Content of Modal in OffersPage
export default function OfferModalContent(props) {
  const { content, cart, setCart, onClose } = props;

  // **** From ModalContentLogic ****

  const { offerQuantity, incrementItem, decreaseItem } = useQuantitySelector();
  const { handleSubmit } = useHandleSubmit();

  // **** END ModalContentLogic ****

  // State for specifics for product
  const [specifics, setSpecifics] = useState("");

  // No extras in offers, empty object passed to cart
  const extras = {
    extra1: {},
    extra2: {},
    extra3: {}
  };

  // Pizza size is always small in offers
  const sizeName = "small";

  return (
    <Container fluid="xs">
      <Card>
        <Card.Img variant="top" src={`images/${content.Products[0].Image}.jpg`} />
        <Card.Body>
          <Row>
            <Card.Subtitle>
              {getProductQuantity(content, offerQuantity)} x {getProductNames(content.Products)}
            </Card.Subtitle>
            <Card.Subtitle style={{ textDecorationLine: 'line-through', margin: 0 }}>
              {(getOldPrice(content) * offerQuantity).toFixed(2).replace('.', ',')} PLN
            </Card.Subtitle>
            <Card.Subtitle>
              {(getNewPrice(content) * offerQuantity).toFixed(2).replace('.', ',')} PLN
            </Card.Subtitle>
          </Row>
          
          <Card.Text>
            Other info (optional):{" "}
            <FormControl
              onChange={(e) => setSpecifics(e.target.value)}
              placeholder="Example: Hot ketchup"
            />
          </Card.Text>
          <Row className="justify-content-center">
            <Col xs="auto" sm="auto" md="auto" lg="auto" xl="auto" xxl="auto">
              <Button
                onClick={() => decreaseItem()}
                variant="outline-dark"
                className="fontSize"
              >
                -
              </Button>
              <Button disabled variant="outline-dark" className="fontSize">
                {offerQuantity}
              </Button>
              <Button
                onClick={() => incrementItem()}
                variant="outline-dark"
                className="fontSize"
              >
                +
              </Button>
            </Col>
            <Col xs="auto" sm="auto" md="auto" lg="auto" xl="auto" xxl="auto">
              <MyButton
                className="fontSize"
                title="Add to cart"
                onClick={() =>
                  handleSubmit(
                    onClose,
                    cart,
                    setCart,
                    content,
                    offerQuantity,
                    getNewPrice(content),
                    sizeName,
                    specifics,
                    extras
                  )
                }
              />
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
}
