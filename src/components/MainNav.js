import React, { useEffect, useRef } from "react";
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import './MainNav.css';
// import { Menu, Dropdown, Button } from 'semantic-ui-react'
// import { Link, NavLink } from 'react-router-dom'

export default function MainNav({onLogout}) {

  const nav = useRef();

  const handleScroll = () => {
    if (window.scrollY > 20) {
      nav.current.classList.remove('navbar-light', 'top', 'py-4')
      nav.current.classList.add('navbar-dark', 'bg-dark', 'scrolled');
    } else {
      nav.current.classList.remove("navbar-dark", 'bg-dark', 'scrolled');
      nav.current.classList.add('navbar-light', 'top', 'py-4');
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
        window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Navbar ref={nav} bg="light" variant="light" expand="md" fixed="top" className="py-4" style={{transition: 'all 0.5s'}}>
        <div className="container">
            <Navbar.Brand href="">FROS</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <LinkContainer to="/" exact>
                        <Nav.Link>Home</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/about">
                        <Nav.Link>About</Nav.Link>
                    </LinkContainer>
                    <NavDropdown title="Shop" id="basic-nav-dropdown">
                        <LinkContainer to="/show">
                            <NavDropdown.Item>All</NavDropdown.Item>
                        </LinkContainer>
                        <LinkContainer to="/mens">
                            <NavDropdown.Item>Mens</NavDropdown.Item>
                        </LinkContainer>
                        <LinkContainer to="/womens">
                            <NavDropdown.Item>Womens</NavDropdown.Item>
                        </LinkContainer>
                    </NavDropdown>
                </Nav>
                <Nav className="ms-auto">
                    <LinkContainer to="/cart">
                        <Nav.Link><i className="shopping cart icon"></i></Nav.Link>
                    </LinkContainer>
                    {localStorage.token && localStorage.token !== "undefined" ?
                        <Nav.Link
                            onClick={()=>{
                                alert('User Logout Successful')
                                onLogout()
                                window.history.pushState({}, '', '/');
                                window.location.reload();
                            }}
                        >
                            Logout
                        </Nav.Link>
                    :
                        <>
                            <LinkContainer to="/login">
                                <Nav.Link>Login</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/signup">
                                <Nav.Link>Signup</Nav.Link>
                            </LinkContainer>
                        </>
                }
                </Nav>
            </Navbar.Collapse>
        </div>
    </Navbar>
  );
}

//! semantic BACKUP
    // <Menu stackable borderless>
    //     <Menu.Item header>RockYalTent</Menu.Item>
    //     <Link 
    //         to={'/'}
    //         exact="true"
    //         className= 'ui item'
    //     >
    //         Home
    //     </Link>
        // <Dropdown item text='Shop'>
        //     <Dropdown.Menu>
        //         <Link
        //             className='ui item'
        //             to='/show'
        //         >
        //             All
        //         </Link>
        //         <Link
        //             className='ui item'
        //             to='/mens'
        //         >
        //             Mens
        //         </Link>
        //         <Link
        //             className='ui item'
        //             to='/womens'
        //         >
        //             Womens
        //         </Link>
        //     </Dropdown.Menu>
        // </Dropdown>
    //     <Link
    //         to='/about'
    //         className='ui item'
    //     >
    //         About
    //     </Link>
        // {localStorage.token && localStorage.token !== "undefined" ?
        //     <Menu.Menu
        //         secondary="true"
        //         position='right'
        //     >
        //         <Link
        //             to='/cart'
        //             className='ui item'
        //         >
        //             <i className="shopping cart icon"></i>
        //         </Link>
        //         <Button
        //             className='ui item'
        //             onClick={()=>{
        //                 alert('User Logout Successful')
        //                 onLogout()
        //             }}
        //         >
        //             Logout
        //         </Button>
        //     </Menu.Menu> :
        //     <Menu.Menu
        //         secondary
        //         position='right'
        //     >
        //         <Link
        //             to='/cart'
        //             className='ui item'
        //         >
        //             <i className="shopping cart icon"></i>
        //         </Link>
        //         <Link 
        //             to='/login'
        //             className='ui item'
        //         >
        //             Login
        //         </Link>
        //         <Link 
        //             to='/signup'
        //             className='ui item'
        //         >
        //             Signup
        //         </Link>
        //     </Menu.Menu>
        // }
            
    // </Menu>
