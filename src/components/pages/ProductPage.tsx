import { ActionIcon, Anchor, Box, Breadcrumbs, Flex, Image, SimpleGrid } from '@mantine/core';
import React, { useState, useEffect } from 'react';
import { AiOutlineHeart, AiOutlineSearch, AiOutlineShoppingCart, AiOutlineUser } from 'react-icons/ai';
import { Link, useParams } from 'react-router-dom';

export const ProductPage: React.FC = () => {

  const { productType, productId } = useParams();
  const [hash, setHash] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>('https://via.placeholder.com/600?text=Product+Large');

  useEffect(() => {
    const currentHash = window.location.hash;
    if (currentHash) {
      setHash(currentHash.replace('#', '')); 
    }
  }, []); 

  const items = [
    { title: 'HomePage', href: '/HomePage' },
    { title: 'Catalog', href: '/catalog' },
    { title: productType, href: `/catalog/${productType}` }, 
    { title: `Product ${productId}`, href: '#' }, 
  ].map((item, index) => (
    <Anchor component={Link} to={item.href} key={index}>
      {item.title}
    </Anchor>
  ));
  const productImages = [
    'https://via.placeholder.com/600?text=Product+0',
    'https://via.placeholder.com/100?text=Product+1',
    'https://via.placeholder.com/100?text=Product+2',
    'https://via.placeholder.com/100?text=Product+3',
    'https://via.placeholder.com/100?text=Product+4',
    'https://via.placeholder.com/100?text=Product+5',
  ];
  const handleImageClick = (image: string) => {
    setSelectedImage(image);
  };
  return (
    <>
    <Box mt="40px">
        <Flex align="center" justify="space-between">
          <Breadcrumbs ml={'70px'}>{items}</Breadcrumbs>
          <Flex align="center" mr={'10%'}>
            <ActionIcon size="xl" variant="transparent" color="black" style={{ marginRight: '10px' }}>
              <AiOutlineSearch style={{ fontSize: '32px' }} />
            </ActionIcon>
            <ActionIcon size="xl" variant="transparent" color="black" style={{ marginRight: '10px' }}>
              <AiOutlineHeart style={{ fontSize: '32px' }} />
            </ActionIcon>
            <ActionIcon size="xl" variant="transparent" color="black" style={{ marginRight: '10px' }}>
              <AiOutlineUser style={{ fontSize: '32px' }} />
            </ActionIcon>
            <ActionIcon size="xl" variant="transparent" color="black">
              <AiOutlineShoppingCart style={{ fontSize: '32px' }} />
            </ActionIcon>
          </Flex>
        </Flex>
      </Box>  
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
    <div>{productType}</div>
    <div>{productId }</div>
    <div>Hash: {hash}</div>
    </>
  );
};
