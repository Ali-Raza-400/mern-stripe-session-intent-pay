import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box, Grid, Pagination } from "@mui/material";

const PaginationComponent = () => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(0);
  const [products, setProducts] = React.useState([]);

  React.useEffect(() => {
    const fetchProducts = async (page) => {
      const response = await fetch(
        `http://localhost:5000/api/products/list?page=${page}&pageSize=10`
      );
      const data = await response.json();
      setProducts(data.data);
      setTotalPages(data.totalPages);
    };
    fetchProducts(currentPage);
  }, [currentPage]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Product List
      </Typography>
      <Grid container spacing={4}>
        {products.map((product, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                maxWidth: 345,
                borderRadius: 2,
                boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
                transition: "transform 0.3s ease-in-out",
                "&:hover": {
                  transform: "translateY(-10px)",
                  boxShadow: "0px 6px 25px rgba(0, 0, 0, 0.2)",
                },
              }}
            >
              <CardMedia
                sx={{ height: 200 }}
                image={
                  product.image || "/static/images/cards/default-image.jpg"
                }
                title={product.name}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {product.name || "Product Name"}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {product.description || "No description available."}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Share</Button>
                <Button size="small">Learn More</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: 4,
        }}
      >
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
          variant="outlined"
          shape="rounded"
        />
      </Box>
    </Box>
  );
};

export default PaginationComponent;
