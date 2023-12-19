import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { CardContent } from "@mui/material";
import axios from "axios";
import fileDownload from "js-file-download";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="right" ref={ref} {...props} />;
});

export default function FullScreenDialog({ card }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleJD = async (fileUrl) => {
    console.log(fileUrl);
    const res = await axios.post(
      "http://localhost:5000/job/",
      {
        fileUrl,
      },
      {
        responseType: "blob",
      }
    );
    fileDownload(res.data, fileUrl);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        View Job Details
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Job Details
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              Apply
            </Button>
          </Toolbar>
        </AppBar>
        <CardContent sx={{ flexGrow: 1 }}>
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
            CTC &nbsp;:&nbsp;{card.ctc}
          </Typography>
          <Typography gutterBottom variant="h5" component="h2">
            Location &nbsp;:&nbsp;{card.location}
          </Typography>
          <Typography gutterBottom variant="h5" component="h2">
            About &nbsp; Job &nbsp;:
            <br />
            {card.content}
          </Typography>
          <Button onClick={() => handleJD(card.fileUrl)}>Download JD</Button>
        </CardContent>
      </Dialog>
    </React.Fragment>
  );
}
