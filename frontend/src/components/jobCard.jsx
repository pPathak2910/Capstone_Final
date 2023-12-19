import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions, Divider } from "@mui/material";
import FullScreenDialog from "./fullScreenDialog";
export default function JobCard({ card }) {

      if (card.type === "both") {
        (card.type = "Intern + FTE");
      } else if (card.type === "intern") {
        (card.type = "Intern Only");
      } else if (card.type === "ppo") {
        (card.type = "Intern + Performance based");
      } else {
        (card.type = "FTE ONLY");
      }
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={require("C:/Users/841pa/Desktop/goat/frontend/src/components/Tietlogo.png")}
          alt="TIET logo"
        />
        <CardContent sx={{ flexGrow: 1, backgroundColor: "#dcdcdc" }}>
          <Typography gutterBottom variant="h5" component="h2">
            Company &nbsp;:&nbsp;{card.company}
          </Typography>
          <Typography gutterBottom variant="h5" component="h2">
            Profile &nbsp;:&nbsp;{card.profile}
          </Typography>
          <Typography gutterBottom variant="h5" component="h2">
            Role &nbsp;:&nbsp;{card.type}
          </Typography>
          <Typography gutterBottom variant="h5" component="h2">
            Location &nbsp;:&nbsp;{card.location}
          </Typography>
          <br />
          <Divider variant="fullWidth" />
          <FullScreenDialog card={card} />
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
