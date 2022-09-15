import React from "react";
import CardItem from "../CardItem/CardItem";
import "./styles.css";
export default function ShoppingCart({ state, dispatch, cartToggle, setCartToggle }) {
  const totalPriceArr = state.cart.map((item) => Number(item.price.replace("$", "")) * item.qty);
  const totalPrice = totalPriceArr.reduce((total, cur) => total + cur, 0);
  return (
    <div className={`shoppingCart ${cartToggle ? "open" : ""}`}>
      <button className="closeCart" onClick={() => setCartToggle(false)}>
        Đóng
      </button>
      {state.cart.map(({ id, name, price, imgUrl }) => {
        return (
          <CardItem
            key={id}
            id={id}
            name={name}
            price={price}
            imgUrl={imgUrl}
            dispatch={dispatch}
            state={state}
            inCart={true}
          />
        );
      })}
      {totalPrice ? (
        <div className="totalPriceContainer">
          <p className="totalPriceTitle">Tổng giá</p>
          <p className="totalPrice">
            {new Intl.NumberFormat("en-IN", { style: "currency", currency: "USD" }).format(totalPrice)}
          </p>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
