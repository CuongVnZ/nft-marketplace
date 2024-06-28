import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { useDispatch, useSelector } from 'react-redux';

import { getAccount } from '@wagmi/core'
import { useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import config from '../../config'
import { NFTAbi, NFTAddress } from '../../service'

const Container = styled.div`
  max-width: 800px;
  margin: 50px auto;
  padding: 30px;
  background-color: #f5f5f5;
  border: 2px solid #ddd;
  border-radius: 12px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  text-align: center;
  transition: height 0.5s ease; 
`;

const Title = styled.h1`
  color: #333;
  font-size: 32px;
  margin-bottom: 20px;
  font-weight: bold;
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
    padding: 12px;
    font-size: 18px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #217dbb;
    }
  }
`;

const ReadOnlyInput = styled.input`
  padding: 10px;
  margin-top: 5px;
  margin-bottom: 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #eee;
`;

const WalletInfo = styled.div`
  text-align: center;
  margin-bottom: 20px;
  justify-content: center;
  justify-items: center;

  p {
    margin: 5px 0;
    font-size: 14px;
    color: #555;
  }

  .address {
    font-weight: bold;
  }

  .balance {
    font-weight: bold;
    font-size: 18px;
    color: #555;
  }
`;

const Transfer = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  const { 
    data: hash,
    error, 
    isPending, 
    writeContract 
  } = useWriteContract() 

  async function submit(e) { 
    e.preventDefault() 
    const formData = new FormData(e.target) 
    const tokenId = formData.get('tokenId') 
    const fromAddress = getAccount(config).address
    const toAddress = formData.get('toAddress')
    writeContract({
      abi: NFTAbi,
      address: NFTAddress,
      functionName: 'transferFrom',
      args: [fromAddress, toAddress, tokenId],
    })
  } 

  const { isLoading: isConfirming, isSuccess: isConfirmed } = 
    useWaitForTransactionReceipt({ 
      hash, 
    }) 

  useEffect(() => {
    if (!user.currentUser) {
      navigate('/signin');
    }
  }, [user, navigate]);

  return (
    <Container>
      <Title>Transfer NFT</Title>
      <Form onSubmit={submit}>
        <label htmlFor="yourAdd">Your Address</label>
        <ReadOnlyInput name="yourAdd" value={getAccount(config).address} readOnly />
        <label htmlFor="toAddress">Receiver Address</label>
        <input name="toAddress" placeholder="0x3e4b6ac7d5a61480c79f20da63a7b33cfe70358f" required />
        <label htmlFor="tokenId">NFT ID</label>
        <input name="tokenId" placeholder="123" required />
        <button 
          disabled={isPending} 
          type="submit"
        >
          {isPending ? 'Confirming...' : 'Transfer'} 
        </button>
        {hash && <div>Transaction Hash: {hash}</div>}
        {isConfirming && <div>Waiting for confirmation...</div>} 
        {isConfirmed && <div>Transaction confirmed.</div>} 
        {error && ( 
          <div>Error: {error.shortMessage || error.message}</div> 
        )} 
      </Form>
    </Container>
  );
};

export default Transfer;
