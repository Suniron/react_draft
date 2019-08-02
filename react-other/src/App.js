import React, {Component} from 'react';
import Welcome from './Welcome' // Importe le component créé 'Welcome'
import logo from './logo.svg';
import './App.css';


class App extends Component {
  render() {
    return (
      // Appeller le component 'Welcome' avec la props 'Etienne'
      <Welcome name="Etienne"/>
    );
  }
}

export default App;
