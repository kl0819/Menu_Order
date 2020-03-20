import React, { Component } from 'react';
import { formatPrice } from '../helpers';
import CSSTransitionGroup from 'react-addons-css-transition-group';

class Order extends Component {
  // constructor() {
  //   super();
  //   this.renderOrder = this.renderOrder.bind(this);
  // }
  
  /**
   * Separate render function to list user's order items/price/total
   * @param  {[type]} key [unique key of fishes] 
   * @return {[type]} <li> item [render list item of fishes and their amount and price + total order cost]
   */
  renderOrder = (key) => {
    const fish = this.props.fishes[key];
    const count = this.props.order[key];
    const removeButton = <button onClick={() => this.props.removeFromOrder(key)}>&times;</button>

    if (!fish || fish.status === 'unavailable') {
      return <li key={key}>Sorry, {fish ? fish.name : 'fish'} 
        is no longer available!{removeButton}</li>
    }

    return (
      <li key={key}>
        <span>
          <CSSTransitionGroup
            component="span"
            className="count"
            transitionName="count"
            transitionEnterTimeout={200}
            transitionLeaveTimeout={200}
          >
            <span key={count}>{count}</span>
          </CSSTransitionGroup>
          lbs {fish.name} {removeButton}
        </span>
        <span className="price">{formatPrice(fish.price * count)}</span>
      </li>
    );
  };

  render() {
    const orderIds = Object.keys(this.props.order);
    
    const total = orderIds.reduce((prevTotal, key) => {
      const fish = this.props.fishes[key];
      const count = this.props.order[key];
      const isAvailable = fish && fish.status === 'available';

      if (isAvailable) {
        return prevTotal + (count * fish.price || 0);
      }

      return prevTotal;
    }, 0);

    return (
      <div className="order-wrap">
        <h2>Your Order</h2>

        <CSSTransitionGroup 
          className="order" 
          component="ul"
          transitionName="order"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}
        >
          {orderIds.map(this.renderOrder)}
          <li className="total">
            <strong>Total:</strong>
            {formatPrice(total)}
          </li>
        </CSSTransitionGroup>
      </div>
    );
  }
  
  static propTypes = {
    fishes: React.PropTypes.object.isRequired,
    order: React.PropTypes.object.isRequired,
    removeFromOrder: React.PropTypes.func.isRequired
  };
}

export default Order; 

