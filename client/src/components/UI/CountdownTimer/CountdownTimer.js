import React from 'react';
import Countdown from 'react-countdown-now';
import './CountdownTimer.css';
 

const countdownTimer = (props) => (
  <div className="countdownTimer">
    <h2><Countdown date={Date.now() + props.auctionTime} /></h2>
  </div>);
 
export default countdownTimer;