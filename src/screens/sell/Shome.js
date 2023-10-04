import React,{useState, useEffect} from 'react'
import SNavbar from "../../components/SNavbar"
import Footer from "../../components/Footer"
import SInputData from './SInputData'
// import image from "../../components/rooms.jpg"
// import SellCard from '../../components/sellCard'

export default function Shome() {

//for location 
const [sellerLocation, setSellerLocation] = useState(null);

//for image path
  // const imageUrl = /uploads/${data.imageFileName};

  //for spinner 
  const [isLoading, setIsLoading] = useState(false);

  const [listDetail, setListDetail] = useState([]);
  const handleDelete = async (productId)=> {
    // e.preventDefault(e);
   
    try {
      
        setIsLoading(true);
        await fetch(`http://localhost:8888/api/DeleteData/${productId}`, { 
        method: 'DELETE' });
        // Update the products state by filtering out the deleted product
        const newProduct = listDetail.filter((_id) => _id !== productId);
        setListDetail(newProduct);
        // setListDetail(data.filter((data) => props._id !== productId));
        setIsLoading(false);
        window.alert("Deleted successfully");
      }
       catch (error) {
        setIsLoading(false);
        console.error('Error deleting product:', error);
      }






    // const response = fetch()
 }


    useEffect (() => { 
            //for location 
              //for location
              if ("geolocation" in navigator) {
                navigator.geolocation.getCurrentPosition((position) => {
                  const { latitude, longitude } = position.coords;
                  setSellerLocation({ latitude, longitude });
                  // console.log(sellerLocation)
                  console.log("mansoon")
                }, (error) => {
                  console.error("Error getting user location:", error);
                });
              } else {
                console.error("Geolocation is not available in this browser.");
              }
              
                },[]);
               



  const listData = async() => {
    try {
   let userEmail = localStorage.getItem("userEmail");
   let res = await fetch (`http://localhost:8888/api/DisplayList/${userEmail}`,{
      method: "POST" ,
      headers : {
        'Content-Type': "application/json"
      }
      
    });
    
    res = await res.json();

    setListDetail(res);
    } catch (error) {
      console.error('Error fetching data:', error);
     }
    }



  listData();
  return (
    <div>
    <SNavbar />
    <div className='container' style={{marginLeft:'600px'}}>
    <h1>Product</h1>
    <SInputData/>

    </div>

    {/* to display output */}
    <div className='m-3' style={{ display: "flex", flexWrap: "wrap" }}> {
        // listDetail !==[]
        listDetail.length > 0
        ? listDetail.map((data)=> {
          return(
            <div key={data._id} style={{ flex: "0 0 calc(33.33% - 20px)", margin: "10px" }}>
               <div className="card mb-3" style={{ maxWidth: "500px" }}>
                        <div className="row g-0">
                            <div className="col-md-4">
                                <img src={`http://localhost:8888/uploads/`+ data.image} className="img-fluid w-100 h-100" alt="no image" />
                            </div>
                            <div className="col-md-8">
                                <div className="card-body">
                                    <h5 className="card-title">{data.name} at {data.address}</h5>
                                    <p className="card-text">Price Per KG:  {data.price}</p>
                                    <p className="card-text">Description: {data.description}</p>
                                    <p className="card-text">Quantiy: {data.quantity}</p>
                                    <p className="card-text"><small className="text-body-secondary">Post {data.date} ago</small></p>
                                    
                                    
                                </div>
                                        <button className="btn btn-outline-success bg-success text-white mx-3" style={{width:"200px", height:"80px"}} onClick={() => handleDelete(data._id)} disabled={isLoading} >{isLoading ?
                                         <div className="spinner-border mx-4 rt-1 "role="status">
                                            <span className="sr-only"></span>
                                        </div> : 'Delete'}</button>

                            </div>
                        </div>
                    </div>
              
            </div>
         
            
          )
        }):<div><h2> Add product first</h2></div>
      }
        
      </div>
    
    <Footer/>
    </div>
  )
  
}








