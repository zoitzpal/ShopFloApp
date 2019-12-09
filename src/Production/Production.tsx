import React from 'react';
import { Grid, Card, CardActionArea, CardMedia, CardContent, Typography, CardActions, Button, makeStyles, Theme, createStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        paper: {
            height: 200,
            width: 400,
        },
        control: {
            padding: theme.spacing(2),
        },
        gridInBetweenSpacing: {
            marginTop: 40,
        },
        card: {
            // maxWidth: 345,
            width: 340
          },
        media: {
            height: 140,
          },
        
    }),
);
export default function Production(props: any) {
    const classes = useStyles()
    const { handleUserUIViewChange } = props

    const handleOnClick = (listView: string) => {
      handleUserUIViewChange(listView)
    }

    return (
        <Grid container className={classes.root} spacing={0} >
            <h1 style={{ textAlign: 'center' }}> Production </h1>
            <Grid item lg={12}>
                <Grid className={classes.gridInBetweenSpacing} container justify="center" spacing={5}>

                    <Grid key={"Projects"} item>
                        <Card className={classes.card}>
                            <CardActionArea onClick={() => handleOnClick('Projects')}>
                                <CardMedia
                                    className={classes.media}
                                    image={"https://software-dev-proj.s3-us-west-1.amazonaws.com/Projects.jpg"}
                                />
                                <CardContent>
                                    <Typography align='center' variant="h5" component="h2">
                                        Projects
                  </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions>
                                <Button size="small" color="primary" fullWidth onClick={() => handleOnClick('Projects')}>
                                    View More
                </Button>
                            </CardActions>
                        </Card>
                    </Grid>

                    <Grid key={"Report"} item>
                        <Card className={classes.card}>
                            <CardActionArea>
                                <CardMedia
                                    className={classes.media}
                                    image={"https://software-dev-proj.s3-us-west-1.amazonaws.com/Inventory.jpg"}
                                />
                                <CardContent>
                                    <Typography align='center' variant="h5" component="h2">
                                        Generate Report
                  </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions>
                                <Button size="small" color="primary" fullWidth>
                                    View More
                </Button>
                            </CardActions>
                        </Card>
                    </Grid>

                </Grid>
            </Grid>
        </Grid>
    )
}