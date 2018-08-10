import React from "react";
import {NavLink} from "react-router-dom";

const Header = () => (
    <div>
        <h1>Expenses</h1>
        <NavLink to="/" activeClassName="is-active" exact={true}>Dashboard</NavLink> 
        <NavLink to="/create" activeClassName="is-active">Create Expenses</NavLink> 
        <NavLink to="/help" activeClassName="is-active">Help</NavLink>  
    </div>
);

export default Header;