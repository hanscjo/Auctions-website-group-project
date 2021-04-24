import React, { Component } from "react";
import jwtDecode from "jwt-decode";
import "./ProfilePage.css";
import profile from "../../assets/placeholder.jpg";
import PropTypes from "prop-types";
import Transactions from "./Transactions/Transactions";
import axios from "axios";
import { Redirect } from "react-router-dom";
class ProfilePage extends Component {
  state = { usr: null, transactionsClicked: false };

  componentWillMount = () => {
    try {
      const jwt = localStorage.getItem("token"); //check if token exists
      const user = jwtDecode(jwt); //decode token
      this.setState({ usr: user }); //webtoken exist, logged in
    } catch (ex) {
      //webtoken do not exist, logged out
    }
  };
  handleUserDelete = async () => {
    const ID = jwtDecode(localStorage.getItem("token")).userID;
    await axios.delete("api/users?userID=" + ID).then(res => {
      localStorage.removeItem("token");
      this.setState({ usr: null });
    });
  };

  adminPage = () => {
    return (
      <div>
        <div>
          <img className="profile--image" src={profile} alt="Placeholder" />
        </div>
        <div id="details">
          <h1>Admin</h1>
          <h2>{this.state.usr.firstName + " " + this.state.usr.lastName}</h2>
          <h2>{this.state.usr.phoneNumber}</h2>
        </div>

        <div className="profile container grid-3">
          <div>
            <h4
              onClick={() =>
                this.setState({
                  transactionsClicked: !this.state.transactionsClicked
                })
              }
              className="profileOption"
            >
              Mine handler
            </h4>
            {this.state.transactionsClicked ? <Transactions /> : null}
            <h4 className="profileOption">Vurderinger</h4>
          </div>
          <div>
            <h4 className="profileOption">Endre profil</h4>
            <h4 className="grayedOut">Slett konto</h4>
          </div>
          <div>
            <h4 className="profileOption">Slett bruker</h4>
          </div>
        </div>
      </div>
    );
  };

  userPage = () => {
    return (
      <div>
        <div>
          <img className="profile--image" src={profile} alt="Placeholder" />
        </div>
        <div id="details">
          <h2>{this.state.usr.firstName + " " + this.state.usr.lastName}</h2>
          <h2>{this.state.usr.phoneNumber}</h2>
        </div>

        <div className="profile container grid-2">
          <div>
            <h4
              onClick={() =>
                this.setState({
                  transactionsClicked: !this.state.transactionsClicked
                })
              }
              className="profileOption"
            >
              Mine handler
            </h4>
            {this.state.transactionsClicked ? <Transactions /> : null}
            <h4 className="profileOption">Vurderinger</h4>
          </div>
          <div>
            <h4 className="profileOption">Endre profil</h4>
            <h4 className="profileOption" onClick={this.handleUserDelete}>
              Slett konto
            </h4>
          </div>
        </div>
      </div>
    );
  };

  render() {
    let redirect = false;
    let visiblePage = null;
    //if ((this.state.usr !== null && this.state.usr.isAdmin === 1) ? (this.state.usr !== null))
    if (this.state.usr !== null && this.state.usr.isAdmin === 1) {
      console.log("hihi");
      visiblePage = this.adminPage();
    } else if (this.state.usr !== null) {
      visiblePage = this.userPage();
    } else {
      visiblePage = <div>Redirecting...</div>;
      redirect = true;
    }

    if (redirect) {
      return <Redirect push to="/" />;
    }
    return visiblePage;
  }
}

ProfilePage.propTypes = {
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  phoneNumber: PropTypes.string,
  email: PropTypes.string,
  zipCode: PropTypes.string,
  streetName: PropTypes.string,
  isAdmin: PropTypes.string
};

export default ProfilePage;
