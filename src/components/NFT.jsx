import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { useDispatch, useSelector } from 'react-redux';

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
  font-size: 24px;
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

const Image = styled.img`
  max-width: 100%;
  height: auto;
  margin: 20px auto;
`;


const NFT = () => {
  const user = useSelector(state => state.user.currentUser)

  const navigate = useNavigate();
  
  useEffect(() => {
    if (!user) {
      // navigate('/login');
    }
  }, [user, navigate]);

  return (
    <Container>
      <Title>NFT #1</Title>
      <Image src="/nft/1.png" alt="NFT #1"/>
      <Form>
        <label>Owner</label>
        <input type="text" value="0x608D5fF6331F6351c86Ef66601798f3895E4B27F" readOnly />
        <label>Price</label>
        <input type="text" value="0.1" readOnly />
        <button>Buy</button>
      </Form>
      
    </Container>
  );
};

export default NFT;
