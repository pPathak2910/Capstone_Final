import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import CameraIcon from "@mui/icons-material/PhotoCamera";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MiniDrawer from "../components/sidebar";
import { useEffect, useState } from "react";
import axios from "axios";
import FormDialog from "../components/dialog";
import "./Home.css";
import Divider from "@mui/material/Divider";
// const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const defaultTheme = createTheme();

export default function Album() {
  const [cards, setCards] = useState();
  const [role, setRole] = useState();
  useEffect(() => {
    handlePosts();
    const role = localStorage.getItem("role");
    setRole(role);
  }, []);

  const handlePosts = async () => {
    const posts = await axios.get("http://localhost:5000/post/");
    console.log(posts.data);
    posts.data.sort(function (a, b) {
      return new Date(b.updatedAt) - new Date(a.updatedAt);
    });
    setCards(posts.data);
  };

  const handleDelete = async (id) => {
    console.log(id);
    let config = { data: { id: id } };
    await axios.delete("http://localhost:5000/post/", config);
    window.location.reload();
  };

  return (
    <>
      <CssBaseline />
      <AppBar position="relative"></AppBar>

      <main>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Container maxWidth="md">
            <Grid container spacing={2}>
              <Grid item xs={6} md={8}>
                <Typography variant="h3"> Announcements</Typography>
              </Grid>
              <Grid item xs={6} md={4}>
                <Box>{role === "teacher" && <FormDialog />}</Box>
              </Grid>
            </Grid>
            <br />
            {/* End hero unit */}
            <Grid container spacing={1}>
              {cards &&
                cards.map((card, idx) => (
                  <Grid item key={idx} xs={12} sm={12} md={12}>
                    <Card
                      sx={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <CardContent sx={{ flexGrow: 1 }} className="HomeCard">
                        <Grid container spacing={2}>
                          <Grid
                            item
                            xs={6}
                            md={10}
                            style={{
                              display: "flex",
                              alignItems: "flex-end",
                            }}
                          >
                            <Typography
                              gutterBottom
                              variant="h5"
                              component="h2"
                              className="cardHeading"
                            >
                              {card.heading}
                            </Typography>
                          </Grid>
                          <Grid
                            item
                            xs={6}
                            md={2}
                            style={{
                              display: "flex",
                              alignItems: "flex-end",
                            }}
                          >
                            {localStorage.getItem("email") === card.email && (
                              <Button
                                onClick={() => {
                                  handleDelete(card._id);
                                }}
                                variant="contained"
                              >
                                Delete
                              </Button>
                            )}
                          </Grid>
                        </Grid>
                        <Divider variant="fullWidth" />
                        <br />
                        <Typography>
                          {card.content.split("\n").map((i, key) => {
                            return (
                              <div class="cardContent" key={key}>
                                {i}
                              </div>
                            );
                          })}
                        </Typography>
                        <br />
                        <Divider variant="fullWidth" />
                        <Grid container spacing={2}>
                          <Grid
                            item
                            xs={6}
                            md={10}
                            style={{
                              display: "flex",
                              alignItems: "flex-end",
                            }}
                          >
                            <Typography variant="body2" className="cardEmail">
                              Created by :- {card.email}
                            </Typography>
                          </Grid>
                          <Grid
                            item
                            xs={6}
                            md={2}
                            style={{
                              display: "flex",
                              alignItems: "flex-end",
                            }}
                          ></Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
            </Grid>
          </Container>
        </Box>
      </main>
    </>
  );
}
