import React, { useMemo, useState } from 'react';
import {
  AiOutlineHeart,
  AiOutlineSearch,
  AiOutlineShoppingCart,
} from 'react-icons/ai';
import { Link, useParams,useNavigate } from 'react-router-dom';
import {
  ActionIcon,
  Anchor,
  Box,
  Breadcrumbs,
  Button,
  Flex,
  Modal,
  Tabs,
  Text,
  Skeleton,
  TextInput,
  PasswordInput,
} from '@mantine/core';
import { productsService } from '@/services/products/products.service';
import { ProductImages } from '../molecules/ProductImages';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/store/auth.store';
import { PAGES } from '@/constants/PAGES';
import { LoginForm } from '../organisms/forms/LoginForm';
import { RegisterForm } from '../organisms/forms/RegisterForm';

export const ProductPage: React.FC = () => {
  const { productType, productId } = useParams();
  const queryKey = productId ? ['product', productId] : ['product', 'undefined'];
  const { isAuth, register, login } = useAuth();
  const [loginOpened, setLoginOpened] = useState(false);

  const navigate = useNavigate();
  const [opened, setOpened] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [myError, setMyError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  });

  const {
    isLoading,
    data: product,
  } = useQuery({
    queryKey,
    queryFn: () => productsService.getOneWithDetails(Number(productId)),
    enabled: Boolean(productId),
  });

  const items = useMemo(() => {
    const itemList = [
      { title: 'Home', href: '/home' },
      { title: 'Catalog', href: '/catalog' },
      productType && { title: productType, href: `/catalog/${productType}` },
      productId && { title: `Product ${productId}`, href: '#' },
    ].filter(Boolean);

    return itemList.map((item: any) => (
      <Anchor component={Link} to={item.href} key={item.title} style={{ fontSize: '24px' }}>
        {item.title}
      </Anchor>
    ));
  }, [productType, productId]);
  const handleChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
     setFormData({ ...formData, [field]: event.target.value });
   };

   const handleReg = () => {
     if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
       setMyError('All fields are required.');
       return;
     }
     if (formData.password !== formData.confirmPassword) {
       setMyError('Passwords do not match.');
       return;
     }
     setMyError('');
     register(formData);
     setOpened(false);
     navigate(PAGES.home);
   };

   const handleLogin = () => {
     if (!formData.email || !formData.password) {
       setMyError('Please enter email and password.');
       return;
     }
     setMyError('');
     login({ email: formData.email, password: formData.password });
     setOpened(false);
     navigate(PAGES.home);
   };

   // Open modal and reset form for login/register
   const toggleModal = (register: boolean) => {
     setIsRegister(register);
     setOpened(true);
     setMyError('');
     setFormData({
       email: '',
       username: '',
       password: '',
       confirmPassword: '',
     });
   };
   const loading = isLoading || !product;

  return (
    <>
      {/* Login Modal */}
      <Modal
        opened={loginOpened}
        onClose={() => setLoginOpened(false)}
        title="Sign In"
        centered
      >
        {/* Simple login form */}
        <TextInput label="Email" placeholder="your@email.com" mb="md" />
        <PasswordInput label="Password" placeholder="Your password" mb="md" />
        <Button fullWidth onClick={() => alert('Implement login logic here')}>
          Log In
        </Button>
      </Modal>

      <Box mt="40px">
        <Flex align="center" justify="space-between">
          <Breadcrumbs ml="100px" style={{ fontSize: '32px' }}>
            {items}
          </Breadcrumbs>
          <Flex align="center" mr="10%">
            <ActionIcon size="xl" variant="transparent" color="black" mr="10px">
              <AiOutlineSearch style={{ fontSize: '32px' }} />
            </ActionIcon>
            <ActionIcon size="xl" variant="transparent" color="black" mr="10px">
              <AiOutlineHeart style={{ fontSize: '32px' }} />
            </ActionIcon>

            {!isAuth && (
                <>
                  <Button color="dark" radius="sm" onClick={() => toggleModal(false)}>
                    Sign In
                  </Button>

                  <Modal
                    opened={opened}
                    onClose={() => {
                      setOpened(false);
                      setFormData({
                        email: '',
                        username: '',
                        password: '',
                        confirmPassword: '',
                      });
                      setMyError('');
                    }}
                    title={isRegister ? 'Sign Up' : 'Sign In'}
                    centered
                    styles={{
                      title: { fontSize: '24px', fontWeight: 'bold', textAlign: 'center' },
                    }}
                  >
                    {isRegister ? (
                      <RegisterForm
                        formData={formData}
                        onChange={handleChange}
                        onRegister={handleReg}
                        onSwitchToLogin={() => setIsRegister(false)}
                      />
                    ) : (
                      <LoginForm
                        formData={formData}
                        onChange={handleChange}
                        onLogin={handleLogin}
                        onSwitchToRegister={() => setIsRegister(true)}
                      />
                    )}
                  </Modal>
                </>
              )}

            <ActionIcon size="xl" variant="transparent" color="black">
              <AiOutlineShoppingCart style={{ fontSize: '32px' }} />
            </ActionIcon>
          </Flex>
        </Flex>
      </Box>

      <Flex mt="40px" ml="70px" mr="70px">
        <Box>
          {loading ? (
            <Skeleton height={400} width={400} radius="md" />
          ) : (
            <ProductImages images={product.product.images} />
          )}
        </Box>

        <Box ml="80px" style={{ flex: 1 }}>
          <Skeleton visible={loading} height={40} mb="md">
            <Text size="xl" style={{ fontSize: '36px', textTransform: 'uppercase' }}>
              {product?.product.name}
            </Text>
          </Skeleton>

          <Skeleton visible={loading} height={28} mb="sm">
            <Text color="dimmed" style={{ fontSize: '24px', textTransform: 'uppercase' }}>
              Category: {product?.product.category.name}
            </Text>
          </Skeleton>

          <Skeleton visible={loading} height={30} mb="md">
            <Text size="xl" color="blue" style={{ fontSize: '28px' }}>
              ${product?.product.price}
            </Text>
          </Skeleton>

          <Skeleton visible={loading} height={60} mb="md">
            <Text color="dimmed" style={{ fontSize: '20px', textTransform: 'uppercase' }}>
              {product?.product.description}
            </Text>
          </Skeleton>

          <Flex mt="200" w={800} ml={200}>
            <Skeleton visible={loading} height={60} style={{ flex: 1, marginRight: '10px' }}>
              <Button
                color="red"
                fullWidth
                h={60}
                style={{
                  backgroundColor: 'red',
                  color: 'white',
                  fontSize: '18px',
                  borderRadius: 0,
                }}
              >
                Buy Now
              </Button>
            </Skeleton>

            <Skeleton visible={loading} height={60} style={{ flex: 1 }}>
              <Button
                variant="outline"
                color="dark"
                fullWidth
                h={60}
                style={{
                  fontSize: '18px',
                  borderRadius: 0,
                  borderColor: 'black',
                  color: 'black',
                }}
              >
                Add to Cart
              </Button>
            </Skeleton>
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
            <Skeleton visible={loading} height={80}>
              <Text style={{ fontSize: '20px' }}>
                {product?.product.description}
              </Text>
            </Skeleton>
          </Tabs.Panel>

          <Tabs.Panel value="characteristics" pt="xs">
            {loading ? (
              <Skeleton height={120} />
            ) : product?.product?.id > 0 ? (
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
            {loading ? (
              [...Array(3)].map((_, i) => (
                <Skeleton key={i} height={60} mt="sm" />
              ))
            ) : product?.reviews && product.reviews.length > 0 ? (
              <Box>
                {product.reviews.map((review: any) => (
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
