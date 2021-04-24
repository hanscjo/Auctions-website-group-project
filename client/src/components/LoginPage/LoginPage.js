import React, { Component } from "react";
import "./LoginPage.css";
import RegisterUser from "../RegisterUser/RegisterUser";
import { Redirect } from "react-router-dom";
import Button from "../UI/Button/Button";
import axios from "axios";

class loginpage extends Component {
  state = {
    registerClicked: false,
    username: "",
    password: "",
    loggedIn: false,
    wrongInputMessage: ""
  };

  handleClick = () => {
    this.setState({ registerClicked: true });
  };

  handleWrongInput = () => {
    this.setState({
      wrongInputMessage: "Du oppga feil brukernavn eller passord"
    });
  };

  handleLogin = async e => {
    e.preventDefault();
    await axios
      .post("/api/auth", {
        email: this.state.username,
        password: this.state.password
      })
      .then(res => {
        localStorage.setItem("token", res.data);
        this.setState({ loggedIn: true, wrongInputMessage: "" });
      })
      .catch(err => {
        this.setState({
          loggedIn: false,
          wrongInputMessage: "Feil brukernavn eller passord"
        });
      });
  };

  handleUsernameChange = e => {
    this.setState({ username: e.target.value });
  };
  handlePasswordChange = e => {
    this.setState({ password: e.target.value });
  };

  render() {
    if (this.state.registerClicked) {
      return <Redirect push to="/register" />;
    }

    if (this.state.loggedIn) {
      return <Redirect push to="/" />;
    }

    return (
      <div className="loginUser">
        <form className="loginForm">
          <h1 className="loginTitle">Logg inn</h1>
          <label className="loginlabel">Brukernavn:</label>
          <br />
          <input
            className="loginInput"
            type="text"
            name="username"
            onChange={this.handleUsernameChange}
          />
          <br />
          <label className="loginlabel">Passord:</label>
          <br />
          <input
            className="loginInput"
            type="password"
            name="password"
            onChange={this.handlePasswordChange}
          />
        </form>
        <p className="wrongInput">{this.state.wrongInputMessage}</p>
        <br />

        <Button clicked={this.handleLogin} className="loginButton">
          Logg inn
        </Button>
        <Button clicked={this.handleClick} className="loginButton" l>
          Ny bruker
        </Button>
      </div>
    );
  }
}

export default loginpage;
