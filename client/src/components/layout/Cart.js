import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { Redirect } from 'react-router-dom';
import { ListGroup, ListGroupItem } from 'reactstrap';
import { connect } from 'react-redux';
import { Container, Col, Row } from 'reactstrap';
import { Progress } from 'reactstrap';
import { Link } from 'react-router-dom';
import { logout } from '../../actions/auth';
import { deleteCartItem } from '../../actions/cartActions';
import axios from 'axios';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    width: '100%',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: '50%',
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
}));

const Cart = ({ deleteCartItem, auth, product }) => {
  const { user } = auth;
  const classes = useStyles();
  const theme = useTheme();
  const onDeleteClick = (id) => {
    deleteCartItem(id);
    console.log(id);
    const func = async () => {
      const result = await axios.get('api/users/cart');
      console.log(result);
      setData(result.data);

      let tot = 0;
      result.data.map((item) => {
        tot += item.quantity * item.price;
      });
      setTotal(tot);
    };
    func();
  };
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const func = async () => {
      const result = await axios.get('api/users/cart');
      console.log(result);
      setData(result.data);

      let tot = 0;
      result.data.map((item) => {
        tot += item.quantity * item.price;
      });
      setTotal(tot);
    };
    func();
  }, []);
  if (!auth.isAuthenticated) {
    return <Redirect to='/' />;
  }
  return (
    <div>
      <div className='back-to-result'>
        <Link to='/'>Back to Home</Link>
      </div>
      <Progress striped color='warning' value={25} />
      <Container fluid={true}>
        <Row>
          <h1 className='large page-text'>Cart</h1>
        </Row>
        <Row>
          <Col xs='12' md='6'>
            <div className='cartback'></div>
          </Col>
          <Col xs='12' md='6'>
            <div className='detailsDark'>Total Amount: {total}</div>

            {data.map((item, index) => (
              <div>
                <Card className={classes.root}>
                  <div className={classes.details}>
                    <CardContent className={classes.content}>
                      <Typography component='h5' variant='h5'>
                        {item.name}
                      </Typography>
                      <Typography variant='subtitle1' color='textSecondary'>
                        <b>Price:</b>₹{item.price}
                      </Typography>

                      <Typography variant='subtitle1' color='textSecondary'>
                        <b>MRP:</b>₹{item.mrp}
                      </Typography>
                      <Typography variant='subtitle1' color='textSecondary'>
                        <b>Quantity:</b>
                        {item.quantity}
                      </Typography>
                      <Typography variant='subtitle1' color='textSecondary'>
                        <b>
                          <div>Total:₹{item.quantity * item.price}</div>
                        </b>
                      </Typography>
                    </CardContent>
                  </div>
                  <CardMedia
                    component='img'
                    alt={item.name}
                    className={classes.cover}
                    src={item.image}
                    title={item.name}
                  />
                  <div>
                    <IconButton
                      aria-label='delete'
                      onClick={() => onDeleteClick(item._id)}>
                      <DeleteIcon />
                    </IconButton>
                  </div>
                </Card>
              </div>
            ))}

            <Link to='/Address' className='btn btn-dark'>
              Add Address
            </Link>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
Cart.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
  deleteCartItem: PropTypes.func.isRequired,
  product: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  product: state.product,
});

export default connect(mapStateToProps, { logout, deleteCartItem })(Cart);
