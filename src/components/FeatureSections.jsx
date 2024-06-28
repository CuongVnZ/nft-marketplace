// Trong file FeatureSections.jsx

import { Link } from 'react-router-dom';
import styled from 'styled-components';

const FeatureSectionWrapper = styled.section`
  display: flex;
  justify-content: center;
`;

const FeatureBox = styled.div`
  flex: 1;
  margin: 10px; /* Giảm margin để làm nhỏ box */
  padding: 15px; /* Giảm padding để làm nhỏ box */
  border: 1px solid #ddd;
  border-radius: 8px;
  text-align: center;
  background-color: #fff; /* Đặt màu nền là trắng */
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
`;

const FeatureLink = styled(Link)`
  text-decoration: none;
  background-color: #6366f1;
  color: #fff;
  font-size: 1.5rem;
  font-weight: bold;
  display: block;
  margin-bottom: 10px;
  padding: 15px 20px;
  border-radius: 4px;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: #4f46e5;
  }
`;

const FeatureDescription = styled.p`
  font-size: 1rem;
  color: #6b7280;
  margin: 0;
`;

const FeatureSections = () => {
  return (
    <FeatureSectionWrapper>
      {/* Swap Tokens section */}
      <FeatureBox>
        <FeatureLink to="/swaptoken">
          Swap Tokens
        </FeatureLink>
        <FeatureDescription>
          Explore and swap different tokens.
        </FeatureDescription>
      </FeatureBox>

      {/* Trade NFTs section */}
      <FeatureBox>
        <FeatureLink to="/nfts">
          Trade NFTs
        </FeatureLink>
        <FeatureDescription>
          Discover and trade unique NFTs.
        </FeatureDescription>
      </FeatureBox>
    </FeatureSectionWrapper>
  );
};

export default FeatureSections;
