import React, { useEffect, useMemo, useState } from 'react';
import {
  AiOutlineHeart,
  AiOutlineSearch,
  AiOutlineShoppingCart,
  AiOutlineUser,
} from 'react-icons/ai';
import { useQuery } from 'react-query';
import { Link, useParams } from 'react-router-dom';
import {
  ActionIcon,
  Anchor,
  Box,
  Breadcrumbs,
  Button,
  Flex,
  SimpleGrid,
  Tabs,
  Text,
} from '@mantine/core';
import { productsService } from '@/services/products/products.service';
import { ProductImages } from '../molecules/ProductImages';

export const ProductPage: React.FC = () => {
  const { productType, productId } = useParams();
  const [hash, setHash] = useState<string | null>(null);

  const {
    isLoading,
    data: product,
    isError,
    error,
    isFetched,
  } = useQuery({
    queryKey: productId,
    staleTime: 0,
    cacheTime: 0,
    queryFn: () => productsService.getOneWithDetails(Number(productId)),
    enabled: Boolean(productId),
  });

  if (!product) {
    return <Text>Product not found</Text>;
  }

  console.log(product);

  useEffect(() => {
    const currentHash = window.location.hash;
    if (currentHash) {
      setHash(currentHash.replace('#', ''));
    }
  }, []);

  // TODO: useMemo
  const items = [
    { title: 'Home', href: '/home' },
    { title: 'Catalog', href: '/catalog' },
    { title: productType, href: `/catalog/${productType}` },
    { title: `Product ${productId}`, href: '#' },
  ].map((item) => (
    <Anchor component={Link} to={item.href} key={item.title} style={{ fontSize: '24px' }}>
      {item.title}
    </Anchor>
  ));

  return (
    <>
      <Box mt="40px">
        <Flex align="center" justify="space-between">
          <Breadcrumbs ml={'100px'} style={{ fontSize: '32px' }}>
            {items}
          </Breadcrumbs>
          <Flex align="center" mr={'10%'}>
            <ActionIcon
              size="xl"
              variant="transparent"
              color="black"
              style={{ marginRight: '10px' }}
            >
              <AiOutlineSearch style={{ fontSize: '32px' }} />
            </ActionIcon>
            <ActionIcon
              size="xl"
              variant="transparent"
              color="black"
              style={{ marginRight: '10px' }}
            >
              <AiOutlineHeart style={{ fontSize: '32px' }} />
            </ActionIcon>
            <ActionIcon
              size="xl"
              variant="transparent"
              color="black"
              style={{ marginRight: '10px' }}
            >
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
            {product.name}
          </Text>
          <Text color="dimmed" mb="sm" style={{ fontSize: '24px', textTransform: 'uppercase' }}>
            Category: {product.categoryId}
          </Text>
          <Text size="xl" color="blue" mb="md" style={{ fontSize: '28px' }}>
            {product.price}
          </Text>
          <Text color="dimmed" mb="md" style={{ fontSize: '20px', textTransform: 'uppercase' }}>
            {product.description}
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
            <Tabs.Tab
              value="characteristics"
              style={{ fontSize: '20px', textTransform: 'uppercase' }}
            >
              Characteristics
            </Tabs.Tab>
            <Tabs.Tab value="reviews" style={{ fontSize: '20px', textTransform: 'uppercase' }}>
              Reviews
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="description" pt="xs">
            <Text style={{ fontSize: '20px' }}>{product.description}</Text>
          </Tabs.Panel>

          <Tabs.Panel value="characteristics" pt="xs">
            {product.productDetails && product.productDetails.length > 0 ? (
              <Text style={{ fontSize: '20px', marginBottom: '10px' }}>
                <strong>Colors:</strong> {product.productDetails[0].colors.join(', ') || 'N/A'}{' '}
                <br />
                <strong>Materials:</strong>{' '}
                {product.productDetails[0].materials.join(', ') || 'N/A'} <br />
                <strong>Dimensions:</strong> {product.productDetails[0].height} x{' '}
                {product.productDetails[0].width} x {product.productDetails[0].depth} cm <br />
                <strong>Swivel Mechanism:</strong>{' '}
                {product.productDetails[0].swivelMechanism || 'N/A'}
              </Text>
            ) : (
              <Text>No characteristics available</Text>
            )}
          </Tabs.Panel>

          <Tabs.Panel value="reviews" pt="xs">
            {product.reviews && product.reviews.length > 0 ? (
              <Box>
                {product.reviews.map(
                  // KAL
                  (review: {
                    id: React.Key | null | undefined;
                    userId:
                      | string
                      | number
                      | boolean
                      | React.ReactElement<any, string | React.JSXElementConstructor<any>>
                      | Iterable<React.ReactNode>
                      | React.ReactPortal
                      | null
                      | undefined;
                    text:
                      | string
                      | number
                      | boolean
                      | React.ReactElement<any, string | React.JSXElementConstructor<any>>
                      | Iterable<React.ReactNode>
                      | React.ReactPortal
                      | null
                      | undefined;
                  }) => (
                    <Box
                      key={review.id}
                      mb="md"
                      style={{ borderBottom: '1px solid #e0e0e0', paddingBottom: '10px' }}
                    >
                      <Text style={{ fontSize: '18px', fontWeight: 'bold' }}>
                        User {review.userId}:
                      </Text>
                      <Text style={{ fontSize: '16px', color: '#555' }}>{review.text}</Text>
                    </Box>
                  )
                )}
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
