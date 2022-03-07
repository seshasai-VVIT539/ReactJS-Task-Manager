import React from "react";
import { slide as ReactMenu } from "react-burger-menu";
import { Link } from "react-router-dom";
import './Menu.scss';

class Menu extends React.Component {

    render() {
        return (
            <div className="menu">
                <ReactMenu pageWrapId="page-wrap" outerContainerId="outer-container">
                    <a className="menu-item" href="/">
                        Home
                    </a>
                    <a className="menu-item" href="/profile">
                        Profile
                    </a>
                    <a
                        onClick={() => this.props.logout(2)}
                        className="menu-item"
                    >
                        Logout from all devices
                    </a>
                    <a
                        onClick={() => this.props.logout(1)}
                        className="menu-item"
                    >
                        Logout from this device
                    </a>
                </ReactMenu>
            </div>
        );
    }
}

export default Menu;