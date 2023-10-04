import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'
import image from "../components/bg_2.jpg"
export default function Main() {

  const [search , setSearch] = useState([]);
  const [roomsDetail, setroomsDetail] = useState([]);

  const loadData = async () => {
    let response = await fetch("http://localhost:8888/api/DisplayData", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      }
    });

    response = await response.json();

    setroomsDetail(response);
  }
  loadData();
  // useEffect(() => {
  //   loadData();
  // }, []);

  return (
    <div>
      <Navbar />
      {/* Crousel */}
      <div id="carouselExample" className="carousel slide">
        <div className="carousel-inner">
          <div className="carousel-item active">
          <img src={image} className="img-fluid" alt="no image"/>
          </div>
          <div className="carousel-item">
          <img src={image} className="img-fluid" alt="no image"/>
          </div>
          <div className="carousel-item">
          <img src={image} className="img-fluid" alt="no image"/>
          </div>
          <div className="carousel-caption d-none d-md-block " style={{zIndex:"10"}}>
          <div className="d-flex justify-content-center" role="search">
            <input className="form-control me-2 bg-dark text-white" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e) => {setSearch(e.target.value)}} />
            
          </div>
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      <div className='m-3'>{
        // roomsDetail !==[]
        roomsDetail > 0
        ? roomsDetail.map((data)=> {
          return(
            <div >
              
            <Card 
            address = {data.address}
            price = {data.price}
            date = {data.date}
            /> 
            </div>
         
            
          )
        })
        : <div>""""""""</div>
      }
        
      </div>
     
     
      <Footer />
    </div>
  )
}