import {Navbar, Container, Nav, NavDropdown} from 'react-bootstrap';
import Vite from '/vite.svg';

const NavigationBar = () => {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">

      <Container>
        <Navbar.Brand href="#home"> <img src={Vite} alt="Vite logo" width="25" height="25" /> <strong>POS</strong> </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
                <Nav.Link href="/Home/home">Home</Nav.Link>
                <Nav.Link href="/Categories/categories">Categories</Nav.Link>
                <Nav.Link href="/Products/products">Products</Nav.Link>
                <Nav.Link href="/Dashboard/dashboard">Dashboard</Nav.Link>
                <Nav.Link href="/Transactions/transactions">Transactions</Nav.Link>
            </Nav>
        </Navbar.Collapse>

      </Container>

    </Navbar>
  );
}

export default NavigationBar;