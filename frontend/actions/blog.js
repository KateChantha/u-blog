import fetch from 'isomorphic-fetch';
import { API } from '../config';
// import queryString from 'query-string';

/**
 * @param {*} blog 
 * @param {*} token - admin user
 */
export const createBlog = (blog, token) => {
    return fetch(`${API}/blog`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
            // not-> 'Content-Type': 'application/json'
            // we send formdata format
        },
        // no need Json.stringyfy because it will be a form data
        body: blog
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

