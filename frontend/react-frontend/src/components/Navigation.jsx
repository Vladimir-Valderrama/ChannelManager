import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Link} from "react-router-dom";

export function NavBar() {
    return (
        <div>
            <Navbar bg="dark" variant={"dark"} expand="lg">
                <Container>
                <Navbar.Brand as={Link} to={'/'}>Chelenko</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/Reservas">Reservas</Nav.Link>
                            <Nav.Link as={Link} to="/Stock">Stock</Nav.Link>
                            <Nav.Link as={Link} to="/Descargas">Descargas</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>    
        </div>
    );
}



