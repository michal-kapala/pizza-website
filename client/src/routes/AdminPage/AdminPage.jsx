import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import MyNavbar from "../../shared components/MyNavbar";

import { useProductsList, useOrdersList, useOffersList } from "./AdminPageLogic";

import NewProduct from "./components/NewProduct";
import ProductsList from "./components/ProductsList";
import OrdersList from "./components/OrdersList";
import NewOffer from "./components/NewOffer";
import OffersList from "./components/OffersList";

export default function AdminPage(props) {
  // Verify if user is auth and if is admin, otherwise send to home page
  const { user, isAuthenticated } = useAuth0();
  if (
    !isAuthenticated ||
    !process.env.REACT_APP_ADMINS.split(" ").includes(user.email)
  )
    window.location.replace("/");

  const { setNoCartAnimation } = props;

  // Read from Products Collection
  const { productsList, setProductsList } = useProductsList();
  // Read from Orders Collection
  const { ordersList, setOrdersList } = useOrdersList();
  // Read from Offers Collection
  const { offersList, setOffersList } = useOffersList();
  
  var times = ordersList.map((e) => {
    var dateOfOrder = new Date(
      parseInt(e._id.substring(0, 8), 16) * 1000
    );
    return dateOfOrder.toLocaleString("pl-PL");
  });

  return (
    <main className="slide-in-right">
      <MyNavbar title="Admin" to="/" setAnimation={setNoCartAnimation} />
      <Tabs defaultActiveKey="orders" id="uncontrolled-tab-example" className="mb-3" variant="tabs" fill>
        <Tab eventKey="orders" title="Orders" >
          <OrdersList ordersList={ordersList} times={times}/>
        </Tab>
        <Tab eventKey="offers" title="Offers" >
          <NewOffer offersList={offersList} setOffersList={setOffersList} productList={productsList}/>
          <OffersList offersList={offersList} productsList={productsList}/>
        </Tab>
        <Tab eventKey="products" title="Products">
          <NewProduct
            productsList={productsList}
            setProductsList={setProductsList}
          />
          <ProductsList productsList={productsList} />
        </Tab>
      </Tabs>
      
    </main>
  );
}
