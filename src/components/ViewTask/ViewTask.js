import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteTaskById, getTaskById } from "../../services/taskService";
import { useTokenContext } from "../../utils/contexts";
import "./ViewTask.scss";

export default function ViewTask(props) {
    let { id } = useParams();
    const [task, setTask] = useState({
        id: null,
        description: null,
        status: null
    });
    const [errorOccured, setErrorOccured] = useState(undefined);
    const token = useTokenContext();
    let navigate=useNavigate();
    
    useEffect(() => {
        getTaskById(token, id)
            .then((result) => {
                if (result.error) {
                    setTask({
                        id: null,
                        description: null,
                        status: null
                    });
                    setErrorOccured(result.error);
                } else {
                    setTask(result);
                    setErrorOccured(undefined);
                }
            })
            .catch((error) => {
            })
    }, [id, token]);

    function getDateFromString(str) {
        var timestamp = Date.parse(str);
        var dateObject = new Date(timestamp);
        return dateObject.getDay() +
            "-" + dateObject.getMonth() +
            "-" + dateObject.getFullYear() + "  " +
            dateObject.getHours() + ":" + dateObject.getMinutes();
    }

    const deleteTask = () => {
        deleteTaskById(token, id)
            .then((response) => {
                if (response.error) {
                    setErrorOccured(response.error);
                } else {
                    navigate('/home');
                    window.location.reload();
                }
            })
    };

    if (!id) {
        return null;
    } else if (errorOccured !== undefined) {
        return (
            <div className="view-task">
                <div className="error">Unable to complete the request</div>
                <div className="error">{errorOccured}</div>
            </div>
        );
    } else {
        return (
            <div className="view-task">
                <div className="table">
                    <div className="row">
                        <div className="cell"><b>Description</b></div>
                        <div className="cell">&nbsp;:&nbsp;</div>
                        <div className="cell">{task.description}</div>
                    </div>
                    <div className="row">
                        <div className="cell"><b>Completed</b></div>
                        <div className="cell">&nbsp;:&nbsp;</div>
                        <div className="cell">{task.completed ? "Yes" : "No"}</div>
                    </div>
                    <div className="row">
                        <div className="cell"><b>Created On</b></div>
                        <div className="cell">&nbsp;:&nbsp;</div>
                        <div className="cell">{getDateFromString(task.createdAt)}</div>
                    </div>
                    <div className="row">
                        <div className="cell"><b>Last update</b></div>
                        <div className="cell">&nbsp;:&nbsp;</div>
                        <div className="cell">{getDateFromString(task.updatedAt)}</div>
                    </div>
                </div>
                <div className="actions">
                    <Link to={"/tasks/" + id + "/form"}>
                        <button><span>&#9998;</span>Edit</button>
                    </Link>
                    <button onClick={deleteTask}>Delete</button>
                </div>
            </div>
        );
    }
}
