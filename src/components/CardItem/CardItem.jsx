import React from "react";
import "./styles.css";

export default function CardItem({ id, name, price, dispatch, state, imgUrl, inCart }) {
  let itemQty = 0;

  state.cart.forEach((item) => (item.id === id ? (itemQty = item.qty) : item));
  if (!inCart) {
    return (
      <div className="cardItem ">
        <div className="cardContent">
          <h3 className="itemTitle">{name.toUpperCase()}</h3>
          <img className="itemImg" src={imgUrl} alt={name} />
          <div className="itemPrice">{price}</div>
        </div>
        <div className="cardButton">
          <button
            disabled={itemQty === 0}
            onClick={() => dispatch({ type: itemQty >= 2 ? "DECREASE_QTY" : "REMOVE_FROM_CART", payload: { id: id } })}
          >
            -
          </button>
          <div className="itemQuantity">{itemQty}</div>
          <button onClick={() => dispatch({ type: "ADD_TO_CART", payload: { id: id } })}>+</button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="cardItem horizontal">
        <div className="cardContent horizontal">
          <h3 className="itemTitle horizontal">{name.toUpperCase()}</h3>
          <img className="itemImg horizontal" src={imgUrl} alt={name} />
          <div className="itemPrice horizontal">
            {new Intl.NumberFormat("en-IN", { style: "currency", currency: "USD" }).format(
              Number(price.replace("$", "")) * itemQty
            )}
          </div>
        </div>
        <div className="cardButton horizontal">
          <button
            onClick={() => dispatch({ type: itemQty >= 2 ? "DECREASE_QTY" : "REMOVE_FROM_CART", payload: { id: id } })}
          >
            -
          </button>
          <div className="itemQuantity horizontal">{itemQty}</div>
          <button onClick={() => dispatch({ type: "ADD_TO_CART", payload: { id: id } })}>+</button>
          <button
            style={{ backgroundColor: "red", color: "white" }}
            onClick={() => dispatch({ type: "REMOVE_FROM_CART", payload: { id: id } })}
          >
            X
          </button>
        </div>
      </div>
    );
  }
}
