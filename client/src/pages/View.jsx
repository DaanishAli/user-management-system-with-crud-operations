import { Button, TextField } from "@mui/material";
import { Box, Container } from "@mui/system";
import React from "react";
import { useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";

const View = () => {
  const [user, setUser] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      getSingleUser(id);
    }
  }, [id]);
  const getSingleUser = async (id) => {
    const response = await axios.get(`http://localhost:5000/user/${id}`);
    if (response.status === 200) {
      setUser({ ...response.data[0] });
    }
  };

  return (
    <Container maxWidth="xs">
      <Box
        component="form"
        sx={{
          mt: 5,
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          variant="outlined"
          size="small"
          fullWidth
          sx={{ mt: 1 }}
          value={`Id:${id}`}
        />
        <TextField
          variant="outlined"
          size="small"
          fullWidth
          sx={{ mt: 1 }}
          value={`Name:${user && user.name}`}
        />
        <TextField
          variant="outlined"
          size="small"
          fullWidth
          sx={{ mt: 1 }}
          value={`Email:${user && user.email}`}
        />
        <TextField
          variant="outlined"
          size="small"
          fullWidth
          sx={{ mt: 1 }}
          value={`Contact:${user && user.contact}`}
        />
        <Box textAlign="center">
          <Link to={"/"} style={{ textDecoration: "none" }}>
            <Button
              variant="contained"
              sx={{ mt: 1 }}
              size="small"
              color="secondary"
            >
              Go Back
            </Button>
          </Link>
        </Box>
      </Box>
    </Container>
  );
};

export default View;
