import React from 'react';

import './Toolbar.css';
import './Toolbar';
import BudBuaLogo from '../../../assets/budbualogo.jpg';
import NavigationItems from '../NavigationItems/NavigationItems';

const toolbar = ( props ) => (
    <header className={"Toolbar"}>
        <img src={BudBuaLogo} style={{height: '90x', width: '90px', paddingLeft: '20px'}} alt="BudBua AS"/>
        <h1 style={{fontSize: '40px'}}>BudBua <span style={{color: '#e8491d'}}>AS</span></h1>
        <nav>
            <NavigationItems />
        </nav>
    </header>
);

export default toolbar;