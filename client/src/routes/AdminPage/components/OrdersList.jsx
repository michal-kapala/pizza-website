import { useState } from "react";
import {
  Col,
  Container,
  Form,
  Row,
  Button,
  Card,
  FormControl,
} from "react-bootstrap";

export default function OrdersList(props) {
  const { ordersList } = props;

  return (
    <Container className="text-center mt-5">
      <Row>
        <Card.Title className="fs-5 mb-3">
          Orders list (from last to first)
        </Card.Title>
        {ordersList.map((val) => {
          // List Component can be found below
          return <List val={val} key={val._id} />;
        })}
      </Row>
    </Container>
  );
};

function List(props) {
  const { val, key } = props;

  return (
  <>
    <Card className="mt-4 p-4" key={key}>
      <Col>
        <Card.Title className="fs-4">
        {val.Cart[0].Quantity}x {val.Cart[0].Name}
      </Card.Title>
      <Card.Title>
        {val.Cart[0].Quantity * val.Cart[0].Price}£
      </Card.Title>
      <Card.Text>
        {val.DeliveryWay}, {val.DeliveryTime}
      </Card.Text>
      <Card.Text>
        {val.FirstName} {val.LastName} ({val.Email})
      </Card.Text>
      <Card.Text>
        Address: {val.Address}, {val.City}
      </Card.Text>
      </Col>
    </Card>
  </>
  );
};