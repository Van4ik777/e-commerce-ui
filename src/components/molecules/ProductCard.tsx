import React, { useState } from 'react';
import { AiOutlineHeart, AiOutlineStar } from 'react-icons/ai';
import { FaRegCommentDots } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Box, Button, Image } from '@mantine/core';
import { useHover } from '@mantine/hooks';
import { PAGES } from '@/constants/PAGES';
import { CustomButton } from '../atoms/buttons/CustomButton';
import { useCart } from '@/store/cart.store';

interface ProductCardProps {
  imageSrc: string;
  productName: string;
  price: string;
  colors: string[];
  rating: number;
  reviewsCount: number;
  productId: string;
  productType: string;
  mystyles?: React.CSSProperties;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  imageSrc,
  productName,
  price,
  colors,
  rating,
  reviewsCount,
  productId,
  productType,
  mystyles,
}) => {
  const { hovered, ref } = useHover();
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addItem({
      id: productId,
      name: productName,
      price: parseFloat(price.replace('$', '')),
      quantity: 1,
    });

    setAdded(true);
  };

  return (
    <Box
      ref={ref}
      style={{
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '16px',
        width: '300px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
        transition: 'transform 0.3s ease, height 0.3s ease',
        height: hovered ? '550px' : '380px',
        transform: hovered ? 'translateY(0)' : 'none',
        transformOrigin: 'bottom',
        ...mystyles,
      }}
      w="300px"
    >
        <Link to={`/product/${productType}/${productId}`} style={{ textDecoration: 'none', color: 'black' }}>
        <Image src={imageSrc} alt={productName} radius="md" height={250} />
      </Link>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '16px',
        }}
      >
        <div>
            <h2
              style={{
                fontFamily: 'Roboto',
                fontSize: '18px',
                fontWeight: 700,
                margin: 0,
                textAlign: 'left',
                color: 'black',
              }}
            >
              {productName}
            </h2>
          <p
            style={{
              fontFamily: 'Roboto',
              fontSize: '16px',
              fontWeight: 400,
              color: '#666',
              marginTop: '4px',
              textAlign: 'left',
            }}
          >
            {price}
          </p>
        </div>
        <AiOutlineHeart
          style={{
            fontSize: '30px',
            color: 'rgba(17, 17, 17, 1)',
            cursor: 'pointer',
            marginBottom: '20px',
          }}
        />
      </div>

      {hovered && (
        <>
          <CustomButton
            label={added ? '✓ Added!' : 'Add to Cart'}
            mystyles={{
              width: '200px',
              backgroundColor: added ? 'green' : undefined,
              transition: 'background-color 0.3s ease',
            }}
            onClick={handleAddToCart}
          />

          <div style={{ marginTop: '10px', textAlign: 'left' }}>
            <p style={{ fontSize: '14px', color: '#666', fontWeight: 400 }}>In Stock</p>
            <div style={{ display: 'flex', gap: '8px' }}>
              {colors.map((color) => (
                <div
                  key={color}
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

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: '8px',
            }}
          >
            <Link
              to={`${PAGES.products(productType, productId)}#comments`}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                textDecoration: 'none',
                color: '#000',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <AiOutlineStar style={{ fontSize: '16px', color: '#000' }} />
                <span
                  style={{
                    fontFamily: 'Roboto',
                    fontSize: '14px',
                    fontWeight: 400,
                    color: '#666',
                  }}
                >
                  {rating}
                </span>
              </div>
            </Link>

            <Link
              to={`/product/${productType}/${productId}#comments`}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                textDecoration: 'none',
                color: '#000',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <FaRegCommentDots style={{ fontSize: '16px', color: '#000' }} />
                <div
                  style={{
                    fontFamily: 'Roboto',
                    fontSize: '14px',
                    fontWeight: 400,
                    color: '#666',
                  }}
                >
                  {reviewsCount} reviews
                </div>
              </div>
            </Link>
          </div>
        </>
      )}
    </Box>
  );
};
