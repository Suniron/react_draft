import React, { Component } from 'react';

class Welcome extends Component {
  constructor() {
    super();
    this.state = {  // Déclaration des différents 'state'
      count: 0
    }
  }

  addOne() {
    this.setState({ // Modifier un 'state' de cette instance de la classe
      count: this.state.count + 1
    })
  }

  removeOne() {
    this.setState({
      count: this.state.count -1
    })
  }

  /**
   * Permet de préparer le rendu du 'component'
   * Doit retourner un seul élément (ou plusieurs dans un div par exemple)
   */
  render() {
    return (
      <div>
        <h1>Welcome {this.props.name} </h1>       {/* Afficher un 'props' */}
        <p>Mon compteur: {this.state.count} </p>  {/* Afficher un 'state' */}
        <button onClick={() => this.addOne()} >Ajouter 1</button>       {/* 1ère façon d'utiliser une méthode de la classe */}
        <button onClick={this.removeOne.bind(this)} >Enlever 1</button> {/* 2ème façon d'utiliser une méthode de la classe */}
      </div>
    );
  }
}

export default Welcome  // Export du component pour l'utiliser dans un autre fichier