import React from 'react';

// stateless functional component 
const Header = (props) => {
  return (
    <header className="top">
      <h1>
        Catch 
        <span className="ofThe">
          <span className="of">of the </span>
          <span className="the">Day</span>
        </span> 
      </h1>
      <h3 className="tagline"><span>{props.tagline}</span></h3>
    </header>
  );
}

Header.propTypes = {
  tagline: React.PropTypes.string.isRequired
}

export default Header; 

