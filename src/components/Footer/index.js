import React from "react";

import {
  Container,
  Box,
  Paper,
  Typography,
  Divider,
  makeStyles,
  Link,
} from "@material-ui/core";
import {
  LinkedIn,
  Facebook,
  Instagram,
  PlayCircleFilledWhite,
} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
  },
  boxContact: {
    backgroundColor: "#e0e0e0",
    marginTop: "70px",
    marginBottom: "0px",
    height: "164px",
    width: "100%",
    // margin: 0,
  },
  divider: {
    background: theme.palette.secondary.main,
    width: "80px",
    height: "3px",
    margin: "20px 0 20px 0",
  },
  footerData: {
    backgroundColor: theme.palette.primary.main,
    height: "50px",
    color: "#ffffff",
    width: "100%",
    // margin: 0,
  },
  aitia: {
    color: theme.palette.secondary.main,
  },
  typography: {
    color: theme.palette.primary.main,
  },
  icons: {
    color: theme.palette.primary.main,
  },
}));

function Footer() {
  const classes = useStyles();

  return (
    <>
      <Box>
        <Box className={classes.boxContact}>
          <Container
            display="flex"
            flexDirection="column"
            className={classes.container}
          >
            <Box display="flex">
              <Box display="flex" flexDirection="column" width="50%">
                <Typography className={classes.typography}>Contato</Typography>
                <Divider
                  variant="fullWidth"
                  classes={{ root: classes.divider }}
                  style={{ width: "35px" }}
                />
                <Link href="https://google.com" target="_blank">
                  (11) 3130-1825
                </Link>
                <Link href="https://gmail.com" target="_blank">
                  contato@sapir.eco.br
                </Link>
              </Box>
              <Box display="flex" flexDirection="column">
                <Typography className={classes.typography}>
                  Redes Sociais
                </Typography>
                <Divider
                  variant="fullWidth"
                  classes={{ root: classes.divider }}
                  style={{ width: "35px" }}
                />
                <Box display="flex" flexDirection="row">
                  <Instagram className={classes.icons} />
                  <LinkedIn className={classes.icons} />
                  <Facebook className={classes.icons} />
                </Box>
              </Box>
            </Box>
          </Container>
        </Box>
        <Box className={classes.footerData}>
          <Container>
            <Box display="flex" flexDirection="row">
              <Typography>
                Sapir - Green energy © Copyright, 2020 - Desenvolvido por&nbsp;
              </Typography>
              <Typography className={classes.aitia}>AiTiA</Typography>
            </Box>
          </Container>
        </Box>
      </Box>
    </>
  );
}

export default Footer;
