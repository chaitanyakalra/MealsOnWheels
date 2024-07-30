import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Badge } from 'react-bootstrap';
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { useCart } from './ContextReducer';
import Modal from '../Modal';
import Cart from '../Screens/Cart';
import { useSyncExternalStore } from 'react-redux';
// Assuming Cart is in the same directory



export default function Navbar(props) {
  const [cartView, setCartView] = useState(false);
  const navigate = useNavigate();
  let data = useCart();
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  }


  return (
    <div>
      {/* <div class="has-bg-img"> */}
        <nav className="navbar navbar-expand-lg navbar-dark  bg-success ">
          <div className="container-fluid">
            <Link className="navbar-brand fs-1  saiba-font" to="/">Meals On Wheels</Link>

            <button className="navbar-toggler saiba-font" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
              <ul className="navbar-nav me-auto mb-2">
                <li className='nav-item'>
                  <Link className="nav-link active fs-5 saiba-font" aria-current='page' to='/'>Home</Link>
                </li>

                {(localStorage.getItem("authToken")) ?
                  <li className='nav-item'>
                    <Link className="nav-link active fs-5 saiba-font" aria-current='page' to='/myOrder'>My Orders</Link>
                  </li>
                  : ""}

              </ul>
              {(!localStorage.getItem("authToken")) ?
                <div className='d-flex'>

                  <Link className='btn bg-white text-success mx-1 saiba-font' to='/login'>Login</Link>
                  <Link className='btn bg-white text-success mx-1 saiba-font' to='/creatuser'>SignUp</Link>

                </div>
                :
                <div>
                  <div className='btn bg-white text-success mx-2' onClick={() => { setCartView(true) }}>
                    My Cart {" "}
                    <Badge pill bg="danger">{data.length}</Badge>
                  </div>
                  {cartView ? <Modal onClose={() => setCartView(false)}><Cart></Cart></Modal> : null}
                  <div className='btn bg-white text-danger mx-2' onClick={handleLogout}>
                    Logout
                  </div>
                </div>
              }
            </div>
          </div>
          <img class="bg-img" src="src\Mp3Mp4\Mp3\Green Simple Modern Healthy Food Logo.jpg" alt=""></img>
        </nav>
        
      {/* </div> */}
    </div>
  );
}
