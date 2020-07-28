import React from 'react';
import { BrowserRouter as Router, Route  } from 'react-router-dom';

import './App.css';
import AddRestaurant from './component/AddRestaurant';

function App() {
  return (
    <Router className="App">
      <Route exact path="/" component={AddRestaurant} />
    </Router>
  );
}

export default App;