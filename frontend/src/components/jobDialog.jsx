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
    value: "intern",
    label: "Intern-Only",
  },
  {
    value: "ppo",
    label: "Intern + Performance Based",
  },
  {
    value: "fte",
    label: "FTE only",
  },
  {
    value: "both",
    label: "Intern + FTE",
  },
];

export default function JobDialog() {
  const [open, setOpen] = React.useState(false);
  const [status, setStatus] = useState("");
  const [location, setLocation] = useState("");
  const [profile, setProfile] = useState("");
  const [ctc, setCtc] = useState("");
  const [company, setCompany] = useState("");
  const [file, setFile] = useState();
  const [type, setType] = useState("shortlist");
  const [content, setContent] = useState("");
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCreate = async () => {
    console.log(file);
    const email = localStorage.getItem("email");
    const formData = new FormData();
    formData.append("company", company);
    formData.append("email", email);
    formData.append("profile", profile);
    formData.append("location", location);
    formData.append("ctc", ctc);
    formData.append("content", content);
    formData.append("type", type);
    formData.append("file", file);
    formData.append("fileUrl", file.name);
    console.log(formData);

    try {
      await axios.post("http://localhost:5000/job/create", formData);
      console.log("Job Created");
      handleClose();
      window.location.reload();
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <React.Fragment>
      <Button variant="contained" onClick={handleClickOpen}>
        Create New Job
      </Button>
      <Dialog fullWidth maxWidth="md" open={open} onClose={handleClose}>
        <DialogContent>New Job Form</DialogContent>
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
            label="Company"
            variant="outlined"
            required
            multiline
            type="text"
            autoComplete="off"
            value={company}
            onChange={(e) => {
              setCompany(e.target.value);
            }}
          />
          <TextField
            id="outlined-basic"
            label="Profile"
            fullWidth
            multiline
            variant="outlined"
            type="text"
            value={profile}
            onChange={(e) => {
              setProfile(e.target.value);
            }}
          />
          <TextField
            id="outlined-basic"
            fullWidth
            label="Location"
            variant="outlined"
            required
            multiline
            type="text"
            autoComplete="off"
            value={location}
            onChange={(e) => {
              setLocation(e.target.value);
            }}
          />
          <TextField
            id="outlined-basic"
            fullWidth
            label="CTC Breakup"
            variant="outlined"
            required
            multiline
            type="text"
            autoComplete="off"
            value={ctc}
            onChange={(e) => {
              setCtc(e.target.value);
            }}
          />
          <TextField
            id="outlined-basic"
            fullWidth
            label="Content"
            variant="outlined"
            required
            multiline
            type="text"
            autoComplete="off"
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
            }}
          />
          <TextField
            id="outlined-select-currency"
            select
            label="Type of Offer"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            {postType.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            type="file"
            fullWidth
            variant="standard"
            onChange={(e) => setFile(e.target.files[0])}
            autoComplete="off"
          />
        </Box>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleCreate}>Create</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
