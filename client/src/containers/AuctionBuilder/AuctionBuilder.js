import React, { Component } from "react";
import "./AuctionBuilder.css";
import Auction from "../AuctionBuilder/Auction/Auction";
import AuctionModal from "../../components/UI/AuctionModal/AuctionModal";
import axios from "axios";
import Button from "../../components/UI/Button/Button";
import SearchBar from "../../components/UI/SearchBar/SearchBar";
import jwtDecode from "jwt-decode";

class AuctionBuilder extends Component {
  state = {
    auctions: [],
    isOpen: false,
    searchField: "",
    fetchedData: false
  };

  componentDidMount = () => {
    this.callBackendAPI()
      .then(res => {
        this.setState({ auctions: res, fetchedData: true });
      })
      .catch(err => console.log(err));
  };

  callBackendAPI = async () => {
    const response = await axios.get("/api/products/all");
    const body = response.data;

    if (response.status !== 200) {
      throw Error(response.status);
    }
    return body;
  };
  //make new bid
  handleAuctionBid = (productID, formBid) => {
    this.setState({ fetchedData: false });
    //Make header for HTTP-req with token
    let config = {
      headers: { "x-auth-token": localStorage.getItem("token") }
    };
    const updatedAuctions = this.state.auctions.map(async auction => {
      if (
        auction.productID === productID &&
        auction.endDate > new Date().getTime() &&
        formBid > auction.highestBid
      ) {
        await axios
          .put(
            "/api/products/newBid",
            {
              productID: auction.productID,
              highestBid: formBid,
              userID: jwtDecode(localStorage.getItem("token")).userID
            },
            config
          ) //Makes HTTP-request and include header in request
          .then(res => console.log(res))
          .catch(err => console.error(err));
      } else {
        return auction;
      }
    });
    this.setState({
      auctions: updatedAuctions
    });
  };

  //handle click on auction-button
  handleCreateAuctionClick = auction => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  //handles changes in auction bid
  handleSearchChange = e => {
    this.setState({ searchField: e.target.value });
  };

  //creates a new auction object
  createAuction = auction => {
    const auc = auction;
    let config = {
      headers: { "x-auth-token": localStorage.getItem("token") }
    };
    this.setState({ auctions: this.state.auctions.concat(auc), isOpen: false });
    axios
      .post(
        "/api/products/newProduct",
        {
          productID: auc.productID,
          title: auc.title,
          description: auc.desc,
          image: auc.image,
          startingBid: auc.bid,
          sellerID: auc.sellerID,
          endDate: auc.endDate
        },
        config
      )
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  fetchAuctions = () => {
    this.callBackendAPI()
      .then(res => this.setState({ auctions: res, fetchedData: true }))
      .catch(err => console.log(err));
    let searchedAuctions = [];
    if (this.state.fetchedData) {
      for (let i = 0; i < this.state.auctions.length; i++) {
        if (
          this.state.auctions[i].title
            .toLowerCase()
            .indexOf(this.state.searchField.toLowerCase()) !== -1 ||
          (this.state.searchField === "" && this.auctions[i].done)
        ) {
          searchedAuctions.push(this.state.auctions[i]);
        }
      }
    }
    return searchedAuctions;
  };

  render() {
    //makes adjacent Auction-objects from state

    if (this.state.fetchedData) {
      const searchedAuctions = this.fetchAuctions();
      const auctions = searchedAuctions.map((auc, i) => (
        <Auction
          title={auc.title}
          productID={auc.productID}
          key={i}
          description={auc.description}
          image={auc.image}
          startingBid={auc.startingBid}
          highestBid={auc.highestBid}
          highestBidder={auc.highestBidder}
          sellerID={auc.sellerID}
          endDate={auc.endDate}
          onBid={this.handleAuctionBid}
        />
      ));

      let modal = null;
      //if the button is clicked, show the form
      if (this.state.isOpen) {
        modal = <AuctionModal submit={this.createAuction} />;
      }
      return (
        <div className="auctionBoxes">
          <h1>Auksjoner</h1>
          <div>
            <SearchBar changed={this.handleSearchChange} />
            {localStorage.getItem("token") === null ? null : (
              <React.Fragment>
                <Button clicked={this.handleCreateAuctionClick}>
                  Ny annonse
                </Button>
                {modal}
              </React.Fragment>
            )}
          </div>
          <br />
          {auctions}
        </div>
      );
    }
    return <p>Loading</p>;
  }
}

export default AuctionBuilder;
