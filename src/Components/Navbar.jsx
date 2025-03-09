import React, { useState } from "react";
import { AppBar, Toolbar, Typography, InputBase, Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { searchProducts } from "../Utils/Api";

const searchBoxStyle = {
  position: "relative",
  borderRadius: "30px",
  backgroundColor: alpha("#fff", 0.15),
  "&:hover": { backgroundColor: alpha("#fff", 0.25) },
  width: "100%",
  maxWidth: "500px",
  height: "50px",
  display: "flex",
  alignItems: "center",
  padding: "10px 15px",
};

const searchIconWrapperStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  paddingRight: "15px",
  color: "#666",
};

const navLinkStyle = {
  color: "inherit",
  fontSize: "18px",
  textDecoration: "none",
  textTransform: "none",
};

const Navbar = ({setProducts, products}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);

  const fetchSearchResults = async (query) => {
    try {
      const data = await searchProducts(query);
      setProducts(data || []);
  
    } catch (error) {
      console.error("Error fetching search results:", error);
      toast.error("❌ Something went wrong while searching!");
    }
  };
  

  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    if (query.length >= 3) {
      if (searchTimeout) clearTimeout(searchTimeout);
      setSearchTimeout(setTimeout(() => fetchSearchResults(query), 500));
    }
  };

  const navLinks = ["Store", "Account", "Wishlist", "Basket"];

  return (
    <AppBar position="static" sx={{ background: "none", color: "black", padding: "10px 0" }}>
      <ToastContainer position="top-right" autoClose={3000} />

      <Toolbar sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}>

        <Typography variant="h5" sx={{ fontWeight: "bold" }}>MoBooM</Typography>


        <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
          <Box sx={searchBoxStyle}>
            <Box sx={searchIconWrapperStyle}>
              <SearchIcon sx={{ fontSize: "28px" }} />
            </Box>
            <InputBase
              placeholder="Search products..."
              inputProps={{ "aria-label": "search" }}
              value={searchQuery}
              onChange={handleSearchChange}
              sx={{ color: "inherit", fontSize: "18px", width: "100%" }}
            />
          </Box>
        </Box>

       
        <Box sx={{ display: "flex", gap: 3 }}>
          {navLinks.map((link, index) => (
            <Typography key={index} variant="button" component="a" href="#" sx={navLinkStyle}>
              {link}
            </Typography>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
