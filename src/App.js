import React from "react";
import PropTypes from "prop-types";
import logo from "./logo.svg";
import Layout from "./components/Layout";

function App(props) {
  return (
    <div>
      <header>
        <p className="App-text">
          <img src={logo} className="App-logo" alt="logo" />
          Console
        </p>
      </header>
      <div className="main">
        <div className="child-content">
          <Layout />
        </div>
      </div>
      <footer>
        Fork me <a href="https://gitgub.com/anupjha"> github </a>
      </footer>
    </div>
  );
}

App.propTypes = {
  children: PropTypes.element.isRequired,
};

export default App;
