import { Card, Button, Image, Row, Col, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

import MyButton from "../../shared components/MyButton";

import { useQuantitySelector, useTime } from "./CartLogic";

export default function Cart(props) {
  const { cart, setCart, totalPrice } = props;
  const { time } = useTime();
  return (
    <Container fluid className="text-center">
      <Container>
        {/* Render different if it's past the delivery hours (originally 22:30 - 9:00)*/}
        {time > "4:00" && time < "5:00" ? (
          <PastDeliveryHours />
        ) : (
          <CartEmptyOrNot cart={cart} />
        )}

        {/* Render only if cart is not empty and is not past delivery hours */}
        {cart.length === 0 || (time > "4:00" && time < "5:00") ? null : (
          <>
            <Card className="mt-5 p-3 itemsCenterLT540W">
              {cart.map((value) => {
                return(
                  <CartItem
                    value={value}
                    cart={cart}
                    setCart={setCart}
                  />
                );
              })}
            </Card>
            <Card.Title className="fw-bold mt-5 mb-5">
              Total: {totalPrice.toFixed(2).replace('.', ',')} PLN
            </Card.Title>

            <Link to="/checkout">
              <MyButton className="mb-4" title="Order" />
            </Link>
          </>
        )}
      </Container>
    </Container>
  );
}

// Renders product or offer cart item
function CartItem(props) {
  const { value, cart, setCart } = props;
  const offer = value.Offer;
  return (
    <Row className="mb-2 mt-2">
      { offer != null
        ? <OfferBox 
            key={value.ID}
            cart={cart}
            setCart={setCart}
            value={value}
          />
        : <FoodBox
            key={value.ID}
            cart={cart}
            setCart={setCart}
            value={value}
          />
      }
    </Row>
  );
};

// The next component is used to return different UI for when Cart state is empty or not.
const CartEmptyOrNot = ({ cart }) => {
  if (cart.length === 0)
    return (
      <>
        <Image
          fluid
          className="mt-5 mb-5"
          src="images/iconEmptyBasket.svg"
          style={{ width: "70px" }}
        />
        <Card.Title className="mb-5">
          Add tasty food from the menu and then place the order
        </Card.Title>
      </>
    );
  else
    return (
      <>
        <Image
          fluid
          className="mt-5"
          src="images/iconPizzaSharing.svg"
          style={{ width: "400px" }}
        />
      </>
    );
};

// This Component is the row for particular product cart item. It has option to add or substract from quantity.
const FoodBox = (props) => {
  const { value, cart, setCart } = props;
  const { incrementItem, decreaseItem } = useQuantitySelector(
    cart,
    setCart,
    value
  );

  return (
    <Row className="align-items-center">
      <Col>
        <Card.Title>
          {value.Quantity} x {value.Name}
        </Card.Title>
        <Col>
          <Col>
            {value.Extras.extra1.quantity > 0 || value.Extras.extra2.quantity > 0 || value.Extras.extra3.quantity > 0
              ? <Card.Subtitle className="my-2">Extras per unit:</Card.Subtitle>
              : null
            }
            {(value.Extras.extra1.name != null && value.Extras.extra1.quantity > 0)
              ? <Card.Subtitle className="my-2">
                  {value.Extras.extra1.quantity} x {value.Extras.extra1.emoji} {"("}
                  {(value.Extras.extra1.quantity * value.Extras.extra1.price).toFixed(2).replace('.', ',')}{" PLN)"}
                </Card.Subtitle>
              : null
            }
            {(value.Extras.extra2.name != null && value.Extras.extra2.quantity > 0)
              ? <Card.Subtitle className="my-2">
                  {value.Extras.extra2.quantity} x {value.Extras.extra2.emoji} {"("}
                  {(value.Extras.extra2.quantity * value.Extras.extra2.price).toFixed(2).replace('.', ',')}{" PLN)"}
                </Card.Subtitle>
              : null
            }
            {(value.Extras.extra3.name != null && value.Extras.extra3.quantity > 0)
              ? <Card.Subtitle className="my-2">
                  {value.Extras.extra3.quantity} x {value.Extras.extra3.emoji} {"("}
                  {(value.Extras.extra3.quantity * value.Extras.extra3.price).toFixed(2).replace('.', ',')}{" PLN)"}
                </Card.Subtitle>
              : null
            }
          </Col>
        </Col>
      </Col>
      <Col>
        <Button
          style={{ width: "35px" }}
          className="me-2 fontSize"
          onClick={() => decreaseItem(value.ID)}
          variant="outline-dark"
        >
          -
        </Button>
        <Button
          className="fontSize"
          onClick={() => incrementItem(value.ID)}
          variant="outline-dark"
        >
          +
        </Button>
      </Col>
      <Col>
        <Card.Title className="">
          {(value.Price * value.Quantity).toFixed(2).replace('.', ',')} PLN
        </Card.Title>
      </Col>
    </Row>
  );
};

// This Component is the row for particular offer cart item. It has option to add or substract from quantity.
function OfferBox(props) {
  const {value, cart, setCart} = props;
  const { incrementItem, decreaseItem } = useQuantitySelector(
    cart,
    setCart,
    value
  );

  return(
    <Row className="align-items-center">
      <Col>
        <Card.Title>
          {value.Name}
        </Card.Title>
        <Card.Text>{value.Quantity} x Offer</Card.Text>
      </Col>
      <Col className="">
        <Button
          style={{ width: "35px" }}
          className="me-2 fontSize"
          onClick={() => decreaseItem(value.ID)}
          variant="outline-dark"
        >
          -
        </Button>
        <Button
          className="fontSize"
          onClick={() => incrementItem(value.ID)}
          variant="outline-dark"
        >
          +
        </Button>
      </Col>
      <Col>
        <Card.Title className="">
          {(value.Price * value.Quantity).toFixed(2).replace('.', ',')} PLN
        </Card.Title>
      </Col>
    </Row>
  );
};

// This component is to render if curren time is past the delivery hours
const PastDeliveryHours = () => {
  return (
    <Card.Subtitle className="text-secondary mt-5">
      <h5>
        We can not take orders at the moment. Please come back daily in our
        Delivery Times 05:00 - 4:00. Thank you!
      </h5>
    </Card.Subtitle>
  );
};
