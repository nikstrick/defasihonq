import React, { Fragment, useState } from 'react';
import { Button, Modal,  ModalBody} from 'reactstrap';
import RegisterModal from './RegisterModal';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';
import Alertt from '../layout/Alert';

const LoginModal = ({ login, isAuthenticated })=> {
  
const [formData, setFormData] = useState({
        phone: '',
        password: ''
      });
  const [modal, setModal] = useState(false);
  const { phone, password } = formData;
  
  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    login(phone, password);
  };

  if (isAuthenticated) {
    return <Redirect to='/orders' />;
  }
  const toggle = () => setModal(!modal);

  return (
    <div>
      <Button onClick={toggle}>SignIn</Button>
      <Modal isOpen={modal} toggle={toggle}>

        <ModalBody>
        <Alertt />
        <Fragment>
      <h1 className='large modal-text'>Sign In</h1>
      <p className='lead'>
        <i className='fas fa-user' /> Sign Into Your Account
      </p>
      <form className='form' onSubmit={e => onSubmit(e)}>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Phone No.'
            name='phone'
            value={phone}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Password'
            name='password'
            value={password}
            onChange={e => onChange(e)}
            minLength='6'
          />
        </div>
        <input type='submit' className='btn btn-dark' value='Login' />
      </form>
      <p className='my-1'>
       Don't have an account? <RegisterModal/>
      </p>
    </Fragment>
        </ModalBody>
      </Modal>
    </div>
  );
}

LoginModal.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { login }
)(LoginModal);

