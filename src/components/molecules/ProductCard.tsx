import React, { useState } from 'react';
import { AiOutlineHeart, AiOutlineStar } from 'react-icons/ai'; // Іконка "лайка" і "зірки"
import { Button } from '@mantine/core';
import { FaRegCommentDots } from "react-icons/fa";
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

interface ProductCardProps {
  imageSrc: string;
  productName: string;
  price: string;
  colors: string[];
  rating: number; 
  reviewsCount: number; 
  productId: string;
  productType: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({ imageSrc, productName, price, colors, rating, reviewsCount, productId, productType  }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link to={`/product/${productType}/${productId}#comments`} style={{ display: 'flex', alignItems: 'center', gap: '4px', textDecoration: 'none', color: '#000' }}>

    <div
      style={{
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '16px',
        width: '300px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
        transition: 'transform 0.3s ease, height 0.3s ease',
        height: isHovered ? '550px' : '380px',
        transform: isHovered ? 'translateY(0)' : 'none', 
        transformOrigin: 'bottom', 
            }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img src={imageSrc} alt={productName} style={{ width: '100%', height: 'auto', borderRadius: '8px' }} />
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px' }}>
        <div>
          <h2 style={{
            fontFamily: 'Roboto',
            fontSize: '18px',
            fontWeight: 700,
            margin: 0,
            textAlign: 'left'
          }}>{productName}</h2>
          <p style={{
            fontFamily: 'Roboto',
            fontSize: '16px',
            fontWeight: 400,
            color: '#666',
            marginTop: '4px',
            textAlign: 'left'
          }}>{price}</p>
        </div>

        <AiOutlineHeart style={{ fontSize: '30px', color: 'rgba(17, 17, 17, 1)', cursor: 'pointer',marginBottom: '20px' }} /> {/* Кнопка лайка */}
      </div>



      {isHovered && (
        <>
          <Button
            style={{
              marginTop: '20px',
              backgroundColor: 'rgba(17, 17, 17, 1)',
              color: '#fff',
              width: '100%',
              borderRadius: '8px',
            }}
          >
            Add to Cart
          </Button>

          <div style={{ marginTop: '10px', textAlign: 'left' }}>
            <p style={{ fontSize: '14px', color: '#666', fontWeight: 400 }}>In Stock</p>
            <div style={{ display: 'flex', gap: '8px' }}>
              {colors.map((color, index) => (
                <div
                  key={index}
                  style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    backgroundColor: color,
                    cursor: 'pointer',
                    border: '1px solid #ddd',
                  }}
                />
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' }}>
        <Link to={`/product/${productType}/${productId}#comments`} style={{ display: 'flex', alignItems: 'center', gap: '4px', textDecoration: 'none', color: '#000' }}>

        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <AiOutlineStar style={{ fontSize: '16px', color: '#000' }} /> {/* Іконка зірки */}
              <span style={{
                fontFamily: 'Roboto',
                fontSize: '14px',
                fontWeight: 400,
                color: '#666',
              }}>{rating}</span>
        </div>
        </Link>

        <Link to={`/product/${productType}/${productId}#comments`} style={{ display: 'flex', alignItems: 'center', gap: '4px', textDecoration: 'none', color: '#000' }}>

        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>

            <FaRegCommentDots style={{ fontSize: '16px', color: '#000' }} />
            <div style={{
              fontFamily: 'Roboto',
              fontSize: '14px',
              fontWeight: 400,
              color: '#666',
            }}>
              {reviewsCount} reviews
            </div>

        </div>
        </Link>

      </div>

      </>
      )}
    </div>
    </Link>

  );
};