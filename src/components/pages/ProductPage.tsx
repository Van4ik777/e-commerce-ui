import React, { useEffect, useMemo, useState } from 'react';
import {
  AiOutlineHeart,
  AiOutlineSearch,
  AiOutlineShoppingCart,
  AiOutlineUser,
} from 'react-icons/ai';
import { Link, useParams } from 'react-router-dom';
import {
  ActionIcon,
  Anchor,
  Box,
  Breadcrumbs,
  Button,
  Flex,
  Tabs,
  Text,
} from '@mantine/core';
import { productsService } from '@/services/products/products.service';
import { ProductImages } from '../molecules/ProductImages';
import { useQuery } from '@tanstack/react-query';

export const ProductPage: React.FC = () => {
  const { productType, productId } = useParams();
  const queryKey = productId ? ['product', productId] : ['product', 'undefined'];

  const {
    isLoading,
    data: product,
  } = useQuery({
    queryKey:queryKey,
    queryFn: () => productsService.getOneWithDetails(Number(productId)),
    enabled: Boolean(productId),
  });
  console.log(product)
  const items = useMemo(() => {
    const itemList = [
      { title: 'Home', href: '/home' },
      { title: 'Catalog', href: '/catalog' },
      productType && { title: productType, href: `/catalog/${productType}` },
      productId && { title: `Product ${productId}`, href: '#' },
    ].filter(Boolean);

    return itemList.map((item) => (
      <Anchor component={Link} to={item.href} key={item.title} style={{ fontSize: '24px' }}>
        {item.title}
      </Anchor>
    ));
  }, [productType, productId]);

  if (isLoading || !product) {
    return <Text>Loading...</Text>;
  }

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
          <ProductImages />
        </Box>

        <Box ml="80px" style={{ flex: 1 }}>
          <Text size="xl" mb="md" style={{ fontSize: '36px', textTransform: 'uppercase' }}>
            {product.product.name}
          </Text>
          <Text color="dimmed" mb="sm" style={{ fontSize: '24px', textTransform: 'uppercase' }}>
            Category: {product.product.category.name}
          </Text>
          <Text size="xl" color="blue" mb="md" style={{ fontSize: '28px' }}>
            {product.product.price}
          </Text>
          <Text color="dimmed" mb="md" style={{ fontSize: '20px', textTransform: 'uppercase' }}>
            {product.product.description}
          </Text>
          <Flex mt="200" w={800} ml={200}>
            <Button
              color="red"
              mr="md"
              h={60}
              w={150}
              style={{
                flex: 1,
                backgroundColor: 'red',
                color: 'white',
                fontSize: '18px',
                borderRadius: 0,
              }}
            >
              Buy Now
            </Button>
            <Button
              variant="outline"
              color="dark"
              h={60}
              style={{
                flex: 1,
                fontSize: '18px',
                borderRadius: 0,
                borderColor: 'black',
                color: 'black',
              }}
            >
              Add to Cart
            </Button>
          </Flex>
        </Box>
      </Flex>

      <Box mt="40px" ml="150px" mr="70px">
        <Tabs defaultValue="description">
          <Tabs.List>
            <Tabs.Tab value="description" style={{ fontSize: '20px', textTransform: 'uppercase' }}>
              Description
            </Tabs.Tab>
            <Tabs.Tab value="characteristics" style={{ fontSize: '20px', textTransform: 'uppercase' }}>
              Characteristics
            </Tabs.Tab>
            <Tabs.Tab value="reviews" style={{ fontSize: '20px', textTransform: 'uppercase' }}>
              Reviews
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="description" pt="xs">
            <Text style={{ fontSize: '20px' }}>{product.product.description}</Text>
          </Tabs.Panel>

          <Tabs.Panel value="characteristics" pt="xs">
            { product.product.id > 0 ? (
              <Text style={{ fontSize: '20px', marginBottom: '10px' }}>
                <strong>Colors:</strong> {product.colors.join(', ') || 'N/A'} <br />
                <strong>Materials:</strong> {product.materials.join(', ') || 'N/A'} <br />
                <strong>Dimensions:</strong> {product.height} x {product.width} x {product.depth} cm <br />
                <strong>Swivel Mechanism:</strong> {product.swivel_mechanism ? 'Yes' : 'No'}
              </Text>
            ) : (
              <Text>No characteristics available</Text>
            )}
          </Tabs.Panel>
          <Tabs.Panel value="reviews" pt="xs">
            {product.reviews && product.reviews.length > 0 ? (
              <Box>
                {product.reviews.map((review:any) => (
                  <Box
                    key={review.id}
                    mb="md"
                    style={{ borderBottom: '1px solid #e0e0e0', paddingBottom: '10px' }}
                  >
                    <Text style={{ fontSize: '18px', fontWeight: 'bold' }}>User {review.userId}:</Text>
                    <Text style={{ fontSize: '16px', color: '#555' }}>{review.text}</Text>
                  </Box>
                ))}
              </Box>
            ) : (
              <Text>No reviews available</Text>
            )}
          </Tabs.Panel>
        </Tabs>
      </Box>
    </>
  );
};

