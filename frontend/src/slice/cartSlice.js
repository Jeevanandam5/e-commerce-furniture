import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: [],
  itemPrice: 0,
  shippingPrice: 0,
  taxPrice: 0,
  totalPrice: 0
};

const calculatePrices = (cartItems) => {
  const itemPrice = cartItems.reduce((acc, item) => acc + (item.price * item.qty), 0);
  const shippingPrice = itemPrice > 100 ? 0 : 20;
  const taxPrice = Number((itemPrice * 0.18).toFixed(2));
  const totalPrice = Number((itemPrice + shippingPrice + taxPrice).toFixed(2));
  
  return { itemPrice, shippingPrice, taxPrice, totalPrice };
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x._id === item._id);

      if (existItem) {
        state.cartItems = state.cartItems.map((x) => 
          x._id === existItem._id ? item : x
        );
      } else {
        state.cartItems.push(item);
      }

      const prices = calculatePrices(state.cartItems);
      state.itemPrice = prices.itemPrice;
      state.shippingPrice = prices.shippingPrice;
      state.taxPrice = prices.taxPrice;
      state.totalPrice = prices.totalPrice;

      localStorage.setItem('cart', JSON.stringify(state));
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);
      
      const prices = calculatePrices(state.cartItems);
      state.itemPrice = prices.itemPrice;
      state.shippingPrice = prices.shippingPrice;
      state.taxPrice = prices.taxPrice;
      state.totalPrice = prices.totalPrice;

      localStorage.setItem('cart', JSON.stringify(state));
    },
    clearCart: (state) => {
      state.cartItems = [];
      state.itemPrice = 0;
      state.shippingPrice = 0;
      state.taxPrice = 0;
      state.totalPrice = 0;
      localStorage.removeItem('cart');
    }
  }
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;