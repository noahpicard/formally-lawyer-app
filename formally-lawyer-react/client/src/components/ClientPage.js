import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import LawyerCard from './lawyerCard';
import CardSelector from './CardSelector';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';


const styles = theme => ({
  root: {
    display: "flex",
    flexDirection: "row"
  },
    bigPaper:{
        marginTop: theme.spacing.unit * 6,
        paddingBottom: theme.spacing.unit * 2,
        backgroundColor: "lightgrey",
        height: "800px",
        width: "900px",
        position: "relative",
        left: "20%"
    },
    smallPaper:{
        marginTop: theme.spacing.unit * 3,
        backgroundColor: "white",
        height: "700px",
        width: "700px",
        position: "relative",
        top: "5%",
        left: "10%"
    },
    clientname:{
        position: "relative",
        top: theme.spacing.unit * 2,
        textAlign: "center",
        fontSize: "40px",
        marginBottom: theme.spacing.unit * 3
    },
    divider:{
        color: "lightgrey",
        width: "90%"
    },
     dividerTitle:{
        textAlign: "center"
    },
    detailsList:{
        listStyle: "none",
        marginBottom: "25px"
    },
    formsTable:{
        position: "relative",
        left:"12%",
        width:"70%",
        height:"auto"
    },
    tableTitle:{
        textAlign: "center",
        color:"#01BABB",
        fontSize:"16px"
    },
    
});

    function getForms(){

            //Return list with forms from database in structure {name, status}, auto displayed in table
            let form1 = {name: "Form1(b) - Immigration Form", status: "Pending"};
            let form2 = {name: "Form 1(c) - Assylum Petition", status: "Completed"};
            let form3 = {name: "Form 1(d) - H1-Visa Form", status: "Denied"};
            return [form1, form2, form3];
        }

    function getColor(status){
        if(status == "Pending"){
            return "gold";
        }else if(status == "Completed"){
            return "green";
        }else{
            return "red";
        }
    }

class ClientPage extends React.Component {

   constructor(props) {
        super(props);
        
        let paths = window.location.href.split("/");
        console.log(paths);
        let username = paths[paths.length-1].replace("-", " ");
       
        this.state = {
            name: username, dob: "10/17/1998", iStatus: "F-1 Visa", address: "1832 S. Brown St, Providence, RI 02912", alienNum: "A065043019", nationality: "Indian", family: "Tara Ajith - (758)-894-1938",
            };
    }

  render() {
    const { classes } = this.props;
    const rows = getForms();
    return (
    <Paper className={classes.bigPaper} elevation={1}>
      
      <Paper className={classes.smallPaper} elevation={2}>
        
      <Typography className={classes.clientname} component="h1" variant="h5">
          {this.state.name}
        </Typography>
      
      <hr className={classes.divider} /> 
        
        <Typography className={classes.dividerTitle} component="h2" variant="h5">
          Personal Information
        </Typography>
        
        <ul>
            
        <li className={classes.detailsList}><span style={{color:"#01BABB"}}>DoB: </span> {this.state.dob}</li>
        <li className={classes.detailsList}><span style={{color:"#01BABB"}}>Immigration Status: </span> {this.state.iStatus}</li>
        <li className={classes.detailsList}><span style={{color:"#01BABB"}}>Address: </span> {this.state.address}</li>
        <li className={classes.detailsList}><span style={{color:"#01BABB"}}>Alien Registration Number: </span> {this.state.alienNum}</li>
        <li className={classes.detailsList}><span style={{color:"#01BABB"}}>Nationality: </span> {this.state.nationality}</li>
        <li className={classes.detailsList}><span style={{color:"#01BABB"}}>Family: </span> {this.state.family}</li>
        </ul>
        
        <hr className={classes.divider} /> 
        
        <Typography className={classes.dividerTitle} component="h2" variant="h5">
          Forms
        </Typography>
        
        <Table className={classes.formsTable}>
            <TableHead>
              <TableRow>
                <TableCell className={classes.tableTitle}>Name</TableCell>
                <TableCell className={classes.tableTitle} align="right">Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map(row => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell style={{color:getColor(row.status)}} align="right">{row.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
      </Table>
        
      </Paper>
      </Paper>
    );
  }
}

ClientPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ClientPage);