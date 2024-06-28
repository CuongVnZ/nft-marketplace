import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { useDispatch, useSelector } from 'react-redux';

const History = () => {
  const user = useSelector(state => state.user.currentUser)

  const navigate = useNavigate();

  const transactions = [
    {
        id: 1,
        type: 'Transfer',
        txid: '0xb22ac97e8eb323a1b80f635c75390afa8a92a1d9a8098ea17946aca36871bdea',
        date: '2024-01-01'
    },
    {
        id: 2,
        type: 'Minting',
        txid: '0xb22ac97e8eb323a1b80f635c75390afa8a92a1d9a8098ea17946aca36871bdea',
        date: '2024-01-02'
    },
    {
        id: 3,
        type: 'Minting',
        txid: '0xb22ac97e8eb323a1b80f635c75390afa8a92a1d9a8098ea17946aca36871bdea',
        date: '2024-01-03'
    }
  ]
  
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  return (
    <div className="container h-full min-h-screen mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Transaction History</h1>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Type</th>
            <th className="px-4 py-2">Transaction ID</th>
            <th className="px-4 py-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td className="border px-4 py-2">{transaction.id}</td>
              <td className="border px-4 py-2">{transaction.type}</td>
              <td className="border px-4 py-2">{transaction.txid}</td>
              <td className="border px-4 py-2">{transaction.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default History;
