import React, { useState } from "react";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import {
  Avatar,
  Button,
  TextField,
  Link,
  Grid,
  Typography,
  Container,
  Paper,
  withStyles,
} from "@material-ui/core";
import { loginApi, signUpApi } from "../../service/auth.service";
import { useHistory, withRouter } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import { setUserState,toggleSnackBar } from "../../Actions/common";
import "./style.css";

const SignUp = ({ classes, match, ...props }) => {
  const dispatch = useDispatch();
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const history = useHistory();
  const [errorObject, setErrorObject] = useState({
    inValidFirstName: true,
    inValidLastName: false,
    inValidPassword: false,
    inValidEmail: false,
  });
  let isFromLoginUrl = false;

  if (match.path.includes("/login")) {
    isFromLoginUrl = true;
  }
  const validate = (type) => {
    let isValid = true;

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      isValid = false;
      setErrorObject({ ...errorObject, inValidEmail: true });
    } else if (password.length < 6) {
      isValid = false;
      setErrorObject({ ...errorObject, inValidPassword: true });
    }

    if (type === "signup") {
      if (!firstName.length) {
        isValid = false;
        setErrorObject({ ...errorObject, inValidFirstName: true });
      }
      if (!lastName.length) {
        isValid = false;
        setErrorObject({ ...errorObject, inValidLastName: true });
      }
    }

    return isValid;
  };

  const isEmptyObject = (data) =>
    Object.keys(data).length === 0 && data.constructor === Object;


  const handleOnSignUpSuccess = () => {
    dispatch(toggleSnackBar(true, "User has been sucessfully signup"));
    setfirstName("");
    setlastName("");
    setEmail("");
    setPassword("");
    history.push("/login");
  };

  const handleOnLoginSignup = (e) => {
    e.preventDefault();
    if (!isFromLoginUrl) {
      if (validate("signUp")) {
        signUpApi(
          {
            firstName,
            lastName,
            email,
            password,
          },
          handleOnSignUpSuccess
        );
      }
    } else {
      if (validate()) {
        loginApi({ email, password: password }, signinResultjandler);
      }
    }
  };

  const signinResultjandler = (res) => {
    if (!isEmptyObject(res.data)) {

      dispatch(toggleSnackBar(true, "Sucessfully logged in"));

      const userData = {
        token: String(res.data.token),
        _id: res.data?._id || "",
        email: res.data?.email || ""
      };
      localStorage.setItem("userData", JSON.stringify(userData));
      dispatch(
        setUserState({ _id: res.data?._id || "", email: res.data?.email || "" })
      );
      history.push("/");
    }
  };

  return (
    <div
      className={
        isFromLoginUrl ? "component-parent" : "component-parent signup"
      }
    >
      <Paper className={classes.paperContainer}>
        <Container component="main" maxWidth="xs">
          <div className={classes.paper} style={{ paddingTop: "26px" }}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              {isFromLoginUrl ? "Login" : "Sign up"}
            </Typography>
            <form className={classes.form} noValidate>
              <Grid container spacing={2}>
                {!isFromLoginUrl && (
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="fname"
                      name="firstName"
                      variant="outlined"
                      error={errorObject.inValidFirstName}
                      helperText={
                        errorObject.inValidFirstName ? "Cannot Be Blank" : ""
                      }
                      required
                      fullWidth
                      id="firstName"
                      label="First Name"
                      autoFocus
                      onBlur={() => {
                        firstName === "" &&
                          setErrorObject({
                            ...errorObject,
                            inValidFirstName: true,
                          });
                        firstName !== "" &&
                          setErrorObject({
                            ...errorObject,
                            inValidFirstName: false,
                          });
                      }}
                      onChange={(event) => {
                        event.target.value !== "" &&
                          setErrorObject({
                            ...errorObject,
                            inValidFirstName: false,
                          });
                        setfirstName(event.target.value);
                      }}
                      FormControlLabel={firstName}
                    />
                  </Grid>
                )}
                {!isFromLoginUrl && (
                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      error={errorObject.inValidLastName}
                      helperText={
                        errorObject.inValidLastName ? "Cannot Be Blank" : ""
                      }
                      id="lastName"
                      label="Last Name"
                      name="lastName"
                      autoComplete="lname"
                      onBlur={() => {
                        lastName === "" &&
                          setErrorObject({
                            ...errorObject,
                            inValidLastName: true,
                          });
                        lastName !== "" &&
                          setErrorObject({
                            ...errorObject,
                            inValidLastName: false,
                          });
                      }}
                      onChange={(event) => {
                        event.target.value !== "" &&
                          setErrorObject({
                            ...errorObject,
                            inValidLastName: false,
                          });
                        setlastName(event.target.value);
                      }}
                      autoFocus={false}
                      FormControlLabel={lastName}
                    />
                  </Grid>
                )}
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    error={errorObject.inValidEmail}
                    helperText={
                      errorObject.inValidEmail
                        ? "Please Enter Valid Email Address"
                        : ""
                    }
                    onBlur={() => {
                      !/^\S+@\S+\.\S+$/.test(email) &&
                        setErrorObject({
                          ...errorObject,
                          inValidEmail: true,
                        });
                      /^\S+@\S+\.\S+$/.test(email) &&
                        setErrorObject({
                          ...errorObject,
                          inValidEmail: false,
                        });
                    }}
                    onChange={(event) => {
                      /^\S+@\S+\.\S+$/.test(email) &&
                        setErrorObject({
                          ...errorObject,
                          inValidEmail: false,
                        });
                      setEmail(event.target.value);
                    }}
                    FormControlLabel={email}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    error={errorObject.inValidPassword}
                    helperText={
                      errorObject.inValidPassword
                        ? "Please Enter Valid Password and Password Should be of Atleast 6 character long"
                        : ""
                    }
                    onBlur={() => {
                      password.length < 6 &&
                        setErrorObject({
                          ...errorObject,
                          inValidPassword: true,
                        });
                      password.length >= 6 &&
                        setErrorObject({
                          ...errorObject,
                          inValidPassword: false,
                        });
                    }}
                    onChange={(event) => {
                      password.length >= 6 &&
                        setErrorObject({
                          ...errorObject,
                          inValidPassword: false,
                        });
                      setPassword(event.target.value);
                    }}
                    FormControlLabel={password}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={handleOnLoginSignup}
                  >
                    {isFromLoginUrl ? "Sign in" : "Sign Up"}
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <div className="google-login-button" data-width="100%"></div>
                </Grid>
              </Grid>
              <Grid container justify="flex-end">
                <Grid item>
                  <Link
                    href={isFromLoginUrl ? "/signUp" : "login"}
                    variant="body2"
                  >
                    {isFromLoginUrl
                      ? "Never had an account? Sign up"
                      : "Already have an account? Sign in"}
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
        </Container>
      </Paper>
    </div>
  );
};

const styles = (theme) => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  paperContainerSignUp: {
    minWidth: "450px",
    minHeight: "500px",
    width: "33vw",
    height: "76vh",
    margin: "auto",
  },
  paperContainer: {
    opacity: "0.8",
    borderRadius: "30px",
    width: "fit-content",
  },
  paperContainerLogin: {
    minWidth: "fit-content",
    minHeight: "fit-content",
    margin: "auto",
    marginTop: "17vh",
    opacity: "0.8",
    borderRadius: "30px",
  },
});

export default withRouter(connect()(withStyles(styles)(SignUp)));
