import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'
import image from "../components/bg_2.jpg"

export default function Main() {


  //for location 
  const [userLocation, setUserLocation] = useState(null);


  const [productDetail, setproductDetail] = useState([]);
  // const [roomsCount, setRoomsCount] = useState([]);
  // const [profileDetail, setProfileDetail] = useState([]);
//for displaying rooms data

useEffect(() => {
  //for location
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ latitude, longitude });
      }, (error) => {
        console.error("Error getting user location:", error);
      });
    } else {
      console.error("Geolocation is not available in this browser.");
    }
    // console.log(userLocation)
    // console.log(userLocation.longitude)
  }, []);

    useEffect(() => {
  const loadData = async () => {
  try{
    let response = await fetch("http://localhost:8888/api/DisplayData", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      }
    });

    response = await response.json();
    




    // Calculate distances and add to room data
    if (userLocation) {
      const roomsWithDistances = response.map((room) => {
        const roomLocation = {
          latitude: parseFloat(room.lat),
          longitude: parseFloat(room.log),
        };

        // Calculate distance using Haversine formula
        const distance = calculateDistance(userLocation, roomLocation);

        return {
          ...room,
          distance,
        };
      });

      // Sort rooms by distance in ascending order
      roomsWithDistances.sort((a, b) => a.distance - b.distance);

      setproductDetail(roomsWithDistances);
    }







    // setproductDetail(response);
      } catch (error) {
        console.error('Error fetching data:', error);
      }

    }

//for displaying user data
// const UserData = async () => {
//   let response = await fetch("http://localhost:4000/api/DisplayData", {
//     method: "POST",
//     headers: {
//       'Content-Type': 'application/json'
//     }
//   });

//   response = await response.json();

//   setProfileDetail(response);
// }

  loadData();
  // UserData();
  // useEffect(() => {
  //   loadData();
  // }, []);
}, [userLocation]);


  // Haversine formula to calculate distance between two coordinates
  const calculateDistance = (location1, location2) => {
    const { latitude: lat1, longitude: lon1 } = location1;
    const { latitude: lat2, longitude: lon2 } = location2;

    const earthRadius = 6371; // Radius of the Earth in kilometers

    const degToRad = (degrees) => {
      return degrees * (Math.PI / 180);
    };

    const dLat = degToRad(lat2 - lat1);
    const dLon = degToRad(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(degToRad(lat1)) * Math.cos(degToRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = earthRadius * c; // Distance in kilometers

    return distance;
  };


  return (
    <div>
      <Navbar/>
      
     
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
          </div>
        </div>
      </div>


      {/* <div className='m-3'>
        {
        // roomsDetail !==[]
        productDetail.length > 0
        ? productDetail.map((data)=> {
          return(
            <div>
              
                  
            <Card 
            product = {data}

            /> 
            </div>
         
            
          )
        })
        : <div>No Room Available</div>
      }
        
      </div> */}


<div className="m-3" style={{ display: "flex", flexWrap: "wrap" }}>
      {productDetail.length > 0 ? (
        productDetail.map((data) => {
          return (
            <div key={data.id} style={{ flex: "0 0 calc(33.33% - 20px)", margin: "10px" }}>
              <Card product={data} />
            </div>
          );
        })
      ) : (
        <div>No Product Available</div>
      )}
    </div>


      <Footer />
    </div>
  )
}