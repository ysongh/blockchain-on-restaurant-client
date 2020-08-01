import React from 'react';
import { BrowserRouter as Router, Route  } from 'react-router-dom';

import './App.css';
import Navbar from './component/layout/Navbar';
import Home from './component/Home';
import AddRestaurant from './component/AddRestaurant';

function App() {
  return (
    <Router className="App">
      <Navbar />
      <Route exact path="/" component={Home} />
      <Route exact path="/restaurant" component={AddRestaurant} />
    </Router>
  );
}

export default App;