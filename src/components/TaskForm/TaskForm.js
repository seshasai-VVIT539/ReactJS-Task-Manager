import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { createTask, getTaskById, updateTask } from "../../services/taskService";
import { useTokenContext } from "../../utils/contexts";
import './TaskForm.scss';

export function TaskForm(props) {
    let { id } = useParams();
    if (id == "form") {
        id = null;
    }
    const [task, setTask] = useState({
        id: null,
        description: null,
        status: null
    });
    const [errorOccured, setErrorOccured] = useState(undefined);
    const token = useTokenContext();
    let navigate = useNavigate();

    useEffect(() => {
        if (id !== null) {
            getTaskById(token, id)
                .then((result) => {
                    if (result.error) {
                        setTask({
                            id: null,
                            description: null,
                            completed: null
                        });
                        setErrorOccured(result.error);
                    } else {
                        setTask(result);
                        setErrorOccured(undefined);
                    }
                })
                .catch((error) => {
                })
        }
    }, [id, token]);

    const handleChange = (e) => {
        let { name, value } = e.target;
        if (name == "completed") {
            value = (value == "true");
        }
        setTask((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const submitForm = (e) => {
        let temp={};
        temp.description=task.description;
        temp.completed=task.completed;
        if (id == null) {
            createTask(token, temp)
                .then((response) => {
                    if (response.error) {
                        setErrorOccured(response.error);
                    } else {
                        navigate('/home');
                        window.location.reload();
                    }
                })
                .catch((error) => {
                    setErrorOccured(error);
                })
        } else {
            updateTask(token, id, temp)
                .then((response) => {
                    if (response.error) {
                        setErrorOccured(response.error);
                    } else {
                        navigate('/home');
                        window.location.reload();
                    }
                })
        }
    }

    function getDateFromString(str) {
        var timestamp = Date.parse(str);
        var dateObject = new Date(timestamp);
        return dateObject.getDay() +
            "-" + dateObject.getMonth() +
            "-" + dateObject.getFullYear() + "  " +
            dateObject.getHours() + ":" + dateObject.getMinutes();
    }
    if (errorOccured) {
        return (
            <div className="task-form">
                <div className="error">
                    Something went wrong
                </div>
            </div>
        );
    }
    return (
        <div className="task-form">
            <div className="table">
                <div className="row">
                    <div className="cell"><b>Description</b></div>
                    <div className="cell">&nbsp;:&nbsp;</div>
                    <div className="cell">
                        <input
                            type="text"
                            name="description"
                            value={task.description == null ? "" : task.description}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="cell"><b>Completed</b></div>
                    <div className="cell">&nbsp;:&nbsp;</div>
                    <div className="cell">
                        <span>Yes</span>
                        <input
                            type="radio"
                            name="completed"
                            value="true"
                            checked={task.completed == true}
                            onChange={handleChange}
                        />
                        &nbsp;&nbsp;&nbsp;
                        <span>No</span>
                        <input
                            type="radio"
                            name="completed"
                            value="false"
                            checked={task.completed == false}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                {
                    id &&
                    <div className="row">
                        <div className="cell"><b>Created On</b></div>
                        <div className="cell">&nbsp;:&nbsp;</div>
                        <div className="cell">{getDateFromString(task.createdAt)}</div>
                    </div>
                }
                {
                    id &&
                    <div className="row">
                        <div className="cell"><b>Last update</b></div>
                        <div className="cell">&nbsp;:&nbsp;</div>
                        <div className="cell">{getDateFromString(task.updatedAt)}</div>
                    </div>
                }
            </div>
            <div className="actions">
                <button onClick={submitForm}>{id === null ? "Save" : "Update"}</button>
                <Link to="/home"><button>Cancel</button></Link>
            </div>
        </div>
    );
}