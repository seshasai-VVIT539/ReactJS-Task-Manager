import React from "react";
import './Todo.scss';

class Todo extends React.Component {
    render() {
        return (
            <div className="todo">
                <div className="table">
                    <div className="row">
                        <div className="cell"><b>Description</b></div>
                        <div className="cell">&nbsp;:&nbsp;</div>
                        <div className="cell">{this.props.todo.description}</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Todo;