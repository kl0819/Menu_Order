import React, { Component } from 'react';

class AddFishForm extends Component {
  // constructor() {
  //   super();
  //   this.createFish = this.createFish.bind(this);
  // }

  createFish = (e) => {
    e.preventDefault();
    console.log('Gonna make some 🐠!');

    const fish = {
      name: this.name.value,
      price: this.price.value,
      status: this.status.value,
      desc: this.desc.value,
      image: this.image.value
    };
    console.log(fish);
    // add fish
    this.props.addFish(fish);
    // Clear form after submit
    this.fishForm.reset();
  };

  render() {
    return (
      <form ref={(input) => this.fishForm = input} className="fish-edit" onSubmit={this.createFish}>
        <input ref={(input) => this.name = input} type="text" placeholder="Fish Name" required />
        <input ref={(input) => this.price = input} type="text" placeholder="Fish Price" required />
        <select ref={(input) => this.status = input}>
          <option value="available">Fresh</option>
          <option value="unavailable">Sold Out!</option>
        </select>
        <textarea ref={(input) => this.desc = input} type="text" placeholder="Fish Description" required />
        <input ref={(input) => this.image = input} type="text" placeholder="Fish Image" />
        <button type="submit">+ Add Item</button>
      </form>
    );
  }

  static propTypes = {
    addFish: React.PropTypes.func.isRequired
  };
}

export default AddFishForm; 

