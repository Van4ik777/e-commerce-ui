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
  const {data} = useQuery({queryFn: productsService.getAll})
  console.log(data)

  const [active, setActive] = useState("All");
  const [filters, setFilters] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [colorFilters, setColorFilters] = useState<string[]>([]);
  const [typeFilters, setTypeFilters] = useState<string[]>([]);
  const [openMaterials, setOpenMaterials] = useState(false);
  const [openColors, setOpenColors] = useState(false);
  const [openTypes, setOpenTypes] = useState(false);
  const [activePage, setActivePage] = useState(1);

  const itemsPerPage = 12; 
  const totalItems = 36;
  const totalPages = Math.ceil(totalItems / itemsPerPage); 

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

  const colorOptions = ["Red", "Blue", "Green", "Yellow", "Black", "White"];
  const typeOptions = [
    "Modern",
    "Classic",
    "Industrial",
    "Minimalist",
    "Rustic",
    "Bohemian",
    "Art Deco",
  ];

  const products = Array.from({ length: totalItems }, (_, index) => ({
    imageSrc: `https://via.placeholder.com/300?text=Product+${index + 1}`,
    productName: `Product ${index + 1}`,
    price: `$${(index + 1) * 10}`, 
    colors: ["Red", "Blue", "Green"],
    rating: Math.floor(Math.random() * 5) + 1, 
    reviewsCount: Math.floor(Math.random() * 100), 
    productId: `${index + 1}`,
    productType: active,
  }));

  const toggleFilter = (filter: string) => {
    setFilters(
      filters.includes(filter)
        ? filters.filter((f) => f !== filter)
        : [...filters, filter]
    );
  };

  const toggleColorFilter = (color: string) => {
    setColorFilters(
      colorFilters.includes(color)
        ? colorFilters.filter((c) => c !== color)
        : [...colorFilters, color]
    );
  };

  const toggleTypeFilter = (type: string) => {
    setTypeFilters(
      typeFilters.includes(type)
        ? typeFilters.filter((t) => t !== type)
        : [...typeFilters, type]
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
          <Text
            style={{
              fontSize: "24px",
              fontWeight: 700,
              color: "black",
              marginBottom: "10px",
            }}
          >
            Filter by
          </Text>

          <Text
            style={{
              fontSize: "20px",
              fontWeight: 500,
              color: "black",
              cursor: "pointer",
              marginBottom: "10px",
            }}
            onClick={() => setOpenMaterials(!openMaterials)}
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
                />
              ))}
            </div>
          </Collapse>

          <Text
            style={{
              fontSize: "20px",
              fontWeight: 500,
              color: "black",
              cursor: "pointer",
              marginTop: "30px",
              marginBottom: "10px",
            }}
            onClick={() => setOpenColors(!openColors)}
          >
            Colors
          </Text>
          <Collapse in={openColors}>
            <div style={{ marginTop: "20px", marginLeft: "30px", gap: "5px" }}>
              {colorOptions.map((color, index) => (
                <Checkbox
                  key={index}
                  label={color}
                  checked={colorFilters.includes(color)}
                  onChange={() => toggleColorFilter(color)}
                  style={{ margin: "5px 0", marginTop: "15px" }}
                />
              ))}
            </div>
          </Collapse>

          <Text
            style={{
              fontSize: "20px",
              fontWeight: 500,
              color: "black",
              cursor: "pointer",
              marginTop: "30px",
              marginBottom: "10px",
            }}
            onClick={() => setOpenTypes(!openTypes)}
          >
            Types
          </Text>
          <Collapse in={openTypes}>
            <div style={{ marginTop: "20px", marginLeft: "30px", gap: "5px" }}>
              {typeOptions.map((type, index) => (
                <Checkbox
                  key={index}
                  label={type}
                  checked={typeFilters.includes(type)}
                  onChange={() => toggleTypeFilter(type)}
                  style={{ margin: "5px 0", marginTop: "15px" }}
                />
              ))}
            </div>
          </Collapse>
        </div>

        <div style={{ flex: 1 }}>
          <Group style={{ marginBottom: "20px" }}>
            {filters.map((filter, index) => (
              <Filtercard
                key={index}
                label={filter}
                onClick={() => toggleFilter(filter)}
              />
            ))}
            {colorFilters.map((color, index) => (
              <Filtercard
                key={`color-${index}`}
                label={color}
                onClick={() => toggleColorFilter(color)}
              />
            ))}
            {typeFilters.map((type, index) => (
              <Filtercard
                key={`type-${index}`}
                label={type}
                onClick={() => toggleTypeFilter(type)}
              />
            ))}
          </Group>

          <SimpleGrid cols={3} spacing="lg">
            {products
              .slice((activePage - 1) * itemsPerPage, activePage * itemsPerPage) 
              .map((product, index) => (
                <ProductCard
                  key={product.productId}
                  imageSrc={product.imageSrc}
                  productName={product.productName}
                  price={product.price}
                  colors={product.colors}
                  rating={product.rating}
                  reviewsCount={product.reviewsCount} productId={product.productId} productType={product.productType}                />
              ))}
          </SimpleGrid>

          <Pagination
            page={activePage}
            onChange={setActivePage}
            total={totalPages}
            style={{
              marginTop: "30px",
              display: "flex",
              justifyContent: "center",
            }}
          />
        </div>
      </div>
    </>
  );
}
