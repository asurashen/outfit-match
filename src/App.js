import logo from './logo.svg';
import './App.css';
import React, { Component, useState, useEffect } from 'react'
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import UploadDialog from "./components/UploadDialog";
import Stack from '@mui/material/Stack';
import Bar from './components/Bar'
import AdminCard from "./components/AdminCard";
import Paper from '@mui/material/Paper';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Image from './components/back2.jpeg';



function Copyright() {
  return (
      <Typography variant="body2" color="text.secondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://mui.com/">
          Your Website
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
  );
}


const theme = createTheme();

export default function app() {
    const [isLogin, setIsLogin] = useState(false);
    const [accessToken, setAccessToken] = useState('');
    const [admin, setAdmin] = useState(false);
    const [adminFeature, setAdminFeature] = useState(false);
    const [productSets, setProductSets] = useState([]);
    const [link, setLink] = React.useState('');

    const callback = (newValue) => {
        setIsLogin(newValue['isLogin']);
        setAccessToken(newValue['token']);
        setAdmin(newValue['admin']);
        console.log(accessToken);
    }

    const deleteCallback = (name) => {
        if (name!=""){
            var newP = productSets.filter(function(ele){
                return ele['name'] != name;
            });
            setProductSets(newP);
        }

    }


    const displayDashboard = () =>{
        setAdminFeature(false);
    }
    const displayAdmin = () => {
        setAdminFeature(true);
        fetchProductSets();

    }


    const fetchProductSets = () =>{
        var myHeaders = new Headers();
        myHeaders.append("x-access-token", accessToken);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("https://glass-mantra-365915.ue.r.appspot.com/import", requestOptions)
            .then(response => response.json())
            .then(result => {console.log(result)
                            setProductSets(result['productSets']);})
            .catch(error => console.log('error', error));
    }


    const fetchPost = () =>{
        var myHeaders = new Headers();
        myHeaders.append("x-access-token", accessToken);
        var formdata = new FormData();
        formdata.append("gcs_uri", "gs://"+link);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        fetch("https://glass-mantra-365915.ue.r.appspot.com/import", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    }

    const handleImport = () =>{
        fetchPost();
        fetchProductSets();
    }




  return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar position="static"
                color="default"
                elevation={0}
                sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}>
         <Bar loginCallback={callback} />
        </AppBar>
            <main>

            <Paper
                sx={{
                    position: 'relative',
                    //backgroundColor: 'grey.800',
                    color: '#fff',
                    mb: 4,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    backgroundImage: `url(${Image})`,
                }}
            >

                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        bottom: 0,
                        right: 0,
                        left: 0,
                        backgroundColor: 'rgba(0,0,0,.3)',
                    }}
                />
                <Grid container>
                    <Grid item md={6}>
                        <Box
                            sx={{
                                position: 'relative',
                                p: { xs: 3, md: 6 },
                                pr: { md: 0 },
                            }}
                        >
                            <Typography component="h1" variant="h3" color="inherit" gutterBottom>
                                Outfit Finder: Find Best Match and Purchase Link
                            </Typography>
                            <Typography variant="h5" color="inherit" paragraph>
                                Help you identify ideal clothing and accessories in several major fashion
                                brands by uploading a cloth image.
                            </Typography>
                            <Link variant="subtitle1" href="#">
                                Read More
                            </Link>
                        </Box>
                    </Grid>
                </Grid>
            </Paper>


              {admin? (
                      <Box
                          sx={{
                              bgcolor: 'background.paper',
                              pt: 8,
                              pb: 6,
                          }}
                      >
                  <Container maxWidth="sm">
                  <Stack
                      sx={{ pt: 4 }}
                      direction="row"
                      spacing={2}
                      justifyContent="center"
                  >
                      <Button variant="contained" onClick={displayDashboard}>Find your match</Button>
                      <Button variant="outlined" onClick={displayAdmin}>Admin action</Button>
                  </Stack>
              </Container>
                      </Box>):(<></>)}


            {adminFeature? (
                <>
                    <Grid container justifyContent="center">

                        <FormControl sx={{ m: 1, width: '48ch'}}>
                            <InputLabel htmlFor="outlined-adornment-amount">GS Link</InputLabel>
                            <OutlinedInput
                                id="gs"
                                startAdornment={<InputAdornment position="start">gs//:</InputAdornment>}
                                label="gs"
                                onChange={(event) => setLink(event.target.value)}
                            />
                        </FormControl>
                        <Button onClick={handleImport}>Import New</Button>


                    </Grid>
                    <Grid>
                        {productSets.map((set) =>
                                <AdminCard productSet={set} token={accessToken} deleteCallback={deleteCallback}/>
                               )}
                    </Grid>
                </>

               ):(<Container sx={{ py: 8 }} maxWidth="md">
                <UploadDialog />
            </Container>)}


            {/*<>*/}
            {/*    {isLogin ? (*/}
            {/*        <p>*/}
            {/*        </p>*/}
            {/*    ) : (<p>Please try login to view outfit recommendations {accessToken} </p>)}*/}
            {/*</>*/}
        </main>

        {/* Footer */}
        <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">



          <Typography
              variant="subtitle1"
              align="center"
              color="text.secondary"
              component="p"
          >
            Final project for coms6998!
          </Typography>
          <Copyright />
        </Box>
        {/* End footer */}
      </ThemeProvider>
  );
}

