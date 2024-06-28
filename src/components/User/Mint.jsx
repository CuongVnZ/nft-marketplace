import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { useDispatch, useSelector } from 'react-redux';

import { getAccount } from '@wagmi/core'
import { useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import config from '../../config'
import { NFTAbi, NFTAddress } from '../../service'
import { userRequest } from '../../apiRequest';

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

const Mint = () => {
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
    writeContract({
      abi: NFTAbi,
      address: NFTAddress,
      functionName: 'mint',
      args: [BigInt(10)],
    })
  } 

  const { isLoading: isConfirming, isSuccess: isConfirmed } = 
    useWaitForTransactionReceipt({ 
      hash,
      onReplaced: replacement => console.log(replacement), 
    }) 

  useEffect(() => {
    if (!user.currentUser) {
      navigate('/signin');
    }

    if (hash) {
      console.log(hash)
      // post api history
      userRequest(user.currentUser.token).post('/history', {
        user: user.currentUser.username,
        type: 'mint',
        txid: hash,
        date: new Date().toISOString()
      });
    }
  }, [user, navigate, hash]);

  return (
    <Container>
      <Title>Minting a new NFT</Title>

      <WalletInfo>
        <p>Your Wallet Address</p>
        <ReadOnlyInput
          type="text"
          value={getAccount(config).address}
          className="address"
          readOnly
        />
        <p className="balance">Minting Price: 0.01 ETH</p>
      </WalletInfo>

      <Form onSubmit={submit}>
        <button 
          disabled={isPending} 
          type="submit"
        >
          {isPending ? 'Confirming...' : 'Mint'} 
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

export default Mint;
