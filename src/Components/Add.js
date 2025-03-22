import React, { useState } from 'react'
import { Container, Typography, TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axiosInstance from './BaseUrl';
import { toast } from 'react-toastify';

const Add = () => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    description: '',
    image: null, 
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = async () => {
    try {
      const data = new FormData(); 
      data.append('name', formData.name);
      data.append('category', formData.category);
      data.append('price', formData.price);
      data.append('description', formData.description);
      if (formData.image) {
        data.append('image', formData.image); 
      }
      await axiosInstance.post('/product/create', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast('Item added successfully');
      navigate('/');
    } catch (error) {
      console.error('Error adding item:', error.response.data.message);
      toast(error.response.data.message, { type: 'error' });
    }
  };
  
  return (
    <>
     <Container>
      <Typography variant="h3" gutterBottom>Add New Product</Typography>
      <TextField
        margin="dense"
        label="Name"
        name="name"
        fullWidth
        value={formData.name}
        onChange={handleChange}
        onError="Name is required"
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
      <div>
        <p style={{ textAlign: 'left', fontSize: '20px', marginBottom: '-5px' }}>Image</p>
        <TextField
          margin="dense"
          name="image"
          fullWidth
          type="file"
          onChange={handleFileChange} 
        />
          {formData.image && (
            <img
              src={URL.createObjectURL(formData.image)}
              alt="Preview"
              style={{ maxWidth: '100%', maxHeight: '100px' }}
            />
          )}
      </div>
      <Button variant="contained" color="secondary" onClick={handleSubmit} style={{ marginTop: '20px' }}>Add Product</Button>
    </Container>
      
    </>
  )
}

export default Add
