import { PAGES } from "@/constants/PAGES";
import {
  Anchor,
  Box,
  Breadcrumbs,
  Group,
  Text,
  Checkbox,
  Slider,
  Collapse,
  Pagination,
  SimpleGrid,
} from "@mantine/core";
import { useState } from "react";
import { Filtercard } from "../molecules/Filtercard";
import { ProductCard } from "../molecules/ProductCard";
import { useQuery } from "react-query";
import { productsService } from "@/services/products/products.service";

export function Catalog() {
  const items = [
    { title: "Main page", href: PAGES.home },
    { title: "Catalog", href: PAGES.catalog },
  ].map((item, index) => (
    <Anchor href={item.href} key={index}>
      {item.title}
    </Anchor>
  ));

  const { data: productsData } = useQuery("products", productsService.getAll);
  const productsArray = Array.isArray(productsData) ? productsData : [];

  const [active, setActive] = useState("All");
  const [filters, setFilters] = useState<string[]>([]);
  const [openMaterials, setOpenMaterials] = useState(false);
  const [activePage, setActivePage] = useState(1);
  console.log(productsArray)

  const itemsPerPage = 9;
  const totalItems = productsData?.length || 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  console.log(totalPages)

  const menuItems = [
    "All",
    "Tables",
    "Chairs",
    "Armchairs",
    "Sofas",
    "Shelves",
    "Decor",
    "Carpets",
    "Lighting",
  ];

  const additionalFilters = [
    "Wood",
    "Metal",
    "Plastic",
    "Modern",
    "Vintage",
    "Glass",
    "Fabric",
    "Leather",
    "Stone",
    "Concrete",
  ];


  const toggleFilter = (filter: string) => {
    setFilters(
      filters.includes(filter)
        ? filters.filter((f) => f !== filter)
        : [...filters, filter]
    );
  };


  return (
    <>
      <Breadcrumbs mt={150} ml={80}>
        {items}
      </Breadcrumbs>
      <div
        style={{
          fontFamily: "Roboto",
          fontSize: "34px",
          fontWeight: 700,
          color: "black",
          margin: "50px 0 20px 80px",
        }}
      >
        CATALOG
      </div>
      <Group w={"100vw"} ml={5} mt={25}>
        {menuItems.map((item) => (
          <Anchor
            key={item}
            onClick={() => {
              setActive(item);
              toggleFilter(item);
            }}
            style={{
              fontSize: "18px",
              fontWeight: active === item ? "bold" : "normal",
              textDecoration: active === item ? "underline" : "none",
              cursor: "pointer",
              marginLeft: "5vw",
            }}
          >
            {item}
          </Anchor>
        ))}
      </Group>

      <div style={{ marginTop: "50px", marginLeft: "80px", display: "flex" }}>
        <div style={{ marginRight: "50px" }}>
          <Text style={{ fontSize: "32px", fontWeight: 700, color: "black", marginBottom: "10px" }}>
            Filter by
          </Text>

          <Text
            style={{ fontSize: "28px", fontWeight: 500, color: "black", cursor: "pointer", marginBottom: "10px" }}
            onClick={() => setOpenMaterials(!openMaterials)}
            ml={10}
          >

            Materials 
          </Text>
          <Collapse in={openMaterials}>
            <div style={{ marginTop: "20px", marginLeft: "30px", gap: "5px" }}>
              {additionalFilters.map((filter, index) => (
                <Checkbox
                  key={index}
                  label={filter}
                  checked={filters.includes(filter)}
                  onChange={() => toggleFilter(filter)}
                  style={{ margin: "5px 0", marginTop: "15px" }}
                  size="lg" 
                />
              ))}
            </div>
          </Collapse>


        </div>

        <div style={{ flex: 1 }}>
          <Group style={{ marginBottom: "20px" }}>
            {filters.map((filter, index) => (
              <Filtercard key={index} label={filter} onClick={() => toggleFilter(filter)} />
            ))}
          </Group>

          <SimpleGrid
              cols={3}
              spacing="lg"
              style={{
                margin: '0 auto',
                maxWidth: '1200px', 
              }}
            >              
            {productsArray
                .slice((activePage - 1) * itemsPerPage, activePage * itemsPerPage)
                .map((product) => (
                  <Box w={300}>
                  <ProductCard
                    key={product.id}
                    imageSrc={product.images[0]} 
                    productName={product.name}
                    price={`$${product.price}`}
                    colors={product.productDetails[0]?.colors || []}
                    rating={product.reviews?.length || 0}
                    reviewsCount={product.reviews?.length || 0}
                    productId={product.id}
                    productType={active}
                    mystyles={{width: '300px'}}
                  />
                  </Box>
                  
                ))}
          </SimpleGrid>
          <Pagination
            onChange={setActivePage}
            total={totalPages}
            style={{ marginTop: "30px", display: "flex", justifyContent: "center" }}
            mr={100}
            mb={100}
            mt={50}
          />
        </div>
      </div>
    </>
  );
}
