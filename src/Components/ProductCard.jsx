import React, { useState } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Rating,
  IconButton,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

const ProductCard = ({ product }) => {
  const [liked, setLiked] = useState(false);

  const toggleLike = () => {
    setLiked(!liked);
  };

  return (
    <Card
      sx={{
        maxWidth: 250,
        margin: "auto",
        boxShadow: 3,
        position: "relative",
        borderRadius: "10px",
      }}
    >
      <IconButton
        onClick={toggleLike}
        sx={{
          position: "absolute",
          top: 10,
          right: 10,
          backgroundColor: "white",
          borderRadius: "50%",
          boxShadow: "0px 4px 6px rgba(0,0,0,0.2)",
          "&:hover": { backgroundColor: "rgba(255,255,255,0.8)" },
        }}
      >
        {liked ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
      </IconButton>

      <CardMedia
        component="img"
        height="194"
        image={product.thumbnail || "https://via.placeholder.com/150"}
        alt={product.title || "Product Image"}
      />

      <CardContent>
        <Typography variant="h6" noWrap>
          {product.title || "Product Name"}
        </Typography>

        <Typography
          variant="body2"
          color="textSecondary"
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
        >
          {product.description || "No description available"}
        </Typography>

        <Typography variant="h6" color="primary">
          ${product.price || "N/A"}
        </Typography>

        <Rating value={product.rating || 0} readOnly />
      </CardContent>
    </Card>
  );
};

export default ProductCard;
