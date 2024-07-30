
import './App.css';
import React from 'react';
import Login from './Screens/Login';
import Home from './Screens/Home';
import MyOrder from './Screens/MyOrder.js';
import { Provider } from 'react-redux'; // Import Provider from react-redux
import store from './redux/store.js'; // Import your Redux store

import {
  BrowserRouter as Router,
  Routes,
  Route,

} from "react-router-dom";
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap/dist/css/bootstrap.min.css';

import SignUp from './Screens/SignUp.js';
import { CartProvider } from './Components/ContextReducer.js';
function App() {
  return (
    <Provider store={store}>
    <CartProvider> {/* Ensure that CartProvider wraps the component tree */}
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/creatuser" element={<SignUp />} />
          <Route exact path="/myOrder" element={<MyOrder />} />
        </Routes>
      </div>
    </Router>
  </CartProvider>
  </Provider>
  
);
}
export default App;
