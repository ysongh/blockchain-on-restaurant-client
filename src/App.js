import React from 'react';
import { BrowserRouter as Router, Route  } from 'react-router-dom';

import './App.css';
import Navbar from './component/layout/Navbar';
import Footer from './component/layout/Footer';
import Home from './component/Home';
import Restaurants from './component/restaurant/Restaurants';
import RestaurantDetail from './component/restaurant/RestaurantDetail';
import AddRestaurant from './component/restaurant/AddRestaurant';
import Deals from './component/deal/Deals';
import AddDeal from './component/deal/AddDeal';

function App() {
  return (
    <Router className="App">
      <Navbar />
      <main className="main">
        <Route exact path="/" component={Home} />
        <Route exact path="/deal" component={Deals} />
        <Route exact path="/restaurant" component={Restaurants} />
        <Route exact path="/addrestaurant" component={AddRestaurant} />
        <Route exact path="/restaurant/:id" component={RestaurantDetail} />
        <Route exact path="/restaurant/:id/adddeal" component={AddDeal} />
      </main>
      <Footer />
    </Router>
  );
}

export default App;