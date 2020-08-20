import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import LoginModal from '../auth/LoginModal';
import RegisterModal from '../auth/RegisterModal';

const Navbar = ({ auth: { isAuthenticated, user, loading }, logout }) => {
  const authLinks = (
    <ul>
      <li>
        {isAuthenticated ? (
          <div>
            {user !== null && user.admin ? (
              <div>
                <Link to='/addproduct' className='btn btn-danger'>
                  <i className='fas fa-plus' />
                  <span className='hide-sm'>Add Product</span>
                </Link>
              </div>
            ) : (
              <div>
                <Link to='/cart' className='btn btn-danger'>
                  <i class='fas fa-shopping-cart' />
                  <span className='hide-sm'>Cart</span>
                </Link>
              </div>
            )}
          </div>
        ) : (
          <div></div>
        )}
      </li>
      <li>
        <Link to='/orders' className='btn btn-danger'>
          <i className='fas fa-money-check-alt' />{' '}
          <span className='hide-sm'>Orders</span>
        </Link>
      </li>
      <li>
        <a onClick={logout} href='#!' className='btn btn-danger'>
          <i className='fas fa-sign-out-alt' />{' '}
          <span className='hide-sm'>Logout</span>
        </a>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <LoginModal />
      </li>
      <li>
        <RegisterModal />
      </li>
    </ul>
  );

  return (
    <div className='hide-scroll'>
      <nav className='navbar bg-dark'>
        <h1>
          <Link to='/' style={{ textDecoration: 'none' }}>
            <i className='fas fa-shopping-bag' /> Defashionq
          </Link>
        </h1>

        {<Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>}
      </nav>
    </div>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
