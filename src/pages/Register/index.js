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
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@material-ui/core";
import { Link as RouteLink } from "react-router-dom";
import api from "axios";
import { useDebounce } from "react-use";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import CheckCircleOutlineOutlinedIcon from "@material-ui/icons/CheckCircleOutlineOutlined";
import { useFormik, Form, Field, FormikContext } from "formik";
import { TextField } from "formik-material-ui";
import { RegisterSchema } from "../../validations/register";

const useStyles = makeStyles((theme) => ({
  divider: {
    background: theme.palette.secondary.main,
    width: "80px",
    height: "3px",
    margin: "20px 0 20px 0",
  },
  container: {
    maxWidth: "1100px",
    // margin: "0 300px 0 200px",
    marginBottom: "50px",
  },
  link: {
    textDecoration: "none",
  },
  button: {
    borderRadius: "2px",
    textTransform: "none",
  },
  dicaSenha: {
    display: "flex",
    flexDirection: "column",
    border: "1px solid #dadad1",
    borderRadius: "2px",
    // marginRight: "50%",
    paddingLeft: "24px",
  },
}));

function Register() {
  const classes = useStyles();
  const [iconIsPressed, setIconIsPressed] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [response, setResponse] = React.useState("");

  const methods = useFormik({
    enableReinitialize: true,
    initialValues: {
      Nome: "",
      Sobrenome: "",
      CPF: "",
      Email: "",
      Telefone: "",
      NomeEmpresa: "",
      CNPJ: "",
      CEP: "",
      Endereco: "",
      Numero: "",
      Complemento: "",
      Estado: "",
      Cidade: "",
      Senha: "",
      ConfirmarSenha: "",
    },
    validationSchema: RegisterSchema,
    onSubmit: async function (values) {
      const registerData = {
        first_name: values.Nome,
        last_name: values.Sobrenome,
        cpf: values.CPF,
        cnpj: values.CNPJ,
        nome_empresa: values.NomeEmpresa,
        telefone: values.Telefone,
        email: values.Email,
        password: values.Senha,
        password_confirm: values.ConfirmarSenha,

        cep: values.CEP,
        endereco: values.Endereco,
        numero: values.Numero,
        complemento: values.Complemento,
        cidade: values.Cidade,
        uf: values.Estado,
      };
      try {
        await api
          .post("http://localhost:3001/integrador", registerData)
          .then((res) => setResponse(res));
      } catch (error) {
        console.log(error);
      }
    },
  });

  function handleClick() {
    setIconIsPressed(!iconIsPressed);
  }

  useDebounce(
    () => {
      if (methods.values.CEP.length === 8) {
        handleViaCEP();
      }
    },
    400,
    [methods.values.CEP]
  );

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    if (response) {
      localStorage.setItem("Token", response?.headers["x-acess-token"]);
      localStorage.setItem("Refresh", response?.headers["x-refresh-token"]);
      handleClickOpen();
    }
  }, [response]);

  async function handleViaCEP() {
    try {
      const parseCEP = methods.values.CEP.replace(/\D/g, "");
      const dataCEP = await api.get(
        `https://viacep.com.br/ws/${parseCEP}/json/`
      );
      methods.setFieldValue("Endereco", dataCEP.data.logradouro);
      methods.setFieldValue("Cidade", dataCEP.data.localidade);
      methods.setFieldValue("Estado", dataCEP.data.uf);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <Container className={classes.container}>
        <Grid container spacing={3}>
          <Grid item xs>
            <Typography variant="h4" color="primary">
              Quero me cadastrar na Sapir
            </Typography>
            <Divider variant="fullWidth" classes={{ root: classes.divider }} />
          </Grid>
        </Grid>
        <FormikContext.Provider value={methods}>
          <Form>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <Field
                  component={TextField}
                  name="Nome"
                  variant="filled"
                  label="Nome *"
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <Field
                  component={TextField}
                  variant="filled"
                  name="Sobrenome"
                  label="Sobrenome *"
                  fullWidth
                />
              </Grid>
              {/* </Grid>
            <Grid container spacing={3}> */}
              <Grid item xs={4}>
                <Field
                  component={TextField}
                  variant="filled"
                  name="CPF"
                  label="CPF *"
                  fullWidth
                />
              </Grid>
              <Grid item xs={4}>
                <Field
                  component={TextField}
                  variant="filled"
                  name="Email"
                  label="Email *"
                  fullWidth
                />
              </Grid>
              <Grid item xs={4}>
                <Field
                  component={TextField}
                  variant="filled"
                  name="Telefone"
                  label="Telefone *"
                  fullWidth
                />
              </Grid>
              {/* </Grid>
            <Grid container spacing={3}> */}
              <Grid item xs={6}>
                <Field
                  component={TextField}
                  variant="filled"
                  name="NomeEmpresa"
                  label="Nome da Empresa *"
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <Field
                  component={TextField}
                  variant="filled"
                  name="CNPJ"
                  label="CNPJ *"
                  fullWidth
                />
              </Grid>
              {/* </Grid>

            <Grid container spacing={3}> */}
              <Grid item xs={12}>
                <Typography variant="h6" color="primary">
                  Endereço
                </Typography>
                <Divider
                  variant="fullWidth"
                  classes={{ root: classes.divider }}
                  style={{ width: "35px" }}
                />
              </Grid>
              {/* </Grid>
            <Grid container spacing={3}> */}
              <Grid item xs={4}>
                <Field
                  component={TextField}
                  variant="filled"
                  name="CEP"
                  label="CEP *"
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <Field
                  component={TextField}
                  variant="filled"
                  name="Endereco"
                  label="Endereço *"
                  fullWidth
                />
              </Grid>
              <Grid item xs={2}>
                <Field
                  component={TextField}
                  variant="filled"
                  name="Numero"
                  label="Número *"
                  fullWidth
                />
              </Grid>
              {/* </Grid>
            <Grid container spacing={3}> */}
              <Grid item xs={4}>
                <Field
                  component={TextField}
                  variant="filled"
                  name="Complemento"
                  label="Complemento"
                  fullWidth
                />
              </Grid>
              <Grid item xs={4}>
                <Field
                  component={TextField}
                  variant="filled"
                  name="Estado"
                  label="Estado *"
                  fullWidth
                />
              </Grid>
              <Grid item xs={4}>
                <Field
                  component={TextField}
                  variant="filled"
                  name="Cidade"
                  label="Cidade *"
                  fullWidth
                />
              </Grid>
              {/* </Grid>
            <Grid container spacing={3}> */}
              <Grid item xs={12}>
                <Typography variant="h6" color="primary">
                  Agora escolha sua senha
                </Typography>
                <Divider
                  variant="fullWidth"
                  classes={{ root: classes.divider }}
                  style={{ width: "35px" }}
                />
              </Grid>
              {/* </Grid>

            <Grid container spacing={3}> */}
              <Grid item xs>
                <Box className={classes.dicaSenha}>
                  <Typography variant="subtitle1" color="primary">
                    <Box fontWeight={600} marginX={2} pt={4} pb={1}>
                      Dicas de senha
                    </Box>
                  </Typography>
                  <Box pb={4}>
                    <Box
                      display="flex"
                      alignItems="center"
                      marginX={1}
                      marginY={0}
                    >
                      <CheckCircleOutlineOutlinedIcon
                        fontSize="small"
                        color="disabled"
                      />
                      <Typography variant="subtitle1" color="primary">
                        <Box pl={1}>Pelo menos 8 caracteres</Box>
                      </Typography>
                    </Box>
                    <Box
                      display="flex"
                      alignItems="center"
                      marginX={1}
                      marginY={0}
                    >
                      <CheckCircleOutlineOutlinedIcon
                        fontSize="small"
                        color="disabled"
                      />
                      <Typography variant="subtitle1" color="primary">
                        <Box pl={1}>Pelo menos 1 caractere minúsculo</Box>
                      </Typography>
                    </Box>
                    <Box
                      display="flex"
                      alignItems="center"
                      marginX={1}
                      marginY={0}
                    >
                      <CheckCircleOutlineOutlinedIcon
                        fontSize="small"
                        color="disabled"
                      />
                      <Typography variant="subtitle1" color="primary">
                        <Box pl={1}>Pelo menos 1 caractere maiúsculo</Box>
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Field
                      component={TextField}
                      variant="filled"
                      name="Senha"
                      label="Senha *"
                      fullWidth
                      type={iconIsPressed ? "text" : "password"}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton onClick={handleClick}>
                              {iconIsPressed ? (
                                <Visibility />
                              ) : (
                                <VisibilityOff />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      component={TextField}
                      variant="filled"
                      name="ConfirmarSenha"
                      label="Confimar Senha *"
                      fullWidth
                      type={iconIsPressed ? "text" : "password"}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton onClick={handleClick}>
                              {iconIsPressed ? (
                                <Visibility />
                              ) : (
                                <VisibilityOff />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="flex-start"
                    >
                      <Link
                        to="/login"
                        component={RouteLink}
                        className={classes.link}
                      >
                        Já tenho cadastro
                      </Link>

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
                        Cadastrar
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Dialog open={open} onClose={handleClose}>
              <DialogContent>
                <DialogContentText>
                  {response?.data?.success
                    ? "Usuário cadastrado com sucesso"
                    : "Falha ao cadastrar o usuário"}
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Fechar
                </Button>
              </DialogActions>
            </Dialog>
          </Form>
        </FormikContext.Provider>
      </Container>
    </>
  );
}

export default Register;
