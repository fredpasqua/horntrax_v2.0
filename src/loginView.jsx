import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { Card, Container, CardGroup, Col, Row, Button } from "react-bootstrap";
import "./login-view.css";
import axios from "axios";
import horntrax from "./Images/HornTrax.png";
import { Link } from "react-router-dom";

export function LoginView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  //Declare hook for each input
  const [usernameErr, setUsernameErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");

  // validate user inputs
  const validate = () => {
    let isReq = true;
    if (!username) {
      setUsernameErr("Username Required");
      isReq = false;
    } else if (username.length < 5) {
      setUsernameErr("Username must be atleast 5 characters long");
      isReq = false;
    }
    if (!password) {
      setPasswordErr("Password is required!");
      isReq = false;
    } else if (password.length < 6) {
      setPasswordErr("Password must contain atleast 6 characters");
      isReq = false;
    }

    return isReq;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isReq = validate();
    if (isReq) {
      /* Send a request to the server for authentication */
      await axios
        .post(`https://horntrax-api.herokuapp.com/users/login/${username}`, {
          password: password,
        })
        .then((response) => {
          const data = response.data;
          props.setUser(data);
          props.forceUpdate();
        })
        .catch((e) => {
          alert(
            "The provided username does not exist or the password was entered incorrectly."
          );
        });
    }
  };

  return (
    <>
      <Container className="login_page">
        <Row>
          <Col lg={12}>
            <CardGroup>
              <Card
                Card
                border="light"
                style={{ width: "25rem", marginTop: "50px" }}
              >
                <Card.Body className="login_container">
                  <Card.Title>
                    Please Login or <Link to="/register">Register</Link>
                  </Card.Title>
                  <Card.Title>
                    <img src={horntrax} alt="logo" />
                  </Card.Title>

                  <Form>
                    <Form.Group controlId="formUsername">
                      <Form.Label className="formUsername">
                        Username:
                      </Form.Label>
                      <Form.Control
                        type="text"
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder=""
                      />
                      {usernameErr && (
                        <p style={{ color: "red" }} className="font-italic">
                          {usernameErr}
                        </p>
                      )}
                    </Form.Group>

                    <Form.Group controlId="formPassword">
                      <Form.Label className="formPassword">
                        Password:
                      </Form.Label>
                      <Form.Control
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder=""
                      />
                      {passwordErr && (
                        <p style={{ color: "red" }} className="font-italic">
                          {passwordErr}
                        </p>
                      )}
                    </Form.Group>
                    <div className="loginButton">
                      <Button
                        className="button"
                        variant="primary"
                        type="submit"
                        onClick={handleSubmit}
                      >
                        Submit
                      </Button>
                    </div>
                  </Form>
                </Card.Body>
              </Card>
            </CardGroup>
          </Col>
        </Row>
      </Container>
    </>
  );
}
