import React, { Component } from 'react';
import { getFunName } from '../helpers';

class StorePicker extends Component {
  // Code that runs when the compoonent is created 
  // constructor() {
  //   super();
  //   // binds the goToStore method to StorePicker
  //   this.goToStore = this.goToStore.bind(this);
  // }

  goToStore = (e) => {
    e.preventDefault();
    console.log('You changed the URL');
    // Grab text from input
    const storeId = this.storeInput.value;
    console.log(storeId);
    // Transition from / to /store/:storeId via propTypes
    this.context.router.transitionTo(`/store/${storeId}`)
  }      

  render() { 
    return (
      <div>
        <form className="store-selector" onSubmit={this.goToStore} >
         {/* When the <input/> is rendered onto the page, the arrow function 
           * will put put a reference of the input onto the class itself. 
           * With the property named storeInput
           */}
          <input type="text" required placeholder="Store Name" 
            defaultValue={getFunName()} ref={(input) => {this.storeInput = input}}/>
          <button type="submit">Visit Store</button>
        </form>
      </div>
    );
  }
}
// Surface the router from the parent with contextTypes
// Make router available to StorePicker
StorePicker.contextTypes = {
  router: React.PropTypes.object
}

export default StorePicker;