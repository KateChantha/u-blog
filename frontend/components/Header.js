import { useState, Fragment } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { APP_NAME } from '../config';
import { signout, isAuth } from '../actions/auth';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';

const Header = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="light" light expand="md">
        <Link href="/">
          <NavLink className="font-weight-bold">{APP_NAME}</NavLink>
        </Link>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>

          {!isAuth() && (
            <Fragment>
              <NavItem>
                <Link href="/signin">
                  <NavLink>Signin</NavLink>
                </Link>
              </NavItem>
              <NavItem>    
                  <Link href="/signup">
                    <NavLink>Signup</NavLink>
                  </Link>
              </NavItem>
            </Fragment>
          )}
           
            {isAuth() && (
               <NavItem>    
                  <NavLink
                    style={{ cursor: "pointer" }}
                    onClick={() => signout(() => Router.replace(`/signin`))}
                  >
                    Signout
                  </NavLink>
            </NavItem>
            )}

          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default Header;