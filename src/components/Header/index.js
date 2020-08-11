import React from "react";

import {
  Container,
  AppBar,
  Toolbar,
  Tabs,
  Tab,
  makeStyles,
  IconButton,
} from "@material-ui/core";
import { Link as RouterLink, useLocation } from "react-router-dom";

import logo from "../../assets/images/logo.png";

const useStyles = makeStyles((theme) => ({
  appbar: {
    boxShadow: "rgba(0, 0, 0, 0.15) 1px 1px 10px",
    margin: "0 0 100px 0",
  },
  toolbar: {
    justifyContent: "space-between",
  },
  iconButton: {
    disableRipple: true,
    disableFocusRipple: true,
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  logo: {
    // marginLeft: "10%",
    width: "176px",
    height: "auto",
    backgroundColor: "transparent",
  },
  tab: {},
  tabIndicator: {
    height: "3px",
  },
}));

function Header() {
  const classes = useStyles();
  const location = useLocation();
  const [selectedTab, setSelectedTab] = React.useState(() => {
    switch (location.pathname) {
      case "/contact":
        return 0;

      case "/register":
        return 1;

      // case "/login":
      //   return 2;

      default:
        return 2;
    }
  });

  function handleChange(event, newValue) {
    setSelectedTab(newValue);
  }

  return (
    <AppBar position="sticky" color="default" className={classes.appbar}>
      <Container>
        <Toolbar className={classes.toolbar}>
          <IconButton
            disableRipple
            disableFocusRipple
            className={classes.iconButton}
            onChange={handleChange}
            to="/"
            component={RouterLink}
          >
            <img src={logo} alt="logo" className={classes.logo} />
          </IconButton>
          <Tabs
            indicatorColor="primary"
            textColor="primary"
            value={selectedTab}
            onChange={handleChange}
            classes={{ indicator: classes.tabIndicator }}
            className={classes.tab}
          >
            <Tab label="Contato" to="/contact" component={RouterLink} />
            {/* <Tab label="Meu Perfil" to="profile" component={RouterLink} /> */}
            <Tab label="Cadastre-se" to="/register" component={RouterLink} />
            <Tab label="Login" to="/login" component={RouterLink} />
          </Tabs>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
