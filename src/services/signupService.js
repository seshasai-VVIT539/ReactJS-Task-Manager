import urls from "../utils/urls";

export default function signUp(loginUser) {
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

    return fetch(urls.signUp, requestOptions)
        .then(response => {
            if (response.status === 400) {
                console.log(response);
                return { 'error': 'Something went wrong' }
            }
            return response.json();
        })
        .catch(error => {
            console.log('error', error)
        });
}