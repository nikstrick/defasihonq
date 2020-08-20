import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addProduct } from '../../actions/adminActions';
// import { Link } from 'react-router-dom';
// import axios from 'axios';

const AdminScreen = ({ addProduct }) => {
  //the state in the form
  const [formData, setFormData] = useState({
    category: '',
    image: '',
    productName: '',
    productBrand: '',
    productType: '',
    productId: '',
    quantity: '',
    description: '',
    mrp: '',
    price: '',
    rating: '',
    reviews: '',
    date: Date.now(),
  });

  //Destructure the data in the formfields
  const {
    category,
    image,
    productName,
    productBrand,
    productType,
    productId,
    quantity,
    description,
    mrp,
    price,
  } = formData;

  //Handle changes in register form
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };
  //Handle submit button
  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(image);
    if (
      category === '' ||
      image === '' ||
      productName === '' ||
      productType === '' ||
      quantity === '' ||
      mrp === '' ||
      price === ''
    ) {
      alert('Fields are not completely filled');
    } else {
      const formDATA = new FormData();
      formDATA.append('category', category);
      formDATA.append('image', image);
      formDATA.append('productName', productName);
      formDATA.append('productBrand', productBrand);
      formDATA.append('productType', productType);
      formDATA.append('productId', productId);
      formDATA.append('quantity', quantity);
      formDATA.append('description', description);
      formDATA.append('mrp', mrp);
      formDATA.append('price', price);
      addProduct(formDATA);
    }
  };
  return (
    <Fragment>
      <h1 className='large text-primary'>Add Product</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Give Product Details
      </p>
      <form
        className='form'
        onSubmit={(e) => onSubmit(e)}
        formEncType='multipart/form-data'>
        <div className='product-form'>
          <div className='container'>
            <div className='form-group'>
              <input
                type='file'
                name='image'
                onChange={(e) => onFileChange(e)}
              />
            </div>
            <div className='form-group'>
              <input
                type='text'
                placeholder='Product Category'
                name='category'
                value={category}
                onChange={(e) => onChange(e)}
                required
              />
            </div>
            <div className='form-group'>
              <input
                type='text'
                placeholder='Product Name'
                name='productName'
                value={productName}
                onChange={(e) => onChange(e)}
                required
              />
            </div>
            <div className='form-group'>
              <input
                type='text'
                placeholder='Product Brand'
                name='productBrand'
                // minLength='6'
                value={productBrand}
                onChange={(e) => onChange(e)}
                // required
              />
            </div>
            <div className='form-group'>
              <input
                type='text'
                placeholder='Product Type'
                name='productType'
                // minLength='6'
                value={productType}
                onChange={(e) => onChange(e)}
                required
              />
            </div>
            <div className='form-group'>
              <input
                type='text'
                placeholder='Product Id'
                name='productId'
                // minLength='6'
                value={productId}
                onChange={(e) => onChange(e)}
                // required
              />
            </div>
            <div className='form-group'>
              <input
                type='number'
                placeholder='Quantity'
                name='quantity'
                min='0'
                // minLength='6'
                value={quantity}
                onChange={(e) => onChange(e)}
                required
              />
            </div>
            <div className='form-group'>
              <input
                type='text'
                placeholder='Description'
                name='description'
                // minLength='6'
                value={description}
                onChange={(e) => onChange(e)}
                required
              />
            </div>
            <div className='form-group'>
              <input
                type='number'
                placeholder='MRP'
                name='mrp'
                step='0.01'
                min='0'
                // minLength='6'
                value={mrp}
                onChange={(e) => onChange(e)}
                required
              />
            </div>
            <div className='form-group'>
              <input
                type='number'
                placeholder='Price'
                name='price'
                step='0.01'
                min='0'
                // minLength='6'
                value={price}
                onChange={(e) => onChange(e)}
                required
              />
            </div>
          </div>
        </div>
        <input type='submit' className='btn btn-primary' value='Add Product' />
      </form>
    </Fragment>
  );
};

AdminScreen.propTypes = {
  addProduct: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { addProduct })(AdminScreen);
