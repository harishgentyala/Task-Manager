/* eslint-disable import/no-named-as-default */


import PropTypes from "prop-types";
import React from "react";
import MainRoot from "./MainRoot";


// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.

class App extends React.Component {
  render() {
    return (
      <div>
        <MainRoot />
      </div>
  );
  }
}

App.propTypes = {
  children: PropTypes.element
};

export default App;
