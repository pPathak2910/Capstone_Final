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
import JobDialog from "../components/jobDialog";
import FullScreenDialog from "../components/fullScreenDialog";

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
    const posts = await axios.get("http://localhost:5000/job/");
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
    <ThemeProvider theme={defaultTheme}>
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
            {/* End hero unit */}
            <Grid container spacing={1}>
              <Box sx={{ margin: "0 auto" }}>
                {role === "teacher" && <JobDialog />}
              </Box>
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
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Typography gutterBottom variant="h5" component="h2">
                          Company &nbsp;:&nbsp;{card.company}
                        </Typography>
                        <br />
                        <Typography gutterBottom variant="h5" component="h2">
                          Profile &nbsp;:&nbsp;{card.profile}
                        </Typography>
                        <br />
                        <Typography gutterBottom variant="h5" component="h2">
                          Role &nbsp;:&nbsp;{card.type}
                        </Typography>
                        <br />
                        <Typography gutterBottom variant="h5" component="h2">
                          Location &nbsp;:&nbsp;{card.location}
                        </Typography>
                        <FullScreenDialog card={card} />
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
            </Grid>
          </Container>
        </Box>
      </main>
    </ThemeProvider>
  );
}
