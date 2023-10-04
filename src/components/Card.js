import React,{useState} from 'react'

export default function Card (props) {

    //for spinner 
    const [isLoading, setIsLoading] = useState(false);

    const handleBooking = async (e) => {
        e.preventDefault();
        
        setIsLoading(true);

      
        let userEmail = localStorage.getItem("userEmail");
        const response = await fetch("http://localhost:8888/api/CartData", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                  body: JSON.stringify({
                  name: props.product.name,
                  email: userEmail,
                  address: props.product.address,
                  image: props.product.image,
                  price: props.product.price,
                  owneremail: props.product.email,
                //   clientnumber: props.roomdetail.number
               })
          
            });
            const json = await response.json();
            setIsLoading(false);

            if(json.status === 422 || !json){
            setIsLoading(false);
              window.alert("Invalid data");
              console.log("INvalid data");
            }else {
            setIsLoading(false);
              window.alert("Product Purchased Successfully");
              console.log("successfull");
            //   nevigate("/Shome"); 
            }

   
    
    

    }
        return (
            <div >
                <div className="container">
                    
                    <div className="card mb-3" style={{ maxWidth: "1000px" }}>
                        <div className="row g-0">
                            <div className="col-md-4">
                                <img src={`http://localhost:8888/uploads/`+props.product.image} className="img-fluid w-100 h-100" alt="no image" style={{maxHeight:'200px', marginTop:'40px', borderRadius:'10px', marginLeft:'10px'}} />
                            </div>
                            <div className="col-md-8">
                                <div className="card-body">
                                    <h5 className="card-title">{props.product.name} at {props.product.address}</h5>
                                    <p className="card-text">Price Per KG: {props.product.price}</p>
                                    <p className="card-text">Product Quantiy: {props.product.quantity}</p>
                                    <p className="card-text">Description: {props.product.description}</p>
                                    <p className="card-text"><small className="text-body-secondary">Post {props.date} ago</small></p>
                                    <form className="d-flex" role="search">
                                    </form>
                                        <button className="btn btn-outline-info bg-info text-white"  style={{width:"150px", height:"80px"}}  onClick={handleBooking} disabled={isLoading}>{isLoading ?
                                         <div className="spinner-border mx-4 rt-1 "role="status">
                                            <span className="sr-only"></span>
                                        </div> : 'Shop Now'}</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }