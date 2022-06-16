import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container
} from 'reactstrap';
import {Link} from 'react-router-dom';

const Home=()=>{
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    return(
        <div>
            <Container>
            <Navbar color="light" light expand="md">
                <NavbarBrand><Link to="/">Ticket Master</Link></NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                <Nav className="mr-auto" navbar>
                    <NavItem>
                    <NavLink><Link to="/login">Login</Link></NavLink>
                    </NavItem>
                    <NavItem>
                    <NavLink><Link to="/signup">SignUp</Link></NavLink>
                    </NavItem>
                </Nav>
                </Collapse>
            </Navbar>
            </Container>
            <Container>
                <h1>Welcome to Ticket Master</h1>
            </Container>
        </div>
    )
}

export default Home;