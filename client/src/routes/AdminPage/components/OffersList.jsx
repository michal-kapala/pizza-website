import { useState } from "react";
import {
  Container,
  Form,
  FormControl,
  Row,
  Col,
  Card,
  Button
} from "react-bootstrap";
import { useFilteredOffersList, useUpdateOffers, useDeleteOffers, getSelectedProducts } from "./OffersListLogic";
import ProductChecklistItem from "./ProductChecklistItem";

export default function OffersList(props) {
  const { offersList, productsList } = props;
  // Filtered list state (by description)
  const { filteredList, setFilter } = useFilteredOffersList(offersList);

  return(
    <Container className="text-center mt-5">
      <Card.Title className="fs-5 mb-4">
        Offers list (from last to first)
      </Card.Title>
      <Form className="mb-2">
          <FormControl
            onChange={(e) => setFilter(e.target.value)}
            type="search"
            placeholder="Search for an offer"
            aria-label="Search"
          />
        </Form>
        {filteredList.map((val) => {
          // List component can be found below
          return <List 
            val={val} 
            key={val._id}
            productsList={productsList}/>;
        })}
    </Container>
  );
};

function List(props) {
  const { val, key, productsList } = props;
  const { updateOffers, newOffer, setNewOffer } = useUpdateOffers(val);
  const { deleteOffer } = useDeleteOffers();

  // The products selected for the new updated offer
  const [selectedProducts, setSelectedProducts] = useState(getSelectedProducts(newOffer.products, productsList));

  return(
    <>
      <Card className="mt-4 p-4" key={key}>
        <Card.Title className="fs-4">
          {val.Description}
        </Card.Title>
        <Card.Subtitle>
          Write in the field that you want to change or delete the offer
        </Card.Subtitle>

        <Row>
          <Col>
            <Form.Label>Offer description</Form.Label>
            <Form.Control
              value={newOffer.description}
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
              value={newOffer.type}
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
          {productsList.map((product) => {
            return <ProductChecklistItem 
              product={product}
              newOffer={newOffer}
              setNewOffer={setNewOffer}
              selected={selectedProducts}
              setSelected={setSelectedProducts}
              check={selectedProducts.includes(product)}/>
          })}
        </Row>
        <Row className="mt-4 ">
          <Col>
            <Form.Label>Amount of products</Form.Label>
            <Form.Control
              value={newOffer.amount}
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
              value={newOffer.discountFlat}
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
              // ISO date to yyyy-mm-dd
              value={newOffer.validThrough.substring(0, 10)}
              type="date"
              onChange={(event) => {
                // On erase, set the current date
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
              Set to 'nocode' to make the offer available without a code
            </Form.Text>
          </Col>
        </Row>
        <Row className="mt-4 mb-3">
          <Col>
            <Button
              variant="outline-dark"
              onClick={() => {
                updateOffers(val._id, newOffer);
                window.location.reload();
              }}
            >
              Change the offer
            </Button>
          </Col>
          <Col>
            <Button
              variant="danger"
              onClick={() => {
                deleteOffer(val._id);
                window.location.reload();
              }}
            >
              Delete the offer
            </Button>
          </Col>
        </Row>
      </Card>
    </>
  );
};
