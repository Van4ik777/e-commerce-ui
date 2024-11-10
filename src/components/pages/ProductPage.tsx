import { ActionIcon, Anchor, Box, Breadcrumbs, Button, Flex, SimpleGrid, Tabs, Text } from '@mantine/core';
import React, { useState, useEffect } from 'react';
import { AiOutlineHeart, AiOutlineSearch, AiOutlineShoppingCart, AiOutlineUser } from 'react-icons/ai';
import { Link, useParams } from 'react-router-dom';
import { ProductImages } from '../molecules/ProductImages';

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
    { title: 'Home Page', href: '/HomePage' },
    { title: 'Catalog', href: '/catalog' },
    { title: productType, href: `/catalog/${productType}` },
    { title: `Product ${productId}`, href: '#' },
  ].map((item, index) => (
    <Anchor component={Link} to={item.href} key={index} style={{ fontSize: '24px' }}>
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
          <Breadcrumbs ml={'100px'} style={{ fontSize: '32px' }}>
            {items}
          </Breadcrumbs>
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
      
      <Flex mt="40px" ml="70px" mr="70px">
        <Box>
          <ProductImages images={productImages} selectedImage={selectedImage} onImageClick={handleImageClick} />
        </Box>

        <Box ml="80px" style={{ flex: 1 }}>
          <Text weight={700} size="xl" mb="md" style={{ fontSize: '36px', textTransform: 'uppercase' }}>
            Product Name {productId}
          </Text>
          <Text color="dimmed" mb="sm" style={{ fontSize: '24px', textTransform: 'uppercase' }}>
            Category: {productType}
          </Text>
          <Text weight={700} size="xl" color="blue" mb="md" style={{ fontSize: '28px' }}>
            $199.99
          </Text>
          <Text color="dimmed" mb="md" style={{ fontSize: '20px', textTransform: 'uppercase' }}>
            A brief description of the product goes here. This description gives an overview of the product features, benefits, and specifications.
          </Text>
          <Flex mt="md">
            <Button color="red" mr="md" style={{ flex: 1, backgroundColor: 'red', color: 'white', fontSize: '18px', borderRadius: 0 }}>
              Buy Now
            </Button>
            <Button variant="outline" color="dark" style={{ flex: 1, fontSize: '18px', borderRadius: 0, borderColor: 'black', color: 'black' }}>
              Add to Cart
            </Button>
          </Flex>
        </Box>
      </Flex>

      <Box mt="40px" ml="150px" mr="70px">
        <Tabs defaultValue="description">
          <Tabs.List>
            <Tabs.Tab value="description" style={{ fontSize: '20px', textTransform: 'uppercase' }}>Description</Tabs.Tab>
            <Tabs.Tab value="characteristics" style={{ fontSize: '20px', textTransform: 'uppercase' }}>Characteristics</Tabs.Tab>
            <Tabs.Tab value="reviews" style={{ fontSize: '20px', textTransform: 'uppercase' }}>Reviews</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="description" pt="xs">
            <Text style={{ fontSize: '20px' }}>A full description of the product, including all relevant details and specifications.</Text>
          </Tabs.Panel>

          <Tabs.Panel value="characteristics" pt="xs">
            <Text style={{ fontSize: '20px' }}>Product characteristics such as material, color options, and dimensions.</Text>
          </Tabs.Panel>

          <Tabs.Panel value="reviews" pt="xs">
            <Text style={{ fontSize: '20px' }}>Reviews from customers who have purchased this product.</Text>
          </Tabs.Panel>
        </Tabs>
      </Box>
    </>
  );
};
