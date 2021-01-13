import Router from 'next/router';
import { useState, useEffect, Fragment } from 'react';
import { signin, authenticate, isAuth } from '../../actions/auth';

const SigninComponent = () => {
  const [values, setValues] = useState({
    email: 'guest@gmail.com',
    password: 'gggggg',
    error: '',
    loading: false,
    message: '',
    showForm: true
  })

  const { email, password, error, loading, message, showForm } = values;

  // if user are status still signin, redirect to home page
  useEffect(() => {
    isAuth() && Router.push(`/`);
  },[]);

  /**
   * step 1. setValues from user form input
   * step 2. if successful signin, redirect user to home page(for now)
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.table({ email, password, error, loading, message, showForm });
    setValues({ ...values, loading: true, error: false });
    // read variable name, email, password and store in user
    const user = { email, password };

    signin(user).then(data => {
      if (data.error) {
          setValues({ ...values, error: data.error, loading: false });
      } else {
        // save user token to cookie
        // save user info to local storage
        // authenticate user
        authenticate(data, () => {
          if (isAuth() && isAuth().role === 1) {
            Router.push(`/admin`);
          } else {
              Router.push(`/user`);
          }
        })
      }
    });
  }
  
  const handleChange = type => (e) => {
    setValues({ 
      ...values, 
      // hide an error when user start to fill out form again
      error: false, 
      // type of input
      [type]: e.target.value 
    });
  };

  const showLoading = () => (loading? <div className="alert alert-info">Loading...</div> : "");
  const showError = () => (error? <div className="alert alert-danger">.{error}</div> : "");
  const showMessage = () => (message? <div className="alert alert-info">{message}</div> : "");
  
  const signinForm = () => {
    return (
      <form onSubmit={ handleSubmit }>
        <div className="form-group">
          <input 
            value={email}
            onChange={ handleChange('email') }
            type="email" 
            className="form-control" 
            placeholder="Type your email"
          />
        </div>
        <div className="form-group">
          <input 
            value={password}
            onChange={ handleChange('password') }
            type="password" 
            className="form-control" 
            placeholder="Type your password"
          />
        </div>
        <div>
          <button className="btn btn-primary">Sign In</button>
        </div>
      </form>
    )
  }

  return (
    <Fragment>
      { showError() }
      { showLoading() }
      { showMessage() }
      { showForm && signinForm() }
    </Fragment>
    
  )
}

export default SigninComponent;