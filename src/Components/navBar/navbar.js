import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./Navbar.css";
import { Link } from "react-router-dom";
function Navigate(props) {
  const user = props.user.username;
  return (
    <div className="navstyle">
      <Container>
        <Navbar
          collapseOnSelect
          bg="light"
          variant="light"
          expand="md"
          fixed="top"
        >
          <Container className="navbar-container">
            <Navbar.Brand>
              <Link class="brand" to="/">
                HornTrax
              </Link>
            </Navbar.Brand>
            <p className="welcomeMessage">Welcome back, {user}!</p>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto links">
                {props.user ? (
                  <Link
                    className="link"
                    to="/horntrax_v2.0"
                    onClick={props.onLoggedOut}
                  >
                    Log Out
                  </Link>
                ) : (
                  <Link
                    className="link"
                    to="/login"
                    onClick={props.onLoggedOut}
                  >
                    Log In
                  </Link>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </Container>
    </div>
  );
}

export default Navigate;
