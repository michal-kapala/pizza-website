import {
  Container,
  Row,
  Card,
  ListGroup
} from "react-bootstrap";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { useTotalQuantityOrTotalPrice } from "../../../AppLogic";
import useUpdateOrder from "./OrdersListLogic";

export default function OrdersList(props) {
  const { ordersList, times } = props;

  return (
    <Container className="text-center mt-5">
      <Row>
        <Card.Title className="fs-5 mb-3">
          Orders list (from last to first)
        </Card.Title>
        {ordersList.map((val, idx) => {
          // List Component can be found below
          return <List val={val} idx={idx} timeOfOrder={times}/>;
        })}
      </Row>
    </Container>
  );
};

function List(props) {
  const { val, idx, timeOfOrder } = props;

  // Update Products Collection by id
  const { updateOrderStatus, newOrder, setNewOrder } = useUpdateOrder(val);

  const { totalPrice } = useTotalQuantityOrTotalPrice(val.Cart);

  return (
  <>
    <Card key={val._id} className="m-3 p-3">
      <Card.Title>
        Order {val._id} - <b>&#163;{totalPrice}</b>
      </Card.Title>
      <Card.Subtitle><b>Ordered: </b>{timeOfOrder[idx]}</Card.Subtitle>
      <Card.Subtitle><b>Delivery: </b>{val.DeliveryWay}, {val.DeliveryTime}</Card.Subtitle>
      <Card.Subtitle><b>Customer: </b>{val.FirstName} {val.LastName} ({val.Email})</Card.Subtitle>
      <Card.Subtitle><b>Adress: </b>{val.Address}, {val.City}</Card.Subtitle>
      <Card.Body>
        <strong>Order details: </strong>
        <ListGroup className="p-2" as="ul">
          {val.Cart.map((element) => {
            return (
              <ListGroup.Item className="mb-3" as="li" key={element.Name}>
                <b>{element.Quantity}x</b> {element.Name} &nbsp;{" "}
                &#163;{element.Price}
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      </Card.Body>
      <DropdownButton id="status-dropdown-button" title={newOrder.status}>
        <Dropdown.Item as="button" 
          onClick={async () => { setNewOrder({...newOrder, status: 'In Progress'}); updateOrderStatus(val._id, newOrder, 'In Progress')}}>
            In Progress</Dropdown.Item>
        <Dropdown.Item as="button" 
          onClick={async () => {setNewOrder({...newOrder, status: 'Delivery'}); updateOrderStatus(val._id, newOrder, 'Delivery')}}>
            Delivery</Dropdown.Item>
        <Dropdown.Item as="button" 
          onClick={async () => {setNewOrder({...newOrder, status: 'Delivered'}); updateOrderStatus(val._id, newOrder, 'Delivered')}}>
            Delivered</Dropdown.Item>
      </DropdownButton>
    </Card>
  </>
  );
};
