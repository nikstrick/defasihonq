import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import { deleteCartItem } from '../../actions/cartActions';
import { Link } from 'react-router-dom';

class CartScreen extends Component {
  // componentDidMount(){
  //     this.props.getCartItems();
  // }
  onDeleteClick = (id) => {
    // console.log(id);
    this.props.deleteCartItem(id);
  };
  render() {
    const { user } = this.props.auth;
    return (
      <div>
        <div className='back-to-result'>
          <Link to='/'>Back to Home</Link>
        </div>
        {user.cart.map((item, index) => (
          <li key={index}>
            <div>
            <div>
                <button onClick={this.onDeleteClick.bind(this, item._id)}>
                  X
                </button>
              </div>
              <Link to={'/product/' + item._id}>
                <img
                  className='product-image'
                  src='https://beebom.com/wp-content/uploads/2020/06/mi-notebook-14-horizon-edition.jpg'
                  alt={item.name}
                />
              </Link>

              <div>
                <Link to={'/product/' + item._id}>
                  <b>Product:</b>
                  {item.name}
                </Link>
              </div>
              <div>
                <b>Brand:</b>
                {item.brand}
              </div>
              <div>
                <b>Price:</b>₹{item.price}
              </div>
              <div>
                <b>MRP:</b>₹{item.mrp}
              </div>
              <div>
                <b>Quantity:</b>
                {item.quantity}
              </div>
              <b>
                <div>Total:₹{item.quantity * item.price}</div>
              </b>
            </div>
          </li>
        ))}
      </div>
    );
  }
}
CartScreen.proptype = {
  // getCartItems:PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
  deleteCartItem: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { logout, deleteCartItem })(CartScreen);
