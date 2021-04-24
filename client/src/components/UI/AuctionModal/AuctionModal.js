import React, { Component } from "react";
import "./AuctionModal.css";
import Button from "../Button/Button";
import jwtDecode from "jwt-decode";
import FileBase64 from "react-file-base64";
class AuctionModal extends Component {
  //does not need any info
  state = {
    productID: "",
    title: "",
    desc: "",
    image: null,
    startingBid: "",
    highestBid: "",
    endDate: 0
  };

  handleNameChange = e => {
    this.setState({ title: e.target.value });
  };

  handleDescChange = e => {
    this.setState({ desc: e.target.value });
  };

  getFiles(files) {
    const base64img = files.base64.split(",")[1];
    this.setState({ image: base64img });
  }

  handleBidChange = e => {
    this.setState({ startingBid: e.target.value });
  };

  handleEndDateChange = e => {
    let timeInMilli = new Date().getTime();
    this.setState({ endDate: timeInMilli + 1000 * 3600 * e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const productID = this.state.productID;
    const title = this.state.title;
    const desc = this.state.desc;
    const image = this.state.image;
    const bid = this.state.startingBid;
    const sellerID = jwtDecode(localStorage.getItem("token")).userID;
    const endDate = this.state.endDate;

    let auc = {
      productID: productID,
      title: title,
      desc: desc,
      image: image,
      bid: bid,
      sellerID: sellerID,
      endDate: endDate
    };
    this.props.submit(auc);
  };
  render() {
    return (
      <div className="AuctionContainer">
        <h4>Skriv inn info om produktet</h4>
        <form className="inputFields">
          <input
            className="inputElementName"
            type="text"
            title="navn"
            placeholder="Navn"
            onChange={this.handleNameChange}
          />
          <input
            className="inputElementDesc"
            type="text"
            title="beskrivelse"
            placeholder="Beskrivelse"
            onChange={this.handleDescChange}
          />
          <p>Last opp bilde her: </p>
          <span className="inputElementImage">
            <FileBase64 multiple={false} onDone={this.getFiles.bind(this)} />
          </span>
          <input
            className="inputElementBid"
            type="number"
            title="minstebud"
            placeholder="Startbud"
            min="1"
            onChange={this.handleBidChange}
          />
          <input
            className="inputElementDesc"
            type="number"
            title="tid"
            placeholder="Hvor mange timer skal auksjonen foregå?"
            onChange={this.handleEndDateChange}
          />
          <Button clicked={this.handleSubmit}>Submit</Button>
        </form>
      </div>
    );
  }
}
export default AuctionModal;
