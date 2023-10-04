import Footer from '../components/Footer'
import image from "../components/bg_1.jpg"
import image1 from "../components/bg_2.jpg"
import image2 from "../components/bg_3.jpg"
import images from "../components/logo.png"
import {Link} from "react-router-dom"
export default function Main() {

  return (
     <div>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container-fluid">
    <Link className="navbar-brand fs-1 fst-italic mx-5" to="/"><img src={images} style={{height:"80px", paddingBottom:"15px"}}></img></Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    </div>
    <div className='container'>
      <Link className='btn bg-info text-white ' to="/login">Buy</Link>
      <Link className='btn bg-info text-white ' to="/slogin">Sell</Link>
      {/* <Link className='btn bg-info text-white ' to="/adminlogin">Admin</Link> */}
    </div>
    </nav>
      {/* Crousel */}
      <div id="carouselExample" className="carousel slide">
        <div className="carousel-inner">
          <div className="carousel-item active">
          <img src={image} className="img-fluid" alt="no image"/>
          </div>
          <div className="carousel-item">
          <img src={image1} className="img-fluid" alt="no image"/>
          </div>
          <div className="carousel-item">
          <img src={image2} className="img-fluid" alt="no image"/>
          </div>
          <div className="carousel-caption d-none d-md-block " style={{zIndex:"10"}}>
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
      <Footer />
    </div>
  )
}