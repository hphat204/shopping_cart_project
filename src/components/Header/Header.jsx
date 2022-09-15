import React from "react";
import "./styles.css";
import { FaShoppingCart } from "react-icons/fa";

export default function Header({ state, setCartToggle }) {
  const qty = state.cart.reduce((prev, cur) => {
    return (prev += cur.qty);
  }, 0);
  return (
    <div className="header">
      <a href="/">
        <h1>Shopper</h1>
      </a>
      <div className="shoppingCartIcon" onClick={() => setCartToggle(true)}>
        <FaShoppingCart />
        <div className="cartItemsCounter">{qty}</div>
      </div>
    </div>
  );
}
