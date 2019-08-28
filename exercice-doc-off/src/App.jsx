import React from 'react';

// VARIABLES UTILES:

const products = [
  {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
  {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
  {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
  {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
  {category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
  {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"}
];

// COMPOSANTS:

function ProductRow(props) {

  function makeGoodName() {
    // Si props.stocked est false:
    if (!props.product.stocked) {
      return <td><font color="red">{props.product.name}</font></td>
    }
    // Si props.stocked est true:
    return <td><font color="black">{props.product.name}</font></td>
  }

  return(
    <tr>
      {makeGoodName()}
      <td>${props.product.price}</td>
    </tr>
  )
}

function ProductCategoryRow(props) {
  return(
    <tr>
      <th colSpan={props.colSpan}>{props.name}</th>
    </tr>
  )
}

class ProductTable extends React.Component {
  render() {
    const filterText = this.props.filterText;
    const inStockOnly = this.props.inStockOnly;

    const rows = [];
    let lastCategory = null;

    // Parcourir tous les éléments de 'this.props.products'
    this.props.products.forEach((product) => {
      if (product.name.indexOf(filterText) === -1) {
        return;
      }
      if (inStockOnly && !product.stocked) {
        return;
      }
      if (product.category !== lastCategory) {  // Si la catégorie de l'objet n'est pas la même que précédemment
        rows.push(  // Ajouter la catégorie à la liste des lignes
          <ProductCategoryRow 
            key={product.category} 
            name={product.category} 
            colSpan='2' 
          />
        );
      }
      rows.push(  // Ajouter la ligne pour l'item à la liste des lignes
        <ProductRow 
          key={product.name} 
          product={product} 
        />
      )
      // Mettre à jour la dernière catégorie d'item consultée
      lastCategory = product.category;
    })

    return(
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    )
  }
}

class SearchBar extends React.Component {
  constructor(props) {
    super(props)
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this)
    this.handleInStockChange = this.handleInStockChange.bind(this)
  }

  handleFilterTextChange(e) {
    this.props.onFilterTextChange(e.target.value)
  }

  handleInStockChange(e) {
    this.props.onInStockChange(e.target.checked)
  }

  render() {
    const filterText = this.props.filterText
    const inStockOnly = this.props.inStockOnly

    return(
      <form>
      <input 
        type="text" 
        placeholder="Search..." 
        value={filterText}
        onChange={this.handleFilterTextChange}
      />
      <p>
        <input 
          type="checkbox"
          checked={inStockOnly}
          onChange={this.handleInStockChange}
        />
        {' '}
        Only show products in stock
      </p>
    </form>
    )
  }
}

class FilterableProductTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: '',
      inStockOnly: false
    }

    this.handleFilterTextChange = this.handleFilterTextChange.bind(this)
    this.handleInStockChange = this.handleInStockChange.bind(this)
  }

  handleFilterTextChange(filterText) {
    this.setState({
      filterText: filterText
    })
  }

  handleInStockChange(inStockOnly) {
    this.setState({
      inStockOnly: inStockOnly
    })
  }

  render() {
    return(
      <div>
        <SearchBar
          filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly}
          onFilterTextChange={this.handleFilterTextChange}
          onInStockChange={this.handleInStockChange}
        />
        <ProductTable
          products={this.props.products}
          filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly} 
        />
      </div>
    )
  }
}

function App(props) {
  return (
    <div>
      <FilterableProductTable products={products} />
    </div>
  );
}

export default App;
