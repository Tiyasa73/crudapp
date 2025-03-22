import {
  Container,
  TextField,
  Typography,
  Button,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance, { productImageShow } from "./BaseUrl";

export default function UpdateProduct() {
  const { id } = useParams();
  const [formData, setFormData] = useState({ name: '', category: '', price: '', description: '', image: null });
  const [previewImage, setPreviewImage] = useState(null);
  const navigate = useNavigate();

  
  useEffect(() => {
      const fetchItem = async () => {
          try {
              const response = await axiosInstance.get(`/product/${id}`);
              const productData = response.data.data;
              setFormData(productData);
              
              if (productData.image) {
                  setPreviewImage(productImageShow(productData.image));
              }
          } catch (error) {
              console.error('Error fetching item:', error);
          }
      };
      fetchItem();
  }, [id]);
 
  const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
      const file = e.target.files[0];
      if (file) {
          setFormData((prev) => ({ ...prev, image: file })); 
          setPreviewImage(URL.createObjectURL(file)); 
      }
  };

  const handleSubmit = async () => {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('category', formData.category);
      formDataToSend.append('price', formData.price);
      formDataToSend.append('description', formData.description);

      if (formData.image instanceof File) {
          formDataToSend.append('image', formData.image); 
      }

      try {
          await axiosInstance.post(`/product/update/${id}`, formDataToSend, {
              headers: { 'Content-Type': 'multipart/form-data' }
          });
          toast('Item updated successfully');
          navigate('/');
      } catch (error) {
          console.error('Error updating item:', error);
          toast.error('Failed to update product');
      }
  };

  return (
      <Container>
          <Typography variant="h4" gutterBottom>Update Product</Typography>
          {previewImage && <img src={previewImage} alt="Product" style={{maxWidth: '100%', maxHeight: '200px', marginBottom: '10px' }} />}
          <TextField
              margin="dense"
              required="true"
              label="Name"
              name="name"
              fullWidth
              value={formData.name}
              onChange={handleChange}
          />
          <TextField
              margin="dense"
              label="Category"
              name="category"
              fullWidth
              value={formData.category}
              onChange={handleChange}
          />
          <TextField
              margin="dense"
              label="Price"
              name="price"
              fullWidth
              value={formData.price}
              onChange={handleChange}
          />
          <TextField
              margin="dense"
              label="Description"
              name="description"
              fullWidth
              value={formData.description}
              onChange={handleChange}
          />
          <TextField
              type="file"
              margin="dense"
              name="image"
              fullWidth
              onChange={handleImageChange}
              style={{ marginTop: '10px' }}
          />
          <Button variant="contained" color="primary" onClick={handleSubmit} style={{ marginTop: '20px' }}>Update</Button>
      </Container>
  );
}
