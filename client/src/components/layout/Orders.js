import React ,{useEffect,useState}from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {allOrders} from '../../actions/order';
import OrderDetails from './OrderDetails';
import { Progress } from 'reactstrap';
const Orders = ({auth,isAuthenticated,orders,allOrders}) =>{
  console.log(orders);
  useEffect(()=>{ 
        allOrders(auth.user);
  },[]);
  if (!isAuthenticated) {
    return <Redirect to='/' />;
  }
  return(
  <div>
      <h1 className='large page-text'>Order Details</h1>
      <Link to='/cart'>Cart</Link>
      {orders !== null &&
             orders.length > 0 &&
             orders.map(order => (
              <OrderDetails order={order} admin={auth.user.admin}/>
              ))}
  </div>
  );
}
Orders.propTypes = {
  orders: PropTypes.array.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  orders:state.orders,
  isAuthenticated: state.auth.isAuthenticated,
  auth:state.auth
});

export default connect(mapStateToProps,{allOrders})(Orders);