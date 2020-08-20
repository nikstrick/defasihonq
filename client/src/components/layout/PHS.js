import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import { connect } from 'react-redux';
import { getProducts } from '../../actions/productActions';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import { deleteProduct } from '../../actions/adminActions';
import { addToCart } from '../../actions/cartActions';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: 20,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  roott: {
    maxWidth: 345,
  },
}));

function FullWidthGrid({
  product,
  auth,
  getProducts,
  addToCart,
  deleteProduct,
}) {
  useEffect(() => {
    getProducts();
  }, []);
  const classes = useStyles();
  const { products } = product;
  const { isAuthenticated, user } = auth;
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} lg={3}>
            <Card className={classes.roott}>
              <Link
                to={'/product/' + product._id}
                style={{ textDecoration: 'none' }}>
                <CardActionArea>
                  <CardMedia
                    component='img'
                    alt={product.productName}
                    height='300'
                    src={product.image}
                    title={product.productName}
                  />

                  <CardContent>
                    <div className='product-name'>{product.productName}</div>

                    <Typography
                      variant='body1'
                      color='textSecondary'
                      component='p'>
                      <div className='product-brand'>
                        {product.productBrand}
                      </div>
                      <div className='product-price'>₹{product.price}</div>
                      <div className='product-rating'>
                        {product.rating}stars ({product.reviews}Reviews)
                      </div>
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Link>
              <CardActions>
                <div className='shopping'>
                  {user !== null && user.admin ? (
                    <div className='shopping'>
                      <button
                        className='add-to-cart'
                        onClick={() => {
                          if (isAuthenticated) {
                            deleteProduct(product._id);
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
                            addToCart(product._id, user._id, 1);
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
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

FullWidthGrid.propTypes = {
  getProducts: PropTypes.func.isRequired,
  product: PropTypes.object.isRequired,
  addToCart: PropTypes.func.isRequired,
  deleteProduct: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  product: state.product,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  getProducts,
  logout,
  addToCart,
  deleteProduct,
})(FullWidthGrid);
