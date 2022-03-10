import urls from "../utils/urls";

export default function loginByGoogleOauth(googleAccessToken, email) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        token: googleAccessToken,
        email: email
    });

    var requestOptions = {
        mode: 'cors',
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    return fetch(urls.oauth.google, requestOptions)
        .then(response => {
            return response.json()
        })
        .catch(error => {
            console.log('error', error)
        });
}