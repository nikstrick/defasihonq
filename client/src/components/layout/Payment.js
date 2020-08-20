import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  Container,
  Col,
  Row,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';
import { deleteCart } from '../../actions/cartActions';
import { deleteAddress } from '../../actions/address';
import { Toast, ToastBody, ToastHeader } from 'reactstrap';
import { Progress } from 'reactstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { CART_FAIL } from '../../actions/types';
const Payment = ({
  isAuthenticated,
  deleteCart,
  deleteAddress,
  address,
  cart,
}) => {
  const [pay, setPay] = useState('cod');
  const handleChange = (e) => {
    setPay(e.target.value);
  };

  const handleClick = async () => {
    //post order
    console.log('order posted');
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    let tot = 0;
    const result = await axios.get('api/users/cart');
    console.log(cart);
    result.data.map((e) => {
      tot += e.quantity * e.price;
    });
    console.log(tot);
    const body = JSON.stringify({
      orderItems: result.data,
      paymentMethod: 'COD',
      address,
      orderTotal: tot,
    });
    console.log(body);
    const res = await axios.post('/api/order', body, config);
    console.log(res);
    //cart empty
    //user cart empty

    deleteCart();
    //delete address
    deleteAddress();
  };

  if (!isAuthenticated) {
    return <Redirect to='/' />;
  }
  return (
    <div>
      <Progress striped color='warning' value={75} />
      <Container fluid={true}>
        <Row>
          <h1 className='large page-text'>Select Payment Method</h1>
        </Row>
        <Row>
          <Col xs='12' md='6'>
            <div className='paymentback'></div>
          </Col>
          <Col xs='12' md='6'>
            <FormGroup tag='fieldset'>
              <FormGroup check>
                <Label check>
                  <Input
                    onChange={handleChange}
                    type='radio'
                    name='radio1'
                    value='cod'
                    checked={pay === 'cod'}
                  />{' '}
                  <Toast>
                    <ToastHeader>Cash on Delivery(COD)</ToastHeader>
                    <ToastBody>Pay us after you get the product!!</ToastBody>
                  </Toast>
                </Label>
              </FormGroup>
              <FormGroup check disabled>
                <Label check>
                  <Input
                    onChange={handleChange}
                    type='radio'
                    name='radio1'
                    value='cdc'
                    checked={pay === 'cdc'}
                    disabled
                  />{' '}
                  <Toast>
                    <ToastHeader>Credit/Debit Cards</ToastHeader>
                    <ToastBody>Coming Soon!! Please select COD</ToastBody>
                  </Toast>
                </Label>
              </FormGroup>
            </FormGroup>

            <Link
              onClick={handleClick}
              to='/orderconfirm'
              className='btn btn-dark'>
              Place Order
            </Link>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
Payment.propTypes = {
  orders: PropTypes.array.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  orders: state.orders,
  isAuthenticated: state.auth.isAuthenticated,
  auth: state.auth,
  address: state.address,
  cart: state.cart,
});

export default connect(mapStateToProps, { deleteAddress, deleteCart })(Payment);
