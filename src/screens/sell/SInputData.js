import React,{useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';


export default function SInputData() {
//for location 
const [sellerLocation, setSellerLocation] = useState(null);

  //for spinner
  const [isLoading, setIsLoading] = useState(false);

  //for image upload form chatgpt
  const [selectedFile, setSelectedFile] = useState(null);


  useEffect (() => { 
    //for location 
      //for location
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
          const { latitude, longitude } = position.coords;
          setSellerLocation({ latitude, longitude });
          // console.log(sellerLocation)
          // console.log("janam")
        }, (error) => {
          console.error("Error getting user location:", error);
        });
      } else {
        console.error("Geolocation is not available in this browser.");
      }
      
        },[]);
       




         const nevigate = useNavigate();
         let userEmail = localStorage.getItem("userEmail")


        
          
          //for handle 
         
          const handleImageChange = (e) => {
            const file = e.target.files[0];
            setSelectedFile(file);
          };


        //for adding data of form to database
        const [credential, setcredential] = useState({ name: "",email: "userEmail", address: "", price:"", quantiy:"", description: "" ,image:"image",lat:"", log:""})
        const handleData = async (e) => {
            e.preventDefault();

        
              //   if ("geolocation" in navigator) {
              //   navigator.geolocation.getCurrentPosition((position) => {
              //     const { latitude, longitude } = position.coords;
              //     setSellerLocation({ latitude, longitude });
                 
              //   }, (error) => {
              //     console.error("Error getting user location:", error);
              //   });
              // } else {
              //   console.error("Geolocation is not available in this browser.");
              // }
              console.log(sellerLocation)
              console.log("mansoon")
  
          //chatgpt
          const formData = new FormData();
          formData.append('image', selectedFile);
          formData.append('name', credential.name);
          formData.append('email', userEmail);
          formData.append('address', credential.address);
          formData.append('lat', sellerLocation.latitude);
          formData.append('log', sellerLocation.longitude);
          formData.append('description', credential.description);
          formData.append('price', credential.price);
          formData.append('quantity', credential.quantity);

    
    // const {email, address, roomscounts, bathrooms, parking}  = credential;

          setIsLoading(true);
            const response = await fetch("http://localhost:8888/api/AddData", {
                method: "POST",
                body: formData,
        });
               
            const json = await response.json();


            if(json.status === 422 || !json){
              setIsLoading(false);
              window.alert("Invalid data");
              console.log("Invalid data");
            }else {
              setIsLoading(false)
              window.alert("data added successfully");
              console.log("successfull");
              nevigate("/Shome"); 
            }
           
        }

        //for on change usestate
        const onChange = (event) => {
            setcredential({ ...credential, [event.target.name]: event.target.value });
            // setSelectedFile(event.target.files[0])
        }
    
  return (
    <div>

<button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop" style={{width:"200px", height:"60px"}} >
{isLoading ?
 <button class="btn btn-primary" type="button" disabled>
 <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
 Adding Product...
</button>
  : 'Add Product'}
</button>

<div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="staticBackdropLabel">Product Details</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body" >
                          <form method="POST" action="/AddData" encType="multipart/form-data">
                          <div className="mb-3">
                             <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
                             <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="name" value={credential.name} onChange={onChange}/>
                                 <div id="emailHelp" className="form-text">Tell something about your product</div>
                         </div>
                         <div className="mb-3">
                             <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                             <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="email" value={userEmail} onChange={onChange}/>
                                 <div id="emailHelp" className="form-text">Enter a email address </div>
                         </div>
                         <div className="mb-3">
                             <label htmlFor="exampleInputEmail1" className="form-label">Address</label>
                             <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="address" value={credential.address} onChange={onChange} />
                                 <div id="emailHelp" className="form-text">Enter a address</div>
                         </div>
                         <div className="mb-3">
                             <label htmlFor="exampleInputEmail1" className="form-label">Quantiy</label>
                             <input type="number" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="quantity" value={credential.quantity} onChange={onChange} />
                                 <div id="emailHelp" className="form-text">Enter Quantiy.</div>
                         </div>
                         <div className="mb-3">
                             <label htmlFor="exampleInputEmail1" className="form-label">Description </label>
                             <textarea style={{height:"200px"}} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="description" value={credential.description} onChange={onChange} />
                                 <div id="emailHelp" className="form-text">Enter Description about product.</div>
                         </div>
                         <div className="mb-3">
                             <label style={{paddingRight:"300px"}} htmlFor="exampleInputEmail1" className="form-label">Image</label>
                            <input type="file" className="from-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="image"  onChange={handleImageChange}/>
                                 <div id="emailHelp" className="form-text">Image of a product.</div>
                         </div>
                         <div className="mb-3">
                             <label htmlFor="exampleInputEmail1" className="form-label">Price per KG </label>
                             <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="price" value={credential.price} onChange={onChange} />
                                 <div id="emailHelp" className="form-text">Enter Price per KG.</div>
                         </div>
                         
                         </form>
      </div>
      <div className="modal-footer" >
      <button type="submit" className="btn btn-success" data-bs-dismiss="modal" onClick={handleData} >Add Product</button>
      </div>
    </div>
  </div>
</div>
    </div>
  )
}

