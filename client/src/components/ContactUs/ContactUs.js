import React from 'react';
import './ContactUs.css';
import Button from '../UI/Button/Button';

const contactUs = (props) => (
    <div className="registerUser">
      <form className="registerForm">
        <h1 className="registerTitle">Kontakt oss</h1>
        <input
          type="text"
          className="loginInput"
          placeholder="Navn"
        />
        <input
          type="text"
          className="loginInput"
          placeholder="Addresse"
        />
      </form>
      <textarea
        type="text"
        placeholder="Skriv inn en beskjed her..."
        style={{width: '95%', height: '300px'}}
      />
      <Button className="registerButton">
        Send
      </Button>
    </div>
  );

export default contactUs;