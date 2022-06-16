import React from 'react';
import { Image } from 'react-bootstrap';
import MyNavbar from "../../shared components/MyNavbar";
import CartBar from "../NoCartPage/components/CartBar";
import { OffersList } from "./OffersList"
import CodeInput from './CodeInput';

export default function OffersPage(props) {
  const { offers, cart, setCart, totalPrice, totalQuantity, noCartAnimation, setCartAnimation } = props;

  return (
    <main className={`${noCartAnimation}`}>
      <MyNavbar
        setAnimation={setCartAnimation}
        title={"Offers"}
        to={"/"}
      />
      <Image 
        fluid 
        src="images/offers_image.jpg" 
        alt="Oven with blazing logs and pizza"
      />
      <OffersList offers={offers} />
      <CodeInput />
      <CartBar
        totalPrice={totalPrice}
        totalQuantity={totalQuantity}
        setCartAnimation={setCartAnimation}
      />
    </main>
  );
};
