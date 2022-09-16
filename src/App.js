import { useState, useReducer, useEffect } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import ItemsContainer from "./components/ItemsContainer/ItemsContainer";
import ShoppingCart from "./components/ShoppingCart/ShoppingCart";
import Data from "./data/data.json";

const initialState = {
  products: [],
  cart: [],
};
const cartReducer = (state, action) => {
  const isItemInCart = state.cart.find((item) => item.id === action.payload.id);
  switch (action.type) {
    case "GET_PRODUCTS":
      return {
        ...state,
        products: [...action.payload.data],
      };
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
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      dispatch({ type: "GET_PRODUCTS", payload: { data: [...Data] } });
    }, 1000);
    if (state.products.length > 0) {
      setLoading(false);
    }
  }, [state.products]);
  return (
    <>
      {cartToggle && <div className="overLay" onClick={() => setCartToggle(false)}></div>}
      <div className="App">
        <Header state={state} cartToggle={cartToggle} setCartToggle={setCartToggle} />
        <ItemsContainer state={state} dispatch={dispatch} loading={loading} />
        <ShoppingCart state={state} dispatch={dispatch} cartToggle={cartToggle} setCartToggle={setCartToggle} />
      </div>
    </>
  );
}

export default App;
