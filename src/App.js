import React from 'react';
import { BrowserRouter as Router, Route  } from 'react-router-dom';

import './App.css';
import { GlobalProvider } from './context/GlobalState';
import Navbar from './component/layout/Navbar';
import Footer from './component/layout/Footer';
import Home from './component/Home';
import Register from './component/auth/Register';
import Login from './component/auth/Login';
import Restaurants from './component/restaurant/Restaurants';
import RestaurantDetail from './component/restaurant/RestaurantDetail';
import AddRestaurant from './component/restaurant/AddRestaurant';
import Deals from './component/deal/Deals';
import AddDeal from './component/deal/AddDeal';
import Profile from './component/Profile';
import PrivateRoute from './component/common/PrivateRoute';
import Coin from './component/Coin';

function App() {
  return (
    <GlobalProvider>
      <Router className="App">
        <Navbar />
        <main className="main">
          <Route exact path="/" component={Home} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/deal" component={Deals} />
          <Route exact path="/restaurant" component={Restaurants} />
          <PrivateRoute exact path="/addrestaurant/:id" component={AddRestaurant} />
          <PrivateRoute exact path="/addrestaurant/" component={AddRestaurant} />
          <Route exact path="/restaurant/:id" component={RestaurantDetail} />
          <PrivateRoute exact path="/restaurant/:id/adddeal/:dealid" component={AddDeal} />
          <PrivateRoute exact path="/restaurant/:id/adddeal" component={AddDeal} />
          <PrivateRoute exact path="/profile" component={Profile} />
          <Route exact path="/coin" component={Coin} />
        </main>
        <Footer />
      </Router>
    </GlobalProvider>
  );
}

export default App;