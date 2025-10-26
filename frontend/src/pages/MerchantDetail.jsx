import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Camera } from 'lucide-react'; // Import the Camera icon

const MerchantDetail = () => {
  const { id } = useParams();
  const [merchant, setMerchant] = useState(null);
  const navigate = useNavigate();

  // --- Color Palette ---
  const DEEP_PURPLE = '#1a0d3d';    
  const ACCENT_PURPLE = '#4a258a';  
  const WHITE = '#ffffff';
  const SUBTLE_GRAY = '#e5e7eb';    
  const TEXT_LIGHT = '#707070';     
  
  // --- Simplified Style Objects ---
  const styles = {
    // 1. Container (Centered and padded)
    container: {
      maxWidth: '900px', // Smaller max-width
      margin: '2rem auto',
      padding: '0 1rem',
      fontFamily: "'Roboto', sans-serif",
    },
    // 2. Back Button
    backButton: {
      backgroundColor: ACCENT_PURPLE,
      color: WHITE,
      padding: '0.6rem 1.5rem',
      border: 'none',
      borderRadius: '6px',
      fontSize: '1rem',
      cursor: 'pointer',
      marginBottom: '1.5rem',
      transition: 'background-color 0.3s',
    },
    // 3. Card Layout (Clean, simplified)
    card: {
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: WHITE,
      borderRadius: '12px',
      padding: '2rem',
      boxShadow: `0 10px 20px rgba(26, 13, 61, 0.1)`, 
    },
    // 4. Image/Placeholder Wrapper (Flex to put image/icon beside details on desktop)
    contentWrapper: {
      display: 'flex',
      flexDirection: 'column', // Stacked by default (mobile)
      gap: '2rem',
    },
    // 5. Placeholder Style
    placeholder: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '200px',
      backgroundColor: SUBTLE_GRAY,
      borderRadius: '8px',
      color: TEXT_LIGHT,
    },
    // 6. Typography
    title: {
      fontFamily: "'Poppins', sans-serif",
      fontSize: '2rem',
      fontWeight: '700',
      color: DEEP_PURPLE,
      marginBottom: '0.5rem',
    },
    field: {
      display: 'inline-block',
      backgroundColor: ACCENT_PURPLE,
      color: WHITE,
      padding: '0.3rem 0.8rem',
      borderRadius: '4px',
      fontSize: '0.9rem',
      fontWeight: '500',
      marginBottom: '1rem',
    },
    description: {
      fontSize: '1rem',
      lineHeight: '1.6',
      color: TEXT_LIGHT,
      marginBottom: '1.5rem',
    },
    info: {
      fontSize: '0.95rem',
      marginBottom: '0.5rem',
      paddingLeft: '8px',
      borderLeft: `2px solid ${ACCENT_PURPLE}`,
    },
    infoStrong: {
      color: DEEP_PURPLE,
      fontWeight: '600',
    },
  };

  useEffect(() => {
    document.body.style.backgroundColor = SUBTLE_GRAY;
    
    axios.get(`http://localhost:5000/api/merchants/${id}`)
      .then(res => setMerchant(res.data))
      .catch(err => console.error(err));
      
    return () => {
      document.body.style.backgroundColor = ''; 
    };
  }, [id]);

  // --- Responsive Logic (Desktop) ---
  const isDesktop = window.innerWidth >= 768;
  
  const desktopWrapperStyle = isDesktop ? { 
    flexDirection: 'row', // Horizontal layout on desktop
  } : {};
  
  const desktopPlaceholderStyle = isDesktop ? { 
    flexShrink: 0, 
    width: '300px', // Fixed width for image column
  } : {};


  if (!merchant) return <div style={{ textAlign: 'center', padding: '3rem', fontSize: '1.5rem', color: ACCENT_PURPLE }}>Loading...</div>;

  return (
    <div style={styles.container}>
      <button onClick={() => navigate('/')} style={styles.backButton}>
        Back
      </button>
      
      <div style={styles.card}>
        <div style={{...styles.contentWrapper, ...desktopWrapperStyle}}>
          
          {/* Image Placeholder with Camera Icon */}
          <div style={{...styles.placeholder, ...desktopPlaceholderStyle}}>
            <Camera size={48} strokeWidth={1.5} />
          </div>
          
          {/* Merchant Details */}
          <div style={{flexGrow: 1}}>
            <h1 style={styles.title}>{merchant.businessName}</h1>
            <p style={styles.field}>{merchant.field}</p>
            <p style={styles.description}>{merchant.description}</p>
            
            <p style={styles.info}>
              <strong style={styles.infoStrong}>How they charge:</strong> {merchant.howTheyCharge}
            </p>
            <p style={styles.info}>
              <strong style={styles.infoStrong}>Specialities:</strong> {merchant.specialities}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MerchantDetail;