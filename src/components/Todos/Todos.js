import React from "react";
import { Link } from "react-router-dom";
import { getAllTasks } from "../../services/taskService";
import { isAlreadyLoggedIn } from "../../services/userService";
import { TokenContext } from "../../utils/contexts";
import { TaskForm } from "../TaskForm/TaskForm";
import Todo from "../Todo/Todo";
import ViewTask from "../ViewTask/ViewTask";
import './Todos.scss';

class Todos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: []
        }
        this.isLoggedIn = this.isLoggedIn.bind(this);
    }

    isLoggedIn() {
        let token = this.context;
        return isAlreadyLoggedIn(token)
            .then((result) => {
                return result;
            })
    }

    componentDidMount(prevProps, prevState) {
        let token = this.context;
        this.isLoggedIn()
            .then((loggedIn) => {
                if (loggedIn) {
                    getAllTasks(token)
                        .then((result) => {
                            this.setState({ todos: result });
                        });
                } else {
                    this.props.logout();
                }
            })
    }

    render() {
        let path = document.location.pathname;
        return (

            <div className="todos-container">
                <div className="todos">
                    <Link to="/tasks/form">
                        <button>+New Task</button>
                    </Link>
                    {this.state.todos.length > 0 && this.state.todos.map(todo => {
                        return (
                            <Link to={"/tasks/" + todo._id} className="task-link" key={todo._id}>
                                <Todo key={todo._id} todo={todo} />
                            </Link>
                        )
                    })}
                </div>
                {!path.startsWith("/home") && !path.endsWith("form") && <ViewTask />}
                {path.endsWith("form") && <TaskForm />}
            </div>
        )
    }
}


Todos.contextType = TokenContext;

export default Todos;