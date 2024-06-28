import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

import { publicRequest } from '../apiRequest.js';

import { useReadContract } from 'wagmi'
import { NFTAbi, NFTAddress } from '../service'

const sampleNFTs = [
  {
    id: 1,
    title: 'Wind Ronin',
    artist: 'Artist A',
    price: 0.9,
    image: '/images/windron.png', // URL of the image
  },
  {
    id: 2,
    title: 'Assasin of the Fire',
    artist: 'Artist B',
    price: 4.2,
    image: '/images/fireassasin.png',
  },
  {
    id: 3,
    title: 'Scout of the Wind',
    artist: 'Artist C',
    price: 3.8,
    image: '/images/windscout.png',
  },
  {
    id: 4,
    title: 'Snow Yumi Practice',
    artist: 'Artist C',
    price: 16.8,
    image: '/images/Yumi.png',
  },
  {
    id: 5,
    title: 'The Duel',
    artist: 'Artist C',
    price: 7.8,
    image: '/images/TheDuel.png',
  },
  {
    id: 6,
    title: 'Water Samurai',
    artist: 'Artist C',
    price: 2.8,
    image: '/images/WaterSam.png',
  },
  {
    id: 7,
    title: 'Fire Demon',
    artist: 'Artist C',
    price: 12.0,
    image: '/images/FireDemon.png',
  },
  {
    id: 8,
    title: 'Detective',
    artist: 'Artist C',
    price: 3.5,
    image: '/images/Detective.png',
  },
];

const NFTs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);
  const [filteredNFTs, setFilteredNFTs] = useState([]);

  const {
    data: readData,
    error, 
    isPending 
  } = useReadContract({
    abi: NFTAbi,
    address: NFTAddress,
    functionName: 'getAll'
  })

  const handleSearch = () => {
    const filteredResults = products.filter(
      (nft) =>
        nft.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        nft.artist.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredNFTs(filteredResults);
  };

  // useEffect to load NFTs from backend
  useEffect(() => {
    if(!readData) return;
    console.log(readData)
    let cur = []

    for (let i = 0; i < readData[0].length; i++) {
      let nft = {
        id: i+1,
        owner: "0x608D5fF6331F6351c86Ef66601798f3895E4B27F",
        price: readData[0][i].toString(),
        image: "/nft/" + readData[1][i].toString() + ".png",
      }
      console.log('NFT', nft)

      cur.push(nft)
    }
    
    setProducts(cur)
    setFilteredNFTs(cur)
    console.log('Products', cur)
  }, [readData]);

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', textAlign: 'center', marginTop: '20px' }}>
      <h1 style={{ color: '#333' }}>NFTs - Explore Unique Digital Art</h1>

      {/* Search Filter */}
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Search by title or artist"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: '8px', marginRight: '5px' }}
        />
        <button onClick={handleSearch} style={{ padding: '8px', backgroundColor: '#3498db', color: '#fff', cursor: 'pointer' }}>
          Search
        </button>
      </div>

      {isPending && <p>Loading NFTs...</p>}
      {error && <p>Error fetching NFTs: {error.shortMessage || error.message}</p>}
      
      {readData && <p>Total NFTs: {readData[0].length}</p>}
      
      <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
        {filteredNFTs.map((nft) => (
          <>
          <Link to="/nft">
            <div key={nft.id} style={{ margin: '10px', padding: '10px', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
              <img src={nft.image} alt={nft.title} style={{ maxWidth: '100%', height: 'auto', marginBottom: '10px' }} />
              <h2 style={{ color: '#333' }}>NFT #{nft.id}</h2>
              {/* <p style={{ color: '#555' }}>Owner: {nft.owner}</p> */}
              {/* <p style={{ color: '#555' }}>Price: {nft.price} ETH</p> */}
            </div>
          </Link>
          </>
        ))}
      </div>
    </div>
  );
};

export default NFTs;
