
// import React, { useEffect, useState, useRef } from 'react';
// import { useDispatch } from 'react-redux';
// import { useCart } from './ContextReducer';
// import { useSyncExternalStore } from 'react-redux';


// export default function Card(props) {
//     let dispatch = useDispatch();

   
//     let data = useCart();
//     const priceRef = useRef();
//     let options = props.options;
//     let priceOptions = Object.keys(options);
//     const [qty, setQty] = useState(1);
//     const [size, setSize] = useState("");

//     // new
//     let navigate = useNavigate();
//     let foodItem = props.item;

//     const handleAddToCart = async () => {
//         await dispatch({
//             type: "ADD",
//             id: props.foodItem._id,
//             name: props.foodItem.name,
//             price: finalPrice,
//             qty: qty,
//             size: size
//         });
//         console.log(data);
//     }
//     let finalPrice = qty * (options[size]);
//     useEffect(() => {
//         setSize(priceRef.current.value)
//     },[])







// import React, { useState, useRef, useEffect } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { useDispatchCart, useCart } from './ContextReducer'

// export default function Card(props) {
//   let data = useCart();

//   let navigate = useNavigate()
//   const [qty, setQty] = useState(1)
//   const [size, setSize] = useState("")
//   const priceRef = useRef();

//   let options = props.options;
//   let priceOptions = Object.keys(options);
//   let foodItem = props.item;
//   const dispatch = useDispatchCart();
//   const handleClick = () => {
//     if (!localStorage.getItem("token")) {
//       navigate("/login")
//     }
//   }
//   const handleQty = (e) => {
//     setQty(e.target.value);
//   }
//   const handleOptions = (e) => {
//     setSize(e.target.value);
//   }
//   // adding here
//   const handleAddToCart = async () => {
//     // Ensure options and size are defined
//     if (!options || !size) {
//       console.error('Options or size is undefined');
//       return;
//     }
  
//     // Calculate final price
//     let finalPrice = qty * parseInt(options[size]);
  
//     let food = [];
//     for (const item of data) {
//       if (item.id === foodItem._id) {
//         food = item;
//         break;
//       }
//     }
//     console.log(food);
//     console.log(new Date());
  
//     if (food !== []) {
//       if (food.size === size) {
//         await dispatch({ type: "UPDATE", id: foodItem._id, price: finalPrice, qty: qty });
//         return;
//       } else if (food.size !== size) {
//         await dispatch({ type: "ADD", id: foodItem._id, name: foodItem.name, price: finalPrice, qty: qty, size: size, img: props.ImgSrc });
//         console.log("Size different so simply ADD one more to the list");
//         return;
//       }
//       return;
//     }
   
//     await dispatch({ type: "ADD", id: foodItem._id, name: foodItem.name, price: finalPrice, qty: qty, size: size });
  
//     // setBtnEnable(true)
//   }
  

import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatchCart, useCart } from './ContextReducer'
// import {trash} 

export default function Card(props) {
  let data = useCart();

  let navigate = useNavigate()
  const [qty, setQty] = useState(1)
  const [size, setSize] = useState("")
  const priceRef = useRef();

  let options = props.options;
  let priceOptions = Object.keys(options);
  const foodItem = props.item;
  const dispatch = useDispatchCart();
  const handleClick = () => {
    if (!localStorage.getItem("token")) {
      navigate("/login")
    }
  }
  const handleQty = (e) => {
    setQty(e.target.value);
  }
  const handleOptions = (e) => {
    setSize(e.target.value);
  }
  const handleAddToCart = async () => {

    await dispatch({
                  type: "ADD",
                  id: props.foodItem._id,
                  name: props.foodItem.name,
                  price: finalPrice,
                  qty: qty,
                  size: size
              });
              console.log(data);
              
    if (!foodItem || !foodItem._id) {
      
      // console.log(foodItem);
      console.error('foodItem is undefined or does not have _id property');
      return;
    }
  
    let food = [];
    for (const item of data) {
      if (item.id === foodItem._id) {
        food = item;
        break;
      }
    }
    console.log(food);
    console.log(new Date())

    if (food !== []) {
      if (food.size === size) {
        await dispatch({ type: "UPDATE", id: foodItem._id, price: finalPrice, qty: qty })
        return
      }
      else if (food.size !== size) {
        await dispatch({ type: "ADD", id: foodItem._id, name: foodItem.name, price: finalPrice, qty: qty, size: size,img: props.ImgSrc })
        console.log("Size different so simply ADD one more to the list")
        return
      }
      return
    }

    await dispatch({ type: "ADD",
                    id: foodItem._id, 
                    name: foodItem.name, 
                    price: finalPrice, 
                    qty: qty, 
                    size: size })


    // setBtnEnable(true)

  }



  useEffect(() => {
    setSize(priceRef.current.value)
  }, [])

  // useEffect(()=>{
  // checkBtn();
  //   },[data])

  let finalPrice = qty * parseInt(options[size]);  

    return (
        <div>
            <div>
                <div className="card mt-3" style={{ "width": "18rem", "maxHeight": "360px" }}>
                    <img src={props.foodItem.img} className="card-img-top" alt="..." style={{ height: "120px", objectFit: "fill" }} />
                    <div className="card-body">
                        <h5 className="card-title">{props.foodItem.name}</h5>
                        <div className='container w-100'>
                            <select className='m-2 h-100 bg-success rounded' onChange={(e) => setQty(e.target.value)}>
                                {Array.from(Array(6), (e, i) => (
                                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                                ))}
                            </select>
                            <select className='m-2 h-100  bg-success rounded' ref= {priceRef} onChange={(e) => setSize(e.target.value)}>
                                {priceOptions.map((data) => (
                                    <option key={data} value={data}>{data}</option>
                                ))}
                            </select>
                            <div className='d-inline h-100 fs-5'>
                            ₹{finalPrice}/-
                            </div>
                        </div>
                        <hr></hr>
                        <button className='btn btn-success justify-center ms-2' onClick={handleAddToCart}>Add to Cart</button>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

