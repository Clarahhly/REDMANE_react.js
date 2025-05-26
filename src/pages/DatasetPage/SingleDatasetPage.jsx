import React, { useState } from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../actions/authActions';
import { mainListItems, secondaryListItems } from '../../components/Dashboard/listItems';
import Footer from '../../components/Footer';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import WehiLogo from '../../assets/logos/wehi-logo.png';
import MelbUniLogo from '../../assets/logos/unimelb-logo.png';
import { useParams } from 'react-router-dom';


const drawerWidth = 240;
const defaultTheme = createTheme();

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  backgroundColor: '#00274D',
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7.5),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(7),
        },
      }),
    },
  }),
);

export default function SingleDatasetPage() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { id: datasetId } = useParams();

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar sx={{ pr: '24px' }}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{ marginRight: '36px', ...(open && { display: 'none' }) }}
            >
              <MenuIcon />
            </IconButton>
            <Typography component="h1" variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
              Dataset Details (Hardcoded)
            </Typography>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: 'rgba(255, 255, 255, 1)',
              padding: '5px',
              borderRadius: '5px',
              marginRight: '10px'
            }}>
              <img src={WehiLogo} alt="WEHI" width="90" height="30" style={{ marginLeft: '10px', marginRight: '10px' }} />
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: 'rgba(255, 255, 255, 1)',
              padding: '5px',
              borderRadius: '5px',
              marginRight: '10px'
            }}>
              <img src={MelbUniLogo} alt="Melbourne University" width="30" height="30" style={{ marginLeft: '2px', marginRight: '2px' }} />
            </div>
            <Box sx={{ marginRight: '10px' }}>
              <Button variant="contained" color="warning" onClick={handleLogout} sx={{ textTransform: 'none', padding: '5px 20px', fontSize: '16px', backgroundColor: '#00274D' }}>
                Log Out
              </Button>
            </Box>
            <IconButton color="inherit">
              <NotificationsIcon />
            </IconButton>
          </Toolbar>
        </AppBar>

        <Drawer variant="permanent" open={open}>
          <Toolbar sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', px: [1] }}>
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            {mainListItems()}
            <Divider sx={{ my: 1 }} />
            {secondaryListItems()}
          </List>
        </Drawer>

        <Box component="main" sx={{ backgroundColor: (theme) => theme.palette.grey[100], flexGrow: 1, height: '100vh', overflow: 'auto' }}>
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Paper sx={{ p: 4 }}>
                  {/* Main Single Dataset Content */}
                  <Grid container spacing={4}>
                    {/* Left Section */}
                    <Grid item xs={12} md={7}>
                      <Typography variant="h4" fontWeight="bold" gutterBottom>
                        Whole-exome sequencing of Lung Cancer <br />
                        Tumour–Normal pairs
                      </Typography>
                      <Typography variant="h6" sx={{ mt: 1, mb: 2 }}>
                        TDE0001
                      </Typography>
                      <Typography variant="body1">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        {/* continue lorem text if needed */}
                      </Typography>
                    </Grid>

                    {/* Right Section */}
                    <Grid item xs={12} md={5}>
                      <Paper elevation={2} sx={{ p: 3 }}>
                        <Typography variant="h6" fontWeight="bold" gutterBottom>
                          Raw Data
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                          Located: WEHI Milton /vast/projects/TDE/TDE0001
                        </Typography>

                        <Typography variant="h6" fontWeight="bold" sx={{ mt: 3 }}>
                          Copy code for raw data
                        </Typography>
                        <Grid container spacing={1} sx={{ mt: 1 }}>
                          <Grid item>
                            <Button variant="outlined" sx={{ textTransform: 'none' }}>
                              WEHI Jupyter Notebook
                            </Button>
                          </Grid>
                          <Grid item>
                            <Button variant="outlined" sx={{ textTransform: 'none' }}>
                              Nextflow
                            </Button>
                          </Grid>
                          <Grid item>
                            <Button variant="outlined" sx={{ textTransform: 'none' }}>
                              WEHI RStudio
                            </Button>
                          </Grid>
                        </Grid>

                        <Typography variant="h6" fontWeight="bold" sx={{ mt: 4 }}>
                          Data Portals
                        </Typography>
                        <Button variant="outlined" sx={{ mt: 1, textTransform: 'none' }}>
                          cBioPortal
                        </Button>

                        <Typography variant="h6" fontWeight="bold" sx={{ mt: 4 }}>
                          Other views
                        </Typography>
                        <Grid container spacing={1} sx={{ mt: 1 }}>
                          <Grid item>
                            <Button variant="outlined" sx={{ textTransform: 'none' }}>
                              All Samples View
                            </Button>
                          </Grid>
                          <Grid item>
                            <Button
                              variant="outlined"
                              sx={{ textTransform: 'none' }}
                              onClick={() => navigate('/datasets')}
                            >
                              All Datasets View
                            </Button>
                          </Grid>
                          <Grid item>
                            <Button variant="outlined" sx={{ textTransform: 'none' }}>
                              All Samples Summary
                            </Button>
                          </Grid>
                          <Grid item>
                            <Button
                            variant="outlined"
                            sx={{ textTransform: 'none' }}
                            onClick={() => navigate(`/dataset/${datasetId}/DatasetFilesPage`)}

                            >
                              Files for this dataset
                            </Button>
                          </Grid>
                        </Grid>
                      </Paper>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            </Grid>

            <Footer />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
