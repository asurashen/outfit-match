import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function OutfitCard({img, labels, productLink}) {

    const result = productLink.split(" ");
    let url = "product link: " + result[result.length - 1];
    var name = "";
    for (let i = 0; i < result.length -1; i++) {
        name += result[i] + " ";
    }

    let color = "color: " + labels[0].value;
    let gender = "gender: " + labels[1].value;
    let category = "category: " + labels[2].value;

    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardMedia
                component="img"
                alt="green iguana"
                height="140"
                image={img}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {name}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                    {color}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {gender}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {category}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {url}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Share</Button>
                <Button size="small">Learn More</Button>
            </CardActions>
        </Card>
    );
}