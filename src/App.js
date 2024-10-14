import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import ShoppingList from './components/ShoppingList';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Route path="/" exact component={ShoppingList} />
      </div>
    </Router>
  );
}

export default App;
