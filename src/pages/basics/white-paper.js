import React from 'react';
import './white-paper.css';

const WhitePaper = () => {
  const googleDriveEmbedLink = "https://drive.google.com/file/d/1pZoUWvbT45-G7zcD2XThPFFPDrUGeqYc/preview";
  const googleDriveDownloadLink = "https://drive.google.com/uc?export=download&id=1pZoUWvbT45-G7zcD2XThPFFPDrUGeqYc";

  return (
    <div className="pdf-container">
      <iframe
        src={googleDriveEmbedLink}
        width="100%"
        height="100%"
        style={{ border: 'none' }}
      ></iframe>
      <a href={googleDriveDownloadLink} className="download-button" download>
        Download PDF
      </a>
    </div>
  );
};

export default WhitePaper;