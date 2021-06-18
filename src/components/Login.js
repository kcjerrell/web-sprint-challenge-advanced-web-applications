import React, { useEffect, useState } from "react";
import axios from 'axios';
import styled from 'styled-components';
import { login, saveToken } from "../helpers/axiosWithAuth";
import { useHistory } from "react-router-dom";

const Container = styled.div`
	text-align: center;

	.login-error {
		background: #FF000044;
		padding: .5em;
	}

	form {
		text-align: left;
		display: flex;
		flex-direction: column;
		align-items: center;

		label {
			font-size: 1.1em;
			margin: .25em;
		}

		input {
			display: block;
			font-size: 1.3em;
			margin: .1em;
			padding: .2em;
		}
	}
`;

const emptyFormData = { username: '', password: '' };

const Login = () => {
  const [formData, setFormData] = useState(emptyFormData);
  const history = useHistory();

  //replace with error state
  const [error, setError] = useState("");

  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

  const handleChange = (e) => {
    const newData = { ...formData, [e.target.name]: e.target.value };
    setFormData(newData);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    //login(formData.username, formData.password)
    axios.post("http://localhost:5000/api/login", { username: formData.username, password: formData.password })
      .then((response) => {
        const token = response.data.payload;
        saveToken(token);
        history.push("/bubblepage")
      })
      .catch((error) => {
        setError("Username or Password not valid")
      });
  }

  return (
    <div>
      <h1>Welcome to the Bubble App!</h1>
      <Container>
        <div data-testid="loginForm" className="login-form">

          <form onSubmit={handleSubmit}>
            <label>Username:
              <input type="text" name="username" value={formData.username} onChange={handleChange} id="username" test-id="username" />
            </label>
            <label>
              Password:
              <input type="password" name="password" value={formData.password} onChange={handleChange} id="password" test-id="password" />
            </label>
            <input type="submit" value={"Login"} />
          </form>

        </div>
      </Container>

      <p data-testid="errorMessage" className="error">{error}</p>
    </div>
  );
};

export default Login;

//Task List:
//1. Build a form containing a username and password field.
//2. Add whatever state nessiary for form functioning.
//3. MAKE SURE YOUR USERNAME AND PASSWORD INPUTS INCLUDE data-testid="username" and data-testid="password"
//4. If either the username or password is not entered, display the following words with the p tag provided: Username or Password not valid.
//5. If the username / password is equal to Lambda / i<3Lambd4, save that token to localStorage.
