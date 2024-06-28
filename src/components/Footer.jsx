import React from 'react';

// Component Footer
const Footer = () => {
  return (
    <footer style={footerStyle}>
      <div>
        <p style={textStyle}>© 2024 ByteX</p>
      </div>
    </footer>
  );
};

// Inline styles cho Footer
const footerStyle = {
  backgroundColor: '#333',
  color: '#fff',
  textAlign: 'center',
  padding: '1rem',
  position: 'flex',
  bottom: 0,
  width: '100%',
};

const textStyle = {
  margin: 0,
};



// Xuất Component
export default Footer;