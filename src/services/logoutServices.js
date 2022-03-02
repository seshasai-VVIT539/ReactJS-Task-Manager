import urls from "../utils/urls";

export function logout(token) {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);
    myHeaders.append("Content-Type", "application/json");


    var requestOptions = {
        mode: 'cors',
        method: 'POST',
        headers: myHeaders,
        redirect: 'follow'
    };

    return fetch(urls.logout, requestOptions)
        .then(response => response.json())
        .catch(error => console.log('error', error));
}

export function logoutAllDevices(token) {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);
    myHeaders.append("Content-Type", "application/json");


    var requestOptions = {
        mode: 'cors',
        method: 'POST',
        headers: myHeaders,
        redirect: 'follow'
    };

    return fetch(urls.logoutAllDevices, requestOptions)
        .then(response => 1)
        .catch(error => console.log('error', error));
}