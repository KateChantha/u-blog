import fetch from 'isomorphic-fetch';
import cookie from 'js-cookie';
import { API } from '../config';

export const signup = user => {
  return fetch(`${API}/signup`, {
      method: 'POST',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
  })
      .then(response => response.json())
      .catch(err => console.log(err));
};

export const signin = user => {
    return fetch(`${API}/signin`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then(response => response.json())
        .catch(err => console.log(err));
  };

export const signout = next => {
    removeCookie('token');
    removeLocalStorage('user');
    next();

    // then make a request to server
    return fetch(`${API}/signout`, {
        method: 'GET'
    })
        .then(response => {
            console.log('signout success');
        })
        .catch(err => console.log(err));
};

// set cookie 
//- set name ass in as key 
//- pass the tocken to cookie and save
export const setCookie = (key, value) => {
    // check to make sure that we're runing in 
    // client side not server side
    if (process.browser) {
        cookie.set(key, value, {
            expires: 1 // 1 day
        });
    }
};

export const removeCookie = key => {
    if (process.browser) {
        cookie.remove(key, {
            expires: 1
        });
    }
};

// get cookie - to validate/ authenthicate user
export const getCookie = key => {
    if (process.browser) {
        return cookie.get(key);
    }
};

// localstorage - to allow us get info from local storage
export const setLocalStorage = (key, value) => {
    if (process.browser) {
        localStorage.setItem(key, JSON.stringify(value));
    }
};

export const removeLocalStorage = key => {
    if (process.browser) {
        localStorage.removeItem(key);
    }
};

// autheticate user by pass data to cookie and localstorage
export const authenticate = (data, next) => {
    // pass response data that we get from server after successful signin
    setCookie('token', data.token);
    setLocalStorage('user', data.user);
    // in SigninComponent, next() is to redirect user 
    next(); 
};

export const isAuth = () => {
    if (process.browser) {
        const cookieChecked = getCookie('token');
        if (cookieChecked) {
            if (localStorage.getItem('user')) {
                return JSON.parse(localStorage.getItem('user'));
            } else {
                return false;
            }
        }
    }
};