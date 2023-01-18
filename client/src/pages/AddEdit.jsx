import { Button, TextField } from "@mui/material";
import { Box, Container } from "@mui/system";
import React from "react";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

const initialState = {
  name: "",
  email: "",
  contact: "",
};

const AddEdit = () => {
  const [state, setState] = useState(initialState);
  const { name, email, contact } = state;
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      getSingleUser(id);
    }
  }, [id]);
  const getSingleUser = async (id) => {
    const response = await axios.get(`http://localhost:5000/user/${id}`);
    if (response.status === 200) {
      setState({ ...response.data[0] });
    }
  };

  const addUser = async (data) => {
    const response = await axios.post("http://localhost:5000/user", data);
    if (response.status === 201) {
      toast.success(response.data.message);
    }
    if (response.status === 409) {
      toast.error(response.data.message);
    }
  };
  const updateUser = async (data) => {
    const response = await axios.put(`http://localhost:5000/user`, data);
    if (response.status === 201) {
      toast.success(response.data.message);
    }
    if (response.status === 409) {
      toast.error(response.data.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !contact) {
      toast.error("Plese provide value into each input field");
    } else {
      if (!id) {
        addUser(state);
      } else {
        updateUser(state);
      }
      setTimeout(() => {
        navigate("/");
      }, 500);
    }
  };

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
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
        onSubmit={handleSubmit}
      >
        <TextField
          label="Name"
          name="name"
          variant="outlined"
          size="small"
          type="text"
          fullWidth
          sx={{ mt: 1 }}
          onChange={handleInputChange}
          value={name}
        />
        <TextField
          label="Email"
          name="email"
          variant="outlined"
          size="small"
          type="email"
          fullWidth
          sx={{ mt: 1 }}
          onChange={handleInputChange}
          value={email}
        />
        <TextField
          label="Contact"
          name="contact"
          variant="outlined"
          size="small"
          type="number"
          fullWidth
          sx={{ mt: 1 }}
          onChange={handleInputChange}
          value={contact}
        />
        <Box textAlign="center">
          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 1 }}
            size="small"
            color="secondary"
          >
            {id ? "Update" : "Add"}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default AddEdit;
