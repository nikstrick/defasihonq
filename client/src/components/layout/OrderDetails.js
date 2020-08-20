import React, { useState } from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import { Collapse, Button, CardBody, Card } from 'reactstrap';
import axios from 'axios';
 const OrderDetails = ({order,admin}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [complete, setComplete] = useState(order.completed);
  const  markComplete = async () => {
       setComplete(!complete);
       const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };
      const body = JSON.stringify(order);
      //console.log(order.id);
      //console.log(body);
      const res = await axios.put('/api/order/admin/mark', body, config);
      //console.log(date);
  }
  
  const toggle = () => setIsOpen(!isOpen);
  const date = (order.orderDate).toString();
  return (
    <div style={{marginBottom:15}}>
    <Card>
        <CardBody>
      <div className="lead">Order ID: {order._id}</div>
      <div className="detailsDark">Order Total: {order.orderTotal}</div>
      <div className="details">User: {order.userID}</div>
      <div className="details">Address: {order.address.address +" "+ order.address.address2 +" "+order.address.city +" "+order.address.state}</div>
      <div className="details">Pincode: {order.address.pincode}</div>
      <div className="details">Order Made On: {(new Date(date)).toString()}</div>
      {(complete)?<div className="detailslast">Status: Completed</div>:<div className="detailslast">Status: Pending</div>}
      {!isOpen?<Button color="warning" onClick={toggle} style={{ marginBottom: '1rem' }}>Get Details</Button>
      :<Button color="warning" onClick={toggle} style={{ marginBottom: '1rem' }}>Hide Details</Button>}
      {(admin)?(complete)?<Button color="dark" onClick={markComplete} style={{ marginBottom: '1rem' }}>Mark as Pending
      </Button>:<Button color="success" onClick={markComplete} style={{ marginBottom: '1rem' }}>Mark as Complete</Button>:<div></div>}
      
      <Collapse isOpen={isOpen}>
        <Card>
          <CardBody>
          <div className="details">Order Items: </div>
          <ListGroup>
                {order.orderItems.map((item)=> (
                <ListGroupItem>
                    <div className="details">Name: {item.name}</div>
                <div className="details">Quantity: {item.quantity}</div>
                <div className="details">Price: {item.price}</div>
                <div className="details">Total: {item.price * item.quantity}</div>
                </ListGroupItem> ))}
            </ListGroup>
          </CardBody>
        </Card>
      </Collapse>
      </CardBody>
      </Card>
    </div>
  );
}
export default OrderDetails;