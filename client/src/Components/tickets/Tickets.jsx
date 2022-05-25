import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Schema from 'validate';
import adminApi from '../../Constants/axios/adminApi';
import './Tickets.css';
function Tickets() {
  const [show, setShow] = useState(false);
  const [productData, setProductData] = useState({})
  const [ticketData, setTicketData] = useState([])
  const [refresh, setRefresh] = useState(false)
  const [error, setError] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    adminApi.get('/getTickets').then((response) => {
      console.log(response.data);
      setTicketData(response.data)
    })
  }, [refresh])

  const user = new Schema({
    productName: {
      type: String,
      required: true,
      message: "Product Name is required",
      length: { min: 3, max: 32 }
    },
    description: {
      type: String,
      required: true,
    },

    price: {
      type: String,
      match: /^[0-9]+$/,
      required: true,
      message: {
        match: "Price must be a number",
        required: "Price required"
      }
    },
    fromDate: {
      type: String,
      required: true,
      message: "From Date is required"
    },
    toDate: {
      type: String,
      required: true,
      message: "From Date is required"
    }


  })


  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value })
  }
  const submitData = () => {
    const errors = user.validate(productData)
    if (errors.length > 0) {
      console.log(errors);
      setError(errors[0].message)
    } else {
      adminApi.post('/addTicket', { data: productData }).then((response) => {
        console.log(response);
        setShow(false)
        setRefresh(!refresh)
      }).catch((error) => {
        setError("Product exist in same name")
      })

    }

  }
  const changePublish = (id) => {

    adminApi.post('/changePublish', { id: id }).then(() => {
      setRefresh(!refresh)
    })
  }
  const handleClose = () => {
    setShow(false)
  };
  const handleShow = () => setShow(true);
  const logout = () => {
    localStorage.removeItem('adminData')
    navigate('/')
    window.location.reload()

  }

  return (
    <div>
      <div className='upper-div'>
        <Button variant="dark" className='logout-button' onClick={() => logout()}>Log Out</Button>
      </div>
      <div className='outer-div-ticket'>
        <Row>
          {ticketData.map((ticket) =>
            <Col md={2}>
              <div className='ticket-div'>
                <h2>{ticket.productName}</h2>
                <div className='ticket-description'>
                  <p className='description'>
                    {ticket.description}
                  </p>
                </div>
                <h6>{ticket.fromDate} to {ticket.toDate}</h6>
                <h3> ₹{ticket.price}</h3>

                <Button variant="dark" onClick={() => changePublish(ticket._id)}>{ticket.publish ? "Unpublish" : "Publish"}</Button>
                
              </div>
            </Col>
          )}
          <Col md={2}>
            <div className='plus-div' onClick={handleShow}>
              <img className='plus-img' src="\icons8-macos-maximize-60.png" alt="" />

            </div>
          </Col>
        </Row>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>ADD PRODUCT</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <p className='error'>{error}</p>
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Product Name"
                autoFocus
                name="productName"
                onChange={handleOnChange}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Product Description</Form.Label>
              <Form.Control as="textarea" rows={3} name="description" onChange={handleOnChange} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="text"
                placeholder="Price"
                autoFocus
                name="price"
                onChange={handleOnChange}
              />
            </Form.Group>
            <Form.Group xs={6} className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Available</Form.Label>
              <Row>
                <Col>
                  <Form.Control
                    xs={6}
                    type="date"
                    placeholder="From"
                    autoFocus
                    name="fromDate"
                    max={productData.toDate}
                    onChange={handleOnChange}
                  />
                </Col>
                <Col>
                  <Form.Control
                    xs={6}
                    type="date"
                    placeholder="To"
                    autoFocus
                    min={productData.fromDate}
                    name="toDate"
                    onChange={handleOnChange}
                  />
                </Col>

              </Row>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={submitData}>
            Add Ticket
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default Tickets