// import { useState } from 'react';
// import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';

// //for forms
// import Form from 'react-bootstrap/Form';

// function SInputData() {
    // //for adding data of form to database
    // const [credential, setcredential] = useState({ email: "", address: "", roomscounts: "", bathrooms: "", parking: "" })
    // const handleData = async (e) => {
    //     e.preventDefault();
    //     const response = await fetch("http://localhost:4000/api/DisplayData", {
    //         method: "POST",
    //         header: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({ email: credential.email, address: credential.address, roomscounts: credential.roomscounts, bathrooms: credential.bathrooms, parking: credential.bathrooms })
    //     });
    //     const json = await response.json();
    //     if (!json.success) {
    //         alert("Enter valid credetials");
    //     }
    // }
    // //for on change usestate
    // const onChange = (event) => {
    //     setcredential({ ...credential, [event.target.name]: event.target.value });
    // }
    // const [show, setShow] = useState(false);

    // const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);

//     return (
//         <>
//             <Button variant="primary" onClick={handleShow}>
//                 Add Rooms
//             </Button>

//             <Modal
//                 show={show}
//                 onHide={handleClose}
//                 backdrop="static"
//                 keyboard={false}
//             >
//                 <Modal.Header closeButton>
//                     <Modal.Title>Room Details</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                     <Form>
//                         <Form.Group className="mb-3" controlId="formBasicEmail">
//                             <Form.Label>Email address</Form.Label>
//                             <Form.Control type="email" placeholder="Enter email" name:email value={credential.email} onChange={onChange} />
//                             <Form.Text className="text-muted">
//                                 We'll never share your email with anyone else.
//                             </Form.Text>
//                         </Form.Group>

//                         <Form.Group className="mb-3" controlId="formBasicPassword">
//                             <Form.Label>Password</Form.Label>
//                             <Form.Control type="password" placeholder="Password"/>
//                         </Form.Group>
//                         <Form.Group className="mb-3" controlId="formBasicCheckbox">
//                             <Form.Check type="checkbox" label="Check me out" />
//                         </Form.Group>
//                         <Button variant="primary" type="submit">
//                             Submit
//                         </Button>
//                     </Form> 
                    
//                      {/* <form> 
//                         <div className="mb-3">
//                             <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
//                             <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name:email value={credential.email} onChange={onChange}/>
//                                 <div id="emailHelp" className="form-text">Enter a email address of your.</div>
//                         </div>
//                         <div className="mb-3">
//                             <label htmlFor="exampleInputEmail1" className="form-label">Address</label>
//                             <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name:address value={credential.address} onChange={onChange} />
//                                 <div id="emailHelp" className="form-text">Enter a address of your room.</div>
//                         </div>
//                         <div className="mb-3">
//                             <label htmlFor="exampleInputEmail1" className="form-label">Rooms Counts</label>
//                             <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name:roomscounts value={credential.roomscounts} onChange={onChange} />
//                                 <div id="emailHelp" className="form-text">Enter a number of rooms You Have.</div>
//                         </div>
//                         <div className="mb-3">
//                             <label htmlFor="exampleInputEmail1" className="form-label">Bathrooms </label>
//                             <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name:bathrooms value={credential.bathrooms} onChange={onChange} />
//                                 <div id="emailHelp" className="form-text">Enter a number of Bathrooms you provide.</div>
//                         </div>
//                         <div className="mb-3">
//                             <label htmlFor="exampleInputEmail1" className="form-label">Parking</label>
//                             <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name:parking value={credential.parking} onChange={onChange} />
//                                 <div id="emailHelp" className="form-text">Write yes if you have parking and no for no parking.</div>
//                         </div>
//                     </form> */}
//                 </Modal.Body>
//                 <Modal.Footer >
//                     <Button variant="secondary" onClick={handleClose}>
//                         Close
//                     </Button>
//                     <Button type="submit" onChange= {handleData} variant="primary">Add Room</Button>
//                 </Modal.Footer>
//             </Modal>
//         </>
//     );
// }
// export default SInputData;