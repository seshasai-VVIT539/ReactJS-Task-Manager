import React from "react"
import { readProfile, updateProfile } from "../../services/userService";
import { TokenContext } from "../../utils/contexts";
import urls from "../../utils/urls";
import './Profile.scss';

export default class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                name: "",
                email: "",
                age: 0
            },
            avatar: undefined,
            error: undefined,
            editing: false
        };
        this.cancelEdit = this.cancelEdit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.startEditing = this.startEditing.bind(this);
        this.updateProfile = this.updateProfile.bind(this);

    }

    componentDidMount() {
        let token = this.context;
        readProfile(token)
            .then((result) => {
                this.setState({
                    user: { ...result },
                    error: undefined,
                });
            })
            .catch((error) => {
                this.setState({ user: undefined, error: error })
            })
    }

    startEditing() {
        this.setState({ editing: true });
    }

    cancelEdit() {
        this.setState({ editing: false });
    }

    handleChange(event) {
        let temp = { ...this.state.user };
        temp[event.target.id] = event.target.value;
        this.setState({ user: { ...temp } });
    }

    updateProfile() {
        let token = this.context;
        updateProfile(token, {
            age: this.state.user.age,
            name: this.state.user.name
        })
            .then((result) => {
                if (result.error) {
                    this.setState({
                        error: result.error
                    });
                } else {
                    this.setState({
                        user: { ...result },
                        editing: false,
                        error: undefined
                    });
                }
            })
            .catch((error) => {
                this.setState({ error: error });
            })
    }

    render() {
        if (this.state.error !== undefined) {
            return (
                <div className="profile">
                    <div className="error">
                        {this.state.error}
                    </div>
                </div>
            );
        } else {
            return (
                <div className="profile">
                    <img
                        src={urls.baseUrl + "users/" + this.state.user._id + "/avatar" }
                        alt="profile pic not found"
                    />
                    <div className="table">
                        <div className="row">
                            <div className="cell">
                                Name
                            </div>
                            <div className="cell">&nbsp;&nbsp;:&nbsp;&nbsp;</div>
                            {
                                this.state.editing ?
                                    <div className="cell">
                                        <input
                                            type="text"
                                            placeholder="Enter your name"
                                            required={true}
                                            name="name"
                                            id="name"
                                            onChange={this.handleChange}
                                            value={this.state.user.name}
                                        />
                                    </div>
                                    :
                                    <div
                                        className="cell"
                                        onDoubleClick={() => this.startEditing()}
                                    >
                                        {this.state.user.name}
                                    </div>
                            }
                        </div>
                        <div className="row">
                            <div className="cell">
                                Email
                            </div>
                            <div className="cell">&nbsp;&nbsp;:&nbsp;&nbsp;</div>
                            <div className="cell">{this.state.user.email}</div>
                        </div>
                        <div className="row">
                            <div className="cell">
                                Age
                            </div>
                            <div className="cell">&nbsp;&nbsp;:&nbsp;&nbsp;</div>
                            {
                                this.state.editing ?
                                    <div className="cell">
                                        <input
                                            type="number"
                                            min="0"
                                            placeholder="Enter your age"
                                            required={false}
                                            name="age"
                                            id="age"
                                            onChange={this.handleChange}
                                            value={this.state.user.age}
                                        />
                                    </div>
                                    :
                                    <div
                                        className="cell"
                                        onDoubleClick={() => this.startEditing()}
                                    >
                                        {this.state.user.age}
                                    </div>
                            }
                        </div>
                    </div>
                    {
                        this.state.editing &&
                        <div className="actions">
                            <button onClick={() => this.updateProfile()}>Update Profile</button>
                            <button onClick={() => this.cancelEdit()}>Cancel</button>
                        </div>
                    }
                </div>
            );
        }
    }
}

Profile.contextType = TokenContext;