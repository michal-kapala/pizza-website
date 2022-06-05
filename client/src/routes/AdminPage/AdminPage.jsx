import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import MyNavbar from "../../shared components/MyNavbar";

import { useProductsList, useOrdersList } from "./AdminPageLogic";

import NewProduct from "./components/NewProduct";
import ProductsList from "./components/ProductsList";
import OrdersList from "./components/OrdersList";

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
  const { ordersList, setOrdersList} = useOrdersList();

  return (
    <main className="slide-in-right">
      <MyNavbar title="Admin" to="/" setAnimation={setNoCartAnimation} />
      <Tabs defaultActiveKey="products" id="uncontrolled-tab-example" className="mb-3" variant="tabs" fill>
        <Tab eventKey="products" title="Products">
          <NewProduct
            productsList={productsList}
            setProductsList={setProductsList}
          />
          <ProductsList productsList={productsList} />
        </Tab>
        <Tab eventKey="orders" title="Orders" >
          <OrdersList ordersList={ordersList}/>
        </Tab>
      </Tabs>
      
    </main>
  );
}
