import React, {Component}from 'react';
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
  import axios from 'axios';

class Navigation extends Component{
  constructor(props){
    super(props);
    this.state={
      isOpen:false
    }
  }

  toggle = () => {
    this.setState({
      isOpen:!this.state.isOpen
    })
  }
  handleLogout=()=>{
    axios.delete('http://localhost:3003/users/logout',{headers:{'x-auth':localStorage.getItem('x-auth')}})
    .then(res =>{
      localStorage.removeItem('x-auth');
    })
    .catch(err =>{
      console.log(err)
    }) 
  }
  render(){
    return (
      <Container>
        <Navbar color="light" light expand="md">
          <NavbarBrand><Link to="/">Ticket Master</Link></NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <NavItem>
                <NavLink><Link to="/tickets">My Tickets</Link></NavLink>
              </NavItem>
              <NavItem>
                <NavLink><Link to="/ticket">Ticket</Link></NavLink>
              </NavItem>
              <NavItem>
                <NavLink><Link to="/" onClick={this.handleLogout}>Logout</Link></NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
        </Container>
      )
  }
}
export default Navigation;