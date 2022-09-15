import React from "react";
import CardItem from "../CardItem/CardItem";
import "./styles.css";
export default function ItemsContainer({ dispatch, state }) {
  return (
    <div className="ItemsContainer">
      {state.products.map(({ id, name, price, imgUrl }) => {
        return (
          <CardItem
            key={id}
            id={id}
            name={name}
            price={price}
            imgUrl={imgUrl}
            dispatch={dispatch}
            state={state}
            inCart={false}
          />
        );
      })}
    </div>
  );
}
