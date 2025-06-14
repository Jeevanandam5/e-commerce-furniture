// src/main.jsx
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import HomeScreen from './page/HomeScreen.jsx';
import { Provider } from 'react-redux';
import { store } from './store'; 
import ProductScreen from './page/ProductScreen.jsx';
import CartScreen from './page/CartScreen.jsx';
import LoginScreen from './page/LoginScreen.jsx';
import ProfileScreen from './page/ProfileScreen.jsx';
import RegisterScreen from './page/RegisterScreen.jsx';
import ShippingScreen from './page/ShippingScreen.jsx';
import PaymentScreen from './page/PaymentScreen.jsx';
import OrderScreen from "./page/OrderScreen.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route index={true} path='/' element={<HomeScreen/>}/>
      <Route path='/cart' element={<CartScreen/>}/>
      <Route path='/login' element={<LoginScreen/>}/>
      <Route path='/register' element={<RegisterScreen/>}/>
      <Route path='product/:id' element={<ProductScreen/>}/>
      <Route path='/profile' element={<ProfileScreen/>}/>
      <Route path='/shipping' element={<ShippingScreen/>}/>
      <Route path='/payment' element={<PaymentScreen/>}/>
      <Route path='/order' element={<OrderScreen/>}/>
    </Route>
  )
);

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router}/>
  </Provider>
);