import React from "react";

import {
  Typography,
  makeStyles,
  Box,
  Container,
  Button,
  Divider,
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@material-ui/core";
import api from "axios";
import { useFormik, FormikContext, Form, Field } from "formik";
import { TextField } from "formik-material-ui";
import { ContactSchema } from "../../validations/contact";
import baseUrl from "../../utils/api";

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
  box: {
    display: "flex",
    maxWidth: "600px",
    margin: "auto",
    boxSizing: "border-box",
  },
  formItem: {
    margin: "20px 0 20px 0",
  },
  link: {
    textDecoration: "none",
  },
  button: {
    borderRadius: "2px",
    textTransform: "none",
  },
}));

function Contact() {
  const classes = useStyles();
  const [response, setResponse] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const methods = useFormik({
    enableReinitialize: true,
    initialValues: {
      Nome: "",
      Email: "",
      Telefone: "",
      Estado: "",
      Cidade: "",
      Assunto: "",
      Mensagem: "",
    },
    validationSchema: ContactSchema,
    onSubmit: async function (values) {
      const contactData = {
        name: values.Nome,
        email: values.Email,
        telefone: values.Telefone,
        cidade: values.Cidade,
        uf: values.Estado,
        subject: values.Assunto,
        message: values.Mensagem,
      };
      try {
        await api
          .post(`${baseUrl}/auth/contact`, contactData)
          .then((res) => setResponse(res));
      } catch (error) {
        console.log(error);
      }
    },
  });

  const handleClickOpen = () => {
    setOpen(true);
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
        <Grid container spacing={3}>
          <Grid item xs>
            <Typography variant="h4" color="primary">
              Entre em Contato
            </Typography>
            <Divider variant="fullWidth" classes={{ root: classes.divider }} />
          </Grid>
        </Grid>
        <FormikContext.Provider value={methods}>
          <Form>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Field
                  component={TextField}
                  name="Nome"
                  variant="filled"
                  label="Nome *"
                  fullWidth
                />
              </Grid>
              {/* </Grid>
            <Grid container spacing={3}> */}
              <Grid item xs={6}>
                <Field
                  component={TextField}
                  name="Email"
                  variant="filled"
                  label="Email *"
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <Field
                  component={TextField}
                  name="Telefone"
                  variant="filled"
                  label="Telefone *"
                  fullWidth
                />
              </Grid>
              {/* </Grid>
            <Grid container spacing={3}> */}
              <Grid item xs={6}>
                <Field
                  component={TextField}
                  name="Estado"
                  variant="filled"
                  label="Estado *"
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <Field
                  component={TextField}
                  name="Cidade"
                  variant="filled"
                  label="Cidade *"
                  fullWidth
                />
              </Grid>
              {/* </Grid>
            <Grid container spacing={3}> */}
              <Grid item xs={12}>
                <Field
                  component={TextField}
                  name="Assunto"
                  variant="filled"
                  label="Assunto *"
                  fullWidth
                />
              </Grid>
              {/* </Grid>
            <Grid container spacing={3}> */}
              <Grid item xs={12}>
                <Field
                  component={TextField}
                  name="Mensagem"
                  variant="filled"
                  label="Mensagem *"
                  fullWidth
                  multiline
                  rows={2}
                  rowsMax={10}
                />
              </Grid>
              {/* </Grid>
            <Grid container spacing={3}> */}
              <Grid item xs>
                <Box display="flex" justifyContent="flex-end">
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
                    Enviar
                  </Button>
                  <Dialog open={open} onClose={handleClose}>
                    <DialogContent>
                      <DialogContentText>
                        {response?.data?.success
                          ? response?.data?.data
                          : "Falha no envio de email de contato"}
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleClose} color="primary">
                        Fechar
                      </Button>
                    </DialogActions>
                  </Dialog>
                </Box>
              </Grid>
            </Grid>
          </Form>
        </FormikContext.Provider>
      </Container>
    </>
  );
}

export default Contact;