// import React, { useState, useEffect } from 'react';
// import SNavbar from "../../components/SNavbar"
// import Footer from "../../components/Footer"
// import SInputData from './SInputData'

// export default function Shome() {
//   const [listDetail, setListDetail] = useState([]);

//   useEffect(() => {
//     listData();
//   }, []);

//   const handleDelete = async (productId) => {
//     try {
//       // Set the loading state for the specific card to true
//       setListDetail((prevList) =>
//         prevList.map((item) =>
//           item._id === productId ? { ...item, isLoading: true } : item
//         )
//       );

//       // Perform the delete operation
//       await fetch(http://localhost:4000/api/DeleteData/${productId}, {
//         method: 'DELETE',
//       });

//       // Remove the deleted item from the list
//       setListDetail((prevList) =>
//         prevList.filter((item) => item._id !== productId)
//       );
//       window.alert("Deleted successfully");
//     } catch (error) {
//       console.error('Error deleting product:', error);
//       window.alert('Booking failed. Please try again.');
//     }
//   };

//   const listData = async () => {
//     try {
//       let userEmail = localStorage.getItem("userEmail");
//       let res = await fetch(http://localhost:4000/api/DisplayList/${userEmail}, {
//         method: "POST",
//         headers: {
//           'Content-Type': "application/json"
//         }
//       });
//       res = await res.json();
  
//       console.log('Fetched data:', res); // Debugging: Log the fetched data
  
//       // Initialize the isLoading property for each item
//       const listDetailWithLoading = res.map((item) => ({ ...item, isLoading: false }));
//       setListDetail(listDetailWithLoading);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };
  
//   // const handleAddRoom = async (roomData) => {
//   //   try {
//   //     // Make a POST request to add the room
//   //     const response = await fetch('http://localhost:4000/api/AddRoom', {
//   //       method: 'POST',
//   //       headers: {
//   //         'Content-Type': 'application/json',
//   //       },
//   //       body: JSON.stringify(roomData),
//   //     });
  
//   //     if (response.ok) {
//   //       // Room added successfully, now update the state to reflect the change
//   //       console.log('Room added successfully'); // Debugging: Log success message
//   //       listData(); // Fetch updated data
//   //     } else {
//   //       window.alert('Failed to add room');
//   //     }
//   //   } catch (error) {
//   //     console.error('Error adding room:', error);
//   //     window.alert('Failed to add room');
//   //   }
//   // };
  

//   return (
//     <div>
//       <SNavbar />
//       <div className='container'>
//         <h1>Your List</h1>
//         <SInputData />

//         <div className='m-3'>
//           {listDetail.length > 0 ? (
//             listDetail.map((data) => {
//               return (
//                 <div key={data._id}>
//                   <div className="card mb-3" style={{ maxWidth: "1000px" }}>
//                     <div className="row g-0">
//                       <div className="col-md-4">
//                         <img src={`http://localhost:4000/uploads/` + data.image} className="img-fluid w-100 h-100" alt="no image" />
//                       </div>
//                       <div className="col-md-8">
//                         <div className="card-body">
//                           <h5 className="card-title">{data.name} at {data.address}</h5>
//                           <p className="card-text">Price Per month: {data.price}</p>
//                           <p className="card-text">Rooms: {data.roomscounts}</p>
//                           <p className="card-text">Bathrooms: {data.bathrooms}</p>
//                           <p className="card-text">Parking: {data.parking}</p>
//                           <p className="card-text"><small className="text-body-secondary">Post {data.date} ago</small></p>
//                         </div>
//                         <button className="btn btn-outline-success bg-success text-white mx-3" style={{ width: "200px", height: "80px" }} onClick={() => handleDelete(data._id)} disabled={data.isLoading}>
//                           {data.isLoading ? (
//                             <div className="spinner-border mx-4 rt-1 " role="status">
//                               <span className="sr-only"></span>
//                             </div>
//                           ) : 'Delete'}
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               );
//             })
//           ) : (
//             <div><h2>You Don't post any Room Add first One.</h2></div>
//           )}
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// }