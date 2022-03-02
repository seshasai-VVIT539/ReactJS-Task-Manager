import urls from "../utils/urls";

export function createTask(token, task) {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify(task);

    var requestOptions = {
        mode: 'cors',
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    return fetch(urls.taskUrls.createTask, requestOptions)
        .then(response => response.json())
        .catch(error => console.log('error', error));
}

export function getAllTasks(token) {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
        mode: 'cors',
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    return fetch(urls.taskUrls.getAllTasks, requestOptions)
        .then(response => {
            return response.json();
        })
        .catch(error => console.log({ 'error': error }));
}

export function getTaskById(token, id) {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
        mode: 'cors',
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    return fetch(urls.taskUrls.getTaskById + id, requestOptions)
        .then(response => {
            if (response.status === 404) {
                return ({ error: "not found" })
            }
            return response.json();
        })
        .catch(error => {
            return error;
        });
}

export function updateTask(token, id, task) {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify(task);

    var requestOptions = {
        method: 'PATCH',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    return fetch(urls.taskUrls.updateTaskById + id, requestOptions)
        .then(response => {
            if (response.status === 404 || response.status == 400) {
                return { error: "something went wrong" };
            }
            return response.json()
        })
        .catch(error => {
            return error;
        });
}

export function deleteTaskById(token, id) {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
        method: 'DELETE',
        headers: myHeaders,
        redirect: 'follow'
    };

    return fetch(urls.taskUrls.deleteTaskById + id, requestOptions)
        .then(response => {
            if(response.status==200){
                return response.json();
            }else{
                return {error:'Something went wrong'};
            }
        })
        .catch(error => error);
}