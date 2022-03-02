import urls, { baseUrl } from "../utils/urls";

export function readProfile(token) {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    return fetch(urls.userUrls.readProfile, requestOptions)
        .then(response => {
            if (response.status !== 200) {
                return { error: 'Something went wrong' };
            }
            return response.json();
        })
        .catch(error => {
            return { error: error };
        });
}

export function updateProfile(token, profile) {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify(profile);

    var requestOptions = {
        method: 'PATCH',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    return fetch(urls.userUrls.updateProfile, requestOptions)
        .then(response => {
            if (response.status !== 200) {
                return { error: 'something went wrong' };
            }
            return response.json()
        })
        .catch(error => {
            return { error: error }
        });
}

export function readProfilePic(token, id) {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    return fetch(baseUrl + "users/" + id + "/avatar", requestOptions)
        .then(response => {
            if (response.status !== 200) {
                return { error: 'something went wrong' };
            }
            return response.json();
        })
        .catch(error => {
            return { error: error };
        });
}