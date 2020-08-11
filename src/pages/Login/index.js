import React from "react";

import {
  Typography,
  makeStyles,
  Box,
  Container,
  Button,
  Link,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@material-ui/core";
import api from "axios";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { useFormik, FormikContext, Form, Field } from "formik";
import { TextField } from "formik-material-ui";
import { Link as RouteLink } from "react-router-dom";

import { LoginSchema } from "../../validations/login";

const useStyles = makeStyles((theme) => ({
  divider: {
    background: theme.palette.secondary.main,
    width: "80px",
    height: "3px",
    margin: "20px 0 20px 0",
  },
  container: {
    maxWidth: "1100px",
    marginBottom: "50px",
  },
  formItem: {
    margin: "20px 0 5px 0",
  },
  link: {
    textDecoration: "none",
  },
  button: {
    width: "100px",
    borderRadius: "2px",
    textTransform: "none",
  },
}));

function Login() {
  const classes = useStyles();
  const [iconIsPressed, setIconIsPressed] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [response, setResponse] = React.useState("");

  const methods = useFormik({
    enableReinitialize: true,
    initialValues: {
      Email: "",
      Senha: "",
    },
    validationSchema: LoginSchema,
    onSubmit: async function (values) {
      const loginData = {
        email: values.Email,
        password: values.Senha,
      };
      try {
        await api
          .post("http://localhost:3001/auth/", loginData)
          .then((res) => setResponse(res));
      } catch (error) {
        console.log(error);
      }
    },
  });

  function handleClick() {
    setIconIsPressed(!iconIsPressed);
  }

  const handleClickOpen = () => {
    if (!response?.data?.success) {
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    if (response) {
      handleClickOpen();
    }
  }, [response]);

  return (
    <>
      <Container className={classes.container}>
        <Box maxWidth="500px" width="100%">
          <Grid container spacing={3}>
            <Grid item xs>
              <Typography variant="h4" color="primary">
                Login
              </Typography>
              <Divider
                variant="fullWidth"
                classes={{ root: classes.divider }}
              />
            </Grid>
          </Grid>
          <FormikContext.Provider value={methods}>
            <Form>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Field
                    component={TextField}
                    variant="filled"
                    name="Email"
                    label="E-mail *"
                    type="email"
                    fullWidth
                  />
                </Grid>
                {/* </Grid>
            <Grid container spacing={3}> */}
                <Grid item xs={12}>
                  <Field
                    component={TextField}
                    variant="filled"
                    name="Senha"
                    label="Senha *"
                    type={iconIsPressed ? "text" : "password"}
                    fullWidth
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={handleClick}>
                            {iconIsPressed ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                {/* </Grid>
            <Grid container spacing={3}> */}
                <Grid item xs={9}>
                  <Box display="flex" flexDirection="column">
                    <Link to="/" component={RouteLink} className={classes.link}>
                      Esqueci minha senha
                    </Link>
                    <Link
                      to="/register"
                      component={RouteLink}
                      className={classes.link}
                    >
                      Não tem uma conta? Cadastre-se
                    </Link>
                  </Box>
                </Grid>

                <Grid item xs={3}>
                  <Box
                    display="flex"
                    justifyContent="flex-end"
                    alignItems="flex-start"
                  >
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      className={classes.button}
                      disabled={
                        !(methods.dirty && methods.isValid) ||
                        methods.isSubmitting
                      }
                    >
                      Entrar
                    </Button>
                  </Box>
                </Grid>
              </Grid>
              <Dialog open={open} onClose={handleClose}>
                <DialogContent>
                  <DialogContentText>Falha no login</DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose} color="primary">
                    Fechar
                  </Button>
                </DialogActions>
              </Dialog>
            </Form>
          </FormikContext.Provider>
        </Box>
      </Container>
    </>
  );
}

export default Login;
