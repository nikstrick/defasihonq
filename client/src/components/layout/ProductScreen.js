import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getProduct } from '../../actions/productActions';
import { addToCart } from '../../actions/cartActions';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';

class ProductScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { quantity: 1, buy: false };

    this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ quantity: event.target.value });
  }
  componentDidMount() {
    this.props.getProduct(this.props.match.params.id);
  }
  render() {
    const { viewProduct } = this.props.product;
    const { isAuthenticated, user } = this.props.auth;
    const discount =
      Math.round(
        ((viewProduct.mrp - viewProduct.price) / viewProduct.mrp) * 100 * 100
      ) / 100;
    if (this.state.buy) return <Redirect to='/cart' />;
    return (
      <div>
        <div className='btn btn-default'>
          <Link to='/'>
            <i className='fas fa-angle-double-left' />
            <span className='hide-sm'> Back</span>
          </Link>
        </div>

        <div className='details'>
          <div className='details-image'>
            <img src={viewProduct.image} alt={viewProduct.productName}></img>
          </div>
          <div className='details-info'>
            <ul>
              <li>
                <h3>{viewProduct.productName}</h3>
              </li>
              <li>{viewProduct.rating} stars</li>
              <li className='mrp'>MRP:₹{viewProduct.mrp}</li>
              <li>
                Price:
                <b>₹{viewProduct.price}</b>
              </li>
              <li>
                Discount:
                <b>{discount}%</b>
              </li>
              <li>
                Description:
                {viewProduct.description}
              </li>
              <li>({viewProduct.reviews})Reviews</li>
            </ul>
          </div>
          <div className='details-action'>
            <ul>
              <li>
                Price:<b>₹{viewProduct.price}</b>
              </li>
              {/* <li>Status:{product[len - 1].status}</li> */}
              <li>
                Qty:
                <select
                  value={this.state.quantity}
                  onChange={this.handleChange}>
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                </select>
              </li>
              <li>
                <button
                  className='add-to-cart'
                  onClick={() => {
                    if (isAuthenticated) {
                      // console.log(this.props.match.params.id);
                      // console.log(user._id);
                      this.props.addToCart(
                        this.props.match.params.id,
                        user._id,
                        this.state.quantity
                      );
                    } else {
                      alert('You are not Logged in!!');
                    }
                  }}>
                  &#128722;Add to Cart
                </button>
              </li>
              <li>
                <button
                  className='buy-now'
                  onClick={() => {
                    if (isAuthenticated) {
                      // console.log(this.props.match.params.id);
                      // console.log(user._id);
                      this.props.addToCart(
                        this.props.match.params.id,
                        user._id,
                        this.state.quantity
                      );
                      setTimeout(this.setState({ buy: true }), 1500);
                    } else {
                      alert('You are not Logged in!!');
                    }
                  }}>
                  Buy Now
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
ProductScreen.proptype = {
  getProduct: PropTypes.func.isRequired,
  addToCart: PropTypes.func.isRequired,
  viewProduct: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  product: state.product,
  auth: state.auth,
});
export default connect(mapStateToProps, { getProduct, addToCart })(
  ProductScreen
);
