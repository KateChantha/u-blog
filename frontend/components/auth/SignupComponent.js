import { useState, Fragment } from 'react';
import { signup } from '../../actions/auth';

const SignupComponent = () => {
  const [values, setValues] = useState({
    name: 'guest',
    email: 'guest@gmail.com',
    password: 'gggggg',
    error: '',
    loading: false,
    message: '',
    showForm: true
  })

  const { name, email, password, error, loading, message, showForm } = values;
  /**
   * step 1. setValues from user form input
   * step 2. send user data to backend server
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.table({ name, email, password, error, loading, message, showForm });
    setValues({ ...values, loading: true, error: false });
    // read variable name, email, password and store in user
    const user = { name, email, password };

    signup(user).then(data => {
      if (data.error) {
          setValues({ ...values, error: data.error, loading: false });
      } else {
        setValues({
            ...values,
            name: '',
            email: '',
            password: '',
            error: '',
            loading: false,
            message: data.message,
            // disable the form after successfully signup
            showForm: false
        });
      }
    });
  }
  
  const handleChange = type => (e) => {
    setValues({ ...values, error: false, [type]: e.target.value });
  };
  
  const signupForm = () => {
    return (
      <form onSubmit={ handleSubmit }>
        <div className="form-group">
          <input 
            value={name}
            onChange={ handleChange('name') }
            type="text" 
            className="form-control" 
            placeholder="Type your name"
          />
        </div>
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
          <button className="btn btn-primary">Signup</button>
        </div>
      </form>
    )
  }

  return (
    <Fragment>
      { signupForm() }
    </Fragment>
    
  )
}

export default SignupComponent;