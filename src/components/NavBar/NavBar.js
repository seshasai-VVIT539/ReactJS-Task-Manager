import React from "react";
import { Link } from "react-router-dom";
import Menu from "../Menu/Menu";
import './NavBar.scss';

class NavBar extends React.Component {
    render() {
        return (
            <div className="navbar">
                <Link to='/'>
                    <button id="home">Home</button>
                </Link>
                <Menu logout={this.props.logout} />
            </div>
        );
    }
}

export default NavBar;