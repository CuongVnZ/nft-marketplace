import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { useDispatch, useSelector } from 'react-redux';

import { getAccount } from '@wagmi/core'
import config from '../../config'
import { useReadContract } from 'wagmi'
import { NFTAbi, NFTAddress } from '../../service'

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
  color: #333;
  font-size: 32px;
  margin-bottom: 20px;
  font-weight: bold;
  text-align: center;
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

const Profile = () => {
  const user = useSelector(state => state.user.currentUser)
  const navigate = useNavigate();

  const {
    data: readData,
    error, 
    isPending 
  } = useReadContract({
    abi: NFTAbi,
    address: NFTAddress,
    functionName: 'getOwnedTokenIds',
    args: [getAccount(config).address]
  })
  
  useEffect(() => {
    if (!user) {
      navigate('/signin');
    }
  }, [user, navigate]);

  return (
    <Container>
      <Title>Profile</Title>
      {/* Information table */}
      <table>
        <tr>
          <td>Username:</td>
          <td>{user.username}</td>
        </tr>
        <tr>
          <td>Email:</td>
          <td>{user.email}</td>
        </tr>
      </table>

      {/* Your owned NFTs */}
      <Title>Your owned NFTs</Title>
      { isPending && <p>Loading...</p> }
      { error && <p>Error fetching NFTs: {error.shortMessage || error.message}</p> }
      {/* { readData && <p>Owned NFTs: {readData.map((id) => <span>{id.toString()} </span>)}</p> } */}
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Etherscan</th>
            <th className="px-4 py-2">Image</th>
          </tr>
        </thead>
        <tbody>
          {/* <tr>
            <td className="border px-4 py-2">1</td>
            <td className="border px-4 py-2">
              <a href="https://etherscan.io/token/0x06012c8cf97bead5deae237070f9587f8e7a266d?a=1" target="_blank" rel="noreferrer">
                0x06012c8cf97bead5deae237070f9587f8e7a266d
              </a>
            </td>
            <td className="border px-4 py-2">
              <img src="https://placehold.co/200x200" alt="NFT" />
            </td>
          </tr> */}
          {
            readData && readData.map((id) => (
              <tr key={id.toString()}>
                <td className="border px-4 py-2">#{id.toString()}</td>
                <td className="border px-4 py-2">
                  <a href={`https://etherscan.io/token/${NFTAddress}?a=${id.toString()}`} target="_blank" rel="noreferrer">
                    {NFTAddress}
                  </a>
                </td>
                <td className="border px-4 py-2">
                  <img src={`/nft/1.png`} alt="NFT" />
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </Container>
  );
};

export default Profile;
