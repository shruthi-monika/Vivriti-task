import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { Row, Col, Container } from "react-bootstrap";
import {
  getProducts,
  getCategories,
  getProductsByCategory,
} from "../Utils/Api";
import Loader from "../Utils/Loader";
import {
  FormControl,
  MenuItem,
  InputLabel,
  Select,
  ListItemText,
  Typography,
} from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductList = ({ products, setProducts }) => {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await getProducts();
      setProducts(data || []);
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
      toast.error("❌ Something went wrong while fetching products!");
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
      setCategories([]);
      toast.error("❌ Something went wrong while fetching categories!");
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const handleCategoryChange = async (event) => {
    const selectedSlug = event.target.value;
    setSelectedCategory(selectedSlug);

    if (selectedSlug === "") {
      fetchProducts();
      return;
    }

    setLoading(true);
    try {
      const data = await getProductsByCategory(selectedSlug);
      setProducts(data || []);
    } catch (error) {
      console.error("Error filtering by category:", error);
      setProducts([]);
      toast.error("❌ Something went wrong while filtering products!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <ToastContainer position="top-right" autoClose={3000} />

      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "200px",
          }}
        >
          <Loader />
        </div>
      ) : (
        <>
          <Row>
            <Col xs={12}>
              <FormControl
                sx={{
                  m: 1,
                  width: 300,
                  backgroundColor: "#fff",
                  borderRadius: "10px",
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                  marginBottom: "20px",
                }}
              >
                <InputLabel
                  id="category-label"
                  sx={{ color: "#555", fontWeight: "bold" }}
                >
                  Select Category
                </InputLabel>
                <Select
                  labelId="category-label"
                  id="category_id"
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                  sx={{
                    padding: "10px",
                    "&:focus": {
                      backgroundColor: "white",
                    },
                  }}
                >
                  <MenuItem value="">
                    <ListItemText
                      primary="All Categories"
                      sx={{ fontWeight: "bold", color: "#333" }}
                    />
                  </MenuItem>
                  {categories.map((category) => (
                    <MenuItem
                      key={category.slug}
                      value={category.slug}
                      sx={{
                        padding: "10px 15px",
                        "&:hover": { backgroundColor: "#f5f5f5" },
                      }}
                    >
                      <ListItemText primary={category.name} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Col>
          </Row>

          {Array.isArray(products) && products.length === 0 ? (
            <Typography
              variant="h6"
              color="textSecondary"
              sx={{ textAlign: "center", marginTop: "50px" }}
            >
              No products found
            </Typography>
          ) : (
            <Row className="g-4">
              {products.map((product) => (
                <Col key={product.id} xs={12} sm={6} md={4} lg={3}>
                  <ProductCard product={product} />
                </Col>
              ))}
            </Row>
          )}
        </>
      )}
    </Container>
  );
};

export default ProductList;
