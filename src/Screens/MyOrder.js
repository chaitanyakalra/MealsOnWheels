// import React, { useEffect, useState } from 'react'
// import Footer from '../Components/Footer'
// import Navbar from '../Components/Navbar'

// export default function MyOrder() {

//     const [orderData,setOrderData] = useState("");

//     const fetchMyOrder = async() => {
//         console.log(localStorage.getItem('userEmail'));
//         await fetch("http://localhost:4900/api/myOrderData",{
//             method:'POST' ,
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({
//                 email: localStorage.getItem('userEmail')
//             })
//         }).then(async(res)=>{
//             let response = await res.json()
//             await setOrderData(response)
//         })
//         console.log("fetch work");
//         console.log(orderData);
//     }

//     useEffect(()=>{
//         fetchMyOrder()
//     },[])

//     return (
//         <>
//             <div>
//                 <Navbar />
//             </div>




//             <div className='container'>
//                 <div className='row'>

//                     {orderData !== {} ? Array(orderData).map(data => {
//                         return (
//                             data.orderData ?
//                                 data.orderData.order_data.slice(0).reverse().map((item) => {
//                                     return (
//                                         item.map((arrayData) => {
//                                             return (
//                                                 <div  >
//                                                     {arrayData.Order_data ? <div className='m-auto mt-5'>

//                                                         {data = arrayData.Order_data}
//                                                         console.log("data":data);
//                                                         <hr />
//                                                     </div> :

//                                                         <div className='col-12 col-md-6 col-lg-3' >
//                                                             <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
//                                                                 <img src={arrayData.img} className="card-img-top" alt="..." style={{ height: "120px", objectFit: "fill" }} />
//                                                                 <div className="card-body">
//                                                                     <h5 className="card-title">{arrayData.name}</h5>
//                                                                     <div className='container w-100 p-0' style={{ height: "38px" }}>
//                                                                         <span className='m-1'>{arrayData.qty}</span>
//                                                                         <span className='m-1'>{arrayData.size}</span>
//                                                                         <span className='m-1'>{data}</span>
//                                                                         <div className=' d-inline ms-2 h-100 w-20 fs-5' >
//                                                                             ₹{arrayData.price}/-
//                                                                         </div>
//                                                                     </div>
//                                                                 </div>
//                                                             </div>

//                                                         </div>



//                                                     }

//                                                 </div>
//                                             )
//                                         })

//                                     )
//                                 }) : ""
//                         )
//                     }) : ""}
//                 </div>


//             </div>

//             <Footer />

//         </>
//     )
// }

// // import React, { useEffect, useState } from 'react';
// // import Footer from '../Components/Footer';
// // import Navbar from '../Components/Navbar';

// // export default function MyOrder() {
// //     const [orderData, setOrderData] = useState([]);

// //     const fetchMyOrder = async () => {
// //         const userEmail = localStorage.getItem('userEmail');
// //         try {
// //             const response = await fetch("http://localhost:4900/api/myOrderData", {
// //                 method: 'POST',
// //                 headers: {
// //                     'Content-Type': 'application/json'
// //                 },
// //                 body: JSON.stringify({
// //                     email: userEmail
// //                 })
// //             });
// //             if (response.ok) {
// //                 const data = await response.json();
// //                 setOrderData(data);
// //             } else {
// //                 console.error("Failed to fetch order data");
// //             }
// //         } catch (error) {
// //             console.error("Error fetching order data:", error);
// //         }
// //     };

// //     useEffect(() => {
// //         fetchMyOrder();
// //     }, []);

// //     return (
// //         <>
// //             <Navbar />
// //             <div className='container'>
// //                 <div className='row'>
// //                     {Array.isArray(orderData) && orderData.length > 0 ? (
// //                         orderData.map(data => (
// //                             data.orderData ? (
// //                                 data.orderData.order_data.map((item, index) => (
// //                                     <div key={index}>
// //                                         {item.map((arrayData, index) => (
// //                                             <div key={index}>
// //                                                 <div className='col-12 col-md-6 col-lg-3'>
// //                                                     <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
// //                                                         <img src={arrayData.img} className="card-img-top" alt="..." style={{ height: "120px", objectFit: "fill" }} />
// //                                                         <div className="card-body">
// //                                                             <h5 className="card-title">{arrayData.name}</h5>
// //                                                             <div className='container w-100 p-0' style={{ height: "38px" }}>
// //                                                                 <span className='m-1'>{arrayData.qty}</span>
// //                                                                 <span className='m-1'>{arrayData.size}</span>
// //                                                                 <span className='m-1'>{data}</span>
// //                                                                 <div className=' d-inline ms-2 h-100 w-20 fs-5' >
// //                                                                     ₹{arrayData.price}/-
// //                                                                 </div>
// //                                                             </div>
// //                                                         </div>
// //                                                     </div>
// //                                                 </div>
// //                                             </div>
// //                                         ))}
// //                                     </div>
// //                                 ))
// //                             ) : null
// //                         ))
// //                     ) : (
// //                         <div>No orders found</div>
// //                     )}
// //                 </div>
// //             </div>
// //             <Footer />
// //         </>
// //     );
// // }

import React, { useEffect, useState } from 'react';
import Footer from '../Components/Footer';
import Navbar from '../Components/Navbar';

export default function MyOrder() {
    const [orderData, setOrderData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [infoMessage, setInfoMessage] = useState(null);

    const fetchMyOrder = async () => {
        const userEmail = localStorage.getItem('userEmail');
        try {
            const response = await fetch("http://localhost:4900/api/myOrderData", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: userEmail })
            });
            if (response.ok) {
                const data = await response.json();
                // Check if the order data is present and has content
                if (data && data.orderData && data.orderData.order_data && data.orderData.order_data.length > 0) {
                    setOrderData(data.orderData.order_data);
                } else {
                    setInfoMessage("No orders found");
                }
            } else {
                setError("Failed to fetch order data");
            }
        } catch (error) {
            console.error("Error fetching order data:", error);
            setError("Error fetching order data");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMyOrder();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }


    return (
        <>
            <Navbar />
            <div className='container'>
                <div className='row'>
                    {orderData.length > 0 ? (
                        orderData.slice(0).reverse().map((order, orderIndex) => (
                            order.length > 0 && (
                                <React.Fragment key={orderIndex}>
                                    <div className='col-12 mt-3'>
                                        <h5>
                                            Order Date: {order[0]?.Order_date ? new Date(order[0].Order_date).toLocaleDateString() : 'Date not available'}
                                        </h5>
                                        <hr />
                                    </div>
                                    {order.map((item, itemIndex) => (
                                        
                                        item && item.name && ( // Check if item and item.name are not undefined or null
                                            <div className='col-12 col-md-6 col-lg-3' key={`${orderIndex}-${itemIndex}`}>
                                                <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
                                                    <img 
                                                        src={item.img} 
                                                        className="card-img-top" 
                                                        alt={item.name} 
                                                        style={{ height: "120px", objectFit: "fill" }} 
                                                        onError={(e) => { e.target.onerror = null; e.target.src = "fallback-image-url.jpg"; }} 
                                                    />
                                                    <div className="card-body">
                                                        <h5 className="card-title">{item.name}</h5>
                                                        <div className='container w-100 p-0' style={{ height: "38px" }}>
                                                            <span className='m-1'>{item.qty}</span>
                                                            <span className='m-1'>{item.size}</span>
                                                            <div className='d-inline ms-2 h-100 w-20 fs-5'>
                                                                ₹{item.price}/-
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    ))}
                                </React.Fragment>
                            )
                        ))
                    ) : (
                        <div>No orders found</div>
                    )}
                </div>
            </div>
            
        </>
    );
    
}


{/* {orderData !== {} ? Array(orderData).map(data => {
                        return (
                            data.orderData ?
                                data.orderData.order_data.slice(0).reverse().map((item) => {
                                    return (
                                        item.map((arrayData) => {
                                            return (
                                                <div  >
                                                    {arrayData.Order_date ? <div className='m-auto mt-5'>

                                                        {data = arrayData.Order_date}
                                                        <hr />
                                                    </div> :

                                                        <div className='col-12 col-md-6 col-lg-3' >
                                                            <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
                                                                <img src={arrayData.img} className="card-img-top" alt="..." style={{ height: "120px", objectFit: "fill" }} />
                                                                <div className="card-body">
                                                                    <h5 className="card-title">{arrayData.name}</h5>
                                                                    <div className='container w-100 p-0' style={{ height: "38px" }}>
                                                                        <span className='m-1'>{arrayData.qty}</span>
                                                                        <span className='m-1'>{arrayData.size}</span>
                                                                        <span className='m-1'>{data}</span>
                                                                        <div className=' d-inline ms-2 h-100 w-20 fs-5' >
                                                                            ₹{arrayData.price}/-
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>



                                                    }

                                                </div>
                                            )
                                        })

                                    )
                                }) : ""
                        )
                    }) : ""}
                </div>


            </div>

            <Footer />
        </div> */}


{/* <>
            <Navbar />
            <div className='container'>
                <div className='row'>
                    {orderData.length > 0 ? (
                        orderData.slice(0).reverse().map((order, orderIndex) => (
                            order.map((item, itemIndex) => (
                                <div className='col-12 col-md-6 col-lg-3' key={`${orderIndex}-${itemIndex}`}>
                                    <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
                                        <img src={item.img} className="card-img-top" alt={item.name} style={{ height: "120px", objectFit: "fill" }} />
                                        <div className="card-body">
                                            <h5 className="card-title">{item.name}</h5>
                                            <div className='container w-100 p-0' style={{ height: "38px" }}>
                                                <span className='m-1'>{item.qty}</span>
                                                <span className='m-1'>{item.size}</span>
                                                <div className='d-inline ms-2 h-100 w-20 fs-5'>
                                                    ₹{item.price}/-
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ))
                    ) 
                    
                    : (
                        <div>No orders found</div>
                    )}
                </div>
            </div>
            <Footer />
        </> */}