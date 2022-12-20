import React, { Component, useState, useEffect } from 'react'
import {DropzoneAreaBase} from 'material-ui-dropzone'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import OutfitCard from "./OutfitCard";

export default function UploadDialog(){
    const [imgUpload, setImgUpload] = useState("");
    const [results, setResults] = useState([]);
    const [uploadZone, setUploadZone] = useState("Drag and drop an image here or click")

    const handleUpload = () => {

        console.log(imgUpload)
        console.log(uploadZone)

        var myHeaders = new Headers();

        var blob = new Blob( [ imgUpload ], {
            type: 'image/bmp'
        });
        console.log(typeof(blob))

        var formdata = new FormData();
        formdata.append("size", "8");
        formdata.append("imageBlob", imgUpload, "shoes.jpg");
        formdata.append("productSetId", "product_set1");

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        fetch("https://glass-mantra-365915.ue.r.appspot.com/search", requestOptions)
            .then(response => response.json())
            .then(result => {
                    console.log(result);
                    console.log(result.responses[0].productSearchResults.results);
                    setResults(result.responses[0].productSearchResults.results);
                }
            )
            .catch(error => console.log('error', error));


    }

    const handleClose = () => {
        setImgUpload("");
        //setResults([]);
    };


    return (
        <container>
            <DropzoneAreaBase id={'myFile'}
                acceptedFiles={['image/*']}
                dropzoneText={uploadZone}
                onAdd={(fileObjs) => {setUploadZone(fileObjs[0].file.name); setImgUpload(fileObjs[0].file)}}
                showPreviewsInDropzone={true}
                showFileNames={true}
                showFileNamesInPreview={true}
            />
            <Stack
                sx={{ pt: 4 }}
                direction="row"
                spacing={2}
                justifyContent="center"
            >
                <Button variant="contained" onClick={handleUpload}>Upload</Button>
                <Button variant="outlined" onClick={handleClose}>Cancel</Button>
            </Stack>

            <Grid container spacing={2} sx={{
                mt: '30px'
            }}>
            {
                    results.map((result) =>
                        <Grid item xs={12} sm={6} md={4}>
                            <OutfitCard
                                img={result.image}
                                labels={result.product.productLabels}
                                productLink={result.product.displayName}
                            />
                        </Grid>)}
            </Grid>



        </container>


    );

}