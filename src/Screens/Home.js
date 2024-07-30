// import React, { useEffect, useState } from 'react';
// import Navbar from '../Components/Navbar';
// import Footer from '../Components/Footer';
// import Card from '../Components/Card';
// // import Carousal from '../Components/Carousel';
// import 'bootstrap/dist/css/bootstrap.min.css';

// export default function Home() {

//     const [search, setSearch] = useState('');
//     const [foodCat, setFoodCat] = useState([]);
//     const [foodItem, setFoodItem] = useState([]);

//     const loadData = async () => {
//         try {
//             const response = await fetch("http://localhost:4900/api/foodData", {
//                 method: "POST",
//                 headers: {
//                     'Content-Type': 'application/json'
//                 }
//             });

//             const data = await response.json();

//             setFoodItem(data[0]);
//             setFoodCat(data[1]);
//         } catch (error) {
//             console.error('Error fetching data:', error);
//         }
//     }

//     useEffect(() => {
//         loadData();
//     }, []);

//     return (
//         <div>
//             <div><Navbar /></div>
//             <div> <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{ objectFit: "conatain !important" }}>
//                 <div className="carousel-inner" id='carousel'>
//                     <div className='carousel-caption ' style={{ zIndex: "10" }}>
//                         <div className="d-flex justify-content-center">
//                             <input className='form-control me-2' type='search' placeholder='Search' aria-label="Search" value={search} onChange={(e)=>{setSearch(e.target.value)}}></input>
//                             {/* <button className='btn btn-outline-success' type="submit">Search</button> */}
//                         </div>
//                     </div>
//                     <div className="carousel-item active">
//                         <img src="https://source.unsplash.com/random/900x700?burger" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..."></img>
//                     </div>
//                     <div className="carousel-item">
//                         <img src="https://source.unsplash.com/random/900x700?pastry" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..."></img>
//                     </div>
//                     <div className="carousel-item">
//                         <img src="https://source.unsplash.com/random/900x700?barbeque" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..."></img>
//                     </div>
//                 </div>
//                 <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
//                     <span className="carousel-control-prev-icon" aria-hidden="true"></span>
//                     <span className="visually-hidden">Previous</span>
//                 </button>
//                 <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
//                     <span className="carousel-control-next-icon" aria-hidden="true"></span>
//                     <span className="visually-hidden">Next</span>
//                 </button>
//             </div></div>




//             <div className='container'>
//                 {
//                     foodCat.length !== 0
//                         ? foodCat.map((data) => (
//                             <div className='row mb-3' key={data._id}>
//                                 <div>
//                                     <div className="fs-3 m-3">{data.CategoryName}</div>
//                                     <hr />
//                                     {foodItem.length !== 0
//                                         ? foodItem.filter((item) => (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toLowerCase()))) 
//                                             .map((filteredItem) => (
//                                                 <div key={filteredItem._id} className="col-12 col-md-6 col-lg-3">
//                                                     <Card
//                                                         foodItem = {filterItems}
//                                                         options = {filterItems.options[0]}
//                                                     />
//                                                 </div>
//                                             ))
//                                         : <div>No Such Data Found</div>
//                                     }
//                                 </div>
//                             </div>
//                         ))
//                         : null
//                 }

//             </div>
//             <Footer />
//         </div>
//     );
// }

import React, { useEffect, useState } from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import Card from '../Components/Card';
import Modal from '../Modal';
// import Carousal from '../Components/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Home() {

    const [search, setSearch] = useState('');
    const [foodCat, setFoodCat] = useState([]);
    const [foodItem, setFoodItem] = useState([]);

    const loadData = async () => {
        try {
            const response = await fetch("http://localhost:4900/api/foodData", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const data = await response.json();

            setFoodItem(data[0]);
            setFoodCat(data[1]);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    useEffect(() => {
        loadData();
    }, []);

    return (
        <div>
            <div><Navbar /></div>
            <div> <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{ objectFit: "conatain !important" }}>
                <div className="carousel-inner" id='carousel'>
                    <div className='carousel-caption ' style={{ zIndex: "10" }}>
                        <div className="d-flex justify-content-center">
                            <input className='form-control me-2' type='search' placeholder='Search' aria-label="Search" value={search} onChange={(e) => { setSearch(e.target.value) }}></input>

                        </div>
                    </div>
                    <div className="carousel-item active">
                        <img src="https://source.unsplash.com/random/900x700?burger" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..."></img>
                    </div>
                    <div className="carousel-item">
                        <img src="https://source.unsplash.com/random/900x700?pastry" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..."></img>
                    </div>
                    <div className="carousel-item">
                        <img src="https://source.unsplash.com/random/900x700?barbeque" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..."></img>
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div></div>

            {/* <div className='container d-flex flex-wrap'>
                {
                    foodCat.length !== 0
                        ? foodCat.map((data) => (
                            <div className='row mb-3' key={data._id}>
                                <div>
                                    <div className="fs-3 m-3">{data.CategoryName}</div>
                                    <hr />
                                    {foodItem.length !== 0
                                        ? foodItem.filter((item) => (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toLowerCase()))) 
                                            .map((filteredItem) => (
                                                <div key={filteredItem._id} className="col-12 col-md-6 col-lg-3">
                                                    <Card
                                                        foodItem = {filteredItem}
                                                        options = {filteredItem.options[0]}
                                                    />
                                                </div>
                                            ))
                                        : <div>No Such Data Found</div>
                                    }
                                </div>
                            </div>
                        ))
                        : null
                }
            </div>  */}

            <div className='container'>
                {
                    foodCat.length !== 0 && foodItem.length !== 0 &&
                    foodCat.map((category) => (
                        <div key={category._id}>
                            <div className="fs-3 m-3">{category.CategoryName}</div>
                            <hr />
                            <div className="d-flex flex-wrap">
                                {foodItem
                                    .filter(item => item.CategoryName === category.CategoryName && item.name.toLowerCase().includes(search.toLowerCase()))
                                    .map(filteredItem => (
                                        <div key={filteredItem._id} className="col-12 col-md-6 col-lg-3 mb-3">
                                            <Card
                                                foodItem={filteredItem}
                                                options={filteredItem.options[0]}
                                            />
                                        </div>
                                    ))}
                            </div>
                        </div>
                    ))
                }
            </div>


            <Footer />
        </div>
    );
}


