import React, {Component} from 'react';

class SearchBar extends Component {
  render(){
    return (
      <div className="searchBarContainer">
        <div className="searchBarBar" style={{flex: 3}}>
        <input 
          style={{width: '300px', height: '40px', fontSize: '16px'}}
          type="text"
          className="searchBarField"
          placeHolder="Søk etter en auksjon her..."
          onChange={this.props.changed}
          maxLength={50}
        />
          <span className="fa fa-search" />
        </div>
      </div>
    );
  }
}

export default SearchBar;