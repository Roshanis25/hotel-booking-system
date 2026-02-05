import React, { useState } from 'react';
import { Modal, Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Room({ room, fromdate, todate }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Logic for price display
  const discountRate = 0.10; // 10% discount
  const originalPrice = room.rentPerDay;
  const discountedPrice = originalPrice - (originalPrice * discountRate);

  return (
    <div className='row bs animate__animated animate__fadeInUp'>
      <div className='col-md-4'>
        <img src={room.imageUrls[0]} className='smallimg' alt='room' />
      </div>
      
      <div className='col-md-7'>
        <h1>{room.name}</h1>
        <p><b>Type:</b> {room.type}</p>
        <p><b>Max Count:</b> {room.maxCount}</p>
        
        {/* Price and Discount Section */}
        <div className="price-section my-2">
            <h5 style={{ color: '#2ecc71', fontWeight: 'bold' }}>
                ₹{discountedPrice} / Day
            </h5>
            <p className="text-muted" style={{ fontSize: '0.8rem' }}>
                <del>₹{originalPrice}</del> <span className="badge bg-danger">10% OFF</span>
            </p>
        </div>

        <div style={{ float: 'right' }} className='mt-3'>
          {(fromdate && todate) && (
            <Link to={`/book/${room._id}/${fromdate}/${todate}`}>
              <button className='btn btn-primary m-2'>Book Now</button>
            </Link>
          )}
          
          {/* Ensure this button calls handleShow */}
          <button className='btn btn-outline-dark m-2' onClick={handleShow}>
            View Details
          </button>
        </div>
      </div>

      {/* --- MODAL SECTION --- */}
      <Modal show={show} onHide={handleClose} size='lg' centered>
        <Modal.Header closeButton>
          <Modal.Title><b>{room.name}</b></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Carousel prevLabel='' nextLabel='' indicators={true}>
            {room.imageUrls.map((url, index) => (
              <Carousel.Item key={index}>
                <img 
                  className="d-block w-100" 
                  src={url} 
                  alt={`Slide ${index}`} 
                  style={{ height: '400px', objectFit: 'cover', borderRadius: '10px' }} 
                />
              </Carousel.Item>
            ))}
          </Carousel>
          <div className="mt-4">
            <p>{room.description}</p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-dark" onClick={handleClose}>
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Room;