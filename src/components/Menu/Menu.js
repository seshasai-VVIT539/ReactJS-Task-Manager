import React from "react";
import { Link } from "react-router-dom";
import './Menu.scss';

class Menu extends React.Component {

    render() {
        return (
            <div className="menu">
                <button></button>
                <Link to="/profile">
                    <button>Profile</button>
                </Link>
                <button onClick={() => this.props.logout(2)}>Logout from all devices</button>
                <button onClick={() => this.props.logout(1)}>Logout from this device</button>
            </div>
        );
    }
}

export default Menu;