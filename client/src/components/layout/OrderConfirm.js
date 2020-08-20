import React ,{useEffect,useState}from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { ListGroup, ListGroupItem } from 'reactstrap';
import { connect } from 'react-redux';
import { Container,Col, Row} from 'reactstrap';
import { Collapse, CardBody, Card ,Button} from 'reactstrap';
import { Progress } from 'reactstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

const OrderConfirm = ({isAuthenticated}) =>{
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const [order,setOrder] = useState({address:{
      address:"",
      address2:"",
      city:"",
      state:"",
      pincode:"",
    },
    orderItems:[{}]
  });
    useEffect(()=>{ 
      const getOrder = async () =>{
         const res = await axios.get('/api/order');
         console.log(res.data);
         setOrder(res.data[0]);
      }
      getOrder();
},[]);

  if (!isAuthenticated) {
    return <Redirect to='/' />;
  }
  if(order){
  return(
      <div>
    <Progress striped color="warning" value={100} />
    <Container fluid={true}> 
        <Row>
        <h1 className='large page-text'>Order Confirmed</h1>
        </Row>
        <Row>
    <Col xs="12" md="6"><div className="orderconfirm"></div></Col>
     <Col xs="12" md="6">

     <Card style={{marginBottom:10}}>
        <CardBody>
        <div className="lead">Order ID: {order._id}</div>
      <div className="detailsDark">Order Total: {order.orderTotal}</div>
      <div className="details">User: {order.userID}</div>
      <div className="details">Address: {order.address.address +" "+ order.address.address2 +" "+order.address.city +" "+order.address.state}</div>
      <div className="details">Pincode: {order.address.pincode}</div>
      
      {!isOpen?<Button color="warning" onClick={toggle} style={{ marginBottom: '1rem' }}>Get Details</Button>
      :<Button color="warning" onClick={toggle} style={{ marginBottom: '1rem' }}>Hide Details</Button>}
      <Collapse isOpen={isOpen}>
        <Card >
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
      
      <Link to="/" className="btn btn-dark">Shop Again!</Link>
    </Col>
    </Row>
  </Container>
  </div>
  );
  }
  else{
    return (<div></div>);
  }

}
OrderConfirm.propTypes = {
  orders: PropTypes.array.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  orders:state.orders,
  isAuthenticated: state.auth.isAuthenticated,
  auth:state.auth
});

export default connect(mapStateToProps)(OrderConfirm);