import { useState } from "react";
import {
  Container,
  Row,
  Card,
  ListGroup
} from "react-bootstrap";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { useTotalQuantityOrTotalPrice } from "../../../AppLogic";
import { useFilteredOrdersList, useUpdateOrder, getStatusVariant } from "./OrdersListLogic";

export default function OrdersList(props) {
  const { ordersList, times } = props;
  // Filter the list with 'Filter by status' dropdown
  const { filteredList, filter, setFilter } = useFilteredOrdersList(ordersList);
  // Status filter button variant theme state
  const [variant, setVariant] = useState(getStatusVariant(filter));

  return (
    <Container className="text-center mt-5">
      <Row>
        <Card.Title className="fs-5 mb-3">
          Orders list (from last to first)
        </Card.Title>
        <DropdownButton id="status-dropdown-filter-button" title={`Status: ${filter}`} variant={variant}>
          <Dropdown.Item as="button" onClick={() => {setFilter('Any'); setVariant("primary");}}>
              Any
          </Dropdown.Item>
          <Dropdown.Item as="button" onClick={() => {setFilter('New'); setVariant("danger");}}>
              New
          </Dropdown.Item>
          <Dropdown.Item as="button" onClick={() => {setFilter('In Progress'); setVariant("warning");}}>
              In Progress
          </Dropdown.Item>
          <Dropdown.Item as="button" onClick={() => {setFilter('Delivery'); setVariant("info");}}>
              Delivery
          </Dropdown.Item>
          <Dropdown.Item as="button" onClick={() => {setFilter('Delivered'); setVariant("success");}}>
              Delivered
          </Dropdown.Item>
        </DropdownButton>
        {filteredList.map((val, idx) => {
          // List Component can be found below
          return <List val={val} idx={idx} timeOfOrder={times}/>;
        })}
      </Row>
    </Container>
  );
};

function List(props) {
  let {val, idx, timeOfOrder } = props;

  // Update Orders Collection by id
  const { updateOrderStatus, newOrder, setNewOrder } = useUpdateOrder(val);

  const { totalPrice } = useTotalQuantityOrTotalPrice(val.Cart);

  return (
  <>
    <Card key={val._id} className="m-3 p-3">
      <Card.Title>
        Order {val._id} - <b>{totalPrice} PLN</b>
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
                <b>{element.Quantity}x</b> {element.Name} {" "}
                {element.Price} PLN
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      </Card.Body>
      <DropdownButton id="status-dropdown-button" title={val.Status} variant={getStatusVariant(val.Status)}>
        <Dropdown.Item as="button" 
          onClick={async () => { 
            setNewOrder({...newOrder, status: 'In Progress'});
            updateOrderStatus(val._id, newOrder, 'In Progress');
            val.Status = 'In Progress';
        }}>
            In Progress
        </Dropdown.Item>
        <Dropdown.Item as="button" 
          onClick={async () => {
            setNewOrder({...newOrder, status: 'Delivery'});
            updateOrderStatus(val._id, newOrder, 'Delivery');
            val.Status = 'Delivery';
        }}>
            Delivery
        </Dropdown.Item>
        <Dropdown.Item as="button" 
          onClick={async () => {
            setNewOrder({...newOrder, status: 'Delivered'});
            updateOrderStatus(val._id, newOrder, 'Delivered');
            val.Status = 'Delivered';
        }}>
            Delivered
        </Dropdown.Item>
      </DropdownButton>
    </Card>
  </>
  );
};
