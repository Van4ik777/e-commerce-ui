import { useMemo, useState } from 'react';
import {
  Anchor,
  Box,
  Breadcrumbs,
  Checkbox,
  Collapse,
  Group,
  Pagination,
  SimpleGrid,
  Skeleton,
  Text,
} from '@mantine/core';
import { PAGES } from '@/constants/PAGES';
import { productsService } from '@/services/products/products.service';
import { Filtercard } from '../molecules/Filtercard';
import { ProductCard } from '../molecules/ProductCard';
import { useQuery } from '@tanstack/react-query';

const menuItems = [
  'All',
  'Tables',
  'Chairs',
  'Armchairs',
  'Sofas',
  'Shelves',
  'Decor',
  'Carpets',
  'Lighting',
];

const additionalFilters = [
  'Wood',
  'Metal',
  'Plastic',
  'Modern',
  'Vintage',
  'Glass',
  'Fabric',
  'Leather',
  'Stone',
  'Concrete',
];

export function Catalog() {
  const items = useMemo(
    () =>
      [
        { title: 'Main page', href: PAGES.home },
        { title: 'Catalog', href: PAGES.catalog },
      ].map((item) => (
        <Anchor href={item.href} key={item.title}>
          {item.title}
        </Anchor>
      )),
    []
  );

  const { data: productsData, isLoading, isFetching } = useQuery({
    queryKey: ['products'],
    queryFn: productsService.getAll,
    staleTime: 60000,
  });

  const productsArray = Array.isArray(productsData) ? productsData : [];
  const [active, setActive] = useState<string>('All');
  const [filters, setFilters] = useState<string[]>([]);
  const [openMaterials, setOpenMaterials] = useState(false);
  const [activePage, setActivePage] = useState(1);

  const itemsPerPage = 9;
  const totalItems = productsArray.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const toggleFilter = (filter: string) => {
    setFilters(
      filters.includes(filter)
        ? filters.filter((f) => f !== filter)
        : [...filters, filter]
    );
  };

  const loading = isLoading || isFetching;

  return (
    <>
      <Breadcrumbs mt={150} ml={80}>
        {items}
      </Breadcrumbs>

      <Skeleton visible={loading} height={40} width={200} mt="xl" ml="80px">
        <Text
          style={{
            fontFamily: 'Roboto',
            fontSize: '34px',
            fontWeight: 700,
            color: 'black',
            marginBottom: '20px',
          }}
        >
          CATALOG
        </Text>
      </Skeleton>

      <Group w="100vw" ml={5} mt={25}>
        {menuItems.map((item) => (
          <Anchor
            key={item}
            onClick={() => {
              setActive(item);
              toggleFilter(item);
            }}
            style={{
              fontSize: '18px',
              fontWeight: active === item ? 'bold' : 'normal',
              textDecoration: active === item ? 'underline' : 'none',
              cursor: 'pointer',
              marginLeft: '5vw',
            }}
          >
            {item}
          </Anchor>
        ))}
      </Group>

      <div style={{ marginTop: '50px', marginLeft: '80px', display: 'flex' }}>
        <div style={{ marginRight: '50px' }}>
          <Skeleton visible={loading} height={32} width={150} mb="sm">
            <Text style={{ fontSize: '32px', fontWeight: 700, color: 'black' }}>
              Filter by
            </Text>
          </Skeleton>

          <Text
            style={{
              fontSize: '28px',
              fontWeight: 500,
              color: 'black',
              cursor: 'pointer',
              marginBottom: '10px',
            }}
            onClick={() => setOpenMaterials(!openMaterials)}
            ml={10}
          >
            Materials
          </Text>
          <Collapse in={openMaterials}>
            <div style={{ marginTop: '20px', marginLeft: '30px', gap: '5px' }}>
              {additionalFilters.map((filter) => (
                <Skeleton visible={loading} key={filter} height={30} mb="sm">
                  <Checkbox
                    label={filter}
                    checked={filters.includes(filter)}
                    onChange={() => toggleFilter(filter)}
                    size="lg"
                  />
                </Skeleton>
              ))}
            </div>
          </Collapse>
        </div>

        <div style={{ flex: 1 }}>
          <Group style={{ marginBottom: '20px' }}>
            {filters.map((filter) => (
              <Filtercard key={filter} label={filter} onClick={() => toggleFilter(filter)} />
            ))}
          </Group>

          <SimpleGrid cols={3} spacing="lg" style={{ margin: '0 auto', maxWidth: '1200px' }}>
            {(loading ? Array.from({ length: 9 }) : productsArray
              .slice((activePage - 1) * itemsPerPage, activePage * itemsPerPage)
            ).map((product: any, index: number) => (
              <Box w={300} key={product?.id || index}>
                {loading ? (
                  <Skeleton height={380} width={300} radius="md" />
                ) : (
                  <ProductCard
                    imageSrc={product.images ? product.images[0] : null}
                    productName={product.name}
                    price={`$${product.price}`}
                    colors={product.productDetails?.[0]?.colors || []}
                    rating={product.reviews?.length || 0}
                    reviewsCount={product.reviews?.length || 0}
                    productId={product.id}
                    productType={active}
                    mystyles={{ width: '300px' }}
                  />
                )}
              </Box>
            ))}
          </SimpleGrid>

          <Skeleton
            visible={loading}
            height={40}
            width={300}
            mt={50}
            mx="auto"
            mb={90}
            style={{
              marginTop: '30px',
              display: 'flex',
              justifyContent: 'center',
              marginLeft: '615px', 
            }}          >
            {!loading && (
              <Pagination
                onChange={setActivePage}
                total={totalPages}
                style={{ marginTop: '30px', display: 'flex', justifyContent: 'center' }}
                mr={100}
              />
            )}
          </Skeleton>

        </div>
      </div>
    </>
  );
}
