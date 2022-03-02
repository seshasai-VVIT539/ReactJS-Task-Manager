import React from "react";
import { Link } from "react-router-dom";
import './FirstPage.scss';

class FirstPage extends React.Component {

    render() {
        return (
            <div className=" container fp-container">
                <div className="sub-container">
                    <p>
                        This is a site where you can easily manage your task list/todo list by simply
                        creating an account for free of charge and make use of our services. The UI
                        is simple and designed in such a way that it is easy to use.
                    </p>
                </div>
                <hr />
                <div className="sub-container">
                    <div className="block">
                        <p>
                            Don't have an account?
                        </p>
                        <p>
                            <button>
                                <Link to='/signup' className="router-link">Sign-up here</Link>
                            </button>
                        </p>
                    </div>

                    <div className="block">
                        <p>
                            Have an account?
                        </p>
                        <p>
                            <button>
                                <Link to='/login' className="router-link">Login here</Link>
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}

export default FirstPage;