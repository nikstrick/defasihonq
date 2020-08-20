import React ,{useEffect,useState}from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Container,Col, Row, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { Progress } from 'reactstrap';
import {updateAddress} from '../../actions/address';
import { Link } from 'react-router-dom';
const Address = ({isAuthenticated,updateAddress}) =>{
  const [address,setAddress] =useState({
    address:"" ,
    address2:"",
    pincode:"",
    city:"",
    state:""
   });
   
  const handleChange = (e)=>{
    setAddress({...address,[e.target.name] :e.target.value});
    
  }
  const handlePayment = ()=>{
    updateAddress(address);
  }
  if (!isAuthenticated) {
    return <Redirect to='/' />;
  }
  return(
      <div>
    <Progress striped color="warning" value={50} />
    <Container fluid={true}> 
        <Row>
        <h1 className='large page-text'>Add Address</h1>
        </Row>
        <Row>
    <Col xs="12" md="6"><div className="addressback"></div></Col>
     <Col xs="12" md="6">
      <Form>
      <FormGroup>
        <Label for="exampleAddress">Address</Label>
        <Input onChange={handleChange}type="text" name="address" id="exampleAddress" placeholder="1234 Main St"/>
      </FormGroup>
      <FormGroup>
        <Label for="exampleAddress2">Address 2</Label>
        <Input onChange={handleChange}type="text" name="address2" id="exampleAddress2" placeholder="Apartment, studio, or floor"/>
      </FormGroup>
      <Row form>
        <Col md={6}>
          <FormGroup>
            <Label for="exampleCity">City</Label>
            <Input onChange={handleChange}type="text" name="city" id="exampleCity"/>
          </FormGroup>
        </Col>
        <Col md={4}>
          <FormGroup>
            <Label for="exampleState">State</Label>
            <Input onChange={handleChange}type="text" name="state" id="exampleState"/>
          </FormGroup>
        </Col>
        <Col md={2}>
          <FormGroup>
            <Label for="exampleZip">Pincode</Label>
            <Input onChange={handleChange}type="text" name="pincode" id="exampleZip"/>
          </FormGroup> 
           
        </Col>
      </Row>
      
      <Link  onClick={handlePayment} to="/payment" className="btn btn-dark">Proceed to Pay</Link>
    </Form>
    </Col>
    </Row>
  </Container>
  </div>
  );
}
Address.propTypes = {
  address : PropTypes.object,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  address:state.address,
  isAuthenticated: state.auth.isAuthenticated,
  auth:state.auth
});

export default connect(mapStateToProps,{updateAddress})(Address);