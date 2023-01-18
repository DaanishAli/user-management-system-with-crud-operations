import React, { useEffect } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Container } from "@mui/system";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Home = () => {
  const [data, setData] = React.useState();
  const getUsers = async () => {
    const response = await axios.get("http://localhost:5000/users");
    if (response.status === 200) {
      setData(response.data);
    }
  };
  const onDeleteUser = async (id) => {
    if (window.confirm("Are you sure that you wanted to delete that user")) {
      const response = await axios.delete(`http://localhost:5000/user/${id}`);
      if (response.status === 201) {
        toast.success(response.data.message);
        getUsers();
      }
      if (response.status === 409) {
        toast.error(response.data.message);
      }
    }
  };
  useEffect(() => {
    getUsers();
  }, []);
  return (
    <Container maxWidth="md">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                N0.
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Name
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Email
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Contact
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((user, ind) => (
              <TableRow
                key={user._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center">{ind + 1}</TableCell>
                <TableCell align="center">{user.name}</TableCell>
                <TableCell align="center">{user.email}</TableCell>
                <TableCell align="center">{user.contact}</TableCell>
                <TableCell align="center">
                  <Button
                    variant="contained"
                    sx={{ mx: 1 }}
                    size="small"
                    color="error"
                    onClick={() => onDeleteUser(user._id)}
                  >
                    Delete
                  </Button>
                  <Button
                    component={Link}
                    to={`/update/${user._id}`}
                    variant="contained"
                    sx={{ mx: 1 }}
                    size="small"
                    color="success"
                  >
                    Edit
                  </Button>
                  <Button
                    component={Link}
                    to={`/view/${user._id}`}
                    variant="contained"
                    sx={{ mx: 1 }}
                    size="small"
                    color="secondary"
                  >
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Home;
