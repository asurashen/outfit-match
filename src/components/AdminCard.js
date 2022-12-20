import React, { Component, useState, useEffect } from 'react'
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import Button from '@mui/material/Button';


const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
});

export default function AdminCard({productSet, token, deleteCallback}) {


    const result = productSet['name'].split("/");
    let id = result[result.length - 1];

    const fetchDelete = () =>{
        deleteCallback(productSet['name']);
        // var myHeaders = new Headers();
        // myHeaders.append("x-access-token", token);
        //
        // var requestOptions = {
        //     method: 'DELETE',
        //     headers: myHeaders,
        //     redirect: 'follow'
        // };
        //
        // fetch("https://glass-mantra-365915.ue.r.appspot.com/import/{id}", requestOptions)
        //     .then(response => response.text())
        //     .then(result => console.log(result))
        //     .catch(error => console.log('error', error));
    }



    return (
        <Paper
            sx={{
                p: 2,
                margin: 'auto',
                maxWidth: 500,
                flexGrow: 1,
                backgroundColor: (theme) =>
                    theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
            }}
        >
            <Grid container spacing={2}>
                <Grid item>
                    <ButtonBase sx={{ width: 128, height: 128 }}>
                        <Img src={require('./img.jpg')} />
                    </ButtonBase>
                </Grid>
                <Grid item xs={12} sm container>
                    <Grid item xs container direction="column" spacing={2}>
                        <Grid item xs>
                            <Typography gutterBottom variant="subtitle1" component="div">
                                {id}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Name: {productSet['name']}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Time: {productSet['indexTime']}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Button variant="body2" color="inherit" onClick={fetchDelete}>
                                Remove
                            </Button>
                            {/*<Typography sx={{ cursor: 'pointer' }} variant="body2">*/}
                            {/*    Remove*/}
                            {/*</Typography>*/}
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>

    );
}
