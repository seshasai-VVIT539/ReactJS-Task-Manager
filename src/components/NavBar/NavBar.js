import React from "react";
import Menu from "../Menu/Menu";
import './NavBar.scss';

class NavBar extends React.Component {
    render() {
        return (
            <div className="navbar">
                <Menu logout={this.props.logout} />
            </div>
        );
    }
}

export default NavBar;