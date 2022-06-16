import React,  { useState } from 'react';
import { Image } from 'react-bootstrap';
import { OffersList } from "./components/OffersList"
import CodeInput from './components/CodeInput';
import MyNavbar from "../../shared components/MyNavbar";
import MyModal from "../../shared components/MyModal";
import CartBar from "../NoCartPage/components/CartBar";
import OfferModalContent from "./components/OfferModalContent";

export default function OffersPage(props) {
  const { offers, cart, setCart, totalPrice, totalQuantity, noCartAnimation, setCartAnimation } = props;

  // Content for modal
  const [content, setContent] = useState([]);

  // State to show modal
  const [show, setShow] = useState(false);

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
      <OffersList 
        offers={offers}
        setContent={setContent}
        setShow={setShow}
      />
      <CodeInput 
        setContent={setContent}
        setShow={setShow}
      />
      <MyModal
        name={content.Description}
        onClose={() => setShow((currShow) => !currShow)}
        show={show}
      >
        <OfferModalContent 
          content={content}
          cart={cart}
          setCart={setCart}
          onClose={() => setShow((currShow) => !currShow)}
        />
      </MyModal>
      <CartBar
        totalPrice={totalPrice}
        totalQuantity={totalQuantity}
        setCartAnimation={setCartAnimation}
      />
    </main>
  );
};
