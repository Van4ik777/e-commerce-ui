import {Box,  Image, SimpleGrid } from '@mantine/core';
import React, { useState, useEffect, useMemo } from 'react';

export const ProductImages: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string>('https://via.placeholder.com/600?text=Product+Large');

  console.log('1')

  const productImages = useMemo(()=> [
    'https://via.placeholder.com/600?text=Product+0',
    'https://via.placeholder.com/100?text=Product+1',
    'https://via.placeholder.com/100?text=Product+2',
    'https://via.placeholder.com/100?text=Product+3',
    'https://via.placeholder.com/100?text=Product+4',
    'https://via.placeholder.com/100?text=Product+5',
  ],[]);
  const handleImageClick = (image: string) => {
    setSelectedImage(image);
  };
  return (
    <>
      <Box mt="40px" ml="50px" style={{ display: 'flex', alignItems: 'flex-start' }}>
        <div>
          <Image src={selectedImage} alt="Selected product" width={750} height={500} radius="md" />
          <SimpleGrid cols={5} mt="10px">
            {productImages.slice(1).map((image, index) => (
              <Image
                key={index}
                src={image}
                alt={`Product ${index + 1}`}
                width={100}
                height={90}
                radius="md"
                onClick={() => handleImageClick(image)}
                style={{ cursor: 'pointer', marginTop: '5px' }}
              />
            ))}
          </SimpleGrid>
        </div>
      </Box>
    </>
  );
};
