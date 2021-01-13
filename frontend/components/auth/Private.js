import { useEffect, Fragment } from 'react';
import Router from 'next/router';
import { isAuth } from '../../actions/auth';

const Private = ({ children }) => {
  // protect page from accessing directly
  useEffect(() => {
    if(!isAuth()) {
      Router.push('/signin')
    }
  }, [])

  return (
    <Fragment>{ children }</Fragment>
  )
}

export default Private;