import React from 'react';

const Whitepaper = () => {
  return (
    <div style={{ height: '100vh' }}>
      <iframe
        src="/ronin-whitepaper.pdf"
        width="100%"
        height="100%"
        style={{ border: 'none' }}
      ></iframe>
    </div>
  );
};

export default Whitepaper;
