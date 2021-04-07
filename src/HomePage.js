import React,{useState,useEffect} from 'react'
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
//import CameraIcon from '@material-ui/icons/PhotoCamera';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link'
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
// import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
// import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
// import DialogTitle from '@material-ui/core/DialogTitle';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DeviceHubIcon from '@material-ui/icons/DeviceHub';
//import PageviewIcon from '@material-ui/icons/Pageview';
//import { FormHelperText } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    icon: {
      marginRight: theme.spacing(2),
    },
    heroContent: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(8, 0, 6),
    },
    heroButtons: {
      marginTop: theme.spacing(4),
    },
    cardGrid: {
      paddingTop: theme.spacing(8),
      paddingBottom: theme.spacing(8),
    },
    card: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    },
    cardMedia: {
      paddingTop: '56.25%', // 16:9
    },
    cardContent: {
      flexGrow: 1,
    },
    footer: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(6),
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
      },
  }));

export default function HomePage() {

    const classes = useStyles();
    const [data,setData]=useState([])
    useEffect(()=>{
        const val = window.localStorage.getItem('value')
        const yr = window.localStorage.getItem('year')
        console.log(val,yr)
        if(val===null)
        {
            axios.get("https://api.spaceXdata.com/v3/launches?limit=100").then(
                response =>{
                    const x=response.data
                    //console.log(x)
                    const arr=[...x]
                    if(yr!==null)
                    {
                        const a=yr
                        setYearSearch(a)
                        let x = arr.filter(arr => arr.launch_year === yr);
                        setData(x)
                    }
                    else
                    {
                        setData(arr)
                    }
                }
            )
        }
        else if(val==='launch')
        {   
            setFlag1(true)
            setFlag2(false)
            setFlag3(false)
            axios.get("https://api.spaceXdata.com/v3/launches?limit=100&launch_success=true").then(
                response =>{
                    const x=response.data
                    //console.log(x)
                    const arr=[...x]
                    if(yr!==null)
                    {
                        //console.log('aaye')
                        setYearSearch(yr)
                        let x = arr.filter(arr => arr.launch_year === yr);
                        setData(x)
                    }
                    else
                    {
                        setData(arr)
                    }
                }
            )
        }
        else
        {
            setFlag1(false)
            setFlag2(true)
            setFlag3(false)
            axios.get("https://api.spaceXdata.com/v3/launches?limit=100&launch_success=true&land_success=true").then(
                response =>{
                    const x=response.data
                    //console.log(x)
                    const arr=[...x]
                    if(yr!==null)
                    {
                        setYearSearch(yr)
                        let x = arr.filter(arr => arr.launch_year === yr);
                        setData(x)
                    }
                    else
                    {
                        setData(arr)
                    }
                }
            )   
        }
    },[])

    // const [open, setOpen] = React.useState(false);

    // const handleClickOpen = () => {
    //     setOpen(true);
    //   };
    
    //   const handleClose = () => {
    //     setOpen(false);
    //   };
    
    //console.log('data is',data)
    //const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9,10,11,12,13,14,15,16,17,18,19,20];
    const [flag1, setFlag1] = useState(false);
    const [flag2, setFlag2] = useState(false);
    const [flag3,setFlag3] = useState(true);

    const [yearsearch,setYearSearch]=useState()
    const [loading,setLoading]=useState(true)

    const handleChange = (e)=>{
        const {value}=e.target

        setYearSearch(value)
    }

    const handleRemoveFilters=()=>{
        setFlag1(false)
        setFlag2(false)
        setFlag3(true)
        setLoading(true)
        window.localStorage.clear()
        setYearSearch('')
        axios.get("https://api.spaceXdata.com/v3/launches?limit=100").then(
            response =>{
                setLoading(false)
                const x=response.data
                console.log(x)
                const arr=[...x]
                setData(arr)
            }
        )
    }

    const handleSuccessLaunch=()=>{
        setFlag1(true)
        setFlag2(false)
        setFlag3(false)
        setLoading(true)
        setYearSearch('')
        //console.log('aaah')
        window.localStorage.clear()
                window.localStorage.setItem('value','launch')
        axios.get("https://api.spaceXdata.com/v3/launches?limit=100&launch_success=true").then(
            response =>{
                setLoading(false)
                const x=response.data
                console.log(x)
                const arr=[...x]
                setData(arr)
                // window.localStorage.clear()
                // window.localStorage.setItem('value','launch')
                
            }
        )
    }

    const handleSuccessLand=()=>{
        setFlag2(true)
        setFlag3(false)
        setLoading(true)
        setFlag1(false)
        setYearSearch('')
        //console.log('aaah')
        window.localStorage.clear()
        window.localStorage.setItem('value','land')
        axios.get("https://api.spaceXdata.com/v3/launches?limit=100&launch_success=true&land_success=true").then(
            response =>{
                setLoading(false)
                const x=response.data
                console.log(x)
                const arr=[...x]
                setData(arr)
                // window.localStorage.clear()
                // window.localStorage.setItem('value','land')
            }
        )
    }
    const handleFilterByYear = () =>{
        setFlag3(false)
        console.log(yearsearch, typeof yearsearch)
        //console.log(data)
        let x = data.filter(data => data.launch_year === yearsearch);
        //console.log(x)
        setData(x)
        window.localStorage.setItem('year',yearsearch)
    }
    //console.log('year is',yearsearch)
    //console.log(data.length,data)
    return (
        <React.Fragment>
             <CssBaseline />
             <AppBar position="relative">
                <Toolbar>
                    <DeviceHubIcon className={classes.icon} />
                    <Typography variant="h6" color="inherit" noWrap>
                        SpaceX Program
                    </Typography>
                </Toolbar>
            </AppBar>
            <main>
                <div className={classes.heroContent}>
                    <Container maxWidth="sm">
                        <Typography component="h1" variant="h3" align="center" color="textPrimary" gutterBottom>
                            SpaceX
                        </Typography>
                        <Typography variant="h6" align="center" color="textSecondary" paragraph>
                            List of Rocket Launches by SpaceX
                            <br />
                            <div style={{fontFamily:"New Tegomin"}}>
                            <b>"When something is important enough, you do it even if the odds are not in your favor."</b>
                            </div>
                            <div style={{marginLeft:'410px',fontFamily:"New Tegomin"}}>
                                - <b>Elon Musk</b>
                            </div>
                        </Typography>
                        <div className={classes.heroButtons}>
                            <Grid container spacing={2} justify="center">
                                <Grid item>
                                <Button variant="contained" color="primary" onClick={ handleRemoveFilters} disabled={flag3}>
                                    Remove Filters
                                </Button>
                                </Grid>
                                <Grid item>
                                    <div  style={{fontSize:'16px'}}><b>Filter By: </b>
                                    <br />
                                {/* <Button variant="outlined" color="primary">
                                    Primary action
                                </Button> */}
                                <Button variant={flag1 ? "contained":"outlined"} color="secondary" onClick={handleSuccessLaunch}>
                                    Launched Succesfully
                                </Button>
                                <Button variant={flag2 ? "contained":"outlined"} color="secondary" onClick={handleSuccessLand}>
                                    Landed Successfully
                                </Button>
                                </div>
                                </Grid>
                            </Grid>
                            <br />
                            <div style={{fontSize:'16px'}}>
                            <b>Filter By Launch Year:</b> 
                            <br />
                            <TextField id="standard-basic" value={yearsearch}
                            helperText="Enter Launch Year (click filter button before new search)" onChange={handleChange}/>
                            <br />
                            <Button variant="outlined" color="primary" onClick={handleFilterByYear}
                             style={{marginTop:'5px'}}>Submit</Button>
                            </div>
                        </div>
                    </Container>
                </div>
                <Container className={classes.cardGrid} maxWidth="md">
                    <Grid container spacing={5}>
                        {
                        data.map((x,index) => (
                        <Grid item key={index} xs={12} sm={6} md={4}>
                            <Card className={classes.card}>
                            <CardMedia
                                className={classes.cardMedia}
                                image={x.links.mission_patch_small}
                                title="Image title"
                            />
                            <CardContent>
                                <Typography>
                                    Mission
                                </Typography>
                                <Typography gutterBottom variant="h5" component="h2">
                                 {x.mission_name}
                                </Typography>
                                <Typography>
                                    <ul>
                                        <li><b>Flight Number :</b> {x.flight_number}</li>
                                        <li><b>Launch Year:</b> {x.launch_year}</li>
                                        <li><b>Launch Time:</b> {x.launch_date_utc} <b>UTC</b></li>
                                        <li><b>Rocket Name:</b> {x.rocket.rocket_name}</li>
                                    </ul>
                                    <Accordion>
                                    <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                    >
                                    <Typography className={classes.heading}>Details</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                    <Typography>
                                        {x.details}
                                    </Typography>
                                    </AccordionDetails>
                                </Accordion>
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Grid container spacing={2} >
                                <Grid item>
                                <Link href={x.links.wikipedia}>
                                <Button size="small" color="primary"  variant="contained">
                                Wikipedia Page
                                </Button>
                                </Link>
                                <Link href={x.links.video_link}>
                                <Button size="small" color="secondary"  variant="contained" style={{float:"right",marginLeft:"60px"}}>
                                Video
                                </Button>
                                </Link>
                                </Grid>
                                </Grid>
                            </CardActions>
                            </Card>
                        </Grid>
                        ))}
                    </Grid>
                </Container>
            </main>
        </React.Fragment>
    )
}



//card content  className={classes.cardContent}