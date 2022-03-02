import urls from "../utils/urls";

export default function login(loginUser) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify(loginUser);

    var requestOptions = {
        mode: 'cors',
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    return fetch(urls.login, requestOptions)
        .then(response => {
            return response.json()
        })
        .catch(error => {
            console.log('error', error)
        });
}