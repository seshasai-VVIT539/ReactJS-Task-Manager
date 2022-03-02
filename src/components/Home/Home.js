import React from "react";
import NavBar from "../NavBar/NavBar";
import Profile from "../Profile/Profile";
import Todos from "../Todos/Todos";
import './Home.scss';

class Home extends React.Component {
    render() {
        let path = document.location.pathname;
        return (
            <div className="home-container">
                <NavBar logout={this.props.logout}></NavBar>
                {
                    path === "/profile" &&
                    <Profile />
                }
                {
                    (path.startsWith("/home") || path.startsWith("/tasks")) &&
                    <Todos />
                }
            </div>
        );
    }
}

export default Home;