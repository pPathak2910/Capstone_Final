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
import FormDialog from "./commentDialog";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog({ card }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        See Complete Question
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
            <Typography
              sx={{ ml: 2, flex: 1 }}
              variant="h6"
              component="div"
            ></Typography>
            <FormDialog _id={card._id} />
          </Toolbar>
        </AppBar>
        <Typography variant="h3">{card.heading}</Typography>
        <br />
        <Typography variant="h5">{card.content}</Typography>
        <br />
        <br />
        <Divider variant="fullWidth" />
        <Typography variant="h4">Suggestions from Alumni :-</Typography>
        <Divider variant="fullWidth" />
        <List>
          {card.comments.map((comment, idx) => {
            return (
              <ListItem key={idx}>
                {idx + 1}.&nbsp;{comment}
              </ListItem>
            );
          })}
        </List>
      </Dialog>
    </React.Fragment>
  );
}
