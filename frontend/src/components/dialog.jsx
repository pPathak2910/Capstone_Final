import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import { Grid, Box, MenuItem } from "@mui/material";
import axios from "axios";

const postType = [
  {
    value: "announcement",
    label: "Announcement",
  },
  {
    value: "shortlist",
    label: "Final List",
  },
  {
    value: "interview_list",
    label: "Interview List",
  },
  {
    value: "event",
    label: "Event",
  },
];

export default function FormDialog() {
  const [open, setOpen] = React.useState(false);
  const [heading, setHeading] = useState("");
  const [content, setContent] = useState("");
  const [type, setType] = useState("announcement");
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCreate = async () => {
    const email = localStorage.getItem("email");
    const post = {
      email,
      heading,
      content,
      type,
    };
    try {
      await axios.post("http://localhost:5000/post/", post);
      window.location.reload();
    } catch (err) {
      console.error(err.message);
    }
  };
  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Create New Post
      </Button>
      <Dialog fullWidth maxWidth="md" open={open} onClose={handleClose}>
        <DialogContent>New Post Form</DialogContent>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            margin: "10px",
            justifyContent: "center",
            alignItems: "stretch",
            gap: "25px",
          }}
        >
          <TextField
            id="outlined-basic"
            fullWidth
            label="Heading"
            variant="outlined"
            required
            multiline
            type="text"
            autoComplete="off"
            value={heading}
            onChange={(e) => {
              setHeading(e.target.value);
            }}
          />
          <TextField
            id="outlined-basic"
            label="Content"
            fullWidth
            multiline
            variant="outlined"
            type="text"
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
            }}
          />
          <TextField
            id="outlined-select-currency"
            select
            label="Type of Post"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            {postType.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Box>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleCreate}>Create</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
