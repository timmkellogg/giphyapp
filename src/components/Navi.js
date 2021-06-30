import {
  Collapse,
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';
import { Link } from "react-router-dom";

const Navi = () => (
      <Navbar color="light" light expand="md">
        <NavbarBrand tag={Link} to='/'>Giphy App</NavbarBrand>
        <Collapse isOpen={true} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink tag={Link} to='/search'>Search</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to='/saved'>Saved</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
);


export default Navi;