import { useState } from 'react';
import styled from 'styled-components';

import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess } from "../redux/userRedux"

import { publicRequest } from '../apiRequest.js';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  max-width: 800px;
  margin: 50px auto;
  padding: 30px;
  background-color: #f5f5f5;
  border: 2px solid #ddd;
  border-radius: 12px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  transition: height 0.5s ease; 
`;

const Title = styled.h1`
  text-align: center;
  color: #333;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;

  label {
    margin-top: 10px;
    font-size: 14px;
    color: #555;
  }

  input {
    padding: 10px;
    margin-top: 5px;
    margin-bottom: 15px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }

  button {
    background-color: #333;
    color: #fff;
    padding: 10px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #217dbb;
    }
  }
`;

const Login = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const handleClick = (e) => {
    e.preventDefault()
    publicRequest.post('/auth/login', {
      username: username,
      password: password
    })
    .then(response => {
      console.log(response);
      dispatch(loginSuccess(response.data))
      navigate("/Profile")
    })
    .catch(error => {
      console.log(error);
      setError(error.message)
    })
  }

  return (
    <Container>
      <Title>Login </Title>
      <Form onSubmit={handleClick}>
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" onChange={(e) => setUsername(e.target.value)} />

        <label htmlFor="password">Password:</label>
        <input type="password" id="password" onChange={(e) => setPassword(e.target.value)} />

        <button type="submit">
          Login
        </button>

        {error && <span style={{color: "red"}}>Error: {error}</span>}
      </Form>
    </Container>
  );
};

export default Login;
