'use strict';

/**
 * Axios Helper class
 */
function AxiosHelper() {}
module.exports = AxiosHelper;

/**
 * Send ajax request
 */
AxiosHelper.send = function send(method, url, data, options) {
    const FormData = require('form-data');

    let postData;

    /* Setup options */
    options = _.merge({
        headers: [],
        useCookie: true,
        sendAsFormData: false
    }, options);

    /* Check form-data flag */
    if (true == options.sendAsFormData) {
        /* Setup form-data */
        const formData = new FormData();

        /* Set new data */
        Object.keys(data)
            .forEach(key => {
                let itemData = data[key];

                if (itemData != null) {
                    if (Array.isArray(itemData)) {
                        itemData = JSON.stringify(itemData);
                    }

                    formData.append(key, itemData);
                }
            });
        postData = formData;

        /* Setup header */
        options.headers['content-type'] = 'multipart/form-data';
    } else {
        postData = data;

        if (options.jsonRequest || true) {
            options.headers['content-type'] = 'application/json';
        }
    }

    let config = {
        method,
        withCredentials: options.useCookie,
        baseURL: options.baseURL,
        headers: options.headers
    };

    if (postData.getHeaders) {
        config['headers'] = postData.getHeaders();
    }

    /* Add bearer token */
    if (null != options.token) {
        config.headers['authorization'] = `Bearer ${options.token}`;
    }

    /* Create axios instance */
    let instance = axios.create(config);

    return instance[method](url, postData);
};

/* Add standard restful request types */
const types = [
    'get', 'head', 'post', 'patch', 'put', 'options', 'link'
];
types.forEach(type => {
    AxiosHelper[type] = function send(method, url, data, options) {
        return AxiosHelper.send(type, method, url, data, options);
    };
});
