import { useState, useEffect } from "react";
import clsx from "clsx";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from "@material-ui/core";
import { menu } from "../mock/menu";
import { useStyles } from "../theme/style";
import { Link, useNavigate } from "react-router-dom";
import { AccountCircle } from "@material-ui/icons";
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import PhoneIcon from '@material-ui/icons/Phone';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { removeUser } from "../redux/slices/userSlice";

const Layout = ({ children }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const classes = useStyles();
  const [open, setOpen] = useState(true);

  const user = useSelector((state) => state.user?.user);

  const [anchorEl, setAnchorEl] = useState(null);
  const open2 = Boolean(anchorEl);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 768) {
        // adjust the screen size threshold as needed
        setOpen(false);
      } else {
        setOpen(true);
      }
    }

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const signOut = () => {
    dispatch(removeUser());
    navigate("/");
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={() => setOpen(true)}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden
            )}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            Vatebra Assesment
          </Typography>
          {/* <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton> */}

          <div>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={(e) => setAnchorEl(e.currentTarget)}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={open2}
              onClose={() => setAnchorEl(null)}
            >
              <MenuItem ><PermIdentityIcon/> &nbsp; &nbsp; {user?.name}</MenuItem>
              <MenuItem><MailOutlineIcon/> &nbsp; &nbsp; {user?.email}</MenuItem>
              <MenuItem><PhoneIcon/> &nbsp; &nbsp;  {user?.phone}</MenuItem>
              <MenuItem onClick={signOut} style={{color: "red"}}><PowerSettingsNewIcon/> &nbsp; &nbsp;  Logout</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>

   
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={() => setOpen(false)}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          {menu.map((item) => (
            <div key={item?.id}>
              <Link to={item.path} style={{ textDecoration: "none" }}>
                <ListItem button>
                  <ListItemIcon>{item?.icon}</ListItemIcon>
                  <ListItemText primary={item?.name} />
                </ListItem>
              </Link>
            </div>
          ))}
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper className={classes.paper}>{children}</Paper>
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  );
};

export default Layout;
