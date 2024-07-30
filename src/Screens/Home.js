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
import 'bootstrap/dist/css/bootstrap.min.css';
import { Brightness1 } from '@material-ui/icons';


export default function Home() {
    const [search, setSearch] = useState('');
    const [foodCat, setFoodCat] = useState([]);
    const [foodItem, setFoodItem] = useState([]);
    const [username, setUsername] = useState('Guest');

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
    };

    const fetchUsername = () => {
        // Get the username from localStorage
        const storedUsername = localStorage.getItem('username');
        setUsername(storedUsername || 'Guest');
    };

    useEffect(() => {
        loadData();
        fetchUsername();
    }, []);

    return (
        <div>
            <div><Navbar /></div>
            <div>
                <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{ objectFit: "conatain !important" }}>
                    <div className="carousel-inner" id='carousel'style={{ objectFit: "conatain !important"}}>
                        <div className='carousel-caption' style={{ zIndex: "10" }}>
                            <div className="welcome-message"
                            >
                                <h2 className='saiba-font' 
                                style={{
                                    zIndex:"20",
                                    color: '#fff',
                                    textShadow: '2px 2px 5px rgba(0,0,0,0.5)',
                                    animation: 'fadeIn 2s ease-in-out, slideIn 2s ease-out'
                                }}>
                                    Welcome, {username} !
                                </h2>
                            </div>

                            

                            <form className="d-flex">
                                <input className='form-control me-2' type='search' placeholder='Search' aria-label="Search" value={search} onChange={(e) => setSearch(e.target.value)} />
                                <button className='btn btn-outline-success' type="submit">Search</button>
                            </form>
                        </div>
                        <div className="carousel-item active">
                            <img src="https://images.herzindagi.info/image/2022/May/food-at-restaurant.jpg"
                                className="d-block w-100"
                                style={{ objectFit: 'contain', height: '100%',filter: "brightness(0.5)" }}
                                alt="Food Image 1" />
                        </div>
                        <div className="carousel-item">
                            <img src="https://media.istockphoto.com/photos/paneer-tikka-kabab-in-red-sauce-is-an-indian-dish-made-from-chunks-of-picture-id1257507446?b=1&k=20&m=1257507446&s=170667a&w=0&h=Nd7QsslbvPqOcvwu1bY0rEPZXJqwoKTYCal3nty4X-Y="
                                className="d-block w-100"
                                style={{ objectFit: 'contain', height: '100%',filter: "brightness(0.5)" }}
                                alt="Food Image 2" />
                        </div>
                        <div className="carousel-item">
                            <img src="https://news.mit.edu/sites/default/files/styles/news_article__image_gallery/public/images/202312/MIT_Food-Diabetes-01_0.jpg?itok=Mp8FVJkC"
                                className="d-block w-100"
                                style={{ objectFit: 'contain', height: '100%',filter: "brightness(0.5)" }}
                                alt="Food Image 3" />
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
                </div>
            </div>

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

            {/* Add styles in a <style> tag */}
            <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }

                @keyframes slideIn {
                    from { transform: translateY(-50px); }
                    to { transform: translateY(0); }
                }

                .welcome-message h3 {
                    
                    
                    text-shadow: 2px 2px 5px rgba(0,0,0,0.5);
                    animation: fadeIn 2s ease-in-out, slideIn 2s ease-out;
                    
                }
                
            `}</style>
        </div>
    );
}


