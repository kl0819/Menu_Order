import React, { Component } from 'react';

import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import Fish from './Fish';
import sampleFishes from '../sample-fishes';
import base from '../base';

class App extends Component {
  // constructor() {
  //   super();
  //   // initial state 
  //   this.state = {
  //     fishes: {},
  //     order: {}
  //   };

  //   this.loadSamples = this.loadSamples.bind(this);
  //   this.addFish = this.addFish.bind(this);
  //   this.updateFish = this.updateFish.bind(this);
  //   this.removeFish = this.removeFish.bind(this);
  //   this.addToOrder = this.addToOrder.bind(this);
  //   this.removeFromOrder = this.removeFromOrder.bind(this);
  // }
  
  state = {   
    fishes: {},
    order: {}
  };

  componentWillMount() {
    // Runs right before app is rendered to sync local state with the existing state on firebase
    this.ref = base.syncState(`${this.props.params.storeId}/fishes`, {
      context: this,
      state: 'fishes'
    });
     // Check if there's an order in the localStorage
    const localStorageRef =localStorage.getItem(`order-${this.props.params.storeId}`);
    if (localStorageRef)  {
      // update App's order state
      this.setState({
        order:JSON.parse(localStorageRef)
      });
    }
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  // Invoked before rendering when new props or state are being received 
  componentWillUpdate(nextProps, nextState) {
    // Set localStorage
    localStorage.setItem(`order-${this.props.params.storeId}`, 
      JSON.stringify(nextState.order));
  }

  loadSamples = () => {
    this.setState({
      fishes: sampleFishes
    });
  };

  addFish = (fish) => {
    // Udpate our state
    const fishes = {...this.state.fishes};
    // add the new fish
    const timeStamp = Date.now();
    fishes[`fish-${timeStamp}`] = fish;
    // set state
    this.setState({
      fishes
    });
  };

  updateFish = (key, updatedFish) => {
    const fishes = {...this.state.fishes};
    // overwrite the fish with the updatedFish
    fishes[key] = updatedFish;
    // update state
    this.setState({ fishes });
  };

  removeFish = (key) => {
    const fishes = {...this.state.fishes};
    fishes[key] = null;
    this.setState({ fishes });
  };

  addToOrder = (key) => {
    // Take copy of state
    const order = {...this.state.order};
    // Update or add the new # of fish ordered
    order[key] = order[key] + 1 || 1;
    // Update state 
    this.setState({
      order
    });
  };

  removeFromOrder = (key) => {
    const order = {...this.state.order};
    // delete order[key]
    delete order[key];
    this.setState({
      order
    });
  };

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
          <ul className="list-of-fishes">
            {/* Loop over the list of objects(state) of fishes, 
              * .keys from objects returns an array 
              * .map loops over array to return a list of components <Fish />
              */}
            {
              Object
              .keys(this.state.fishes)
              .map((key) => <Fish key={key} index={key} details={this.state.fishes[key]} addToOrder={this.addToOrder}/>)
            }
          </ul>
        </div>
        <Order 
          fishes={this.state.fishes} 
          order={this.state.order} 
          params={this.props.params}
          removeFromOrder={this.removeFromOrder}
        />
        {/* Passing addFish() to the Inventory Component as a prop */}
        <Inventory 
          addFish={this.addFish} 
          updateFish={this.updateFish} 
          removeFish={this.removeFish} 
          loadSamples={this.loadSamples} 
          fishes={this.state.fishes} 
          storeId={this.props.params.storeId}
        />
      </div>
    );
  }

  static propTypes = {
    params: React.PropTypes.object.isRequired
  };
}

export default App;