 import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
// import { ButtonToolbar } from 'react-bootstrap'

export default function Carousel() {
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
            <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{ objectFit: "conatain !important" }}>
                    <div className="carousel-inner" id='carousel'>
                        <div className='carousel-caption ' style={{ zIndex: "10" }}>
                            <form className="d-flex">
                                <input className='form-control me-2' type='search' placeholder='Search' aria-label="Search" value={search} onChange={(e) => setSearch(e.target.value)}></input>
                                <button className='btn btn-outline-success' type="submit">Search</button>
                            </form>
                        </div>
                        <div className="carousel-item active">
                            <img src="https://via.placeholder.com/900x700?text=Food+Image+1" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="Food Image 1"></img>
                        </div>
                        <div className="carousel-item">
                            <img src="https://via.placeholder.com/900x700?text=Food+Image+2" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="Food Image 2"></img>
                        </div>
                        <div className="carousel-item">
                            <img src="https://via.placeholder.com/900x700?text=Food+Image+3" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="Food Image 3"></img>
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

    )
}
