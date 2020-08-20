import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getProducts } from '../../actions/productActions';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import { addToCart } from '../../actions/cartActions';
import { Link } from 'react-router-dom';

class HomeScreen extends Component {
  componentDidMount() {
    this.props.getProducts();
  }
  render() {
    const { products } = this.props.product;
    const { isAuthenticated, user } = this.props.auth;
    return (
      <div>
        <div>
          <ul className='products'>
            {products.map((product) => (
              <li key={product._id}>
                <div className='product'>
                  <Link to={'/product/' + product._id}>
                    <img
                      className='product-image'
                      src='https://beebom.com/wp-content/uploads/2020/06/mi-notebook-14-horizon-edition.jpg'
                      alt='product 1'
                    />
                  </Link>

                  <div className='product-name'>
                    <Link to={'/product/' + product._id}>
                      {product.productName}
                    </Link>
                  </div>
                  <div className='product-brand'>{product.productBrand}</div>
                  <div className='product-price'>₹{product.price}</div>
                  <div className='product-rating'>
                    {product.rating}stars ({product.reviews}Reviews)
                  </div>
                  {user !== null && user.admin ? (
                    <div className='shopping'>
                      <button
                        className='add-to-cart'
                        onClick={() => {
                          if (isAuthenticated) {
                            this.props.deleteProduct(product._id);
                          } else {
                            alert('You are not Logged in!!');
                          }
                        }}>
                        Delete Product
                      </button>
                      <button className='buy-now'>Update Product</button>
                    </div>
                  ) : (
                    <div className='shopping'>
                      <button
                        className='add-to-cart'
                        onClick={() => {
                          if (isAuthenticated) {
                            this.props.addToCart(product._id, user._id, 1);
                          } else {
                            alert('You are not Logged in!!');
                          }
                        }}>
                        &#128722; Add to Cart
                      </button>
                      <button className='buy-now'>Buy Now</button>
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
HomeScreen.propTypes = {
  getProducts: PropTypes.func.isRequired,
  product: PropTypes.object.isRequired,
  addToCart: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  product: state.product,
  auth: state.auth,
});

export default connect(mapStateToProps, { getProducts, logout, addToCart })(
  HomeScreen
);
