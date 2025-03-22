import { Container} from '@mui/material'
import Button from '@mui/material/Button';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import axiosInstance, { productImageShow } from './BaseUrl';
import { toast } from "react-toastify";
import SweetAlertComponent from "./SweetAlert";
const Show = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [idvalue, setIdValue] = useState();
  const [modal, setModal] = useState(false);

  const getAlldata = async () => {
    const response=await axiosInstance.get("/product")
    setLeaderboardData(response?.data?.data)
  };
  useEffect(() => {
    getAlldata();
  }, []);
  
  const sendData = async (e) => {
    const formdata = new FormData();
    formdata.append("id", idvalue);
    try {
      const response = await axiosInstance.delete(`/product/delete/${idvalue}`,
        formdata,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.data.status === 200) {
        toast(response.data.message);
        setModal(false);
      } else {
        toast(response.data.message);
        setModal(false);
      }
    } catch (error) {
      console.error(error);
      setModal(false);
    }

    axiosInstance
      .get("/product")
      .then((response) => setLeaderboardData(response.data.data))
      .catch((error) => { });
  };

  
  return (
    <>
      <Container style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", minHeight: "50vh" }}>
      <h1>Product List</h1>
      <Button variant="contained" style={{ marginBottom: '20px', backgroundColor:"green" }} ><Link to="/add" style={{ textDecoration: "none", color: 'white' }}>Create Product</Link></Button>
      <TableContainer component={Paper} style={{ marginTop: '20px',backgroundColor:"pink"}}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Sl No</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          {leaderboardData.length <= 0 && <h2 style={{ textAlign: "center"  ,color:"purple"}}>No Data Found </h2>}
          <TableBody  >
            {leaderboardData.map((item, index) => (
              <TableRow key={item._id}>
                <TableCell>{index+1}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell>{item.price}</TableCell>
                <TableCell>
                  <img src={item.image ? productImageShow(item.image)   : "https://buffer.com/library/content/images/size/w1200/2023/10/free-images.jpg"} style={{ maxWidth: '100%', maxHeight: '80px' }} alt="images" />
                </TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell>

                  <Button variant="contained" style={{ marginRight: '10px' }} color="secondary" component={Link} to={`/update/${item._id}`}>
                  Update
                  </Button>

                  <Button variant="contained" color="primary"
                  onClick={() => {
                    setIdValue(item._id);
                    setModal(true);
                  }}>Delete</Button>
                </TableCell>
              </TableRow>
            ))} 
          </TableBody>
        </Table>
      </TableContainer>

      {modal && (
        <SweetAlertComponent
          confirm={sendData}
          cancel={() => {
            setModal(false); 
            setIdValue(null); 
          }}
          title={"Are you sure?"}
          subtitle={"You will not be able to recover!"}
        />
      )}
    </Container>
    </>
  )
}

export default Show
