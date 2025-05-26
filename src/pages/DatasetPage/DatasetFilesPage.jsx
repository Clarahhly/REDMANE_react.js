// DatasetFilesPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box, Button, Checkbox, Container, Grid, Paper, Table, TableBody, TableCell,
  TableHead, TableRow, Typography, Divider, CssBaseline, IconButton, List
} from '@mui/material';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Footer from '../../components/Footer';
import { logout } from '../../actions/authActions';
import { useDispatch } from 'react-redux';
import { mainListItems, secondaryListItems } from '../../components/Dashboard/listItems';
import WehiLogo from '../../assets/logos/wehi-logo.png';
import MelbUniLogo from '../../assets/logos/unimelb-logo.png';

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
  })
);

export default function DatasetFilesPage() {
  const { id: datasetId } = useParams();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [files, setFiles] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState({});
  const dispatch = useDispatch();

  const toggleDrawer = () => setOpen(!open);
  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await fetch(`/api/files_metadata/${datasetId}`);
        if (!response.ok) throw new Error('Error fetching data');
        const data = await response.json();
        setFiles(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchFiles();
  }, [datasetId]);

  const handleCheckboxChange = (id) => {
    setSelectedFiles(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar sx={{ pr: '24px' }}>
            <IconButton edge="start" color="inherit" onClick={toggleDrawer} sx={{ marginRight: '36px', ...(open && { display: 'none' }) }}>
              <MenuIcon />
            </IconButton>
            <Typography component="h1" variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
              Files for Dataset {datasetId} (HARDCODED)
            </Typography>
            <div style={{ display: 'flex', alignItems: 'center', backgroundColor: 'white', padding: '5px', borderRadius: '5px', marginRight: '10px' }}>
              <img src={WehiLogo} alt="WEHI" width="90" height="30" style={{ marginLeft: '10px', marginRight: '10px' }} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', backgroundColor: 'white', padding: '5px', borderRadius: '5px', marginRight: '10px' }}>
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
          <Container maxWidth="xl" sx={{ mt: 4 }}>
            <Grid container spacing={4}>
              <Grid item xs={12} md={9}>
                <Typography variant="h4" fontWeight="bold" gutterBottom>
                  Whole-exome sequencing of Lung Cancer Tumour–Normal pairs
                </Typography>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="h6">All Raw Files View (66 – 4.7TB)</Typography>
        
                  </Box>
                  <Divider sx={{ mt: 1, mb: 2 }} />
    

                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Button variant="outlined">
                      Show Processed Files
                    </Button>
                    <Button variant="outlined">Show Summarised Files</Button>
                  </Box>
                </Box>
                <Divider sx={{ mb: 2 }} />

                <Paper>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell></TableCell>
                        <TableCell>Filename</TableCell>
                        <TableCell>SampleID</TableCell>
                        <TableCell>Patient ID</TableCell>
                        <TableCell>Location</TableCell>
                        <TableCell>Size</TableCell>
                        <TableCell>REDCap complete</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {files.map((file) => (
                        <TableRow key={file.id}>
                          <TableCell>
                            <Checkbox
                              checked={selectedFiles[file.id] || false}
                              onChange={() => handleCheckboxChange(file.id)}
                            />
                          </TableCell>
                          <TableCell>{file.filename}</TableCell>
                          <TableCell>{file.sample_id}</TableCell>
                          <TableCell>{file.patient_id}</TableCell>
                          <TableCell>{file.location}</TableCell>
                          <TableCell>{file.size}</TableCell>
                          <TableCell>{file.redcap_complete}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Paper>
              </Grid>

              <Grid item xs={12} md={3}>
                <Paper elevation={3} sx={{ p: 3 }}>
                  <Typography variant="h6" fontWeight="bold">Raw Data</Typography>
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    Located: WEHI Milton /vast/projects/TDE/TDE0001
                  </Typography>

                  <Typography variant="h6" fontWeight="bold">Copy code for raw data</Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 3, mt: 1 }}>
                    <Button variant="outlined">WEHI Jupyter Notebook</Button>
                    <Button variant="outlined">Nextflow</Button>
                    <Button variant="outlined">WEHI RStudio</Button>
                  </Box>

                  <Typography variant="h6" fontWeight="bold">Data Portals</Typography>
                  <Button variant="outlined" sx={{ mt: 1, mb: 3 }}>cBioPortal</Button>

                  <Typography variant="h6" fontWeight="bold">Other views</Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                    <Button variant="outlined">All Samples View</Button>
                    <Button variant="outlined" onClick={() => navigate('/datasets')}>All Datasets View</Button>
                    <Button variant="outlined">All Samples Summary</Button>
                    <Button variant="outlined" onClick={() => navigate(`/dataset/${datasetId}`)}>Files for this dataset</Button>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </Container>
          <Footer />
        </Box>
      </Box>
    </ThemeProvider>
  );
}
