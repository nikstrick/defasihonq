import React, { Fragment, useState } from 'react';
import { Button, Modal, ModalBody } from 'reactstrap';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import LoginModal from './LoginModal';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';
import Alertt from '../layout/Alert';

const RegisterModal = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    password2: '',
  });
  const [modal, setModal] = useState(false);
  const { name, phone, email, password, password2 } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('Passwords do not match', 'danger');
    } else {
      register({ name, phone, email, password });
    }
  };

  // if (isAuthenticated) {
  //   return <Redirect to='/orders'/>;
  // }

  const toggle = () => setModal(!modal);

  return (
    <div>
      <Button onClick={toggle}>SignUp</Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalBody>
          <Alertt />
          <Fragment>
            <h1 className='large modal-text'>Sign Up</h1>
            <p className='lead'>
              <i className='fas fa-user' /> Create Your Account
            </p>
            <form className='form' onSubmit={(e) => onSubmit(e)}>
              <div className='form-group'>
                <input
                  type='text'
                  placeholder='Name'
                  name='name'
                  value={name}
                  onChange={(e) => onChange(e)}
                />
              </div>
              <div className='form-group'>
                <input
                  type='text'
                  placeholder='Phone No.'
                  name='phone'
                  value={phone}
                  onChange={(e) => onChange(e)}
                />
              </div>
              <div className='form-group'>
                <input
                  type='email'
                  placeholder='Email Address'
                  name='email'
                  value={email}
                  onChange={(e) => onChange(e)}
                />
              </div>
              <div className='form-group'>
                <input
                  type='password'
                  placeholder='Password'
                  name='password'
                  value={password}
                  onChange={(e) => onChange(e)}
                />
              </div>
              <div className='form-group'>
                <input
                  type='password'
                  placeholder='Confirm Password'
                  name='password2'
                  value={password2}
                  onChange={(e) => onChange(e)}
                />
              </div>
              <input type='submit' className='btn btn-dark' value='Register' />
            </form>
            <p className='my-1'>
              Already have an account? <LoginModal />
            </p>
          </Fragment>
        </ModalBody>
      </Modal>
    </div>
  );
};

RegisterModal.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, register })(RegisterModal);
