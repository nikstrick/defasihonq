import React from 'react';
import { Route, Switch } from 'react-router-dom';
import CartScreen from '../layout/CartScreen';
import ProductScreen from '../layout/ProductScreen';
import AdminScreen from '../layout/AdminScreen';
import Alert from '../layout/Alert';
import Orders from '../layout/Orders';
import NotFound from '../layout/NotFound';
import PrivateRoute from '../routing/PrivateRoute';
import Address from '../layout/Address';
import Payment from '../layout/Payment';
import OrderConfirm from '../layout/OrderConfirm';
import Cart from '../layout/Cart';

const Routes = () => {
  return (
    <section className='container'>
      <Alert />
      <Switch>
        <Route path='/product/:id' component={ProductScreen} />
        <Route path='/addProduct' component={AdminScreen} />
        <PrivateRoute exact path='/orders' component={Orders} />
        <PrivateRoute exact path='/address' component={Address} />
        <PrivateRoute exact path='/payment' component={Payment} />
        <PrivateRoute exact path='/orderconfirm' component={OrderConfirm} />
        <PrivateRoute exact path='/cart' component={Cart} />
        <Route component={NotFound} />
      </Switch>
    </section>
  );
};

export default Routes;
