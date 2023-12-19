//@ts-nocheck

import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Typography,
  Button,
  Grid,
  TextField,
  MenuItem,
  Alert,
} from "@mui/material";

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9]{3,23}$/;
const PASSWORD_REGEX =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

const SignUp = () => {
  const navigate = useNavigate();
  const user = [
    {
      value: "teacher",
      label: "CILP",
    },
    {
      value: "student",
      label: "Candidate",
    },
    {
      value: "alumni",
      label: "Alumni",
    },
  ];

  // First Name Variables
  const [firstName, setFirstName] = useState("");
  const [validFirstName, setValidFirstName] = useState(false);

  // Last Name Variables
  const [lastName, setLastName] = useState("");
  const [validLastName, setValidLastName] = useState(false);

  //Email Variables
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);

  // Is Recruiter Variable
  const [role, setRole] = useState("student");

  //Password Variables
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);

  //Matching Password Variables
  const [matchPassword, setMatchPassword] = useState("");
  const [validMatchPassword, setValidMatchPassword] = useState(false);

  //Error Messages Variables
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  //University ID Variables
  const [universityId, setUnivId] = useState("");

  //Placement Status Variables
  const [placed, setPlaced] = useState("none");

  //CGPA Status
  const [cgpa, setCgpa] = useState(-1);
  // Validating First Name
  useEffect(() => {
    const result = USER_REGEX.test(firstName);
    // console.log(result);
    // console.log(firstName);
    setValidFirstName(result);
    if (result === false) {
      setErrMsg("First Name should be 4-24 characters");
    } else {
      setErrMsg("");
    }
  }, [firstName]);

  //Validating Last Name
  useEffect(() => {
    const result = USER_REGEX.test(lastName);
    // console.log(result);
    // console.log(lastName);
    setValidLastName(result);
    if (result === false) {
      setErrMsg("Last Name should be 4-24 characters");
    } else {
      setErrMsg("");
    }
  }, [lastName]);

  //Validating Email
  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    // console.log(result);
    // console.log(email);
    setValidEmail(result);
    if (result === false) {
      setErrMsg("Not a valid email");
    } else {
      setErrMsg("");
    }
  }, [email]);

  //Validating Passowrd and matching Password
  useEffect(() => {
    const result = PASSWORD_REGEX.test(password);
    // console.log(result);
    // console.log(password);
    setValidPassword(result);
    if (result === false) {
      setErrMsg(
        "Password must contain an uppercase, lowercase and a special character and must be between 8-24 characters long"
      );
    } else {
      setErrMsg("");
    }
  }, [password]);

  useEffect(() => {
    const result = PASSWORD_REGEX.test(password);
    // console.log(result);
    // console.log(password);
    setValidPassword(result);
    if (result) {
      const match = password === matchPassword;
      if (match === false) {
        setErrMsg("Confirm password must be same as password");
      } else {
        setErrMsg("");
      }
      setValidMatchPassword(match);
    }
  }, [password, matchPassword]);

  useEffect(() => {
    setErrMsg("");
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);

  // Handling login click
  const handleLogin = async () => {
    setErrMsg("");
    setSuccess(false);
    const user = {
      fullName: firstName + " " + lastName,
      email: email,
      password: password,
      role: role,
      placed: "unplaced",
      cgpa: cgpa,
      universityId: universityId,
    };
    // console.log(user);
    try {
      await axios.post("http://localhost:5000/users/signup", user);
      setErrMsg("");
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setMatchPassword("");
      setRole("student");
      setSuccess(true);
    } catch (err) {
      setErrMsg(err.response.data.msg);
    }
  };

  const handleRedirection = () => {
    navigate({
      pathname: "/",
    });
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          minHeight: "100vh",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Grid container spacing={2} sx={{ maxWidth: "500px" }}>
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Typography variant="h3" gutterBottom>
              Register
            </Typography>
          </Grid>
          {errMsg !== "" && (
            <>
              <Grid
                item
                xs={12}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Alert severity="error">{errMsg}</Alert>
              </Grid>
            </>
          )}
          <Grid item xs={6}>
            <TextField
              id="outlined-basic"
              label="First Name"
              variant="outlined"
              required
              type="text"
              autoComplete="off"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="outlined-basic"
              label="Last Name"
              variant="outlined"
              required
              type="text"
              autoComplete="off"
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              type="text"
              autoComplete="off"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="outlined-select-currency"
              select
              label="Role" 
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              {user.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={6}>
            <TextField
              id="outlined-basic"
              label="CGPA"
              placeholder="Enter CGPA till now"
              variant="outlined"
              required
              type="text"
              autoComplete="off"
              value={cgpa}
              onChange={(e) => {
                setCgpa(e.target.value);
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="outlined-basic"
              label="University ID"
              variant="outlined"
              placeholder="Enter University ID"
              required
              type="text"
              autoComplete="off"
              value={universityId}
              onChange={(e) => {
                setUnivId(e.target.value);
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="outlined-basic"
              label="Password"
              variant="outlined"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="outlined-basic"
              label="Confirm Password"
              variant="outlined"
              type="password"
              value={matchPassword}
              onChange={(e) => {
                setMatchPassword(e.target.value);
              }}
            />
          </Grid>
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button
              variant="contained"
              disabled={
                !validFirstName ||
                !validLastName ||
                !validEmail ||
                !validPassword ||
                !validMatchPassword
                  ? true
                  : false
              }
              onClick={handleLogin}
            >
              Sign Up
            </Button>
          </Grid>
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Typography variant="h6">Already Registered?</Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button
              sx={{ marginBottom: "10px" }}
              variant="contained"
              onClick={handleRedirection}
            >
              SignIn
            </Button>
          </Grid>
          {success && (
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Alert severity="success">You can now SignIn</Alert>
            </Grid> 
          )}
        </Grid>
      </div>
    </>
  );
};

export default SignUp;
