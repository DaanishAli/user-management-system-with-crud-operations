import React from "react";
import Box from "@mui/material/Box";
import { NavLink } from "react-router-dom";
import { Typography } from "@mui/material";

const pages = [
  {
    name: "Home",
    url: "/",
  },
  {
    name: "Add",
    url: "/add",
  },
];

const Header = () => {
  return (
    <Box
      sx={{
        height: "60px",
        borderBottom: 1,
        display: "flex",
        alignItems: "center",
        px: 5,
      }}
    >
      {pages.map((page, ind) => (
        <NavLink
          key={ind}
          to={page.url}
          style={({ isActive }) => ({
            textDecoration: "none",
            color: isActive ? "#fff" : "#000000",
            marginLeft: "20px",
            padding: "0 5px",
            background: isActive ? "#7600dc" : "#f0f0f0",
          })}
        >
          <Typography sx={{ fontSize: "20px" }}>{page.name}</Typography>
        </NavLink>
      ))}
    </Box>
  );
};

export default Header;
