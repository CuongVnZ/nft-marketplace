
import { useState } from 'react';
import styled from 'styled-components';

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
      background-color: #3949AB;
    }
  }
`;

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data:', formData);

    // Validate password match
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    // You can add Axios or fetch to send data to the server for actual signup
    publicRequest.post('/auth/register', {
      username: formData.username,
      email: formData.email,
      password: formData.password
    })
    .then(response => {
      console.log(response);
      // dispatch(loginSuccess(response.data))
      alert("You have successfully signed up!")
      navigate("/Login")
    })
    .catch(error => {
      console.log(error);
      setError(error.message)
    })
  };

  return (
    <Container>
      <Title>Sign Up </Title>
      <Form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />

        <button type="submit">Sign Up</button>
        {error && <span style={{color: "red"}}>Error: {error}</span>}
      </Form>
    </Container>
  );
};

export default Signup;

