import React, { useEffect, useState } from 'react'
import Footer from '../Components/Footer'
import Navbar from '../Components/Navbar'

export default function MyOrder() {

    const [orderData,setOrderData] = useState("");

    const fetchMyOrder = async() => {
        console.log(localStorage.getItem('userEmail'));
        await fetch("http://localhost:4900/api/myOrderData",{
            method:'POST' ,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: localStorage.getItem('userEmail')
            })
        }).then(async(res)=>{
            let response = await res.json()
            await setOrderData(response)
        })
    }

    useEffect(()=>{
        fetchMyOrder()
    },[])

    return (
        <>
            <div>
                <Navbar />
            </div>


           

            <div className='container'>
                <div className='row'>

                    {orderData !== {} ? Array(orderData).map(data => {
                        return (
                            data.orderData ?
                                data.orderData.order_data.slice(0).reverse().map((item) => {
                                    return (
                                        item.map((arrayData) => {
                                            return (
                                                <div  >
                                                    {arrayData.Order_data ? <div className='m-auto mt-5'>

                                                        {data = arrayData.Order_data}
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
        
        </>
    )
}

// import React, { useEffect, useState } from 'react';
// import Footer from '../Components/Footer';
// import Navbar from '../Components/Navbar';

// export default function MyOrder() {
//     const [orderData, setOrderData] = useState([]);

//     const fetchMyOrder = async () => {
//         const userEmail = localStorage.getItem('userEmail');
//         try {
//             const response = await fetch("http://localhost:4900/api/myOrderData", {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify({
//                     email: userEmail
//                 })
//             });
//             if (response.ok) {
//                 const data = await response.json();
//                 setOrderData(data);
//             } else {
//                 console.error("Failed to fetch order data");
//             }
//         } catch (error) {
//             console.error("Error fetching order data:", error);
//         }
//     };

//     useEffect(() => {
//         fetchMyOrder();
//     }, []);

//     return (
//         <>
//             <Navbar />
//             <div className='container'>
//                 <div className='row'>
//                     {Array.isArray(orderData) && orderData.length > 0 ? (
//                         orderData.map(data => (
//                             data.orderData ? (
//                                 data.orderData.order_data.map((item, index) => (
//                                     <div key={index}>
//                                         {item.map((arrayData, index) => (
//                                             <div key={index}>
//                                                 <div className='col-12 col-md-6 col-lg-3'>
//                                                     <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
//                                                         <img src={arrayData.img} className="card-img-top" alt="..." style={{ height: "120px", objectFit: "fill" }} />
//                                                         <div className="card-body">
//                                                             <h5 className="card-title">{arrayData.name}</h5>
//                                                             <div className='container w-100 p-0' style={{ height: "38px" }}>
//                                                                 <span className='m-1'>{arrayData.qty}</span>
//                                                                 <span className='m-1'>{arrayData.size}</span>
//                                                                 <span className='m-1'>{data}</span>
//                                                                 <div className=' d-inline ms-2 h-100 w-20 fs-5' >
//                                                                     ₹{arrayData.price}/-
//                                                                 </div>
//                                                             </div>
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         ))}
//                                     </div>
//                                 ))
//                             ) : null
//                         ))
//                     ) : (
//                         <div>No orders found</div>
//                     )}
//                 </div>
//             </div>
//             <Footer />
//         </>
//     );
// }
