const request = async (method, url, data, token) => {
    const options = {
        headers : {
            'content-type': 'application/json',
            'X-Parse-Application-Id': import.meta.env.VITE_APP_ID,
            'X-Parse-REST-API-Key': import.meta.env.VITE_REST_APP_KEY
        }

    };
    if (data) {
        options.body = JSON.stringify(data);
    }
    
    if (token) {
        options.headers = {
            ...options.headers,
            'X-Parse-Session-Token': token
        };
    }
    const response = await fetch(url, {
        ...options,
        method,
    });

    if (response.status === 204) {
        return {};
    }

    const result = await response.json();

    if (!response.ok) {
        throw result;
    } 

    return result;
};

export const get = request.bind(null, 'GET');
export const post = request.bind(null, 'POST');
export const put = request.bind(null, 'PUT');
export const remove = request.bind(null, 'DELETE');
export const patch = request.bind(null, 'PATCH');