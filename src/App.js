import { useState, useReducer } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import ItemsContainer from "./components/ItemsContainer/ItemsContainer";
import ShoppingCart from "./components/ShoppingCart/ShoppingCart";
import Data from "./data/data.json";

const initialState = {
  products: Data,
  cart: [],
};
const cartReducer = (state, action) => {
  const isItemInCart = state.cart.find((item) => item.id === action.payload.id);
  console.log();
  switch (action.type) {
    case "ADD_TO_CART":
      if (isItemInCart) {
        return {
          ...state,
          cart: state.cart.map((item) => (item.id === action.payload.id ? { ...item, qty: item.qty + 1 } : item)),
        };
      }
      if (!state.cart || !isItemInCart) {
        return {
          ...state,
          cart: [...state.cart, { ...state.products.find((item) => item.id === action.payload.id), qty: 1 }],
        };
      }
      return state;
    case "DECREASE_QTY":
      if (isItemInCart) {
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.id === action.payload.id && item.qty > 0 ? { ...item, qty: item.qty - 1 } : item
          ),
        };
      }
      return state;
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload.id),
      };
    default:
      return state;
  }
};
function App() {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const [cartToggle, setCartToggle] = useState(false);
  return (
    <>
      {cartToggle && <div className="overLay" onClick={() => setCartToggle(false)}></div>}
      <div className="App">
        <Header state={state} cartToggle={cartToggle} setCartToggle={setCartToggle} />
        <ItemsContainer state={state} dispatch={dispatch} />
        <ShoppingCart state={state} dispatch={dispatch} cartToggle={cartToggle} setCartToggle={setCartToggle} />
      </div>
    </>
  );
}

export default App;
