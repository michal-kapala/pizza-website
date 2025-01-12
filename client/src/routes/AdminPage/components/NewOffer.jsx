import { useState, useEffect } from "react";
import { Card, Row, Col, Form, Button, Container, } from "react-bootstrap";
import { useAddToOffers } from "./NewOfferLogic";
import ProductChecklistItem from "./ProductChecklistItem";

export default function NewOffer(props) {
  // Data lists
  const { offersList, setOffersList, productList } = props;
  // The new offer state
  const [newOffer, setNewOffer] = useState({
    products: [],
    type: "priceOff",
    validThrough: "",
    code: "nocode",
    description: "",
    amount: 2,
    discountFlat: 0,
  });

  // The products selected for the new offer
  const [selectedProducts, setSelectedProducts] = useState([]);
  
  // Submit offer function
  const { addToOffers } = useAddToOffers();

  // Block the submit button
  const [blockSubmit, setBlockSubmit] = useState(true);

  // Block submit button - validation(s)
  useEffect(() => {
    // A product must be selected
    if(selectedProducts.length < 1)
      setBlockSubmit(true);
    else
      setBlockSubmit(false);
  }, [newOffer]);
  
  return(
    <Container className="text-center">
      <Card.Title className="my-4">Add a new offer</Card.Title>
      <Card className="p-4">
        <Row>
          <Col>
            <Form.Label>Offer description</Form.Label>
            <Form.Control
              onChange={(event) => {
                setNewOffer({
                  ...newOffer,
                  description: event.target.value
                });
              }}
            />
          </Col>

          <Col>
            <Form.Label>Offer type</Form.Label>
            <Form.Select 
              defaultValue="priceOff"
              onChange={(event) => {
                setNewOffer({
                  ...newOffer,
                  type: event.target.value
                });
              }}>
              <option value="priceOff">Product discount</option>
              <option value="bundle">Bundle discount</option>
              <option value="oneFree">Every x products 1 for free</option>
            </Form.Select>
          </Col>
        </Row>
        <Row className="mt-2">
          <Form.Text>
            Product discount - discount will apply to every product selected for every unit<br/>
            Bundle discount - discount will apply <b>only</b> to a bundle of all the products selected<br/>
            Every x products 1 for free - one product will be available for free <b>only</b> with <b>Amount of products</b> of identical paid products
          </Form.Text>
        </Row>
        <Row className="mt-3">
          <Form.Label>Choose eligible product(s)</Form.Label>
          {productList.map((product) => {
            return <ProductChecklistItem 
              product={product}
              newOffer={newOffer}
              setNewOffer={setNewOffer}
              selected={selectedProducts}
              setSelected={setSelectedProducts}
              check={false}/>
          })}
        </Row>
        <Row className="mt-4 ">
          <Col>
            <Form.Label>Amount of products</Form.Label>
            <Form.Control
              defaultValue={2}
              disabled={newOffer.type != "oneFree"}
              type="number"
              onChange={(event) => {
                //
                if(event.target.value < 2)
                  event.target.value = 2;
                setNewOffer({
                  ...newOffer,
                  amount: parseFloat(event.target.value)
                });
              }}
            />
          </Col>
          <Col>
            <Form.Label>Discount flat (PLN)</Form.Label>
            <Form.Control
              type="number"
              onChange={(event) => {
                if(event.target.value < 0)
                  event.target.value = 0;
                setNewOffer({
                  ...newOffer,
                  discountFlat: parseFloat(event.target.value)
                });
              }}
            />
          </Col>
        </Row>
        <Row className="mt-4 ">
          <Col>
          <Form.Label>Expiration date</Form.Label>
            <Form.Control
              type="date"
              onChange={(event) => {
                // on erase, set the current date
                if(event.target.value == "")
                  event.target.value = new Date(Date.now()).toISOString().substring(0,10);
                setNewOffer({
                  ...newOffer,
                  // yyyy-mm-dd to ISO date
                  validThrough: new Date(Date.parse(event.target.value)).toISOString()
                });
              }}
            />
          </Col>
          <Col>
          <Form.Label>Code</Form.Label>
            <Form.Control
              value={newOffer.code}
              onChange={(event) => {
                setNewOffer({
                  ...newOffer,
                  // nocode for public access
                  code: event.target.value != "" ? event.target.value : 'nocode'
                });
              }}
            />
            <Form.Text>
              Leave as 'nocode' to make the offer available without a code
            </Form.Text>
          </Col>
        </Row>
      </Card>
      {blockSubmit 
        ? <Col>
            <Button className="mt-3" variant="outline-dark" disabled>
              Add the offer
            </Button>
            <Card.Text className="text-danger mt-2">Select products eligible for the offer before submitting!</Card.Text>
          </Col>

        : <Button
            className="mt-3"
            variant="outline-dark"
            onClick={() => {
              // Set products
              setNewOffer({
                ...newOffer,
                products: selectedProducts,
              }); 
              addToOffers(newOffer, offersList, setOffersList);
              window.location.reload();
            }}
          >
            Add the offer
          </Button>
      }
    </Container>
  );
};
